export type PaymentProvider = "external" | "stripe"

export type StripeMode = "test" | "live"

export type StripeEnv = {
  secretKey: string | undefined
  webhookSecret: string | undefined
  publishableKey: string | undefined
  mode: StripeMode
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

  if (value === "external") {
    return "external"
  }

  return "stripe"
}

function readStripeMode(secretKey?: string): StripeMode {
  const explicit = process.env.STRIPE_MODE?.trim().toLowerCase()

  if (explicit === "live" || explicit === "test") {
    return explicit
  }

  if (secretKey?.startsWith("sk_live_")) {
    return "live"
  }

  return "test"
}

function isAbsoluteHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
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
    mode: readStripeMode(process.env.STRIPE_SECRET_KEY),
  },
  social: {
    discord:
      process.env.NEXT_PUBLIC_DISCORD_URL?.trim() ||
      "https://discord.gg/kAbCfrZ6rA",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || undefined,
    tiktok:
      process.env.NEXT_PUBLIC_TIKTOK_URL?.trim() ||
      "https://www.tiktok.com/@skroojmoneyy?_r=1&_t=ZN-97S73YDVv1S",
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
  } else if (!isAbsoluteHttpUrl(env.siteUrl)) {
    warnings.push(
      "NEXT_PUBLIC_SITE_URL must be an absolute http:// or https:// URL."
    )
  }

  const secretKey = env.stripe.secretKey
  const publishableKey = env.stripe.publishableKey
  const webhookSecret = env.stripe.webhookSecret
  const mode = env.stripe.mode

  if (
    secretKey &&
    !secretKey.startsWith("sk_test_") &&
    !secretKey.startsWith("sk_live_")
  ) {
    warnings.push(
      "STRIPE_SECRET_KEY format is invalid. Expected sk_test_... or sk_live_..."
    )
  }

  if (
    publishableKey &&
    !publishableKey.startsWith("pk_test_") &&
    !publishableKey.startsWith("pk_live_")
  ) {
    warnings.push(
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY format is invalid. Expected pk_test_... or pk_live_..."
    )
  }

  if (webhookSecret && !webhookSecret.startsWith("whsec_")) {
    warnings.push(
      "STRIPE_WEBHOOK_SECRET format is invalid. Expected whsec_..."
    )
  }

  const secretIsTest = secretKey?.startsWith("sk_test_") ?? false
  const secretIsLive = secretKey?.startsWith("sk_live_") ?? false
  const publishableIsTest = publishableKey?.startsWith("pk_test_") ?? false
  const publishableIsLive = publishableKey?.startsWith("pk_live_") ?? false

  if (secretKey && publishableKey) {
    if (secretIsTest !== publishableIsTest || secretIsLive !== publishableIsLive) {
      warnings.push(
        "STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must both be test or both be live."
      )
    }
  }

  if (mode === "test") {
    if (secretKey && !secretIsTest) {
      warnings.push(
        "STRIPE_MODE=test but STRIPE_SECRET_KEY is not a test key (sk_test_...)."
      )
    }

    if (publishableKey && !publishableIsTest) {
      warnings.push(
        "STRIPE_MODE=test but NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not a test key (pk_test_...)."
      )
    }
  }

  if (mode === "live") {
    if (secretKey && !secretIsLive) {
      warnings.push(
        "STRIPE_MODE=live but STRIPE_SECRET_KEY is not a live key (sk_live_...)."
      )
    }

    if (publishableKey && !publishableIsLive) {
      warnings.push(
        "STRIPE_MODE=live but NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not a live key (pk_live_...)."
      )
    }

    if (env.nodeEnv === "production" && secretKey && !secretIsLive) {
      warnings.push(
        "Production deployment is using non-live Stripe secret key with STRIPE_MODE=live."
      )
    }
  }

  if (missing.length > 0) {
    return { ok: false, missing, warnings }
  }

  return { ok: true, warnings }
}
