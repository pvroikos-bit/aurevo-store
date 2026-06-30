"use client"

import { Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/components/cart-context"
import { env } from "@/lib/env"
import { cn, primaryActionClass, secondaryActionClass } from "@/lib/utils"

function SuccessContent() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (!sessionId) {
      clearCart()
      return
    }

    const verifiedSessionId = sessionId
    let cancelled = false

    async function verifyPayment() {
      try {
        const response = await fetch(
          `/api/checkout/session?session_id=${encodeURIComponent(verifiedSessionId)}`
        )

        if (!response.ok) {
          return
        }

        const data = (await response.json()) as { paid?: boolean }

        if (!cancelled && data.paid) {
          clearCart()
        }
      } catch {
        // Keep cart if verification fails; webhook remains source of truth.
      }
    }

    void verifyPayment()

    return () => {
      cancelled = true
    }
  }, [clearCart, sessionId])

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-5xl font-bold">
        🎉 Payment Successful
      </h1>

      <p className="mt-6 text-lg text-muted-foreground">
        Thank you for your purchase. Your order has been received.
      </p>

      {sessionId && (
        <p className="mt-3 text-sm text-muted-foreground">
          Order reference: {sessionId}
        </p>
      )}

      <div className="mt-10 rounded-xl border border-border p-6">
        <h2 className="text-2xl font-semibold">
          Next Steps
        </h2>

        <p className="mt-4">
          Join our Discord to receive support and access your products.
        </p>

        <a
          href={env.social.discord}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(primaryActionClass, "mt-6 w-full")}
        >
          Join Discord
        </a>

        {env.social.instagram && (
          <a
            href={env.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(secondaryActionClass, "mt-4 w-full")}
          >
            Follow Instagram
          </a>
        )}

        {env.social.tiktok && (
          <a
            href={env.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(secondaryActionClass, "mt-4 w-full")}
          >
            Follow TikTok
          </a>
        )}
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
