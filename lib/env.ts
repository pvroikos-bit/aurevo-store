export type PaymentProvider = "external" | "stripe"

function readPaymentProvider(): PaymentProvider {
  const value = process.env.PAYMENT_PROVIDER

  if (value === "stripe") {
    return "stripe"
  }

  return "external"
}

export const env = {
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
} as const

export function isStripeConfigured(): boolean {
  return Boolean(
    env.stripe.secretKey &&
      env.stripe.publishableKey &&
      env.stripe.webhookSecret
  )
}
