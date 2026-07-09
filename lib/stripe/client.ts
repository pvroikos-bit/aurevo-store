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
    stripeClient = new Stripe(env.stripe.secretKey!, {
      apiVersion: "2026-06-24.dahlia",
      typescript: true,
    })
  }

  return stripeClient
}
