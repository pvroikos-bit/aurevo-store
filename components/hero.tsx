"use client"

import { ArrowRight, ShieldCheck, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { scrollToSection } from "@/lib/utils"

const stats = [
  { value: "500+", label: "Supplier Contacts" },
  { value: "80+", label: "Private Agents" },
  { value: "24/7", label: "Instant Access" },
  { value: "100%", label: "Instant Delivery" },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,oklch(0.62_0.19_256/0.14),transparent_68%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-3 pb-20 pt-14 min-[360px]:px-4 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-card/50 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground min-[360px]:mb-8 min-[360px]:gap-2.5 min-[360px]:px-4 min-[360px]:tracking-[0.14em] sm:text-xs">
            <ShieldCheck className="size-3.5 shrink-0 text-primary" />
            <span className="text-balance">
              Trusted by 18,000+ resellers worldwide
            </span>
          </div>

          <h1 className="font-heading text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03em] text-balance min-[360px]:text-[2rem] min-[390px]:text-[2.25rem] sm:text-5xl sm:leading-[1.03] md:text-6xl lg:text-[4.25rem] lg:leading-[1.02]">
            Access 500+ Verified Suppliers & Private Agents
            <span className="mt-2 block bg-gradient-to-br from-primary via-primary to-primary/65 bg-clip-text text-transparent">
              Start Reselling Today.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty min-[360px]:mt-6 min-[360px]:text-base min-[360px]:leading-[1.75] sm:mt-8 sm:text-lg sm:leading-relaxed">
            Get instant access to verified suppliers, private agents, premium guides,
            receipt generators and winning products used by thousands of resellers.
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch gap-2.5 min-[360px]:mt-10 min-[360px]:gap-3 sm:mt-12 sm:flex-row sm:items-center sm:justify-center">
            <Button
              className="group min-h-11 h-11 gap-2 rounded-full px-6 text-sm font-semibold shadow-[0_0_0_1px_oklch(0.62_0.19_256/0.28),0_10px_36px_-10px_oklch(0.62_0.19_256/0.45)] transition-[box-shadow,background-color] duration-300 hover:shadow-[0_0_0_1px_oklch(0.62_0.19_256/0.38),0_14px_44px_-10px_oklch(0.62_0.19_256/0.55)] motion-reduce:transition-none sm:h-14 sm:min-h-0 sm:px-10 sm:text-base"
              onClick={() => scrollToSection("products")}
            >
              <Zap className="size-4 shrink-0" />
              Browse Products
              <ArrowRight className="size-4 shrink-0 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:transform-none" />
            </Button>

            <Button
              variant="outline"
              className="min-h-11 h-11 rounded-full border-border/50 bg-transparent px-6 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:border-foreground/15 hover:bg-card/45 hover:text-foreground motion-reduce:transition-none sm:h-12 sm:min-h-0 sm:px-8 sm:text-base"
              onClick={() => scrollToSection("pricing")}
            >
              Get Instant Access
            </Button>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-2 px-1 min-[360px]:mt-12 min-[360px]:gap-3 sm:mt-14 sm:flex-row sm:gap-5">
            <div className="flex items-center gap-2.5 rounded-full border border-border/45 bg-card/30 px-3.5 py-2 min-[360px]:gap-3 min-[360px]:px-4">
              <div className="flex shrink-0" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-primary text-primary sm:size-4"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                4.9/5
              </span>
            </div>
            <span className="max-w-[16rem] text-center text-xs leading-relaxed text-muted-foreground min-[360px]:max-w-none min-[360px]:text-sm sm:text-left">
              Rated by 18,000+ resellers worldwide
            </span>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-2.5 min-[360px]:mt-16 min-[360px]:gap-3 sm:mt-20 sm:grid-cols-4 sm:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/45 bg-card/30 p-4 text-center transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary/25 hover:bg-card/50 hover:shadow-[0_12px_40px_-16px_oklch(0.62_0.19_256/0.25)] motion-reduce:transition-none min-[360px]:p-5 sm:p-6"
            >
              <div className="font-heading text-xl font-bold tracking-tight text-foreground min-[360px]:text-2xl sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase leading-snug tracking-[0.08em] text-muted-foreground min-[360px]:mt-1.5 min-[360px]:text-[11px] min-[360px]:tracking-[0.1em] sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
