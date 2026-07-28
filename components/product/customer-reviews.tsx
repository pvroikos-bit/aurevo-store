import { BadgeCheck, Star } from "lucide-react"

const reviews = [
  {
    name: "James",
    country: "United Kingdom",
    flag: "🇬🇧",
    text: "Excellent quality. Everything was delivered instantly and the supplier list is amazing.",
  },
  {
    name: "Luca",
    country: "Italy",
    flag: "🇮🇹",
    text: "I made my first sales within a few days. Definitely worth it.",
  },
  {
    name: "Noah",
    country: "Germany",
    flag: "🇩🇪",
    text: "Very professional. Easy to follow and updated regularly.",
  },
] as const

export function CustomerReviews() {
  return (
    <section
      aria-labelledby="customer-reviews-heading"
      className="mt-14 sm:mt-16 lg:mt-20"
    >
      <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/90">
        Social proof
      </span>

      <h2
        id="customer-reviews-heading"
        className="mt-3 font-heading text-[1.75rem] font-bold tracking-[-0.03em] text-balance text-foreground min-[360px]:text-2xl sm:text-3xl"
      >
        Customer Reviews
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Verified buyers sharing real results after purchase.
      </p>

      <div className="mt-6 grid gap-4 min-[360px]:gap-5 sm:mt-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {reviews.map((review) => (
          <figure
            key={`${review.name}-${review.country}`}
            className="flex flex-col rounded-2xl border border-border/40 bg-card/15 p-5 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.03)] transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-border/55 hover:bg-card/25 hover:shadow-[0_16px_40px_-28px_oklch(0_0_0/0.45)] motion-reduce:transform-none motion-reduce:transition-none min-[360px]:p-5 sm:p-6"
          >
            <div
              className="flex items-center gap-1"
              aria-label="5 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-3.5 fill-primary text-primary"
                  aria-hidden
                />
              ))}
            </div>

            <blockquote className="mt-3.5 flex-1 text-sm leading-relaxed text-foreground/90">
              &ldquo;{review.text}&rdquo;
            </blockquote>

            <figcaption className="mt-4 flex items-center gap-3 border-t border-border/40 pt-4">
              <div
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-heading text-sm font-semibold text-primary"
                aria-hidden
              >
                {review.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold tracking-[-0.01em] text-foreground">
                    {review.name}
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded-full border border-primary/20 bg-primary/10 px-1.5 py-px text-[9px] font-semibold uppercase tracking-[0.08em] text-primary">
                    <BadgeCheck className="size-2.5" aria-hidden />
                    Verified
                  </span>
                </div>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {review.country}{" "}
                  <span aria-hidden>{review.flag}</span>
                </span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
