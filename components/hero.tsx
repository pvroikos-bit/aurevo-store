"use client"

import { ArrowRight, ShieldCheck, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { scrollToSection } from "@/lib/utils"

const stats = [
  { value: "500+", label: "Verified Suppliers" },
  { value: "Instant", label: "Digital Delivery" },
  { value: "4.9★", label: "Customer Rating" },
  { value: "Lifetime", label: "Product Access" },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-20%,oklch(0.62_0.19_256/0.18),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-3 pb-16 pt-12 min-[360px]:px-4 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary min-[360px]:mb-8 min-[360px]:px-4 sm:text-xs">
            <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
            <span className="text-balance">
              Secure Stripe checkout · Instant digital delivery
            </span>
          </div>

          <h1 className="font-heading text-[1.875rem] font-bold leading-[1.06] tracking-[-0.035em] text-balance min-[360px]:text-[2.125rem] min-[390px]:text-[2.375rem] sm:text-5xl sm:leading-[1.04] md:text-6xl lg:text-[4.5rem] lg:leading-[1.02]">
            Start Reselling With
            <span className="mt-1 block bg-gradient-to-br from-primary via-primary to-primary/70 bg-clip-text text-transparent sm:mt-2">
              500+ Verified Suppliers
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty min-[360px]:mt-6 min-[360px]:text-base min-[360px]:leading-[1.75] sm:mt-7 sm:text-lg">
            Premium supplier vaults, winning products, and reselling tools —
            delivered instantly after checkout. No subscriptions. Lifetime access.
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch gap-3 min-[360px]:mt-10 sm:mt-11 sm:flex-row sm:items-center sm:justify-center">
            <Button
              size="lg"
              className="group min-h-12 h-12 gap-2 rounded-full px-7 text-sm font-semibold shadow-[0_0_0_1px_oklch(0.62_0.19_256/0.35),0_12px_40px_-12px_oklch(0.62_0.19_256/0.55)] transition-[box-shadow,transform] duration-300 hover:-translate-y-px hover:shadow-[0_0_0_1px_oklch(0.62_0.19_256/0.45),0_16px_48px_-12px_oklch(0.62_0.19_256/0.65)] motion-reduce:transform-none motion-reduce:transition-none sm:h-14 sm:min-h-0 sm:px-10 sm:text-base"
              onClick={() => scrollToSection("products")}
            >
              <Zap className="size-4 shrink-0" aria-hidden />
              Shop Best Sellers
              <ArrowRight className="size-4 shrink-0 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:transform-none" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="min-h-12 h-12 rounded-full border-border/55 bg-card/20 px-7 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 hover:bg-card/40 motion-reduce:transition-none sm:h-14 sm:min-h-0 sm:px-9 sm:text-base"
              onClick={() => scrollToSection("pricing")}
            >
              Get All-In-One Pack
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground/80 sm:text-sm">
            One-time payment · Instant delivery · From €1.99
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-2.5 min-[360px]:mt-10 min-[360px]:gap-3 sm:flex-row sm:gap-5">
            <div className="flex items-center gap-2.5 rounded-full border border-border/45 bg-card/25 px-4 py-2">
              <div className="flex shrink-0" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-primary text-primary sm:size-4"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold tabular-nums tracking-tight text-foreground">
                4.9/5
              </span>
            </div>
            <span className="max-w-[18rem] text-center text-xs leading-relaxed text-muted-foreground min-[360px]:max-w-none min-[360px]:text-sm sm:text-left">
              Rated highly by customers who buy digital reseller tools
            </span>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 min-[360px]:mt-14 sm:mt-16 sm:grid-cols-4 sm:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/40 bg-card/25 p-4 text-center shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)] transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-card/40 hover:shadow-[0_16px_40px_-20px_oklch(0.62_0.19_256/0.35)] motion-reduce:transform-none motion-reduce:transition-none min-[360px]:p-5 sm:p-6"
            >
              <div className="font-heading text-xl font-bold tracking-tight text-foreground min-[360px]:text-2xl sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase leading-snug tracking-[0.1em] text-muted-foreground min-[360px]:mt-1.5 min-[360px]:text-[11px] sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
