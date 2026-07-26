"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { useCart } from "@/components/cart-context"
import {
  centeredPageHeadingClass,
  centeredPageMainClass,
  cn,
  focusRingClass,
  primaryActionClass,
  secondaryActionClass,
} from "@/lib/utils"

const statusBodyClass =
  "mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"

const WHATSAPP_COMMUNITY_URL = "https://wa.link/yzvwzk"
const DISCORD_SERVER_URL = "https://discord.gg/2VTNdBy8ez"

const whatsappButtonClass = cn(
  "inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_28px_-16px_rgba(37,211,102,0.85)] transition-[background-color,transform,box-shadow,opacity] duration-200 ease-out hover:bg-[#1ebe57] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-14px_rgba(37,211,102,0.95)] active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none",
  focusRingClass
)

const discordButtonClass = cn(
  "inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#5865F2] px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_28px_-16px_rgba(88,101,242,0.85)] transition-[background-color,transform,box-shadow,opacity] duration-200 ease-out hover:bg-[#4752c4] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-14px_rgba(88,101,242,0.95)] active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none",
  focusRingClass
)

type PaymentStatus = "verifying" | "paid" | "unpaid" | "missing"

function SuccessContent() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState<PaymentStatus>(
    sessionId ? "verifying" : "missing"
  )

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
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-border/50 bg-card/25 p-5 text-left shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)] transition-[border-color,box-shadow] duration-300 min-[360px]:p-6 sm:p-8 lg:p-10">
        <div className="flex justify-center">
          <div
            className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30 sm:size-[4.5rem]"
            aria-hidden
          >
            <CheckCircle2 className="size-9 text-emerald-400 sm:size-10" />
          </div>
        </div>

        <h1 className="mt-6 text-center font-heading text-[1.625rem] font-bold leading-tight tracking-tight text-balance min-[360px]:text-3xl sm:mt-8 sm:text-4xl">
          🎉 Thank You for Your Purchase!
        </h1>

        <p className="mt-4 text-center text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
          Your payment has been successfully processed.
        </p>

        <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          Your digital products are now ready. Click the buttons below to access
          them instantly.
        </p>

        <section className="mt-8 rounded-xl border border-border/45 bg-background/30 p-4 transition-[border-color,background-color] duration-200 hover:border-border/60 hover:bg-background/40 sm:mt-10 sm:p-5">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            📲 WhatsApp Community
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Click the button below to join our exclusive WhatsApp community and
            access your digital product.
          </p>
          <a
            href={WHATSAPP_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(whatsappButtonClass, "mt-5")}
          >
            Join WhatsApp Community
          </a>
        </section>

        <section className="mt-4 rounded-xl border border-border/45 bg-background/30 p-4 transition-[border-color,background-color] duration-200 hover:border-border/60 hover:bg-background/40 sm:mt-5 sm:p-5">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            💬 Private Discord Server
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Click the button below to join our private Discord server and gain
            full access to your digital product and future updates.
          </p>
          <a
            href={DISCORD_SERVER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(discordButtonClass, "mt-5")}
          >
            Join Discord Server
          </a>
        </section>

        <p className="mt-8 text-center text-sm leading-relaxed text-muted-foreground sm:mt-10 sm:text-base">
          If you experience any issues accessing your purchase, please contact us
          and we&apos;ll be happy to help.
        </p>

        <p className="mt-4 text-center text-sm leading-relaxed text-foreground/90 sm:text-base">
          Thank you for choosing SkroojMoney. We truly appreciate your support
          and hope you enjoy your purchase!
        </p>
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
