import type { CartLineItem } from "@/lib/payments/types"

export const GA_CURRENCY = "EUR"

export type Ga4Item = {
  item_id: string
  item_name: string
  price: number
  quantity: number
}

export type Ga4PurchasePayload = {
  transaction_id: string
  value: number
  currency: string
  items: Ga4Item[]
}

type GtagFn = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GtagFn
  }
}

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") {
    return null
  }

  if (typeof window.gtag === "function") {
    return window.gtag
  }

  return null
}

/** Wait briefly for the production GA bootstrap script if needed. */
function withGtag(callback: (gtag: GtagFn) => void): void {
  const existing = getGtag()

  if (existing) {
    callback(existing)
    return
  }

  if (typeof window === "undefined") {
    return
  }

  let attempts = 0
  const timer = window.setInterval(() => {
    attempts += 1
    const gtag = getGtag()

    if (gtag) {
      window.clearInterval(timer)
      callback(gtag)
      return
    }

    if (attempts >= 40) {
      window.clearInterval(timer)
    }
  }, 50)
}

export function toGa4Item(item: {
  id: string
  name: string
  price: number
  quantity?: number
}): Ga4Item {
  return {
    item_id: item.id,
    item_name: item.name,
    price: Number(item.price),
    quantity: item.quantity && item.quantity > 0 ? item.quantity : 1,
  }
}

export function cartToGa4Items(cart: CartLineItem[]): Ga4Item[] {
  return cart.map((item) => toGa4Item(item))
}

export function getItemsValue(items: Ga4Item[]): number {
  return Number(
    items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2)
  )
}

export function trackViewItem(item: Ga4Item): void {
  withGtag((gtag) => {
    gtag("event", "view_item", {
      currency: GA_CURRENCY,
      value: Number((item.price * item.quantity).toFixed(2)),
      items: [item],
    })
  })
}

export function trackAddToCart(item: Ga4Item): void {
  withGtag((gtag) => {
    gtag("event", "add_to_cart", {
      currency: GA_CURRENCY,
      value: Number((item.price * item.quantity).toFixed(2)),
      items: [item],
    })
  })
}

export function trackBeginCheckout(items: Ga4Item[]): void {
  if (items.length === 0) {
    return
  }

  withGtag((gtag) => {
    gtag("event", "begin_checkout", {
      currency: GA_CURRENCY,
      value: getItemsValue(items),
      items,
    })
  })
}

const PURCHASE_STORAGE_PREFIX = "ga4_purchase_sent:"

export function trackPurchaseOnce(payload: Ga4PurchasePayload): boolean {
  if (typeof window === "undefined") {
    return false
  }

  if (!payload.transaction_id || payload.items.length === 0) {
    return false
  }

  const storageKey = `${PURCHASE_STORAGE_PREFIX}${payload.transaction_id}`

  try {
    if (window.sessionStorage.getItem(storageKey) === "1") {
      return false
    }

    window.sessionStorage.setItem(storageKey, "1")
  } catch {
    // sessionStorage may be unavailable; still attempt a single send this load.
  }

  withGtag((gtag) => {
    gtag("event", "purchase", {
      transaction_id: payload.transaction_id,
      value: payload.value,
      currency: payload.currency || GA_CURRENCY,
      items: payload.items,
    })
  })

  return true
}
