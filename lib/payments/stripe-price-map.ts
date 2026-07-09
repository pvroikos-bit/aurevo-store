let cachedPriceMap: Record<string, string> | null = null
let parseError: string | null = null

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
      parseError = "STRIPE_PRICE_MAP must be a JSON object."
      cachedPriceMap = {}
      return cachedPriceMap
    }

    cachedPriceMap = Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] =>
          typeof entry[0] === "string" && typeof entry[1] === "string"
      )
    )
  } catch (error) {
    parseError =
      error instanceof Error ? error.message : "Invalid JSON in STRIPE_PRICE_MAP"
    cachedPriceMap = {}
  }

  return cachedPriceMap
}

function isStripePriceId(value: string): boolean {
  return value.trim().startsWith("price_")
}

export function getStripePriceMapStatus() {
  const map = loadStripePriceMap()
  const validEntries: Record<string, string> = {}
  const invalidEntries: string[] = []

  for (const [productId, priceId] of Object.entries(map)) {
    if (isStripePriceId(priceId)) {
      validEntries[productId] = priceId.trim()
    } else {
      invalidEntries.push(productId)
    }
  }

  return {
    map: validEntries,
    parseError,
    invalidEntries,
    isEmpty: Object.keys(validEntries).length === 0,
  }
}

export function validateStripePriceMapping(productIds: string[]): {
  warnings: string[]
} {
  const { map, isEmpty } = getStripePriceMapStatus()
  const warnings: string[] = []

  if (isEmpty) {
    warnings.push(
      "STRIPE_PRICE_MAP is empty. Checkout will use dynamic price_data until Stripe Price IDs are mapped."
    )
    return { warnings }
  }

  const unmapped = productIds.filter((productId) => !map[productId])

  if (unmapped.length > 0) {
    warnings.push(
      `STRIPE_PRICE_MAP is missing ${unmapped.length} product(s): ${unmapped.join(", ")}`
    )
  }

  return { warnings }
}

export function getStripePriceIdForProduct(
  productId: string
): string | undefined {
  return getStripePriceMapStatus().map[productId]
}

export function resolveStripePriceId(
  productId: string,
  productStripePriceId?: string
): string | undefined {
  const resolved =
    productStripePriceId ?? getStripePriceIdForProduct(productId)

  return resolved?.trim() || undefined
}
