import { ProductCard } from "@/components/product-card"
import { getRelatedProducts, type Product } from "@/lib/store-data"

type RelatedProductsProps = {
  product: Product
}

export function RelatedProducts({ product }: RelatedProductsProps) {
  const related = getRelatedProducts(product)

  if (related.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby="related-products-heading"
      className="mt-14 border-t border-border/40 pt-14 sm:mt-16 sm:pt-16 lg:mt-20 lg:pt-20"
    >
      <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/90">
        Keep browsing
      </span>

      <h2
        id="related-products-heading"
        className="mt-3 font-heading text-[1.75rem] font-bold tracking-[-0.03em] text-balance text-foreground min-[360px]:text-2xl sm:text-3xl"
      >
        Related Products
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Complementary picks trusted by the same resellers.
      </p>

      <div className="mt-6 grid gap-4 min-[360px]:gap-5 sm:mt-7 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
        {related.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  )
}
