import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { FeaturedProducts, AllProducts } from "@/components/products-section"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { JsonLd } from "@/components/seo/json-ld"
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
    logo: absoluteUrl("/apple-icon.png"),
    email: siteConfig.email,
    sameAs: [
      "https://discord.gg/kAbCfrZ6rA",
      "https://www.tiktok.com/@skroojmoneyy",
    ],
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

      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground">
          <p className="mx-auto max-w-7xl px-3 py-2.5 text-center text-[10px] font-medium leading-snug text-balance min-[360px]:text-xs sm:px-4 sm:py-2 sm:text-sm">
            🔥 Access 500+ Verified Suppliers & Winning Products
          </p>
        </div>

        <SiteHeader />

        <main>
          <Hero />
          <TrustBar />
          <FeaturedProducts />
          <AllProducts />
          <Features />
          <Testimonials />
          <Pricing />
          <CtaSection />
        </main>

        <SiteFooter />
      </div>
    </>
  )
}
