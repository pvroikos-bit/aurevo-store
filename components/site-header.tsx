"use client"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { Menu, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Resources", href: "#features" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
]

export function SiteHeader() {
const [open, setOpen] = useState(false)
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
  const [cartOpen, setCartOpen] = useState(false)
  const cartCount = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
)
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
      <button
        key={link.href}
        onClick={() =>
          document
            .getElementById(link.href.replace("#", ""))
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        {link.label}
      </button>
    ))}
  </nav>

  <div className="hidden items-center gap-3 md:flex">

    {cartOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-40"
    onClick={() => setCartOpen(false)}
  />
)}

{cartOpen && (
  <div className="fixed right-0 top-0 h-screen w-[420px] bg-card border-l border-border p-8 z-50 shadow-2xl">

    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-xl font-bold">
        Shopping Cart
      </h3>

      <button
        onClick={() => setCartOpen(false)}
        className="text-2xl"
      >
        ×
      </button>
    </div>

    {cart.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      <>
        {cart.map((item) => (
          <div
            key={item.id}
            className="mb-4 rounded-lg border border-border p-3"
          >
            <div className="flex items-center justify-between">
              <div>
  <p className="font-medium">
    {item.name}
  </p>

  <div className="mt-2 flex items-center gap-2">
    <button
      onClick={() => decreaseQuantity(item.id)}
      className="h-7 w-7 rounded border"
    >
      -
    </button>

    <span>{item.quantity}</span>

    <button
      onClick={() => increaseQuantity(item.id)}
      className="h-7 w-7 rounded border"
    >
      +
    </button>
  </div>
</div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-500"
              >
                Remove
              </button>
            </div>

            <div className="mt-2 text-sm text-muted-foreground">
  €{(item.price * item.quantity).toFixed(2)}
</div>
          </div>
        ))}

        <div className="mt-6 flex justify-between font-semibold">
          <span>Total:</span>
          <span>€{total.toFixed(2)}</span>
        </div>

        <Button
          className="mt-6 w-full h-12 rounded-xl font-semibold"
          onClick={() => (window.location.href = "/checkout")}
        >
          Checkout
        </Button>
      </>
    )}
  </div>
)}
    <Button
      className="h-10 gap-2 px-5 rounded-full"
      onClick={() => setCartOpen(!cartOpen)}
    >
      <ShoppingBag className="size-4" />
      Cart ({cartCount})
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
    </nav>
  </div>
)}
  </header>
  )
}
