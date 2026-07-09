import { NextResponse } from "next/server"
import Stripe from "stripe"
import { env } from "@/lib/env"
import { getStripeClient } from "@/lib/stripe/client"
import { paymentLog } from "@/lib/payments/logger"
import { validateStripeReadiness } from "@/lib/payments/stripe-config"
import { handleStripeWebhookEvent } from "@/lib/payments/webhooks/stripe"

export const runtime = "nodejs"

export async function POST(request: Request) {
  if (env.paymentProvider !== "stripe") {
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

  const signature = request.headers.get("stripe-signature")

  if (!signature) {
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
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.stripe.webhookSecret!
    )
  } catch (error) {
    paymentLog("error", "stripe_webhook_signature_invalid", {
      error_type:
        error instanceof Error ? error.constructor.name : "unknown",
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
      error_type:
        error instanceof Error ? error.constructor.name : "unknown",
    })

    return NextResponse.json(
      {
        code: "WEBHOOK_ERROR",
        message: "Webhook handler failed.",
      },
      { status: 500 }
    )
  }

  return NextResponse.json({ received: true })
}
