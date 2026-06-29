import { BadgeCheck, Star } from "lucide-react"
import { testimonials } from "@/lib/store-data"

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative"
      aria-labelledby="reviews-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-3 py-16 min-[360px]:px-4 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-md border border-border/50 bg-muted/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Reviews
          </span>

          <h2
            id="reviews-heading"
            className="mt-4 font-heading text-[1.625rem] font-semibold tracking-[-0.025em] text-balance text-foreground min-[360px]:text-3xl sm:text-4xl lg:text-[2.625rem] lg:leading-[1.12]"
          >
            Loved by resellers everywhere
          </h2>

          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
            <div
              className="flex items-center gap-2.5 rounded-full border border-border/40 bg-card/20 px-4 py-2"
              aria-label="4.9 average rating from verified buyers"
            >
              <div className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-primary/80 text-primary/80"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold tabular-nums text-foreground">
                4.9
              </span>
              <span className="text-xs text-muted-foreground">out of 5</span>
            </div>
            <span className="text-sm text-muted-foreground">
              6,200+ verified reviews
            </span>
          </div>

          <p className="mt-3 text-xs text-muted-foreground/70">
            Real feedback from verified SkroojMoney customers
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((t, index) => (
            <figure
              key={t.handle}
              className={`flex min-h-0 flex-col rounded-2xl border bg-card/15 p-5 transition-[border-color,background-color,box-shadow] duration-300 hover:border-border/55 hover:bg-card/25 hover:shadow-[0_12px_40px_-28px_oklch(0_0_0/0.45)] motion-reduce:transition-none min-[360px]:p-6 sm:min-h-[16rem] sm:p-7 ${
                index === 0
                  ? "border-primary/25"
                  : "border-border/35"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className="flex items-center gap-1.5"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  <div className="flex" aria-hidden>
                    {Array.from({ length: Math.round(t.rating) }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-3.5 fill-primary/75 text-primary/75"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-foreground">
                    {t.rating}
                  </span>
                </div>
                <time className="shrink-0 text-[11px] text-muted-foreground/70">
                  {t.date}
                </time>
              </div>

              <blockquote className="mt-4 flex-1 text-[13px] leading-[1.7] text-foreground/85 sm:text-sm sm:leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-border/40 pt-5">
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/50 bg-muted/30 font-heading text-sm font-semibold text-foreground/80"
                  aria-hidden
                >
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-sm font-medium text-foreground">
                      {t.name}
                    </span>
                    <span className="inline-flex items-center gap-0.5 rounded-md border border-border/45 bg-muted/20 px-1.5 py-px text-[9px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                      <BadgeCheck className="size-2.5" aria-hidden />
                      Verified
                    </span>
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {t.handle}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
