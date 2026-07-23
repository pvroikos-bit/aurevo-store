import type Stripe from "stripe"

import { env } from "@/lib/env"
import { getProductAccessLink } from "@/lib/delivery/product-access"
import {
  parseSessionProducts,
  sessionIncludesProduct,
  uniqueSessionProducts,
} from "@/lib/delivery/parse-session"
import { createDeliveryToken, verifyDeliveryToken } from "@/lib/delivery/tokens"
import type { DeliveryItem } from "@/lib/delivery/types"
import { retrieveCheckoutSession } from "@/lib/payments/providers/stripe"
import { isCheckoutSessionPaid } from "@/lib/payments/stripe-utils"

function buildDownloadUrl(token: string, absolute = false): string {
  const path = `/api/delivery/download?token=${encodeURIComponent(token)}`

  if (!absolute) {
    return path
  }

  return `${env.siteUrl}${path}`
}

export function buildDeliveryItemsForSession(
  session: Stripe.Checkout.Session,
  options?: { absoluteUrls?: boolean }
): DeliveryItem[] {
  if (!isCheckoutSessionPaid(session)) {
    return []
  }

  const uniqueProducts = uniqueSessionProducts(parseSessionProducts(session))
  const items: DeliveryItem[] = []
  const absoluteUrls = options?.absoluteUrls === true

  for (const product of uniqueProducts) {
    const access = getProductAccessLink(product.id)

    if (!access) {
      continue
    }

    const token = createDeliveryToken(session.id, product.id)

    items.push({
      productId: product.id,
      name: product.name,
      label: access.label,
      downloadUrl: buildDownloadUrl(token, absoluteUrls),
    })
  }

  return items
}

export async function getDeliveryItemsForSessionId(
  sessionId: string
): Promise<DeliveryItem[] | null> {
  const session = await retrieveCheckoutSession(sessionId)

  if (!session) {
    return null
  }

  return buildDeliveryItemsForSession(session)
}

export async function resolveDeliveryTarget(
  token: string
): Promise<{ url: string } | null> {
  const payload = verifyDeliveryToken(token)

  if (!payload) {
    return null
  }

  const session = await retrieveCheckoutSession(payload.sid)

  if (!session || !isCheckoutSessionPaid(session)) {
    return null
  }

  if (!sessionIncludesProduct(session, payload.pid)) {
    return null
  }

  const access = getProductAccessLink(payload.pid)

  if (!access) {
    return null
  }

  return { url: access.url }
}
