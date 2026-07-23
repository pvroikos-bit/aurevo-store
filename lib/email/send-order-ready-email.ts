import type Stripe from "stripe"

import { validateResendEnv } from "@/lib/email/env"
import { getResendClient } from "@/lib/email/resend"
import { buildOrderReadyEmail } from "@/lib/email/templates/order-ready"
import { buildDeliveryItemsForSession } from "@/lib/delivery/grants"
import { paymentLog } from "@/lib/payments/logger"
import { getStripeClient } from "@/lib/stripe/client"

/** Stripe metadata keys must be ≤ 40 characters. */
const EMAIL_SENT_META_KEY = "order_ready_email_sent"
const EMAIL_LOCK_EVENT_META_KEY = "order_ready_email_lock_evt"
const EMAIL_LOCK_AT_META_KEY = "order_ready_email_lock_at"
const EMAIL_SENT_AT_META_KEY = "order_ready_email_sent_at"

const SENDING_TTL_MS = 10 * 60 * 1000 // 10 minutes

function getSessionEmail(session: Stripe.Checkout.Session): string | null {
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

function errorDetails(error: unknown): {
  error_type: string
  error_message: string
  error_stack?: string
} {
  if (error instanceof Error) {
    return {
      error_type: error.constructor.name,
      error_message: error.message,
      error_stack: error.stack,
    }
  }

  return {
    error_type: "unknown",
    error_message: String(error),
  }
}

export async function sendOrderReadyEmailOnce(params: {
  session: Stripe.Checkout.Session
  webhookEventId: string
}): Promise<void> {
  const { session, webhookEventId } = params

  paymentLog("info", "order_ready_email_start", {
    session_id: session.id,
    webhook_event_id: webhookEventId,
    payment_status: session.payment_status,
  })

  const toEmail = getSessionEmail(session)

  if (!toEmail) {
    paymentLog("error", "order_ready_email_missing_customer_email", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
      has_customer_details_email: Boolean(session.customer_details?.email),
      has_customer_email: Boolean(session.customer_email),
      has_metadata_email: Boolean(session.metadata?.customer_email),
    })
    throw new Error(
      "Cannot send order email: Stripe Checkout session has no customer email."
    )
  }

  const paymentIntentId = getPaymentIntentId(session)

  if (!paymentIntentId) {
    paymentLog("error", "order_ready_email_missing_payment_intent", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
    })
    throw new Error(
      "Cannot send order email: Checkout session has no payment_intent for idempotency."
    )
  }

  const resendEnv = validateResendEnv()

  if (!resendEnv.ok) {
    paymentLog("error", "order_ready_email_missing_resend_config", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
      missing: resendEnv.missing.join(","),
    })
    throw new Error(
      `Missing Resend configuration: ${resendEnv.missing.join(", ")}. Set these in Vercel Environment Variables.`
    )
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

  paymentLog("info", "order_ready_email_acquiring_lock", {
    session_id: session.id,
    webhook_event_id: webhookEventId,
    payment_intent_id: paymentIntentId,
  })

  // Only patch email lock keys — Stripe merges metadata; do not rewrite all keys.
  await stripe.paymentIntents.update(
    paymentIntentId,
    {
      metadata: {
        [EMAIL_LOCK_EVENT_META_KEY]: webhookEventId,
        [EMAIL_LOCK_AT_META_KEY]: lockAtMs,
      },
    },
    { idempotencyKey: `order-ready-lock-${webhookEventId}` }
  )

  try {
    let deliveryItems: ReturnType<typeof buildDeliveryItemsForSession> = []

    try {
      deliveryItems = buildDeliveryItemsForSession(session, {
        absoluteUrls: true,
      })
    } catch (deliveryError) {
      // Missing DELIVERY_TOKEN_SECRET / PRODUCT_ACCESS_LINKS must not block confirmation email.
      paymentLog("warn", "order_ready_email_delivery_links_failed", {
        session_id: session.id,
        webhook_event_id: webhookEventId,
        ...errorDetails(deliveryError),
      })
      deliveryItems = []
    }

    paymentLog("info", "order_ready_email_delivery_items_ready", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
      delivery_item_count: deliveryItems.length,
    })

    const emailContent = buildOrderReadyEmail({
      orderReference: session.id,
      deliveryItems: deliveryItems.map((item) => ({
        name: item.name,
        label: item.label,
        downloadUrl: item.downloadUrl,
      })),
    })

    const resend = getResendClient()

    paymentLog("info", "order_ready_email_sending", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
      payment_intent_id: paymentIntentId,
      from_email_configured: true,
      recipient_domain: toEmail.includes("@")
        ? toEmail.split("@")[1]
        : "unknown",
    })

    const { data, error } = await resend.emails.send(
      {
        from: resendEnv.fromEmail,
        to: toEmail,
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html,
      },
      { idempotencyKey: `order-ready-email-${paymentIntentId}` }
    )

    if (error || !data) {
      paymentLog("error", "order_ready_email_failed", {
        session_id: session.id,
        webhook_event_id: webhookEventId,
        payment_intent_id: paymentIntentId,
        error_name: error?.name,
        error_message: error?.message,
      })
      throw new Error(error?.message || "Resend failed to send order email.")
    }

    await stripe.paymentIntents.update(
      paymentIntentId,
      {
        metadata: {
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
      delivery_item_count: deliveryItems.length,
    })
  } catch (error) {
    paymentLog("error", "order_ready_email_send_failed", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
      payment_intent_id: paymentIntentId,
      ...errorDetails(error),
    })

    throw error
  }
}
