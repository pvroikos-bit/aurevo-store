"use client"

import Link from "next/link"
import { useCart } from "@/components/cart-context"
import {
  centeredPageHeadingClass,
  centeredPageMainClass,
  cn,
  primaryActionClass,
  secondaryActionClass,
} from "@/lib/utils"

export default function CheckoutCancelPage() {
  const { cart } = useCart()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <main id="main-content" className={centeredPageMainClass}>
      <h1 className={centeredPageHeadingClass}>Checkout Cancelled</h1>

      <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
        Your payment was not completed. Your cart is still saved.
      </p>

      {cartCount > 0 && (
        <p className="mt-2 text-sm text-muted-foreground">
          {cartCount} {cartCount === 1 ? "item" : "items"} waiting in your cart.
        </p>
      )}

      <div className="mt-10 flex flex-col gap-4">
        <Link href="/checkout" className={cn(primaryActionClass, "w-full")}>
          Return to Checkout
        </Link>

        <Link
          href="/#products"
          className={cn(secondaryActionClass, "w-full")}
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}
