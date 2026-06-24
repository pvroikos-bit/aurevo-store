"use client"

import { useEffect } from "react"
import { useCart } from "@/components/cart-context"

export default function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-5xl font-bold">
        🎉 Payment Successful
      </h1>

      <p className="mt-6 text-lg text-muted-foreground">
        Thank you for your purchase. Your order has been received.
      </p>

      <div className="mt-10 rounded-xl border border-border p-6">
        <h2 className="text-2xl font-semibold">
          Next Steps
        </h2>

        <p className="mt-4">
          Join our Discord to receive support and access your products.
        </p>

        <a
          href="https://discord.gg/WvYNE5xrvr"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground"
        >
          Join Discord
        </a>

        <a
          href="https://instagram.com/YOUR_INSTAGRAM"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block rounded-xl border border-border px-8 py-3 font-semibold"
        >
          Follow Instagram
        </a>

        <a
          href="https://tiktok.com/@YOUR_TIKTOK"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block rounded-xl border border-border px-8 py-3 font-semibold"
        >
          Follow TikTok
        </a>
      </div>
    </main>
  )
}