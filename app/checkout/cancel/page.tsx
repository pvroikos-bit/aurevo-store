"use client"

import Link from "next/link"
import { useCart } from "@/components/cart-context"

export default function CheckoutCancelPage() {
  const { cart } = useCart()

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-4xl font-bold">
        Checkout Cancelled
      </h1>

      <p className="mt-6 text-lg text-muted-foreground">
        Your payment was not completed. Your cart is still saved.
      </p>

      {cart.length > 0 && (
        <p className="mt-2 text-sm text-muted-foreground">
          {cart.length}{" "}
          {cart.length === 1 ? "item" : "items"} waiting in your cart.
        </p>
      )}

      <div className="mt-10 flex flex-col gap-4">
        <Link
          href="/checkout"
          className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground"
        >
          Return to Checkout
        </Link>

        <Link
          href="/#products"
          className="rounded-xl border border-border px-8 py-3 font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}
