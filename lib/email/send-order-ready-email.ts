import type Stripe from "stripe"

import { getResendClient } from "@/lib/email/resend"
import { orderReadyEmailTemplate } from "@/lib/email/templates/order-ready"
import { paymentLog } from "@/lib/payments/logger"
import { getStripeClient } from "@/lib/stripe/client"

/** Stripe metadata keys must be ≤ 40 characters. */
const EMAIL_SENT_META_KEY = "order_ready_email_sent"
const EMAIL_LOCK_EVENT_META_KEY = "order_ready_email_lock_evt"
const EMAIL_LOCK_AT_META_KEY = "order_ready_email_lock_at"
const EMAIL_SENT_AT_META_KEY = "order_ready_email_sent_at"

const SENDING_TTL_MS = 10 * 60 * 1000 // 10 minutes

function getSessionEmail(session: Stripe.Checkout.Session): string | null {
  // Prefer the email confirmed on the Stripe Checkout session.
  const emailFromDetails = session.customer_details?.email
  if (typeof emailFromDetails === "string" && emailFromDetails.trim()) {
    return emailFromDetails.trim()
  }

  const emailFromSession = session.customer_email
  if (typeof emailFromSession === "string" && emailFromSession.trim()) {
    return emailFromSession.trim()
  }

  const emailFromMetadata = session.metadata?.customer_email
  if (typeof emailFromMetadata === "string" && emailFromMetadata.trim()) {
    return emailFromMetadata.trim()
  }

  return null
}

function getPaymentIntentId(session: Stripe.Checkout.Session): string | null {
  if (typeof session.payment_intent === "string" && session.payment_intent) {
    return session.payment_intent
  }

  if (
    session.payment_intent &&
    typeof session.payment_intent === "object" &&
    typeof session.payment_intent.id === "string"
  ) {
    return session.payment_intent.id
  }

  return null
}

function readPaymentIntentMeta(
  meta: Stripe.Metadata | null | undefined
): Record<string, string> {
  if (!meta || typeof meta !== "object") {
    return {}
  }

  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(meta)) {
    if (typeof value === "string") {
      out[key] = value
    }
  }
  return out
}

function isLockActive(meta: Record<string, string>): boolean {
  const lockAtMs = meta[EMAIL_LOCK_AT_META_KEY]
  const lockAt = lockAtMs ? Number.parseInt(lockAtMs, 10) : NaN

  return (
    Number.isFinite(lockAt) &&
    lockAt > 0 &&
    Date.now() - lockAt < SENDING_TTL_MS
  )
}

export async function sendOrderReadyEmailOnce(params: {
  session: Stripe.Checkout.Session
  webhookEventId: string
}): Promise<void> {
  const { session, webhookEventId } = params
  const toEmail = getSessionEmail(session)

  if (!toEmail) {
    paymentLog("warn", "order_ready_email_missing_customer_email", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
    })
    return
  }

  const paymentIntentId = getPaymentIntentId(session)

  if (!paymentIntentId) {
    // Refuse to send without a PaymentIntent — needed for durable dedupe.
    paymentLog("error", "order_ready_email_missing_payment_intent", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
    })
    return
  }

  const resendFromEmail = process.env.RESEND_FROM_EMAIL?.trim()

  if (!resendFromEmail) {
    paymentLog("error", "order_ready_email_missing_resend_from_email", {})
    throw new Error("Missing RESEND_FROM_EMAIL.")
  }

  if (!process.env.RESEND_API_KEY?.trim()) {
    paymentLog("error", "order_ready_email_missing_resend_api_key", {})
    throw new Error("Missing RESEND_API_KEY.")
  }

  const stripe = getStripeClient()
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
  const meta = readPaymentIntentMeta(paymentIntent.metadata)

  if (meta[EMAIL_SENT_META_KEY] === "1") {
    paymentLog("info", "order_ready_email_already_sent", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
      payment_intent_id: paymentIntentId,
    })
    return
  }

  // Skip only when another concurrent attempt holds the lock.
  // Same-event Stripe retries must continue so we can finish marking "sent"
  // after a prior Resend success + failed metadata write.
  if (
    isLockActive(meta) &&
    meta[EMAIL_LOCK_EVENT_META_KEY] !== webhookEventId
  ) {
    paymentLog("info", "order_ready_email_in_flight_skip", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
      payment_intent_id: paymentIntentId,
    })
    return
  }

  const lockAtMs = String(Date.now())

  // Acquire / refresh a short-lived send lock before calling Resend.
  await stripe.paymentIntents.update(
    paymentIntentId,
    {
      metadata: {
        ...meta,
        [EMAIL_LOCK_EVENT_META_KEY]: webhookEventId,
        [EMAIL_LOCK_AT_META_KEY]: lockAtMs,
      },
    },
    { idempotencyKey: `order-ready-lock-${webhookEventId}` }
  )

  try {
    const resend = getResendClient()

    // Stable per PaymentIntent so Stripe webhook retries never create a second email.
    const { data, error } = await resend.emails.send(
      {
        from: resendFromEmail,
        to: toEmail,
        subject: orderReadyEmailTemplate.subject,
        text: orderReadyEmailTemplate.body,
      },
      { idempotencyKey: `order-ready-email-${paymentIntentId}` }
    )

    if (error || !data) {
      paymentLog("error", "order_ready_email_resend_error", {
        session_id: session.id,
        webhook_event_id: webhookEventId,
        payment_intent_id: paymentIntentId,
        error_name: error?.name,
        error_message: error?.message,
      })
      throw new Error(error?.message || "Resend failed to send order email.")
    }

    const latest = await stripe.paymentIntents.retrieve(paymentIntentId)
    const latestMeta = readPaymentIntentMeta(latest.metadata)

    await stripe.paymentIntents.update(
      paymentIntentId,
      {
        metadata: {
          ...latestMeta,
          [EMAIL_SENT_META_KEY]: "1",
          [EMAIL_SENT_AT_META_KEY]: String(Date.now()),
          [EMAIL_LOCK_EVENT_META_KEY]: webhookEventId,
          [EMAIL_LOCK_AT_META_KEY]: lockAtMs,
        },
      },
      { idempotencyKey: `order-ready-sent-${paymentIntentId}` }
    )

    paymentLog("info", "order_ready_email_sent", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
      payment_intent_id: paymentIntentId,
      resend_email_id: data.id,
      to_email: toEmail,
    })
  } catch (error) {
    paymentLog("error", "order_ready_email_send_failed", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
      payment_intent_id: paymentIntentId,
      error_type: error instanceof Error ? error.constructor.name : "unknown",
    })

    throw error
  }
}
