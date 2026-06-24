"use client"

import { useCart } from "@/components/cart-context"

export default function CheckoutPage() {
  const { cart } = useCart()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

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
            className="w-full rounded-lg border border-border bg-background p-3"
          />

          <input
            type="text"
            placeholder="Discord Username"
            className="w-full rounded-lg border border-border bg-background p-3"
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
                  €
                  {(item.price * item.quantity).toFixed(
                    2
                  )}
                </span>
              </div>
            ))}

            <div className="mt-6 flex justify-between border-t pt-4 font-bold">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>

            <button
  onClick={() => {
    window.location.href = "/success"
  }}
  className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground"
>
  Continue To Payment
</button>
          </>
        )}
      </div>
    </main>
  )
}