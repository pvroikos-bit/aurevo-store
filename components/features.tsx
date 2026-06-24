import { Zap, ShieldCheck, Clock, Boxes, BadgeCheck, Headphones } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "🔥 Verified 1:1 Suppliers",
    desc: "Access to 500+ vetted suppliers with proven product quality and worldwide shipping.",
  },
  {
    icon: ShieldCheck,
    title: "💰 High Profit Margins",
    desc: "Products selected for strong resale potential and consistent profit opportunities.",
  },
  {
    icon: BadgeCheck,
    title: "🚀 Beginner Friendly",
    desc: "No experience needed. Follow proven systems and start selling faster.",
  },
  {
    icon: Boxes,
    title: "🌍 Worldwide Shipping",
    desc: "Global suppliers serving 100+ countries with tracked delivery options.",
  },
  {
    icon: Headphones,
    title: "📦 Instant Digital Access",
    desc: "Receive your products immediately after purchase. No waiting, no delays.",
  },
  {
    icon: Clock,
    title: "⭐ Trusted by Resellers",
    desc: "Used by hundreds of resellers to source products and scale their stores From 2022/2026.",
  },
]

export function Features() {
  return (
    <section id="features" className="relative border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Why SkroojMoney
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Why Resellers Choose SkroojMoney
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Launch and scale your reselling business with verified suppliers, winning products, and proven strategies.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
