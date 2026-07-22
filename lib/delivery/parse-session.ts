import type Stripe from "stripe"

import type { SessionProductLine } from "@/lib/delivery/types"

const METADATA_NAME_SEPARATOR = " | "

export function parseSessionProducts(
  session: Stripe.Checkout.Session
): SessionProductLine[] {
  const metadata = session.metadata

  if (!metadata?.product_id) {
    return []
  }

  const productIds = metadata.product_id.split(",").map((value) => value.trim())
  const productNames = metadata.product_name
    ? metadata.product_name.split(METADATA_NAME_SEPARATOR)
    : []
  const quantities = metadata.quantity
    ? metadata.quantity.split(",").map((value) => Number.parseInt(value, 10))
    : []

  const lines: SessionProductLine[] = []

  for (let index = 0; index < productIds.length; index += 1) {
    const id = productIds[index]

    if (!id) {
      continue
    }

    const quantity = Number.isFinite(quantities[index]) && quantities[index] > 0
      ? quantities[index]
      : 1

    lines.push({
      id,
      name: productNames[index]?.trim() || id,
      quantity,
    })
  }

  return lines
}

export function sessionIncludesProduct(
  session: Stripe.Checkout.Session,
  productId: string
): boolean {
  return parseSessionProducts(session).some((line) => line.id === productId)
}

export function uniqueSessionProducts(
  lines: SessionProductLine[]
): SessionProductLine[] {
  const seen = new Set<string>()
  const unique: SessionProductLine[] = []

  for (const line of lines) {
    if (seen.has(line.id)) {
      continue
    }

    seen.add(line.id)
    unique.push(line)
  }

  return unique
}
