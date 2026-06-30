import type { CartLineItem } from "@/lib/payments/types"

export function getCartTotal(items: CartLineItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
