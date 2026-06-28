"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/store-data"

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured)

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Featured
          </span>

          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            This Week Best Seller 🔥
          </h2>

          <p className="mt-3 max-w-lg text-muted-foreground">
            Over 500+ Purchases This Week To These Products...
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function AllProducts() {
  const [selected, setSelected] = useState("All")

  const categoryOrder = [
  "Bundles",
  "Guides",
  "Tools",
  "Suppliers",
]

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

  return (
    <section id="products" className="relative">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="border-t border-border/60 pt-16">

          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              The Full Catalog
            </h2>

            <p className="mt-3 text-muted-foreground">
              Browse verified vendors, premium tools and digital resources.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {filters.map((category) => (
              <Button
                key={category}
                variant={selected === category ? "default" : "outline"}
                className="rounded-full px-6 transition-all duration-300"
                onClick={() => setSelected(category)}
              >
                {category === "Suppliers" ? "Products" : category}

                {category !== "All" && (
                  <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-xs">
                    {products.filter((p) => p.category === category).length}
                  </span>
                )}
              </Button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}