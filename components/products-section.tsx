"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import {
  homeSectionClass,
  homeSectionDividerClass,
  homeSectionPaddingClass,
  SectionHeader,
} from "@/components/section-header"
import { products } from "@/lib/store-data"

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured)
  const topSeller = featured.reduce<(typeof featured)[number] | null>(
    (top, product) =>
      !top || product.sales > top.sales ? product : top,
    null
  )

  return (
    <section className="relative" id="featured" aria-labelledby="featured-heading">
      <div aria-hidden className={homeSectionDividerClass} />

      <div className={`${homeSectionClass} ${homeSectionPaddingClass}`}>
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Featured"
            title="This Week's Best Sellers"
            description="Hand-picked products with the highest reseller demand — verified suppliers, instant access, and proven margins."
            align="left"
            headingId="featured-heading"
          />

          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-sm">
            <li className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              Verified suppliers
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              Instant access after purchase
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              4.9★ average rating
            </li>
          </ul>

          <div className="mt-8 sm:mt-10 lg:mt-12">
            <div className="rounded-3xl border border-border/40 bg-gradient-to-b from-card/25 to-card/10 p-3 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)] min-[360px]:p-4 sm:p-6 lg:p-8">
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

  const filteredProducts =
    selected === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === selected.toLowerCase()
        )

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
      <div aria-hidden className={homeSectionDividerClass} />

      <div className={`${homeSectionClass} pb-16 sm:pb-24 lg:pb-28`}>
        <div className="pt-4 sm:pt-8">
          <SectionHeader
            eyebrow="Catalog"
            title="Browse the Full Catalog"
            description="Verified vendors, premium tools, and digital resources — every listing includes instant delivery."
            headingId="catalog-heading"
          />

          <div
            className="mx-auto mt-8 flex w-full max-w-4xl gap-1.5 overflow-x-auto overscroll-x-contain rounded-full border border-border/40 bg-muted/10 p-1.5 min-[360px]:mt-10 min-[360px]:flex-wrap min-[360px]:justify-center sm:mt-12 [&::-webkit-scrollbar]:hidden"
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
                  className={`h-11 min-h-11 shrink-0 rounded-full px-4 text-[13px] font-semibold sm:h-10 sm:min-h-0 sm:px-5 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_8px_24px_-12px_oklch(0.62_0.19_256/0.55)]"
                      : "text-muted-foreground hover:text-foreground"
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
            className="mt-10 grid gap-4 min-[360px]:gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-4 lg:gap-7"
          >
            {filteredProducts.length === 0 ? (
              <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
                No products in this category yet.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
