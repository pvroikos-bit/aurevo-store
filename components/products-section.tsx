"use client"

import { useMemo, useRef, useState, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/store-data"

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  headingId,
}: {
  eyebrow: string
  title: string
  description: string
  align?: "center" | "left"
  headingId?: string
}) {
  const alignClass =
    align === "center"
      ? "mx-auto max-w-2xl text-center"
      : "max-w-xl text-left"

  return (
    <div className={alignClass}>
      <span className="inline-flex rounded-md border border-border/50 bg-muted/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {eyebrow}
      </span>

      <h2
        id={headingId}
        className="mt-4 font-heading text-[1.625rem] font-semibold tracking-[-0.025em] text-balance text-foreground min-[360px]:text-3xl sm:text-4xl lg:text-[2.625rem] lg:leading-[1.12]"
      >
        {title}
      </h2>

      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base sm:leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured)
  const topSeller = featured.reduce<(typeof featured)[number] | null>(
    (top, product) =>
      !top || product.sales > top.sales ? product : top,
    null
  )

  return (
    <section className="relative" aria-labelledby="featured-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-3 py-16 min-[360px]:px-4 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Featured"
            title="This Week Best Seller 🔥"
            description="Over 500+ purchases this week — verified picks with the highest reseller demand."
            align="left"
            headingId="featured-heading"
          />

          <p className="mt-4 flex flex-col gap-1.5 text-xs text-muted-foreground min-[390px]:flex-row min-[390px]:flex-wrap min-[390px]:items-center min-[390px]:gap-x-4 min-[390px]:gap-y-1">
            <span>Verified suppliers</span>
            <span className="text-muted-foreground/35" aria-hidden>
              ·
            </span>
            <span>Instant access after purchase</span>
            <span className="text-muted-foreground/35" aria-hidden>
              ·
            </span>
            <span>4.9★ average rating</span>
          </p>

          <div className="mt-8 sm:mt-12 lg:mt-14">
            <div className="rounded-2xl border border-border/35 bg-card/15 p-3 min-[360px]:p-4 sm:p-6 lg:p-8">
              <div className="grid gap-4 min-[360px]:gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
                {featured.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    highlighted={topSeller?.id === product.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AllProducts() {
  const [selected, setSelected] = useState("All")
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const categoryOrder = ["Bundles", "Guides", "Tools", "Suppliers"]

  const filters = [
    "All",
    ...categoryOrder.filter((category) =>
      products.some((product) => product.category === category)
    ),
  ]

  const filteredProducts = useMemo(() => {
    if (selected === "All") return products

    return products.filter(
      (product) =>
        product.category.toLowerCase() === selected.toLowerCase()
    )
  }, [selected])

  const focusTab = (index: number) => {
    const tab = tabRefs.current[index]
    tab?.focus()
    setSelected(filters[index])
  }

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const lastIndex = filters.length - 1
    let nextIndex: number | null = null

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = index === lastIndex ? 0 : index + 1
        break
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = index === 0 ? lastIndex : index - 1
        break
      case "Home":
        nextIndex = 0
        break
      case "End":
        nextIndex = lastIndex
        break
      default:
        return
    }

    event.preventDefault()
    focusTab(nextIndex)
  }

  return (
    <section id="products" className="relative" aria-labelledby="catalog-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-3 pb-16 min-[360px]:px-4 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32">
        <div className="pt-12 sm:pt-20 lg:pt-24">
          <SectionHeader
            eyebrow="Catalog"
            title="The Full Catalog"
            description="Browse verified vendors, premium tools and digital resources — every listing includes instant delivery."
            headingId="catalog-heading"
          />

          <div
            className="mx-auto -mx-3 mt-8 flex max-w-4xl gap-1.5 overflow-x-auto overscroll-x-contain rounded-full border border-border/40 bg-muted/15 p-1.5 min-[360px]:-mx-0 min-[360px]:mt-10 min-[360px]:flex-wrap min-[360px]:justify-center sm:mt-12 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
            role="tablist"
            aria-label="Product categories"
          >
            {filters.map((category, index) => {
              const isActive = selected === category
              const label =
                category === "Suppliers" ? "Products" : category
              const count =
                category !== "All"
                  ? products.filter((p) => p.category === category).length
                  : null

              return (
                <Button
                  key={category}
                  ref={(element) => {
                    tabRefs.current[index] = element
                  }}
                  type="button"
                  role="tab"
                  id={`catalog-tab-${category.toLowerCase()}`}
                  aria-selected={isActive}
                  aria-controls="catalog-product-grid"
                  tabIndex={isActive ? 0 : -1}
                  variant={isActive ? "default" : "ghost"}
                  className={`h-11 min-h-11 shrink-0 rounded-full px-4 text-[13px] font-medium sm:h-10 sm:min-h-0 sm:px-5 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-none"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setSelected(category)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  {label}
                  {count !== null && (
                    <span
                      className={`ml-1.5 rounded-full px-1.5 py-px text-[10px] font-medium tabular-nums ${
                        isActive
                          ? "bg-primary-foreground/15 text-primary-foreground"
                          : "bg-border/40 text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </Button>
              )
            })}
          </div>

          <div
            id="catalog-product-grid"
            role="tabpanel"
            aria-labelledby={`catalog-tab-${selected.toLowerCase()}`}
            className="mt-10 grid gap-4 min-[360px]:gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-7"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
