import type Stripe from "stripe"

import type { Ga4Item, Ga4PurchasePayload } from "@/lib/analytics/ga4"
import { parseSessionProducts } from "@/lib/delivery/parse-session"

function parseSessionPrices(session: Stripe.Checkout.Session): number[] {
  const raw = session.metadata?.price

  if (!raw) {
    return []
  }

  return raw.split(",").map((value) => {
    const parsed = Number.parseFloat(value.trim())
    return Number.isFinite(parsed) ? parsed : 0
  })
}

export function buildPurchasePayloadFromSession(
  session: Stripe.Checkout.Session
): Ga4PurchasePayload | null {
  const lines = parseSessionProducts(session)

  if (lines.length === 0) {
    return null
  }

  const prices = parseSessionPrices(session)
  const items: Ga4Item[] = lines.map((line, index) => ({
    item_id: line.id,
    item_name: line.name || line.id,
    quantity: line.quantity,
    price: prices[index] ?? 0,
  }))

  const amountTotal =
    typeof session.amount_total === "number" ? session.amount_total : null

  const valueFromItems = Number(
    items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2)
  )

  const value =
    amountTotal !== null ? Number((amountTotal / 100).toFixed(2)) : valueFromItems

  const currency = (session.currency || "eur").toUpperCase()

  return {
    transaction_id: session.id,
    value,
    currency,
    items,
  }
}
