#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")

function loadEnvFile(filename) {
  const filePath = path.join(root, filename)
  if (!fs.existsSync(filePath)) {
    return
  }

  const lines = fs.readFileSync(filePath, "utf8").split("\n")
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) {
      continue
    }

    const separator = trimmed.indexOf("=")
    if (separator === -1) {
      continue
    }

    const key = trimmed.slice(0, separator).trim()
    const value = trimmed.slice(separator + 1).trim()

    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

loadEnvFile(".env.local")
loadEnvFile(".env")

function readStripeMode(secretKey) {
  const explicit = process.env.STRIPE_MODE?.trim().toLowerCase()
  if (explicit === "live" || explicit === "test") {
    return explicit
  }
  if (secretKey?.startsWith("sk_live_")) {
    return "live"
  }
  return "test"
}

function parseProducts() {
  const src = fs.readFileSync(path.join(root, "lib/store-data.ts"), "utf8")
  const matches = [
    ...src.matchAll(
      /\{\s*id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?price:\s*([\d.]+)/g
    ),
  ]

  return matches.map((match) => ({
    id: match[1],
    name: match[2],
    price: Number(match[3]),
  }))
}

function parsePriceMap() {
  const raw = process.env.STRIPE_PRICE_MAP
  if (!raw?.trim()) {
    return { map: {}, parseError: null, invalidEntries: [] }
  }

  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {
        map: {},
        parseError: "STRIPE_PRICE_MAP must be a JSON object.",
        invalidEntries: [],
      }
    }

    const map = {}
    const invalidEntries = []

    for (const [productId, priceId] of Object.entries(parsed)) {
      if (typeof productId !== "string" || typeof priceId !== "string") {
        continue
      }

      if (!priceId.trim().startsWith("price_")) {
        invalidEntries.push(productId)
      } else {
        map[productId] = priceId.trim()
      }
    }

    return { map, parseError: null, invalidEntries }
  } catch (error) {
    return {
      map: {},
      parseError:
        error instanceof Error ? error.message : "Invalid JSON in STRIPE_PRICE_MAP",
      invalidEntries: [],
    }
  }
}

function isAbsoluteHttpUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
const secretKey = process.env.STRIPE_SECRET_KEY
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
const paymentProvider = process.env.PAYMENT_PROVIDER === "external"
  ? "external"
  : "stripe"
const stripeMode = readStripeMode(secretKey)
const products = parseProducts()
const priceMapStatus = parsePriceMap()

const errors = []
const warnings = []

if (paymentProvider !== "stripe") {
  warnings.push("PAYMENT_PROVIDER is not stripe.")
}

if (!siteUrl) {
  errors.push("Missing NEXT_PUBLIC_SITE_URL.")
} else if (!isAbsoluteHttpUrl(siteUrl)) {
  errors.push("NEXT_PUBLIC_SITE_URL must be an absolute http:// or https:// URL.")
}

if (!secretKey) errors.push("Missing STRIPE_SECRET_KEY.")
if (!publishableKey) errors.push("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.")
if (!webhookSecret) errors.push("Missing STRIPE_WEBHOOK_SECRET.")

if (
  secretKey &&
  !secretKey.startsWith("sk_test_") &&
  !secretKey.startsWith("sk_live_")
) {
  warnings.push("STRIPE_SECRET_KEY format is invalid.")
}

if (
  publishableKey &&
  !publishableKey.startsWith("pk_test_") &&
  !publishableKey.startsWith("pk_live_")
) {
  warnings.push("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY format is invalid.")
}

if (webhookSecret && !webhookSecret.startsWith("whsec_")) {
  warnings.push("STRIPE_WEBHOOK_SECRET format is invalid.")
}

if (secretKey && publishableKey) {
  const secretIsTest = secretKey.startsWith("sk_test_")
  const publishableIsTest = publishableKey.startsWith("pk_test_")
  if (secretIsTest !== publishableIsTest) {
    warnings.push("Stripe secret and publishable keys are not the same mode.")
  }
}

if (stripeMode === "test") {
  if (secretKey && !secretKey.startsWith("sk_test_")) {
    warnings.push("STRIPE_MODE=test but secret key is not sk_test_.")
  }
  if (publishableKey && !publishableKey.startsWith("pk_test_")) {
    warnings.push("STRIPE_MODE=test but publishable key is not pk_test_.")
  }
}

if (stripeMode === "live") {
  if (secretKey && !secretKey.startsWith("sk_live_")) {
    errors.push("STRIPE_MODE=live requires STRIPE_SECRET_KEY to start with sk_live_.")
  }
  if (publishableKey && !publishableKey.startsWith("pk_live_")) {
    errors.push(
      "STRIPE_MODE=live requires NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to start with pk_live_."
    )
  }
  if (siteUrl && siteUrl.startsWith("http://")) {
    errors.push(
      "STRIPE_MODE=live requires NEXT_PUBLIC_SITE_URL to use https:// (not http://)."
    )
  }
  if (siteUrl && (siteUrl.includes("localhost") || siteUrl.includes("127.0.0.1"))) {
    errors.push(
      "STRIPE_MODE=live requires NEXT_PUBLIC_SITE_URL to be your public production domain."
    )
  }
  if (Object.keys(priceMapStatus.map).length === 0) {
    errors.push(
      "STRIPE_MODE=live requires STRIPE_PRICE_MAP with live Price IDs for every catalog product."
    )
  } else {
    const unmapped = products
      .map((product) => product.id)
      .filter((productId) => !priceMapStatus.map[productId])

    if (unmapped.length > 0) {
      errors.push(
        `STRIPE_MODE=live requires STRIPE_PRICE_MAP entries for: ${unmapped.join(", ")}`
      )
    }
  }
}

if (priceMapStatus.parseError) {
  errors.push(`STRIPE_PRICE_MAP: ${priceMapStatus.parseError}`)
}

if (priceMapStatus.invalidEntries.length > 0) {
  errors.push(
    `STRIPE_PRICE_MAP has invalid price IDs for: ${priceMapStatus.invalidEntries.join(", ")}`
  )
}

if (Object.keys(priceMapStatus.map).length === 0) {
  warnings.push(
    "STRIPE_PRICE_MAP is empty. Checkout will use dynamic price_data until mapped."
  )
} else {
  const unmapped = products
    .map((product) => product.id)
    .filter((productId) => !priceMapStatus.map[productId])

  if (unmapped.length > 0) {
    warnings.push(
      `STRIPE_PRICE_MAP missing products: ${unmapped.join(", ")}`
    )
  }
}

const successUrl = `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`
const cancelUrl = `${siteUrl}/checkout/cancel`
const webhookUrl = `${siteUrl}/api/webhooks/stripe`

if (!successUrl.includes("{CHECKOUT_SESSION_ID}")) {
  errors.push("Success URL must include {CHECKOUT_SESSION_ID}.")
}

if (!isAbsoluteHttpUrl(successUrl.replace("{CHECKOUT_SESSION_ID}", "cs_test"))) {
  errors.push("Success URL is invalid.")
}

if (!isAbsoluteHttpUrl(cancelUrl)) {
  errors.push("Cancel URL is invalid.")
}

if (!isAbsoluteHttpUrl(webhookUrl)) {
  errors.push("Webhook URL is invalid.")
}

const resendApiKey = process.env.RESEND_API_KEY?.trim()
const resendFromEmail = process.env.RESEND_FROM_EMAIL?.trim()

if (!resendApiKey) {
  errors.push(
    "Missing RESEND_API_KEY. Order confirmation emails will fail and the Stripe webhook will return 500."
  )
}

if (!resendFromEmail) {
  errors.push(
    "Missing RESEND_FROM_EMAIL. Order confirmation emails will fail and the Stripe webhook will return 500."
  )
}

if (!process.env.DELIVERY_TOKEN_SECRET?.trim()) {
  warnings.push(
    "DELIVERY_TOKEN_SECRET is unset. Download tokens will fall back to STRIPE_SECRET_KEY-derived secret."
  )
}

if (!process.env.PRODUCT_ACCESS_LINKS?.trim()) {
  warnings.push(
    "PRODUCT_ACCESS_LINKS is empty. Emails will still send, but secure download links will be omitted until product URLs are configured."
  )
}

console.log("Stripe configuration verification")
console.log("--------------------------------")
console.log(`Payment provider: ${paymentProvider}`)
console.log(`Stripe mode: ${stripeMode}`)
console.log(`Site URL: ${siteUrl || "(missing)"}`)
console.log(`Success URL: ${successUrl}`)
console.log(`Cancel URL: ${cancelUrl}`)
console.log(`Webhook URL: ${webhookUrl}`)
console.log(`Catalog products: ${products.length}`)
console.log(`Mapped prices: ${Object.keys(priceMapStatus.map).length}`)
console.log(`Resend API key: ${resendApiKey ? "set" : "(missing)"}`)
console.log(`Resend from email: ${resendFromEmail || "(missing)"}`)

if (warnings.length > 0) {
  console.log("\nWarnings:")
  for (const warning of warnings) {
    console.log(`- ${warning}`)
  }
}

if (errors.length > 0) {
  console.log("\nErrors:")
  for (const error of errors) {
    console.log(`- ${error}`)
  }
  process.exit(1)
}

if (stripeMode === "live") {
  console.log("\nStripe configuration looks ready for live/production mode.")
  console.log("\nBefore accepting real payments, confirm manually in Stripe Dashboard:")
  console.log(`- Webhook endpoint registered: ${webhookUrl}`)
  console.log("- Webhook events enabled: checkout.session.completed, checkout.session.expired")
  console.log("- Live Products and Prices match your catalog (EUR amounts)")
  console.log("- Business details, payout bank account, and tax settings are complete")
  console.log("- Checkout branding and customer support email are configured")
} else {
  console.log("\nStripe configuration looks ready for sandbox/test mode.")
  console.log("\nTo go live later:")
  console.log("- Set STRIPE_MODE=live")
  console.log("- Replace keys with sk_live_..., pk_live_..., and a live whsec_... webhook secret")
  console.log("- Set NEXT_PUBLIC_SITE_URL to your HTTPS production domain")
  console.log("- Create live Products/Prices and populate STRIPE_PRICE_MAP")
  console.log(`- Register webhook: ${webhookUrl}`)
}
