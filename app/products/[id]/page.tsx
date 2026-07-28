import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Check,
  Infinity as InfinityIcon,
  Star,
  TrendingUp,
} from "lucide-react"
import { products, getProductWhatsIncluded } from "@/lib/store-data"
import { ViewItemTracker } from "@/components/analytics/view-item-tracker"
import { BuyNowButton } from "@/components/buy-now-button"
import { CustomerReviews } from "@/components/product/customer-reviews"
import { ProductFaq } from "@/components/product/product-faq"
import { RelatedProducts } from "@/components/product/related-products"
import { TrustBadges } from "@/components/product/trust-badges"
import { WhatsIncluded } from "@/components/product/whats-included"
import { JsonLd } from "@/components/seo/json-ld"
import { absoluteUrl, createPageMetadata } from "@/lib/seo"
import { formatInteger } from "@/lib/utils"

type ProductPageProps = {
  params: Promise<{ id: string }>
}

function badgeStyles(badge: string) {
  switch (badge) {
    case "Best Value":
      return "border-primary/40 bg-primary/15 text-primary"
    case "Popular":
      return "border-border/60 bg-muted/30 text-foreground/85"
    case "New":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
    case "Limited":
      return "border-amber-500/30 bg-amber-500/10 text-amber-400"
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

  const includedPreview = getProductWhatsIncluded(product).slice(0, 4)

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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: absoluteUrl("/#products"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: absoluteUrl(`/products/${product.id}`),
      },
    ],
  }

  return (
    <>
      <JsonLd data={[productSchema, breadcrumbSchema]} />
      <ViewItemTracker
        id={product.id}
        name={product.name}
        price={product.price}
      />

      <main
        id="main-content"
        className="relative mx-auto max-w-6xl px-3 py-10 min-[360px]:px-4 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,oklch(0.62_0.19_256/0.12),transparent_70%)]"
        />

        <Link
          href="/#products"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground sm:mb-8 sm:text-sm"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Back to catalog
        </Link>

        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-10 lg:gap-14">
          <div className="md:sticky md:top-6">
            <div className="group relative aspect-square w-full overflow-hidden rounded-3xl border border-border/40 bg-muted/15 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"
              />
              {product.badge ? (
                <span
                  className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] backdrop-blur-sm sm:left-5 sm:top-5 sm:text-[11px] ${badgeStyles(product.badge)}`}
                >
                  {product.badge}
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border/40 bg-muted/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {product.category}
              </span>
              {product.badge ? (
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] sm:text-[11px] ${badgeStyles(product.badge)}`}
                >
                  {product.badge}
                </span>
              ) : null}
            </div>

            <h1 className="mt-3 font-heading text-[1.875rem] font-bold leading-[1.1] tracking-[-0.03em] text-balance min-[360px]:text-[2.125rem] sm:mt-4 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-medium text-foreground">
                <Star
                  className="size-3.5 fill-primary text-primary"
                  aria-hidden
                />
                <span className="tabular-nums">{product.rating}.0</span>
              </span>
              {product.sales > 0 ? (
                <span className="inline-flex items-center gap-1">
                  <TrendingUp className="size-3.5" aria-hidden />
                  <span className="tabular-nums">
                    {formatInteger(product.sales)}+ sold
                  </span>
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1 text-muted-foreground/80">
                {product.stock === "Unlimited" ? (
                  <InfinityIcon className="size-3.5" aria-hidden />
                ) : null}
                {product.stock}
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground text-pretty sm:mt-6 sm:text-base sm:leading-relaxed">
              {product.description}
            </p>

            {/* Value highlights before price — conversion-critical order */}
            <div className="mt-6 rounded-2xl border border-border/40 bg-card/15 p-4 sm:mt-7 sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/90">
                What you get
              </p>
              <ul className="mt-3 space-y-2.5">
                {includedPreview.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-snug text-foreground/90"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10">
                      <Check className="size-3 text-primary" aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3.5 sm:mt-6">
              <div className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-primary text-primary"
                  />
                ))}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Highly rated by buyers
                </p>
                <p className="text-xs text-muted-foreground">
                  Instant delivery · Secure Stripe checkout
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border/40 bg-background/30 p-4 sm:mt-7 sm:p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    One-time payment
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="font-heading text-3xl font-bold tracking-tight tabular-nums text-foreground sm:text-4xl">
                      €{product.price.toFixed(2)}
                    </span>
                    {product.oldPrice ? (
                      <span className="text-base tabular-nums text-muted-foreground/65 line-through sm:text-lg">
                        €{product.oldPrice.toFixed(2)}
                      </span>
                    ) : null}
                  </div>
                  {savings !== null && savings > 0 ? (
                    <span className="mt-2 inline-flex rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      Save {savings}% today
                    </span>
                  ) : null}
                </div>
                <p className="text-right text-[11px] leading-snug text-muted-foreground sm:text-xs">
                  Instant digital delivery
                  <br />
                  Lifetime updates included
                </p>
              </div>
            </div>

            <BuyNowButton
              id={product.id}
              name={product.name}
              price={product.price}
            />

            <p className="mt-3 text-center text-[11px] text-muted-foreground sm:text-xs">
              Secure Stripe checkout · No subscription · Cancel anytime before payment
            </p>

            <TrustBadges />
          </div>
        </div>

        <WhatsIncluded product={product} />

        <CustomerReviews />

        <ProductFaq />

        <RelatedProducts product={product} />
      </main>
    </>
  )
}
