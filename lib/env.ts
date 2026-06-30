export type PaymentProvider = "external" | "stripe"

export type StripeEnv = {
  secretKey: string | undefined
  webhookSecret: string | undefined
  publishableKey: string | undefined
}

export type EnvConfig = {
  nodeEnv: string
  siteUrl: string
  paymentProvider: PaymentProvider
  stripe: StripeEnv
  social: {
    discord: string
    instagram: string | undefined
    tiktok: string | undefined
  }
}

function readPaymentProvider(): PaymentProvider {
  const value = process.env.PAYMENT_PROVIDER

  if (value === "stripe") {
    return "stripe"
  }

  return "external"
}

export const env: EnvConfig = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://skroojmoney.com",
  paymentProvider: readPaymentProvider(),
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  social: {
    discord:
      process.env.NEXT_PUBLIC_DISCORD_URL ??
      "https://discord.gg/WvYNE5xrvr",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL,
  },
}

export type StripeEnvValidation =
  | {
      ok: true
      warnings: string[]
    }
  | {
      ok: false
      missing: string[]
      warnings: string[]
    }

export function validateStripeEnv(): StripeEnvValidation {
  const missing: string[] = []
  const warnings: string[] = []

  if (!env.stripe.secretKey) {
    missing.push("STRIPE_SECRET_KEY")
  }

  if (!env.stripe.webhookSecret) {
    missing.push("STRIPE_WEBHOOK_SECRET")
  }

  if (!env.stripe.publishableKey) {
    missing.push("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY")
  }

  if (!env.siteUrl) {
    missing.push("NEXT_PUBLIC_SITE_URL")
  }

  if (env.nodeEnv === "production" && env.paymentProvider === "stripe") {
    if (
      env.stripe.secretKey &&
      !env.stripe.secretKey.startsWith("sk_live_")
    ) {
      warnings.push(
        "STRIPE_SECRET_KEY is not a live key (sk_live_). Use live keys in production."
      )
    }

    if (
      env.stripe.publishableKey &&
      !env.stripe.publishableKey.startsWith("pk_live_")
    ) {
      warnings.push(
        "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not a live key (pk_live_)."
      )
    }
  }

  if (missing.length > 0) {
    return { ok: false, missing, warnings }
  }

  return { ok: true, warnings }
}
