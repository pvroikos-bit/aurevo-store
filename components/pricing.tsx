import Link from "next/link"
import { ArrowRight, Check, Lock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "All-In-One Products Pack",
    price: 49.99,
    period: "one-time",
    popular: true,
    description:
      "500+ Verified Suppliers, Winning Products & Instant Delivery",
    features: [
      "500+ Verified Suppliers",
      "Winning Products List",
      "Reselling Blueprint",
      "Receipt Generator",
      "Instant Digital Delivery",
      "Lifetime Updates",
      "High Profit Potential Products",
      "Beginner Friendly",
    ],
    buttonText: "Unlock Instant Access",
  },
]

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative"
      aria-labelledby="pricing-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-3 py-16 min-[360px]:px-4 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-md border border-border/50 bg-muted/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Pricing
          </span>

          <h2
            id="pricing-heading"
            className="mt-4 font-heading text-[1.625rem] font-semibold tracking-[-0.025em] text-balance text-foreground min-[360px]:text-3xl sm:text-4xl lg:text-[2.625rem] lg:leading-[1.12]"
          >
            Everything You Need To Start Reselling
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
            One payment. Lifetime access. Instant digital delivery.
          </p>
        </div>

        <div className="mt-12 flex justify-center sm:mt-14 lg:mt-16">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="relative flex w-full max-w-lg flex-col rounded-2xl border border-border/40 bg-card/20 p-5 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)] min-[360px]:p-6 sm:p-8 lg:p-10"
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-primary/30 bg-background px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-primary">
                  Best Value
                </span>
              )}

              <div className="text-center sm:text-left">
                <h3 className="font-heading text-lg font-semibold tracking-[-0.02em] text-foreground min-[360px]:text-xl sm:text-2xl">
                  {plan.name}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>

                <div className="mt-8 flex flex-col items-center gap-1 sm:items-start">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-3xl font-bold tracking-tight tabular-nums text-foreground min-[360px]:text-4xl sm:text-5xl">
                      €{plan.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground/75">
                    No subscription · Pay once, access forever
                  </p>
                </div>

                <ul
                  className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground sm:justify-start"
                  aria-label="Purchase assurances"
                >
                  <li className="flex items-center gap-1">
                    <Lock className="size-3" aria-hidden />
                    Secure checkout
                  </li>
                  <li className="flex items-center gap-1">
                    <Zap className="size-3" aria-hidden />
                    Instant access
                  </li>
                </ul>
              </div>

              <ul className="mt-8 space-y-3 border-t border-border/40 pt-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[13px] sm:text-sm"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/20 text-muted-foreground">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span className="leading-relaxed text-foreground/85">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-center text-xs font-medium text-muted-foreground">
                Limited launch pricing · Lifetime access included
              </p>

              <Link
                href="/products/all-in-one-supplier-vault"
                className="mt-5 block"
              >
                <Button className="group min-h-11 h-11 w-full justify-center gap-2 rounded-full text-sm font-semibold sm:h-12 sm:text-base">
                  {plan.buttonText}
                  <ArrowRight
                    className="size-4 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                    aria-hidden
                  />
                </Button>
              </Link>

              <p className="mt-3 text-center text-[11px] text-muted-foreground/65">
                Join 18,000+ resellers already inside the vault
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
