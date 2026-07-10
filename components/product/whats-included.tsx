import { Check } from "lucide-react"
import { getProductWhatsIncluded, type Product } from "@/lib/store-data"

type WhatsIncludedProps = {
  product: Product
}

export function WhatsIncluded({ product }: WhatsIncludedProps) {
  const items = getProductWhatsIncluded(product)

  return (
    <section
      aria-labelledby="whats-included-heading"
      className="mt-12 rounded-2xl border border-border/50 bg-card/20 p-5 sm:mt-16 sm:p-6 lg:p-8"
    >
      <span className="inline-flex rounded-md border border-border/50 bg-muted/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Deliverables
      </span>

      <h2
        id="whats-included-heading"
        className="mt-3 font-heading text-base font-semibold tracking-[-0.01em] text-foreground sm:text-lg"
      >
        What&apos;s Included
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Everything you receive instantly after purchase.
      </p>

      <ul className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85"
          >
            <Check
              className="mt-0.5 size-4 shrink-0 text-primary/80"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
