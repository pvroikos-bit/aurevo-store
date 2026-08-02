import Link from "next/link"
import { ArrowRight, Check, Lock, Zap } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import {
  homeSectionClass,
  homeSectionDividerClass,
  homeSectionPaddingClass,
  SectionHeader,
} from "@/components/section-header"
import { cn } from "@/lib/utils"

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
      <div aria-hidden className={homeSectionDividerClass} />

      <div className={`${homeSectionClass} ${homeSectionPaddingClass}`}>
        <SectionHeader
          eyebrow="Pricing"
          title="Everything You Need To Start Reselling"
          description="One payment. Lifetime access. Instant digital delivery."
          headingId="pricing-heading"
        />

        <div className="mt-12 flex justify-center sm:mt-14 lg:mt-16">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="relative flex w-full max-w-lg flex-col rounded-3xl border border-primary/25 bg-gradient-to-b from-card/30 to-card/15 p-5 shadow-[0_24px_56px_-32px_oklch(0.62_0.19_256/0.45),inset_0_1px_0_0_oklch(1_0_0/0.04)] min-[360px]:p-6 sm:p-8 lg:p-10"
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-primary/35 bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
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
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "group mt-5 min-h-12 h-12 w-full justify-center gap-2 rounded-full text-sm font-semibold shadow-[0_12px_32px_-12px_oklch(0.62_0.19_256/0.55)] transition-[box-shadow,transform] hover:-translate-y-px hover:shadow-[0_16px_40px_-12px_oklch(0.62_0.19_256/0.65)] motion-reduce:transform-none sm:text-base"
                )}
              >
                {plan.buttonText}
                <ArrowRight
                  className="size-4 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                  aria-hidden
                />
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
