import { Zap, ShieldCheck, Clock, Boxes, BadgeCheck, Headphones } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    desc: "Every product is delivered to your inbox in under 60 seconds — no waiting, no friction.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "Bank-grade encryption and trusted processors keep every transaction safe and private.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Suppliers",
    desc: "Each supplier is vetted and tested by our team so you only get proven, reliable contacts.",
  },
  {
    icon: Boxes,
    title: "Huge Selection",
    desc: "From fragrances to electronics, find exactly the supplier or tool your business needs.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Our dedicated team is online around the clock to answer questions and help you scale.",
  },
  {
    icon: Clock,
    title: "Lifetime Updates",
    desc: "Tools and guides receive free ongoing updates so your edge never goes stale.",
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
            A premium experience, end to end
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            We built SkroojMoney to feel as professional as the business you&apos;re building.
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
