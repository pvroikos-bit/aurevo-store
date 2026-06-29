"use client"

import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/components/cart-context"
import { getCartTotal } from "@/lib/payments/cart"
import {
  cn,
  focusRingClass,
  inputFieldClass,
  primaryActionClass,
} from "@/lib/utils"

export default function CheckoutPage() {
  const { cart } = useCart()
  const [email, setEmail] = useState("")
  const [discordUsername, setDiscordUsername] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const total = getCartTotal(cart)

  async function handleContinueToPayment() {
    if (cart.length === 0) {
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          customer: {
            email,
            discordUsername,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message ?? "Checkout failed. Please try again.")
        return
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl
        return
      }

      setError("No payment redirect was returned.")
    } catch {
      setError("Checkout failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main id="main-content" className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="mb-6 text-4xl font-bold">Checkout</h1>

      <div className="rounded-xl border border-border p-6">
        <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

        <div className="mb-6 space-y-4">
          <div>
            <label htmlFor="checkout-email" className="sr-only">
              Email Address
            </label>
            <input
              id="checkout-email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputFieldClass}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="checkout-discord" className="sr-only">
              Discord Username
            </label>
            <input
              id="checkout-discord"
              type="text"
              placeholder="Discord Username"
              value={discordUsername}
              onChange={(event) =>
                setDiscordUsername(event.target.value)
              }
              className={inputFieldClass}
              autoComplete="username"
            />
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link
              href="/#products"
              className={cn(
                "mt-4 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline",
                focusRingClass
              )}
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="font-medium">{item.name}</p>

                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <span className="shrink-0 tabular-nums">
                  €{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="mt-6 flex justify-between border-t pt-4 font-bold">
              <span>Total</span>
              <span className="tabular-nums">€{total.toFixed(2)}</span>
            </div>

            <p
              role="alert"
              aria-live="polite"
              className={cn(
                "mt-4 text-sm text-destructive",
                !error && "sr-only"
              )}
            >
              {error ?? ""}
            </p>

            <button
              type="button"
              onClick={handleContinueToPayment}
              disabled={isSubmitting}
              className={cn(primaryActionClass, "mt-6 w-full rounded-xl py-3")}
            >
              {isSubmitting
                ? "Processing..."
                : "Continue To Payment"}
            </button>
          </>
        )}
      </div>
    </main>
  )
}
