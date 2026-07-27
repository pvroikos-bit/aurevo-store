import {
  BadgeCheck,
  Boxes,
  Headphones,
  RefreshCw,
  ShieldCheck,
  Zap,
} from "lucide-react"
import {
  homeSectionClass,
  homeSectionDividerClass,
  homeSectionPaddingClass,
  SectionHeader,
} from "@/components/section-header"

const features = [
  {
    icon: ShieldCheck,
    title: "Verified 1:1 Suppliers",
    desc: "500+ vetted contacts with proven quality, margins, and worldwide shipping options.",
  },
  {
    icon: Zap,
    title: "High Profit Margins",
    desc: "Products curated for strong resale demand and consistent profit opportunities.",
  },
  {
    icon: BadgeCheck,
    title: "Beginner Friendly",
    desc: "Step-by-step resources so you can start sourcing and selling without experience.",
  },
  {
    icon: Boxes,
    title: "Worldwide Shipping",
    desc: "Global suppliers serving 100+ countries with reliable delivery partners.",
  },
  {
    icon: RefreshCw,
    title: "Instant Digital Access",
    desc: "Receive your products immediately after checkout — no waiting, no delays.",
  },
  {
    icon: Headphones,
    title: "Lifetime Updates & Support",
    desc: "Stay current with free updates and responsive support when you need help.",
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="relative"
      aria-labelledby="features-heading"
    >
      <div aria-hidden className={homeSectionDividerClass} />

      <div className={`${homeSectionClass} ${homeSectionPaddingClass}`}>
        <SectionHeader
          eyebrow="Why SkroojMoney"
          title="Why Choose SkroojMoney?"
          description="Everything you need to source products, launch faster, and scale with confidence — in one premium vault."
          headingId="features-heading"
        />

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border/35 bg-card/15 p-6 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.03)] transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-card/25 hover:shadow-[0_20px_48px_-28px_oklch(0.62_0.19_256/0.25)] motion-reduce:transform-none motion-reduce:transition-none sm:p-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/15 motion-reduce:transition-none">
                <feature.icon className="size-5" aria-hidden />
              </div>

              <h3 className="mt-5 font-heading text-base font-semibold leading-snug tracking-[-0.01em] text-foreground sm:text-lg">
                {feature.title}
              </h3>

              <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground/90 sm:text-sm">
                {feature.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
