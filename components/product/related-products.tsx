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
      className="mt-12 sm:mt-16"
    >
      <h2
        id="related-products-heading"
        className="font-heading text-[1.625rem] font-semibold tracking-[-0.025em] text-balance text-foreground min-[360px]:text-2xl sm:text-3xl"
      >
        Related Products
      </h2>

      <div className="mt-5 grid gap-4 min-[360px]:gap-5 sm:mt-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
        {related.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  )
}
