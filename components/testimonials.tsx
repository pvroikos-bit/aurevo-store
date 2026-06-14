import { Star } from "lucide-react"
import { testimonials } from "@/lib/store-data"

export function Testimonials() {
  return (
    <section id="reviews" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Reviews
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Loved by resellers everywhere
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-medium text-foreground">4.9 average</span>
            <span>· 6,200+ verified reviews</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.handle}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{t.date}</span>
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-border/60 pt-4">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 font-heading text-sm font-semibold text-primary">
                  {t.name.charAt(0)}
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.handle}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
