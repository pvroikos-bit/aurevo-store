"use client"
import Link from "next/link"
import { Check } from "lucide-react"
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
      className="relative border-t border-border/60 bg-card/30"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Pricing
          </span>

          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Everything You Need To Start Reselling
          </h2>

          <p className="mt-3 text-pretty text-muted-foreground">
            One payment. Lifetime access. Instant digital delivery.
          </p>
        </div>

        <div className="mt-14 flex justify-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex max-w-3xl w-full flex-col rounded-3xl border p-7 ${
                plan.popular
                  ? "border-primary/60 bg-card glow-blue"
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Best Value
                </span>
              )}

              <h3 className="font-heading text-2xl font-bold">
                {plan.name}
              </h3>

              <p className="mt-2 text-muted-foreground">
                Instant Access • Lifetime Updates • One-Time Payment
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold">
                  €{plan.price}
                </span>

                <span className="text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3" />
                    </span>

                    <span className="text-foreground/90">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mb-4 text-center text-sm font-medium text-primary">
                🔥 Limited Launch Price • Lifetime Access
              </p>

              <Link href="/products/all-in-one-supplier-vault">
                <Button
                  variant="default"
                  className="mt-7 h-11 w-full justify-center text-sm"
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}