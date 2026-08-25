import Link from "next/link"
import Image from "next/image"
import { CookiePreferencesButton } from "@/components/cookie-preferences-button"
import { env } from "@/lib/env"
import { siteConfig } from "@/lib/seo"
import { cn, focusRingClass } from "@/lib/utils"

const linkClassName = cn(
  "flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground",
  focusRingClass
)

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-3 py-12 min-[360px]:px-4 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-8 min-[360px]:gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className={cn("flex items-center gap-2", focusRingClass)}>
              <Image
                src="/LOGO777.png"
                alt="SkroojMoney"
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-lg"
              />

              <span className="font-heading text-lg font-bold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Verified supplier lists, private agents, digital tools, and premium
              resources for serious resellers — with instant digital delivery.
            </p>

            <div className="mt-5 flex flex-wrap gap-4 min-[360px]:mt-6">
              <a
                href={env.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                Telegram Community
              </a>

              <a
                href={env.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                TikTok
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Shop</h4>

            <ul className="mt-3 space-y-1 min-[360px]:mt-4 min-[360px]:space-y-0">
              <li>
                <Link href="/#products" className={linkClassName}>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/#products" className={linkClassName}>
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className={linkClassName}>
                  All-In-One Pack
                </Link>
              </li>
              <li>
                <Link href="/#featured" className={linkClassName}>
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>

            <ul className="mt-3 space-y-1 min-[360px]:mt-4 min-[360px]:space-y-0">
              <li>
                <Link href="/#features" className={linkClassName}>
                  Why SkroojMoney
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className={linkClassName}>
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/faq" className={linkClassName}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClassName}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-sm font-semibold text-foreground">Support</h4>

            <ul className="mt-3 space-y-1 min-[360px]:mt-4 min-[360px]:space-y-0">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={`${linkClassName} break-all`}
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <Link href="/faq" className={linkClassName}>
                  Delivery Help
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClassName}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className={linkClassName}>
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={linkClassName}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <CookiePreferencesButton className="break-all" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 min-[360px]:mt-12 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © {year} {siteConfig.name}. All rights reserved. Secure checkout by
            Stripe.
          </p>

          <div className="flex flex-col items-center gap-3 text-xs text-muted-foreground min-[360px]:flex-row min-[360px]:gap-6">
            <Link href="/terms" className={linkClassName}>
              Terms
            </Link>
            <Link href="/privacy" className={linkClassName}>
              Privacy
            </Link>
            <Link href="/refund-policy" className={linkClassName}>
              Refunds
            </Link>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  )
}
