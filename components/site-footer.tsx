import Image from "next/image"

const columns = [
  {
    title: "Products",
    links: ["All Products", "Guides & Ebooks", "Mentorship", "Bundles"],
  },
  {
    title: "Company",
    links: ["Verified Suppliers", "Success Stories", "Contact", "Refund Policy", "FAQ"],
  },
  {
    title: "Support",
    links: ["Email Support", "Delivery Info", "Refund Policy", "Terms of Service", "FAQ"],
  },
]

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
              Verified supplier lists, private agents, digital tools and premium resources for serious resellers.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 SkroojMoney. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
