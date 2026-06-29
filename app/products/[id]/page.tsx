import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { products } from "@/lib/store-data"
import { BuyNowButton } from "@/components/buy-now-button"
import { JsonLd } from "@/components/seo/json-ld"
import { absoluteUrl, createPageMetadata } from "@/lib/seo"

type ProductPageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = products.find((item) => item.id === id)

  if (!product) {
    return createPageMetadata({
      title: "Product Not Found",
      description: "The requested product could not be found on SkroojMoney.",
      path: `/products/${id}`,
      noIndex: true,
    })
  }

  return createPageMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${product.id}`,
    ogImage: product.image,
    type: "website",
  })
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  const product = products.find((item) => item.id === id)

  if (!product) {
    notFound()
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [absoluteUrl(product.image)],
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "SkroojMoney",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.sales,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.id}`),
      priceCurrency: "EUR",
      price: product.price.toFixed(2),
      availability:
        product.stock === "Unlimited" || product.stock === "In Stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/LimitedAvailability",
      itemCondition: "https://schema.org/NewCondition",
    },
  }

  return (
    <>
      <JsonLd data={productSchema} />

      <main id="main-content" className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            {product.badge && (
              <span className="inline-block rounded-full bg-blue-500 px-3 py-1 text-sm text-white">
                {product.badge}
              </span>
            )}

            <h1 className="mt-4 text-5xl font-bold">
              {product.name}
            </h1>

            <p className="mt-4 text-lg opacity-80">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-4xl font-bold tabular-nums">
                €{product.price.toFixed(2)}
              </span>

              {product.oldPrice && (
                <span className="text-xl tabular-nums line-through opacity-60">
                  €{product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            <ul className="mt-6 space-y-3" aria-label="Product highlights">
              <li>✅ Verified supplier contact</li>
              <li>🌍 Fast international shipping</li>
              <li>💰 High profit margins</li>
              <li>⚡ Beginner-friendly setup</li>
              <li>🚀 Instant digital delivery</li>
            </ul>

            <div className="mt-8 rounded-xl border border-border p-4">
              <p className="font-semibold">
                ⭐⭐⭐⭐⭐ 4.9/5 Rating
              </p>

              <p className="mt-2 text-sm opacity-80">
                Trusted by 18,000+ resellers worldwide.
              </p>
            </div>

            <BuyNowButton
              id={product.id}
              name={product.name}
              price={product.price}
            />
          </div>
        </div>
      </main>
    </>
  )
}
