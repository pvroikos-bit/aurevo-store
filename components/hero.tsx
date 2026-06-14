import { ShieldCheck, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[480px] w-[820px] max-w-[120vw] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,oklch(0.62_0.19_256/0.12),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <ShieldCheck className="size-3.5 text-primary" />
            Trusted by 5,000+ resellers worldwide
          </div>

          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Access verified vendors,{" "}
            <span className="text-primary">and scale faster today.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
  Premium supplier lists, private agents, exclusive guides and tools.
Everything you need to build a profitable reselling business.
</p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button className="h-12 gap-2 px-7 text-base">
              <Zap className="size-4" />
              Browse Products
            </Button>
            <Button variant="outline" className="h-12 px-7 text-base">
              Get Instant Access
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-medium text-foreground">4.7/5</span>
            <span>Rated 4.7/5 by 1,200+ resellers</span>
          </div>
        </div>

        {/* stat strip */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "500+", label: "Supplier Contacts" },
{ value: "80+", label: "Private Agents" },
{ value: "24/7", label: "Instant Access" },
{ value: "100%", label: "Instant Delivery" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card/50 p-5 text-center backdrop-blur"
            >
              <div className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
