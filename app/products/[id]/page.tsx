import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { products } from "@/lib/store-data"
import { BuyNowButton } from "@/components/buy-now-button"
import { WhatsIncluded } from "@/components/product/whats-included"
import { JsonLd } from "@/components/seo/json-ld"
import { absoluteUrl, createPageMetadata } from "@/lib/seo"

type ProductPageProps = {
  params: Promise<{ id: string }>
}

function badgeStyles(badge: string) {
  switch (badge) {
    case "Best Value":
      return "border-primary/35 bg-primary/10 text-primary"
    case "Popular":
      return "border-border/60 bg-muted/30 text-foreground/80"
    case "New":
      return "border-border/60 bg-background/90 text-foreground/75"
    case "Limited":
      return "border-border/55 bg-muted/25 text-muted-foreground"
    default:
      return "border-border/50 bg-background/90 text-foreground/75"
  }
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

  const savings =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : null

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

      <main
        id="main-content"
        className="mx-auto max-w-5xl px-3 py-16 min-[360px]:px-4 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/20">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/80 sm:text-[11px]">
                {product.category}
              </span>
              {product.badge && (
                <span
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] sm:text-[11px] ${badgeStyles(product.badge)}`}
                >
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="mt-3 font-heading text-[1.75rem] font-semibold leading-snug tracking-[-0.025em] text-balance min-[360px]:text-3xl sm:mt-4 sm:text-4xl lg:text-[2.625rem] lg:leading-[1.12]">
              {product.name}
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty sm:mt-5 sm:text-base sm:leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6 sm:mt-8">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-heading text-3xl font-bold tracking-tight tabular-nums text-foreground sm:text-4xl">
                  €{product.price.toFixed(2)}
                </span>

                {product.oldPrice && (
                  <span className="text-base tabular-nums text-muted-foreground/70 line-through sm:text-lg">
                    €{product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {savings !== null && savings > 0 && (
                <p className="mt-1.5 text-[11px] font-medium text-primary/90 sm:text-xs">
                  Save {savings}% today
                </p>
              )}

              <p className="mt-2 text-[11px] text-muted-foreground/70 sm:text-xs">
                {product.stock}
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-border/50 bg-card/20 p-5 sm:mt-10 sm:p-6">
              <p className="font-heading text-base font-semibold tracking-[-0.01em] text-foreground sm:text-lg">
                ⭐⭐⭐⭐⭐ 4.9/5 Rating
              </p>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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

        <WhatsIncluded product={product} />
      </main>
    </>
  )
}
