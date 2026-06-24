import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2">
              <img
                src="/LOGO777.png"
                alt="SkroojMoney"
                className="h-10 w-10 rounded-lg"
              />

              <span className="font-heading text-lg font-bold tracking-tight">
                SkroojMoney
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Verified supplier lists, private agents, digital tools and
              premium resources for serious resellers.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="https://discord.gg/kAbCfrZ6rA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Discord
              </a>

              <a
                href="https://www.tiktok.com/@skroojmoneyy?_r=1&_t=ZN-97S73YDVv1S"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Products
            </h4>

            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="#products"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  All Products
                </a>
              </li>

              <li>
                <a
                  href="#products"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Guides & Ebooks
                </a>
              </li>

              <li>
                <a
                  href="#products"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Supplier Lists
                </a>
              </li>

              <li>
                <a
                  href="#pricing"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Bundles
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Company
            </h4>

            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="#products"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Verified Suppliers
                </a>
              </li>

              <li>
                <a
                  href="#products"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Private Agents
                </a>
              </li>

              <li>
                <a
                  href="#reviews"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Success Stories
                </a>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Support
            </h4>

            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:support@skroojmoney.com"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  support@skroojmoney.com
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Instant Delivery
                </a>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  href="/refund-policy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 SkroojMoney. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>

            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>

            <Link
              href="/refund-policy"
              className="transition-colors hover:text-foreground"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}