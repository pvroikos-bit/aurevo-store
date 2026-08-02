import { PageShell } from "@/components/page-shell"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { FeaturedProducts, AllProducts } from "@/components/products-section"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { CtaSection } from "@/components/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { env } from "@/lib/env"
import { createPageMetadata, siteConfig, absoluteUrl } from "@/lib/seo"
import { products } from "@/lib/store-data"

export const metadata = createPageMetadata({
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  path: "/",
  absoluteTitle: true,
})

export default function Page() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/LOGO777.png"),
    email: siteConfig.email,
    sameAs: [env.social.discord, env.social.tiktok].filter(Boolean),
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.defaultDescription,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SkroojMoney Product Catalog",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/products/${product.id}`),
      name: product.name,
    })),
  }

  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema, itemListSchema]} />

      <PageShell
        announcement={
          <div className="border-b border-primary/20 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground">
            <p className="mx-auto max-w-7xl px-3 py-2.5 text-center text-[10px] font-semibold leading-snug tracking-wide text-balance min-[360px]:text-xs sm:px-4 sm:py-2.5 sm:text-sm">
              Limited launch pricing — All-In-One Pack from €49.99 · Instant access
              after checkout
            </p>
          </div>
        }
      >
        <main id="main-content">
          <Hero />
          <TrustBar />
          <FeaturedProducts />
          <AllProducts />
          <Features />
          <Testimonials />
          <Pricing />
          <CtaSection />
        </main>
      </PageShell>
    </>
  )
}
