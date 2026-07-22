"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Minus, Plus, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { products } from "@/lib/store-data"
import { scrollToSection as scrollToId } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Resources", href: "#features" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
]

function getProductImage(productId: string): string | undefined {
  return products.find((product) => product.id === productId)?.image
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const handleNavClick = (href: string) => {
    scrollToId(href.replace("#", ""))
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/85 supports-[backdrop-filter]:bg-background/70 supports-[backdrop-filter]:backdrop-blur-md">
      {cartOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={() => setCartOpen(false)}
            aria-hidden
          />

          <div
            className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-[420px] flex-col border-l border-border/50 bg-card shadow-[-24px_0_64px_-12px_oklch(0_0_0/0.45)]"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-4 min-[360px]:px-6 min-[360px]:py-5 sm:px-8">
              <div>
                <h3 className="font-heading text-lg font-bold tracking-tight sm:text-xl">
                  Shopping Cart
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="flex size-11 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:size-9"
                aria-label="Close cart"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 min-[360px]:px-6 min-[360px]:py-5 sm:px-8">
              {cart.length === 0 ? (
                <div className="flex min-h-[12rem] flex-col items-center justify-center text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-border/50 bg-muted/30">
                    <ShoppingBag className="size-6 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-foreground">
                    Your cart is empty
                  </p>
                  <Link
                    href="/#products"
                    className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Browse products
                  </Link>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {cart.map((item) => {
                    const image = getProductImage(item.id)
                    const lineTotal = item.price * item.quantity

                    return (
                      <div
                        key={item.id}
                        className="rounded-xl border border-border/50 bg-background/40 p-3.5 min-[360px]:p-4"
                      >
                        <div className="flex gap-3 min-[360px]:gap-3.5">
                          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-border/40 bg-muted/20 min-[360px]:size-[4.5rem] sm:size-20">
                            {image ? (
                              <Image
                                src={image}
                                alt=""
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            ) : (
                              <div
                                className="flex size-full items-center justify-center"
                                aria-hidden
                              >
                                <ShoppingBag className="size-5 text-muted-foreground/60" />
                              </div>
                            )}
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="text-sm font-medium leading-snug tracking-[-0.01em] text-foreground break-words">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                                  €{item.price.toFixed(2)} each
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="flex min-h-9 shrink-0 items-center rounded-md px-1.5 text-xs font-medium text-red-400/90 transition-colors duration-200 hover:text-red-400 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                aria-label={`Remove ${item.name} from cart`}
                              >
                                Remove
                              </button>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                              <div className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/50 p-0.5">
                                <button
                                  type="button"
                                  onClick={() => decreaseQuantity(item.id)}
                                  className="flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 md:size-7"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="size-3.5" />
                                </button>

                                <span className="min-w-6 text-center text-sm font-medium tabular-nums">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => increaseQuantity(item.id)}
                                  className="flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 md:size-7"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="size-3.5" />
                                </button>
                              </div>

                              <p className="text-sm font-semibold tabular-nums text-foreground">
                                €{lineTotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="shrink-0 border-t border-border/50 px-4 py-4 min-[360px]:px-6 min-[360px]:py-5 sm:px-8">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-heading text-2xl font-bold tracking-tight tabular-nums">
                    €{total.toFixed(2)}
                  </span>
                </div>

                <Button
                  className="mt-4 min-h-11 h-11 w-full rounded-full text-sm font-semibold shadow-[0_8px_28px_-8px_oklch(0.62_0.19_256/0.55)] sm:mt-5 sm:h-12"
                  onClick={() => (window.location.href = "/checkout")}
                >
                  Checkout
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-2 px-3 min-[360px]:px-4 sm:h-[4.5rem] sm:gap-0 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="flex min-w-0 items-center gap-2 transition-opacity duration-300 hover:opacity-90 min-[360px]:gap-2.5"
        >
          <Image
            src="/LOGO777.png"
            alt="SkroojMoney"
            width={36}
            height={36}
            priority
            className="size-9 shrink-0 rounded-lg"
          />
          <span className="truncate font-heading text-base font-bold tracking-[-0.02em] min-[360px]:text-lg">
            Skroojmoney
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="group relative rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            >
              {link.label}
              <span className="absolute inset-x-3.5 bottom-1.5 h-px origin-left scale-x-0 bg-primary/70 transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none motion-reduce:transform-none" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            className="h-11 min-h-11 gap-1.5 rounded-full px-3 text-sm font-medium min-[360px]:gap-2 min-[360px]:px-4 md:h-10 md:min-h-0 md:min-w-[7.5rem] md:px-5"
            onClick={() => setCartOpen(!cartOpen)}
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <ShoppingBag className="size-4 shrink-0" />
            <span className="hidden min-[360px]:inline md:inline">
              Cart ({cartCount})
            </span>
            <span className="inline min-[360px]:hidden md:hidden tabular-nums">
              ({cartCount})
            </span>
          </Button>

          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border/50 text-foreground transition-colors duration-300 hover:border-border hover:bg-card/50 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="flex flex-col gap-1 px-3 py-3 min-[360px]:px-4 min-[360px]:py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-xl px-4 text-sm font-medium tracking-wide text-muted-foreground transition-colors duration-300 hover:bg-card/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
