import type Stripe from "stripe"
import { paymentLog } from "@/lib/payments/logger"

export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session
): Promise<void> {
  paymentLog("info", "checkout_session_fulfilled", {
    session_id: session.id,
    product_id: session.metadata?.product_id,
    amount_total: session.amount_total ?? undefined,
    currency: session.currency ?? undefined,
  })
}

export async function handleStripeWebhookEvent(
  event: Stripe.Event
): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session

      if (session.payment_status !== "paid") {
        paymentLog("warn", "checkout_session_not_paid", {
          session_id: session.id,
          payment_status: session.payment_status,
        })
        return
      }

      await fulfillCheckoutSession(session)
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
      })
  }
}
