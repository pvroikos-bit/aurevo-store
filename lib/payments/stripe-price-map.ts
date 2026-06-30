let cachedPriceMap: Record<string, string> | null = null

function loadStripePriceMap(): Record<string, string> {
  if (cachedPriceMap) {
    return cachedPriceMap
  }

  const raw = process.env.STRIPE_PRICE_MAP

  if (!raw?.trim()) {
    cachedPriceMap = {}
    return cachedPriceMap
  }

  try {
    const parsed = JSON.parse(raw) as unknown

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      cachedPriceMap = {}
      return cachedPriceMap
    }

    cachedPriceMap = Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] =>
          typeof entry[0] === "string" && typeof entry[1] === "string"
      )
    )
  } catch {
    cachedPriceMap = {}
  }

  return cachedPriceMap
}

export function getStripePriceIdForProduct(
  productId: string
): string | undefined {
  return loadStripePriceMap()[productId]
}

export function resolveStripePriceId(
  productId: string,
  productStripePriceId?: string
): string | undefined {
  return productStripePriceId ?? getStripePriceIdForProduct(productId)
}
