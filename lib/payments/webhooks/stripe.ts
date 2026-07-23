import type Stripe from "stripe"

import { fulfillCheckoutSession } from "@/lib/delivery/fulfillment"
import { paymentLog } from "@/lib/payments/logger"

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

export async function handleStripeWebhookEvent(
  event: Stripe.Event
): Promise<void> {
  paymentLog("info", "stripe_webhook_event_type", {
    event_id: event.id,
    event_type: event.type,
    livemode: event.livemode,
  })

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session

      paymentLog("info", "checkout_session_completed_received", {
        event_id: event.id,
        session_id: session.id,
        payment_status: session.payment_status,
        mode: session.mode,
      })

      if (session.payment_status !== "paid") {
        paymentLog("warn", "checkout_session_not_paid", {
          session_id: session.id,
          payment_status: session.payment_status,
        })
        return
      }

      try {
        await fulfillCheckoutSession(session, event.id)
      } catch (error) {
        paymentLog("error", "checkout_session_fulfillment_failed", {
          event_id: event.id,
          session_id: session.id,
          ...errorDetails(error),
        })
        throw error
      }

      return
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session
      paymentLog("info", "checkout_session_expired", {
        session_id: session.id,
      })
      return
    }

    default:
      paymentLog("info", "stripe_webhook_ignored", {
        event_type: event.type,
        event_id: event.id,
      })
  }
}
