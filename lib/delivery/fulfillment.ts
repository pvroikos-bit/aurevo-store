import type Stripe from "stripe"

import { getProductAccessLink } from "@/lib/delivery/product-access"
import {
  parseSessionProducts,
  uniqueSessionProducts,
} from "@/lib/delivery/parse-session"
import { paymentLog } from "@/lib/payments/logger"
import { sendOrderReadyEmailOnce } from "@/lib/email/send-order-ready-email"

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

export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session,
  webhookEventId: string
): Promise<void> {
  paymentLog("info", "fulfillment_start", {
    session_id: session.id,
    webhook_event_id: webhookEventId,
    payment_status: session.payment_status,
  })

  const products = uniqueSessionProducts(parseSessionProducts(session))
  const missingLinks = products
    .filter((product) => !getProductAccessLink(product.id))
    .map((product) => product.id)
  const deliveredProducts = products
    .filter((product) => getProductAccessLink(product.id))
    .map((product) => product.id)

  if (missingLinks.length > 0) {
    paymentLog("warn", "delivery_links_missing", {
      session_id: session.id,
      product_ids: missingLinks.join(","),
    })
  }

  paymentLog("info", "payment_processed", {
    session_id: session.id,
    webhook_event_id: webhookEventId,
    product_ids: products.map((product) => product.id).join(","),
    delivered_product_ids: deliveredProducts.join(","),
    amount_total: session.amount_total ?? undefined,
    currency: session.currency ?? undefined,
  })

  try {
    await sendOrderReadyEmailOnce({ session, webhookEventId })
  } catch (error) {
    paymentLog("error", "fulfillment_email_failed", {
      session_id: session.id,
      webhook_event_id: webhookEventId,
      ...errorDetails(error),
    })
    throw error
  }

  paymentLog("info", "delivery_completed", {
    session_id: session.id,
    webhook_event_id: webhookEventId,
    product_count: products.length,
    delivered_product_count: deliveredProducts.length,
  })
}
