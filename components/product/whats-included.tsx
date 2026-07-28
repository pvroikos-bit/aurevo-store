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
      className="mt-14 rounded-3xl border border-border/40 bg-gradient-to-b from-card/25 to-card/10 p-5 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)] sm:mt-16 sm:p-7 lg:mt-20 lg:p-8"
    >
      <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/90">
        Deliverables
      </span>

      <h2
        id="whats-included-heading"
        className="mt-3 font-heading text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl"
      >
        What&apos;s Included
      </h2>

      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Everything you receive instantly after purchase — no waiting, no extras
        required.
      </p>

      <ul className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-3.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl border border-border/35 bg-background/25 px-3.5 py-3 text-sm leading-relaxed text-foreground/90 transition-[border-color,background-color] duration-200 hover:border-primary/20 hover:bg-card/20 motion-reduce:transition-none"
          >
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10">
              <Check className="size-3 text-primary" aria-hidden />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
