import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Starter",
    price: "$19",
    period: "/one-time",
    desc: "For people looking to explore reselling.",
    features: [
      "Access to 3 verified suppliers",
      "Reselling starter guide",
      "Community Discord access",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro Vault",
    price: "$39",
    period: "/one-time",
    desc: "Everything you need to launch and scale.",
    features: [
      "All 400+ verified suppliers",
      "Receipt Generator Pro",
      "The Reselling Blueprint",
      "Lifetime updates",
      "Priority 24/7 support",
    ],
    cta: "Get the Vault",
    highlighted: true,
  },
  {
    name: "Elite",
    price: "$47",
    period: "/month",
    desc: "For serious resellers who want mentorship.",
    features: [
      "Everything in Pro Vault",
      "Weekly 1:1 mentorship calls",
      "Custom growth roadmap",
      "Inner-circle network access",
      "Dedicated account manager",
    ],
    cta: "Apply for Elite",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Pricing
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Choose your path to profit
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Transparent pricing. No hidden fees. Instant access the moment you join.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-7 ${
                plan.highlighted
                  ? "border-primary/60 bg-card glow-blue"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3" />
                    </span>
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "default" : "outline"}
                className="mt-7 h-11 w-full justify-center text-sm"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
