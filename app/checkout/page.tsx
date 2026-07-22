"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { getCartTotal, isValidEmail } from "@/lib/payments/cart"
import { products } from "@/lib/store-data"
import {
  cn,
  focusRingClass,
  inputFieldClass,
  primaryActionClass,
} from "@/lib/utils"

const countries = [
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czechia" },
  { code: "DK", name: "Denmark" },
  { code: "EE", name: "Estonia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "GR", name: "Greece" },
  { code: "HU", name: "Hungary" },
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "LV", name: "Latvia" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MT", name: "Malta" },
  { code: "NL", name: "Netherlands" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "CH", name: "Switzerland" },
  { code: "NO", name: "Norway" },
] as const

const labelClassName =
  "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"

function getProductImage(productId: string): string | undefined {
  return products.find((product) => product.id === productId)?.image
}

export default function CheckoutPage() {
  const { cart } = useCart()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [apartment, setApartment] = useState("")
  const [discordUsername, setDiscordUsername] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const total = getCartTotal(cart)

  function validateClientFields(): string | null {
    if (!fullName.trim()) {
      return "Enter your full name."
    }

    if (!isValidEmail(email)) {
      return "Enter a valid email address."
    }

    if (!country) {
      return "Select a country."
    }

    if (!city.trim()) {
      return "Enter your city."
    }

    if (!postalCode.trim()) {
      return "Enter your postal / ZIP code."
    }

    if (!streetAddress.trim()) {
      return "Enter your street address."
    }

    return null
  }

  async function handleContinueToPayment() {
    if (cart.length === 0) {
      return
    }

    const validationError = validateClientFields()

    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          customer: {
            email: email.trim(),
            ...(discordUsername.trim()
              ? { discordUsername: discordUsername.trim() }
              : {}),
            shipping: {
              fullName: fullName.trim(),
              country,
              city: city.trim(),
              postalCode: postalCode.trim(),
              streetAddress: streetAddress.trim(),
              ...(phone.trim() ? { phone: phone.trim() } : {}),
              ...(apartment.trim() ? { apartment: apartment.trim() } : {}),
            },
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message ?? "Checkout failed. Please try again.")
        return
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl
        return
      }

      setError("No payment redirect was returned.")
    } catch {
      setError("Checkout failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main
      id="main-content"
      className="mx-auto max-w-5xl px-3 py-16 min-[360px]:px-4 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <h1 className="mb-6 font-heading text-[1.625rem] font-bold tracking-tight min-[360px]:text-3xl sm:text-4xl">
        Checkout
      </h1>

      <div className="rounded-2xl border border-border/50 bg-card/20 p-4 min-[360px]:p-5 sm:p-6 lg:p-8">
        <h2 className="mb-5 font-heading text-lg font-semibold tracking-[-0.01em] sm:text-xl">
          Contact & Shipping
        </h2>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="checkout-full-name" className={labelClassName}>
              Full Name
            </label>
            <input
              id="checkout-full-name"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className={inputFieldClass}
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label htmlFor="checkout-email" className={labelClassName}>
              Email Address
            </label>
            <input
              id="checkout-email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputFieldClass}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="checkout-phone" className={labelClassName}>
              Phone Number{" "}
              <span className="normal-case tracking-normal text-muted-foreground/70">
                (optional)
              </span>
            </label>
            <input
              id="checkout-phone"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={inputFieldClass}
              autoComplete="tel"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="checkout-country" className={labelClassName}>
              Country
            </label>
            <select
              id="checkout-country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className={cn(inputFieldClass, !country && "text-muted-foreground")}
              autoComplete="country"
              required
            >
              <option value="" disabled>
                Select country
              </option>
              {countries.map((entry) => (
                <option key={entry.code} value={entry.code}>
                  {entry.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="checkout-city" className={labelClassName}>
              City
            </label>
            <input
              id="checkout-city"
              type="text"
              placeholder="City"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className={inputFieldClass}
              autoComplete="address-level2"
              required
            />
          </div>

          <div>
            <label htmlFor="checkout-postal-code" className={labelClassName}>
              Postal / ZIP Code
            </label>
            <input
              id="checkout-postal-code"
              type="text"
              placeholder="Postal / ZIP Code"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              className={inputFieldClass}
              autoComplete="postal-code"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="checkout-street" className={labelClassName}>
              Street Address
            </label>
            <input
              id="checkout-street"
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(event) => setStreetAddress(event.target.value)}
              className={inputFieldClass}
              autoComplete="street-address"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="checkout-apartment" className={labelClassName}>
              Apartment / Suite{" "}
              <span className="normal-case tracking-normal text-muted-foreground/70">
                (optional)
              </span>
            </label>
            <input
              id="checkout-apartment"
              type="text"
              placeholder="Apartment / Suite"
              value={apartment}
              onChange={(event) => setApartment(event.target.value)}
              className={inputFieldClass}
              autoComplete="address-line2"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="checkout-discord" className={labelClassName}>
              Discord Username{" "}
              <span className="normal-case tracking-normal text-muted-foreground/70">
                (optional)
              </span>
            </label>
            <input
              id="checkout-discord"
              type="text"
              placeholder="Discord Username"
              value={discordUsername}
              onChange={(event) => setDiscordUsername(event.target.value)}
              className={inputFieldClass}
              autoComplete="username"
            />
          </div>
        </div>

        <h2 className="mb-4 font-heading text-lg font-semibold tracking-[-0.01em] sm:text-xl">
          Order Summary
        </h2>

        {cart.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link
              href="/#products"
              className={cn(
                "mt-4 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline",
                focusRingClass
              )}
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3.5">
              {cart.map((item) => {
                const image = getProductImage(item.id)
                const lineTotal = item.price * item.quantity

                return (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-xl border border-border/50 bg-background/40 p-3.5 min-[360px]:gap-3.5 min-[360px]:p-4"
                  >
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

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium leading-snug tracking-[-0.01em] text-foreground break-words">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                          €{item.price.toFixed(2)} each · Qty {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-semibold tabular-nums text-foreground">
                        €{lineTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex justify-between border-t border-border/50 pt-4 font-bold">
              <span>Total</span>
              <span className="tabular-nums">€{total.toFixed(2)}</span>
            </div>

            <p
              role="alert"
              aria-live="polite"
              className={cn(
                "mt-4 text-sm text-destructive",
                !error && "sr-only"
              )}
            >
              {error ?? ""}
            </p>

            <button
              type="button"
              onClick={handleContinueToPayment}
              disabled={isSubmitting}
              className={cn(primaryActionClass, "mt-6 w-full rounded-xl py-3")}
            >
              {isSubmitting ? "Processing..." : "Continue To Payment"}
            </button>
          </>
        )}
      </div>
    </main>
  )
}
