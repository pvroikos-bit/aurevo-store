"use client"

import { ArrowRight, Lock, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const assurances = [
  { icon: Zap, label: "Instant delivery" },
  { icon: Lock, label: "Secure checkout" },
  { icon: ShieldCheck, label: "Verified suppliers" },
]

export function CtaSection() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-7xl px-3 py-14 min-[360px]:px-4 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card px-4 py-12 text-center min-[360px]:px-6 min-[360px]:py-16 sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[700px] max-w-[120vw] -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]"
          />
          <div className="relative">
            <span className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1.5 text-[11px] font-medium text-primary min-[360px]:px-4 min-[360px]:text-xs">
              <Sparkles className="size-3.5 shrink-0" aria-hidden />
              Limited 2026 launch pricing
            </span>

            <h2
              id="cta-heading"
              className="mx-auto mt-6 max-w-2xl font-heading text-[1.625rem] font-bold leading-tight tracking-tight text-balance min-[360px]:mt-8 min-[360px]:text-3xl sm:text-5xl"
            >
              Access 500+ Verified Suppliers Today
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground min-[360px]:mt-5 min-[360px]:text-base">
              Get instant access to verified suppliers, winning products,
              reselling guides and exclusive tools — all in one vault.
            </p>

            <ul
              className="mx-auto mt-5 flex max-w-xs flex-col items-center gap-2 text-xs text-muted-foreground min-[360px]:mt-6 min-[360px]:max-w-md min-[360px]:flex-row min-[360px]:flex-wrap min-[360px]:justify-center min-[360px]:gap-x-5 min-[360px]:gap-y-2"
              aria-label="Purchase assurances"
            >
              {assurances.map((item) => (
                <li key={item.label} className="flex items-center gap-1.5">
                  <item.icon className="size-3.5 shrink-0" aria-hidden />
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="mx-auto mt-8 flex w-full max-w-md flex-col items-stretch gap-2.5 min-[360px]:mt-10 min-[360px]:gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
              <Button
                className="group min-h-11 h-11 w-full gap-2 rounded-full px-6 text-sm font-semibold min-[360px]:px-8 min-[360px]:text-base sm:min-h-12 sm:h-12 sm:min-w-[16rem] sm:w-auto"
                onClick={() => {
                  document.getElementById("pricing")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }}
              >
                Unlock The Supplier Pack
                <ArrowRight
                  className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                  aria-hidden
                />
              </Button>
              <Button
                variant="outline"
                className="min-h-11 h-11 w-full rounded-full px-6 text-sm font-medium text-muted-foreground min-[360px]:px-7 sm:h-12 sm:w-auto"
                onClick={() =>
                  window.open("https://discord.gg/kAbCfrZ6rA", "_blank")
                }
              >
                Join Discord Community
              </Button>
            </div>

            <p className="mx-auto mt-5 max-w-sm text-sm font-medium text-foreground/90 min-[360px]:mt-6">
              Rated 4.9/5 by 18,000+ resellers
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
