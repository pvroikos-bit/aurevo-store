import { NextResponse } from "next/server"
import Stripe from "stripe"
import { env } from "@/lib/env"
import { validateResendEnv } from "@/lib/email/env"
import { getStripeClient } from "@/lib/stripe/client"
import { paymentLog } from "@/lib/payments/logger"
import { validateStripeReadiness } from "@/lib/payments/stripe-config"
import { handleStripeWebhookEvent } from "@/lib/payments/webhooks/stripe"

export const runtime = "nodejs"

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

export async function POST(request: Request) {
  paymentLog("info", "webhook_received", {
    path: "/api/webhooks/stripe",
    method: "POST",
  })

  if (env.paymentProvider !== "stripe") {
    paymentLog("error", "stripe_webhook_provider_disabled", {
      payment_provider: env.paymentProvider,
    })

    return NextResponse.json(
      {
        code: "PROVIDER_NOT_CONFIGURED",
        message: "Stripe webhooks are disabled.",
      },
      { status: 400 }
    )
  }

  const readiness = validateStripeReadiness()

  if (!readiness.ok) {
    paymentLog("error", "stripe_webhook_readiness_invalid", {
      errors: readiness.errors.join("|"),
    })

    return NextResponse.json(
      {
        code: "PROVIDER_NOT_CONFIGURED",
        message: "Stripe is not configured.",
      },
      { status: 503 }
    )
  }

  const webhookSecret = env.stripe.webhookSecret?.trim()

  if (!webhookSecret) {
    paymentLog("error", "stripe_webhook_secret_missing", {})

    return NextResponse.json(
      {
        code: "PROVIDER_NOT_CONFIGURED",
        message: "STRIPE_WEBHOOK_SECRET is not configured.",
      },
      { status: 503 }
    )
  }

  const resendEnv = validateResendEnv()

  if (!resendEnv.ok) {
    // Log early so Vercel logs show the real cause of fulfillment failures.
    paymentLog("warn", "stripe_webhook_resend_not_configured", {
      missing: resendEnv.missing.join(","),
    })
  }

  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    paymentLog("error", "stripe_webhook_signature_missing", {})

    return NextResponse.json(
      {
        code: "WEBHOOK_ERROR",
        message: "Missing Stripe signature.",
      },
      { status: 400 }
    )
  }

  const body = await request.text()

  let event: Stripe.Event

  try {
    const stripe = getStripeClient()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    paymentLog("info", "signature_verified", {
      event_id: event.id,
      event_type: event.type,
      livemode: event.livemode,
    })
  } catch (error) {
    paymentLog("error", "stripe_webhook_signature_invalid", {
      ...errorDetails(error),
    })

    return NextResponse.json(
      {
        code: "WEBHOOK_ERROR",
        message: "Invalid webhook signature.",
      },
      { status: 400 }
    )
  }

  try {
    await handleStripeWebhookEvent(event)
  } catch (error) {
    paymentLog("error", "stripe_webhook_handler_failed", {
      event_type: event.type,
      event_id: event.id,
      ...errorDetails(error),
    })

    return NextResponse.json(
      {
        code: "WEBHOOK_ERROR",
        message: "Webhook handler failed.",
        detail: error instanceof Error ? error.message : "unknown",
      },
      { status: 500 }
    )
  }

  paymentLog("info", "webhook_processed_ok", {
    event_id: event.id,
    event_type: event.type,
  })

  return NextResponse.json({ received: true }, { status: 200 })
}
