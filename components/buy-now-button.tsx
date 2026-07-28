"use client"

import { ArrowRight, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-context"
import { toGa4Item, trackAddToCart } from "@/lib/analytics/ga4"

type Props = {
  id: string
  name: string
  price: number
}

export function BuyNowButton({ id, name, price }: Props) {
  const router = useRouter()
  const { replaceCart } = useCart()

  return (
    <button
      type="button"
      onClick={() => {
        replaceCart({
          id,
          name,
          price,
        })
        trackAddToCart(toGa4Item({ id, name, price, quantity: 1 }))
        router.push("/checkout")
      }}
      className="group relative mt-6 flex h-12 min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_0_0_1px_oklch(0.62_0.19_256/0.35),0_14px_40px_-12px_oklch(0.62_0.19_256/0.65)] outline-none transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/92 hover:shadow-[0_0_0_1px_oklch(0.62_0.19_256/0.45),0_20px_48px_-12px_oklch(0.62_0.19_256/0.75)] focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:bg-primary/95 motion-reduce:transform-none motion-reduce:transition-none sm:mt-7 sm:h-14 sm:min-h-14 sm:text-lg"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
      />
      <Lock className="relative size-4 shrink-0 opacity-90" aria-hidden />
      <span className="relative">Buy Now — Instant Access</span>
      <ArrowRight
        className="relative size-4 shrink-0 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
        aria-hidden
      />
    </button>
  )
}
