import { env, validateStripeEnv, type StripeEnvValidation } from "@/lib/env"
import { products } from "@/lib/store-data"
import {
  getStripePriceMapStatus,
  validateStripePriceMapping,
} from "@/lib/payments/stripe-price-map"

export const STRIPE_CHECKOUT_SESSION_ID_PLACEHOLDER =
  "{CHECKOUT_SESSION_ID}"

export function getStripeSuccessUrl(
  sessionIdPlaceholder = STRIPE_CHECKOUT_SESSION_ID_PLACEHOLDER
) {
  return `${env.siteUrl}/success?session_id=${sessionIdPlaceholder}`
}

export function getStripeCancelUrl() {
  return `${env.siteUrl}/checkout/cancel`
}

export function getStripeWebhookUrl() {
  return `${env.siteUrl}/api/webhooks/stripe`
}

export type StripeReadinessIssue = {
  errors: string[]
  warnings: string[]
}

function isAbsoluteHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function validateStripeCheckoutUrls(): StripeReadinessIssue {
  const errors: string[] = []
  const warnings: string[] = []

  const successUrl = getStripeSuccessUrl()
  const cancelUrl = getStripeCancelUrl()
  const webhookUrl = getStripeWebhookUrl()

  if (!successUrl.includes(STRIPE_CHECKOUT_SESSION_ID_PLACEHOLDER)) {
    errors.push(
      "Stripe success URL must include {CHECKOUT_SESSION_ID}."
    )
  }

  const successUrlForValidation = successUrl.replace(
    STRIPE_CHECKOUT_SESSION_ID_PLACEHOLDER,
    "cs_test_placeholder"
  )

  if (!isAbsoluteHttpUrl(successUrlForValidation)) {
    errors.push(
      "Stripe success URL is invalid. Check NEXT_PUBLIC_SITE_URL."
    )
  }

  if (!isAbsoluteHttpUrl(cancelUrl)) {
    errors.push(
      "Stripe cancel URL is invalid. Check NEXT_PUBLIC_SITE_URL."
    )
  }

  if (!isAbsoluteHttpUrl(webhookUrl)) {
    errors.push(
      "Stripe webhook URL is invalid. Check NEXT_PUBLIC_SITE_URL."
    )
  }

  if (
    env.nodeEnv === "production" &&
    env.siteUrl.startsWith("http://") &&
    !env.siteUrl.includes("localhost")
  ) {
    warnings.push(
      "NEXT_PUBLIC_SITE_URL uses http:// in production. Stripe checkout should use https://."
    )
  }

  return { errors, warnings }
}

export function validateStripeReadiness(): StripeReadinessIssue & {
  ok: boolean
  env: StripeEnvValidation
} {
  const envValidation = validateStripeEnv()
  const urlValidation = validateStripeCheckoutUrls()
  const priceValidation = validateStripePriceMapping(
    products.map((product) => product.id)
  )

  const errors = [
    ...(envValidation.ok ? [] : [`Missing env: ${envValidation.missing.join(", ")}`]),
    ...urlValidation.errors,
  ]

  const warnings = [
    ...envValidation.warnings,
    ...urlValidation.warnings,
    ...priceValidation.warnings,
  ]

  const priceStatus = getStripePriceMapStatus()
  if (priceStatus.parseError) {
    errors.push(`STRIPE_PRICE_MAP is invalid JSON: ${priceStatus.parseError}`)
  }

  if (priceStatus.invalidEntries.length > 0) {
    errors.push(
      `STRIPE_PRICE_MAP has invalid Stripe Price IDs for: ${priceStatus.invalidEntries.join(", ")}`
    )
  }

  return {
    ok: envValidation.ok && errors.length === 0,
    env: envValidation,
    errors,
    warnings,
  }
}
