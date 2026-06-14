"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, ShoppingBag, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Resources", href: "#features" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
<a href="#home" className="flex items-center gap-2">
    <Image
      src="/LOGO777.png"
      alt="SkroojMoney"
      width={34}
      height={34}
      className="rounded-lg"
    />

    <span className="font-heading text-lg font-bold tracking-tight">
      Skroojmoney
    </span>
  </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="h-9 px-3 text-sm">
           
          </Button>
          <Button className="h-9 gap-2 px-4 text-sm">
            <ShoppingBag className="size-4" />
            Cart
          </Button>
        </div>

        <button
          className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Button className="mt-2 h-10 gap-2">
              <ShoppingBag className="size-4" />
              View Cart
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
