import Stripe from "stripe"
import { env, validateStripeEnv } from "@/lib/env"
import { paymentLog } from "@/lib/payments/logger"

let stripeClient: Stripe | null = null

export function getStripeClient(): Stripe {
  const validation = validateStripeEnv()

  if (!validation.ok) {
    throw new Error(
      `Stripe is not configured. Missing: ${validation.missing.join(", ")}`
    )
  }

  if (validation.warnings.length > 0) {
    paymentLog("warn", "stripe_env_warnings", {
      warnings: validation.warnings.join("|"),
    })
  }

  if (!stripeClient) {
    const secret = env.stripe.secretKey!
    const secretPrefix = secret.startsWith("sk_live_")
      ? "sk_live"
      : secret.startsWith("sk_test_")
        ? "sk_test"
        : "unknown"

    paymentLog("info", "stripe_client_initialized", {
      secretPrefix,
      vercelEnv: process.env.VERCEL_ENV ?? null,
    })

    stripeClient = new Stripe(secret, {
      apiVersion: "2026-06-24.dahlia",
      typescript: true,
    })
  }

  return stripeClient
}
