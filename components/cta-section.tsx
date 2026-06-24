"use client"
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
              Access 500+ Verified Suppliers Today

            </h2>
            <div className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
Get instant access to 500+ verified suppliers, winning products, reselling guides and exclusive tools — all in one vault.
</div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
  className="h-12 gap-2 px-7 text-base"
  onClick={() => {
    document.getElementById("pricing")?.scrollIntoView({
      behavior: "smooth",
    })
  }}
>
  Unlock The Supplier Pack
  <ArrowRight className="size-4" />
</Button>
              <Button
  variant="outline"
  className="h-12 px-7 text-base"
  onClick={() =>
    window.open("https://discord.gg/kAbCfrZ6rA", "_blank")
  }
>
  Join Discord Community
</Button>
            </div>
            <p className="mt-4 text-sm text-center text-muted-foreground">
  ⭐⭐⭐⭐⭐ Rated 4.9/5 by 18,000+ resellers
</p>
          </div>
        </div>
      </div>
    </section>
  )
}
