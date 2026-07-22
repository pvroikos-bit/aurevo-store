"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/components/cart-context"
import { env } from "@/lib/env"
import {
  centeredPageHeadingClass,
  centeredPageMainClass,
  cn,
  primaryActionClass,
  secondaryActionClass,
} from "@/lib/utils"

const statusBodyClass =
  "mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"

type PaymentStatus = "verifying" | "paid" | "unpaid" | "missing"

type DeliveryItem = {
  productId: string
  name: string
  label: string
  downloadUrl: string
}

function SuccessContent() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState<PaymentStatus>(
    sessionId ? "verifying" : "missing"
  )
  const [deliveryItems, setDeliveryItems] = useState<DeliveryItem[]>([])
  const [deliveryChecked, setDeliveryChecked] = useState(false)

  useEffect(() => {
    if (!sessionId) {
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
          if (!cancelled) {
            setStatus("unpaid")
          }
          return
        }

        const data = (await response.json()) as { paid?: boolean }

        if (cancelled) {
          return
        }

        if (data.paid) {
          clearCart()
          setStatus("paid")
          return
        }

        setStatus("unpaid")
      } catch {
        if (!cancelled) {
          setStatus("unpaid")
        }
      }
    }

    void verifyPayment()

    return () => {
      cancelled = true
    }
  }, [clearCart, sessionId])

  useEffect(() => {
    if (status !== "paid" || !sessionId) {
      return
    }

    const verifiedSessionId = sessionId
    let cancelled = false

    async function loadDelivery() {
      try {
        const response = await fetch(
          `/api/delivery?session_id=${encodeURIComponent(verifiedSessionId)}`
        )

        if (!response.ok) {
          return
        }

        const data = (await response.json()) as { items?: DeliveryItem[] }

        if (!cancelled) {
          setDeliveryItems(data.items ?? [])
        }
      } finally {
        if (!cancelled) {
          setDeliveryChecked(true)
        }
      }
    }

    void loadDelivery()

    return () => {
      cancelled = true
    }
  }, [sessionId, status])

  if (status === "verifying") {
    return (
      <main id="main-content" className={centeredPageMainClass}>
        <h1 className={centeredPageHeadingClass}>Confirming Payment</h1>
        <p className={statusBodyClass}>
          Please wait while we verify your order.
        </p>
      </main>
    )
  }

  if (status === "missing" || status === "unpaid") {
    return (
      <main id="main-content" className={centeredPageMainClass}>
        <h1 className={centeredPageHeadingClass}>Payment Not Confirmed</h1>
        <p className={statusBodyClass}>
          We could not verify a completed payment. Your cart has been kept so you
          can try again.
        </p>
        {sessionId && (
          <p className="mt-3 break-all text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Order reference: {sessionId}
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

  return (
    <main id="main-content" className={centeredPageMainClass}>
      <h1 className={centeredPageHeadingClass}>🎉 Payment Successful</h1>

      <p className={statusBodyClass}>
        Thank you for your purchase. Your order has been received.
      </p>

      {sessionId && (
        <p className="mt-3 break-all text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Order reference: {sessionId}
        </p>
      )}

      {deliveryItems.length > 0 && (
        <div className="mt-8 rounded-xl border border-border p-4 text-left sm:mt-10 sm:p-6">
          <h2 className="text-center text-xl font-semibold sm:text-2xl">
            Your Products
          </h2>

          <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            Your purchase is ready. Use the secure links below to access your
            products.
          </p>

          <div className="mt-6 space-y-3">
            {deliveryItems.map((item) => (
              <a
                key={item.productId}
                href={item.downloadUrl}
                className={cn(primaryActionClass, "w-full")}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {deliveryChecked && deliveryItems.length === 0 && (
        <p className="mt-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Your payment is confirmed. If download links are not shown yet, check
          your email or contact support with your order reference.
        </p>
      )}

      <div className="mt-8 rounded-xl border border-border p-4 text-left sm:mt-10 sm:p-6">
        <h2 className="text-center text-xl font-semibold sm:text-2xl">
          Next Steps
        </h2>

        <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          Need help? Join our Discord for support with your order.
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
