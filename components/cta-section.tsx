"use client"

import { ArrowRight, Lock, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { env } from "@/lib/env"
import { scrollToSection } from "@/lib/utils"

const assurances = [
  { icon: Zap, label: "Instant delivery" },
  { icon: Lock, label: "Secure checkout" },
  { icon: ShieldCheck, label: "Verified suppliers" },
]

export function CtaSection() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-7xl px-3 py-14 min-[360px]:px-4 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card/40 via-card/25 to-background/40 px-4 py-12 text-center min-[360px]:px-6 min-[360px]:py-16 sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[700px] max-w-[120vw] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]"
          />
          <div className="relative">
            <span className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold text-primary min-[360px]:px-4 min-[360px]:text-xs">
              <Sparkles className="size-3.5 shrink-0" aria-hidden />
              Limited 2026 launch pricing
            </span>

            <h2
              id="cta-heading"
              className="mx-auto mt-6 max-w-2xl font-heading text-[1.75rem] font-bold leading-tight tracking-[-0.03em] text-balance min-[360px]:mt-8 min-[360px]:text-3xl sm:text-5xl"
            >
              Access 500+ Verified Suppliers Today
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground min-[360px]:mt-5 min-[360px]:text-base">
              Get instant access to verified suppliers, winning products,
              reselling guides and exclusive tools — all in one vault.
            </p>

            <ul
              className="mx-auto mt-5 flex max-w-md flex-col items-center gap-2 text-xs text-muted-foreground min-[360px]:mt-6 min-[360px]:flex-row min-[360px]:flex-wrap min-[360px]:justify-center min-[360px]:gap-x-5 min-[360px]:gap-y-2 sm:text-sm"
              aria-label="Purchase assurances"
            >
              {assurances.map((item) => (
                <li key={item.label} className="flex items-center gap-1.5">
                  <item.icon className="size-3.5 shrink-0 text-primary/80" aria-hidden />
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="mx-auto mt-8 flex w-full max-w-md flex-col items-stretch gap-3 min-[360px]:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
              <Button
                size="lg"
                className="group min-h-12 h-12 w-full gap-2 rounded-full px-7 text-sm font-semibold shadow-[0_12px_32px_-12px_oklch(0.62_0.19_256/0.55)] sm:min-w-[16rem] sm:w-auto sm:text-base"
                onClick={() => scrollToSection("pricing")}
              >
                Unlock The Supplier Pack
                <ArrowRight
                  className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                  aria-hidden
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-h-12 h-12 w-full rounded-full border-border/55 bg-background/20 px-7 text-sm font-semibold sm:w-auto"
                onClick={() =>
                  window.open(
                    env.social.discord,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Join Telegram Community
              </Button>
            </div>

            <p className="mx-auto mt-5 max-w-sm text-sm font-semibold text-foreground/90 min-[360px]:mt-6">
              Secure Stripe checkout · Lifetime access after purchase
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              One-time payment · Lifetime access · No hidden fees
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
