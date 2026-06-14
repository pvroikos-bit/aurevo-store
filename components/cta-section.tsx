import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[700px] max-w-[120vw] -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]"
          />
          <div className="relative">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              Limited 2026 launch pricing
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl font-heading text-3xl font-bold tracking-tight text-balance sm:text-5xl">
              Start your reselling business today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
              Join 18,000+ resellers who trust SkroojMoney for premium suppliers, tools, and mentorship.
              Instant access, no risk.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button className="h-12 gap-2 px-7 text-base">
                Get Instant Access
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline" className="h-12 px-7 text-base">
                Talk to our team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
