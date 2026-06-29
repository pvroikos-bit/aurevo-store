import Link from "next/link"

const linkClassName =
  "flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-3 py-12 min-[360px]:px-4 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-8 min-[360px]:gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <a href="/" className="flex items-center gap-2">
              <img
                src="/LOGO777.png"
                alt="SkroojMoney"
                className="h-10 w-10 shrink-0 rounded-lg"
              />

              <span className="font-heading text-lg font-bold tracking-tight">
                SkroojMoney
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Verified supplier lists, private agents, digital tools and
              premium resources for serious resellers.
            </p>

            <div className="mt-5 flex flex-wrap gap-4 min-[360px]:mt-6">
              <a
                href="https://discord.gg/kAbCfrZ6rA"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                Discord
              </a>

              <a
                href="https://www.tiktok.com/@skroojmoneyy?_r=1&_t=ZN-97S73YDVv1S"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                TikTok
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Products</h4>

            <ul className="mt-3 space-y-1 min-[360px]:mt-4 min-[360px]:space-y-0">
              <li>
                <a href="#products" className={linkClassName}>
                  All Products
                </a>
              </li>
              <li>
                <a href="#products" className={linkClassName}>
                  Guides & Ebooks
                </a>
              </li>
              <li>
                <a href="#products" className={linkClassName}>
                  Supplier Lists
                </a>
              </li>
              <li>
                <a href="#pricing" className={linkClassName}>
                  Bundles
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>

            <ul className="mt-3 space-y-1 min-[360px]:mt-4 min-[360px]:space-y-0">
              <li>
                <a href="#products" className={linkClassName}>
                  Verified Suppliers
                </a>
              </li>
              <li>
                <a href="#products" className={linkClassName}>
                  Private Agents
                </a>
              </li>
              <li>
                <a href="#reviews" className={linkClassName}>
                  Success Stories
                </a>
              </li>
              <li>
                <Link href="/faq" className={linkClassName}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-sm font-semibold text-foreground">Support</h4>

            <ul className="mt-3 space-y-1 min-[360px]:mt-4 min-[360px]:space-y-0">
              <li>
                <a
                  href="mailto:support@skroojmoney.com"
                  className={`${linkClassName} break-all`}
                >
                  support@skroojmoney.com
                </a>
              </li>
              <li>
                <a href="#" className={linkClassName}>
                  Instant Delivery
                </a>
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
                <Link href="/contact" className={linkClassName}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 min-[360px]:mt-12 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © 2026 SkroojMoney. All rights reserved.
          </p>

          <div className="flex flex-col items-center gap-3 text-xs text-muted-foreground min-[360px]:flex-row min-[360px]:gap-6">
            <Link
              href="/terms"
              className="flex min-h-11 items-center transition-colors hover:text-foreground sm:min-h-0"
            >
              Terms of Service
            </Link>

            <Link
              href="/privacy"
              className="flex min-h-11 items-center transition-colors hover:text-foreground sm:min-h-0"
            >
              Privacy Policy
            </Link>

            <Link
              href="/refund-policy"
              className="flex min-h-11 items-center transition-colors hover:text-foreground sm:min-h-0"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
