"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { buttonVariants } from "@/components/ui/button"
import {
  trackPurchaseOnce,
  type Ga4PurchasePayload,
} from "@/lib/analytics/ga4"
import { siteConfig } from "@/lib/seo"
import {
  centeredPageHeadingClass,
  centeredPageMainClass,
  cn,
  primaryActionClass,
  secondaryActionClass,
} from "@/lib/utils"

const statusBodyClass =
  "mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"

const WHATSAPP_COMMUNITY_URL = "https://wa.link/lsd3a8"

const whatsappButtonClass = cn(
  buttonVariants({ variant: "default" }),
  "mt-5 h-auto min-h-12 w-full justify-center rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_28px_-16px_rgba(37,211,102,0.85)] hover:bg-[#1ebe57] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-14px_rgba(37,211,102,0.95)] hover:text-white active:translate-y-0 motion-reduce:transform-none"
)

const discordButtonClass = cn(
  buttonVariants({ variant: "default" }),
  "mt-5 h-auto min-h-12 w-full justify-center rounded-xl bg-[#5865F2] px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_28px_-16px_rgba(88,101,242,0.85)] hover:bg-[#4752c4] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-14px_rgba(88,101,242,0.95)] hover:text-white active:translate-y-0 motion-reduce:transform-none"
)

type PaymentStatus = "verifying" | "paid" | "unpaid" | "missing"

function SuccessContent() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState<PaymentStatus>(
    sessionId ? "verifying" : "missing"
  )
  const [deliveryDiscordUrl, setDeliveryDiscordUrl] = useState<string | null>(
    null
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

        const data = (await response.json()) as {
          paid?: boolean
          purchase?: Ga4PurchasePayload | null
          deliveryDiscordUrl?: string | null
        }

        if (cancelled) {
          return
        }

        if (data.paid) {
          if (data.purchase) {
            trackPurchaseOnce(data.purchase)
          }
          clearCart()
          setDeliveryDiscordUrl(data.deliveryDiscordUrl ?? null)
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

        <section className="mt-8 rounded-xl border border-border/45 bg-background/30 p-4 sm:p-5">
  <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
    Community Access
  </h2>

  {/* WhatsApp Community */}
  <div className="mt-4 rounded-lg border border-border/30 bg-green-500/10 p-4 sm:p-5">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
        <svg
          className="h-5 w-5 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div>
        <h3 className="text-base font-medium text-white">
          WhatsApp Community
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Click the button below to join our exclusive WhatsApp community and
          access your digital product.
        </p>
      </div>
    </div>

    <a
      href="https://wa.link/lsd3a8"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-green-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-600"
    >
      Join WhatsApp Community
    </a>
  </div>

  {/* Telegram Community */}
  <div className="mt-4 rounded-lg border border-border/30 bg-blue-500/10 p-4 sm:p-5">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
        <svg
          className="h-5 w-5 text-blue-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21.5 3.5L2.8 10.7c-.9.35-.9 1.05-.16 1.3l4.8 1.5 1.85 5.8c.23.64.12.9.8.9.53 0 .76-.24 1.04-.53l2.3-2.24 4.78 3.53c.88.49 1.52.23 1.74-.82l3.13-14.76c.32-1.27-.48-1.84-1.28-1.39zM8.18 13.15l10.95-6.9c.55-.33 1.06-.15.64.2l-8.9 8.03-.35 3.76-1.83-5.09-.51-.15z" />
        </svg>
      </div>

      <div>
        <h3 className="text-base font-medium text-white">
          Telegram Community
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Click the button below to join our exclusive Telegram community and
          access your digital product.
        </p>
      </div>
    </div>

    <a
      href="https://telegram.me/+SzMQnpxrxJ1lMDQ0"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
    >
      Join Telegram Community
    </a>
  </div>
</section>
        {deliveryDiscordUrl ? (
          <section className="mt-4 rounded-xl border border-border/45 bg-background/30 p-4 transition-[border-color,background-color] duration-200 hover:border-border/60 hover:bg-background/40 sm:mt-5 sm:p-5">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              💬 Private Discord Server
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Click the button below to join our private Discord server and gain
              full access to your digital product and future updates.
            </p>
            <a
              href={deliveryDiscordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={discordButtonClass}
            >
              Join Telegram Community
            </a>
          </section>
        ) : null}

        <p className="mt-8 text-center text-sm leading-relaxed text-muted-foreground sm:mt-10 sm:text-base">
          If you experience any issues accessing your purchase, email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {siteConfig.email}
          </a>{" "}
          or visit our{" "}
          <Link
            href="/contact"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Contact
          </Link>{" "}
          page.
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
    <Suspense
      fallback={
        <main id="main-content" className={centeredPageMainClass}>
          <h1 className={centeredPageHeadingClass}>Confirming Payment</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            Please wait while we verify your order.
          </p>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
