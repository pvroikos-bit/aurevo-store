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
      className="mt-12 sm:mt-16"
    >
      <h2
        id="customer-reviews-heading"
        className="font-heading text-[1.625rem] font-semibold tracking-[-0.025em] text-balance text-foreground min-[360px]:text-2xl sm:text-3xl"
      >
        Customer Reviews
      </h2>

      <div className="mt-5 grid gap-4 min-[360px]:gap-5 sm:mt-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {reviews.map((review) => (
          <figure
            key={`${review.name}-${review.country}`}
            className="flex flex-col rounded-2xl border border-border/50 bg-card/20 p-5 min-[360px]:p-5 sm:p-6"
          >
            <div
              className="flex items-center gap-1"
              aria-label="5 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-3.5 fill-primary/80 text-primary/80"
                  aria-hidden
                />
              ))}
            </div>

            <figcaption className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="text-sm font-medium tracking-[-0.01em] text-foreground">
                {review.name}
              </span>
              <span className="text-muted-foreground/40" aria-hidden>
                ·
              </span>
              <span className="text-xs text-muted-foreground">
                {review.country}{" "}
                <span aria-hidden>{review.flag}</span>
              </span>
            </figcaption>

            <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-md border border-border/50 bg-muted/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              <BadgeCheck className="size-3 text-primary/80" aria-hidden />
              Verified Purchase
            </span>

            <blockquote className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
              &ldquo;{review.text}&rdquo;
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  )
}
