import type Stripe from "stripe"

import { getProductAccessLink } from "@/lib/delivery/product-access"
import {
  parseSessionProducts,
  uniqueSessionProducts,
} from "@/lib/delivery/parse-session"
import { paymentLog } from "@/lib/payments/logger"
import { sendOrderReadyEmailOnce } from "@/lib/email/send-order-ready-email"

export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session,
  webhookEventId: string
): Promise<void> {
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

  paymentLog("info", "checkout_session_fulfilled", {
    session_id: session.id,
    product_ids: products.map((product) => product.id).join(","),
    delivered_product_ids: deliveredProducts.join(","),
    customer_email: session.metadata?.customer_email,
    amount_total: session.amount_total ?? undefined,
    currency: session.currency ?? undefined,
  })

  // Send the order confirmation email only after Stripe confirms the payment.
  // Idempotency is handled inside `sendOrderReadyEmailOnce`.
  await sendOrderReadyEmailOnce({ session, webhookEventId })
}
