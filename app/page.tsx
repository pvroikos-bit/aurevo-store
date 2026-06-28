import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { FeaturedProducts, AllProducts } from "@/components/products-section"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-xs font-medium sm:text-sm">
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
  )
}