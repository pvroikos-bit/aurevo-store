#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import Stripe from "stripe"

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

const secretKey = process.env.STRIPE_SECRET_KEY

if (!secretKey) {
  console.error("Missing STRIPE_SECRET_KEY. Set it in .env.local first.")
  process.exit(1)
}

if (!secretKey.startsWith("sk_test_")) {
  console.error(
    "Refusing to run: STRIPE_SECRET_KEY is not a test key. This script only creates sandbox prices."
  )
  process.exit(1)
}

const stripe = new Stripe(secretKey, {
  apiVersion: "2026-06-24.dahlia",
})

const products = parseProducts()
const priceMap = {}

console.log(`Creating ${products.length} Stripe test products and prices...`)

for (const product of products) {
  const stripeProduct = await stripe.products.create({
    name: product.name,
    metadata: {
      product_id: product.id,
      source: "digital-product-store",
    },
  })

  const price = await stripe.prices.create({
    product: stripeProduct.id,
    unit_amount: Math.round(product.price * 100),
    currency: "eur",
    metadata: {
      product_id: product.id,
      source: "digital-product-store",
    },
  })

  priceMap[product.id] = price.id
  console.log(`- ${product.id} -> ${price.id} (EUR ${product.price.toFixed(2)})`)
}

const serialized = JSON.stringify(priceMap)

console.log("\nAdd this to .env.local:\n")
console.log(`STRIPE_PRICE_MAP=${serialized}`)
console.log("\nThen run: pnpm stripe:verify")
