import type { CartLineItem } from "@/lib/payments/types"

export function getCartTotal(items: CartLineItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
}

export function formatPrice(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
  }).format(amount)
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
