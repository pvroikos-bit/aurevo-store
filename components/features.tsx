import {
  Zap,
  ShieldCheck,
  Clock,
  Boxes,
  BadgeCheck,
  Headphones,
} from "lucide-react"

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
    <section
      id="features"
      className="relative"
      aria-labelledby="features-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-3 py-16 min-[360px]:px-4 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-md border border-border/50 bg-muted/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Why SkroojMoney
          </span>

          <h2
            id="features-heading"
            className="mt-4 font-heading text-[1.625rem] font-semibold tracking-[-0.025em] text-balance text-foreground min-[360px]:text-3xl sm:text-4xl lg:text-[2.625rem] lg:leading-[1.12]"
          >
            Why Resellers Choose SkroojMoney
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
            Launch and scale your reselling business with verified suppliers,
            winning products, and proven strategies.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-2xl border border-border/35 bg-card/15 p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-border/55 hover:bg-card/30 hover:shadow-[0_12px_40px_-28px_oklch(0_0_0/0.45)] motion-reduce:transition-none sm:p-7"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-border/40 bg-muted/25 text-muted-foreground transition-colors duration-300 group-hover:border-border/60 group-hover:text-foreground motion-reduce:transition-none">
                <feature.icon className="size-[18px]" aria-hidden />
              </div>

              <h3 className="mt-5 font-heading text-base font-semibold leading-snug tracking-[-0.01em] text-foreground sm:text-lg">
                {feature.title}
              </h3>

              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground/90 sm:text-sm">
                {feature.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
