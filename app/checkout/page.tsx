"use client"

import { useState } from "react"
import { useCart } from "@/components/cart-context"
import { getCartTotal } from "@/lib/payments/cart"

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
    <main className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="mb-6 text-4xl font-bold">
        Checkout
      </h1>

      <div className="rounded-xl border border-border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Order Summary
        </h2>

        <div className="mb-6 space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-border bg-background p-3"
            autoComplete="email"
            required
          />

          <input
            type="text"
            placeholder="Discord Username"
            value={discordUsername}
            onChange={(event) =>
              setDiscordUsername(event.target.value)
            }
            className="w-full rounded-lg border border-border bg-background p-3"
            autoComplete="username"
          />
        </div>

        {cart.length === 0 ? (
          <p className="text-muted-foreground">
            Your cart is empty.
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex justify-between"
              >
                <div>
                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <span>
                  €{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="mt-6 flex justify-between border-t pt-4 font-bold">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>

            {error && (
              <p className="mt-4 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleContinueToPayment}
              disabled={isSubmitting}
              className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
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
