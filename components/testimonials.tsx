import { BadgeCheck, Quote, Star } from "lucide-react"
import {
  homeSectionClass,
  homeSectionDividerClass,
  homeSectionPaddingClass,
  SectionHeader,
} from "@/components/section-header"
import { testimonials } from "@/lib/store-data"

export function Testimonials() {
  const [featured, ...rest] = testimonials

  return (
    <section
      id="reviews"
      className="relative"
      aria-labelledby="reviews-heading"
    >
      <div aria-hidden className={homeSectionDividerClass} />

      <div className={`${homeSectionClass} ${homeSectionPaddingClass}`}>
        <SectionHeader
          eyebrow="Reviews"
          title="Trusted by Resellers Worldwide"
          description="Real feedback from verified customers who use SkroojMoney to source, launch, and scale."
          headingId="reviews-heading"
        />

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-center gap-3 rounded-2xl border border-border/40 bg-card/20 px-5 py-4 sm:mt-10 sm:flex-row sm:gap-6 sm:px-8 sm:py-5">
          <div
            className="flex items-center gap-2.5"
            aria-label="4.9 average rating from verified buyers"
          >
            <div className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-primary text-primary"
                />
              ))}
            </div>
            <span className="text-lg font-bold tabular-nums text-foreground">
              4.9
            </span>
            <span className="text-sm text-muted-foreground">/ 5</span>
          </div>
          <div className="hidden h-8 w-px bg-border/50 sm:block" aria-hidden />
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            Based on customer feedback shared on SkroojMoney
          </p>
        </div>

        {featured ? (
          <figure className="mx-auto mt-8 max-w-4xl rounded-2xl border border-primary/25 bg-gradient-to-br from-card/30 via-card/20 to-background/20 p-6 shadow-[0_20px_48px_-32px_oklch(0.62_0.19_256/0.35)] sm:mt-10 sm:p-8 lg:p-10">
            <Quote
              className="size-8 text-primary/40"
              aria-hidden
            />
            <blockquote className="mt-4 font-heading text-lg leading-relaxed text-foreground sm:text-xl sm:leading-relaxed">
              &ldquo;{featured.text}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border/40 pt-6">
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-heading text-base font-semibold text-primary"
                aria-hidden
              >
                {featured.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {featured.name}
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-primary">
                    <BadgeCheck className="size-2.5" aria-hidden />
                    Verified
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {featured.handle} · {featured.date}
                </div>
              </div>
              <div
                className="hidden items-center gap-1 sm:flex"
                aria-label={`${featured.rating} out of 5 stars`}
              >
                {Array.from({ length: Math.round(featured.rating) }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-primary/80 text-primary/80"
                    aria-hidden
                  />
                ))}
              </div>
            </figcaption>
          </figure>
        ) : null}

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {rest.map((t) => (
            <figure
              key={t.handle}
              className="flex min-h-0 flex-col rounded-2xl border border-border/35 bg-card/15 p-5 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.03)] transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-border/55 hover:bg-card/25 hover:shadow-[0_16px_40px_-28px_oklch(0_0_0/0.45)] motion-reduce:transform-none motion-reduce:transition-none min-[360px]:p-6 sm:min-h-[15rem]"
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

              <blockquote className="mt-4 flex-1 text-[13px] leading-[1.7] text-foreground/90 sm:text-sm sm:leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-border/40 pt-5">
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/50 bg-muted/25 font-heading text-sm font-semibold text-foreground/85"
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
