import { ArrowRight } from "lucide-react"
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
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Hand-picked to get you started
          </h2>
          <p className="mt-3 max-w-lg text-pretty text-muted-foreground">
            Our most popular products, chosen by thousands of resellers to launch and scale fast.
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
  return (
    <section id="products" className="relative">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end justify-between gap-4 border-t border-border/60 pt-16 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              The full catalog
            </h2>
            <p className="mt-2 text-muted-foreground">
              Verified suppliers, tools, and resources — all instantly delivered.
            </p>
          </div>
          <Button variant="outline" className="h-10 gap-2 px-4 text-sm">
            View all categories
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
