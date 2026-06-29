/**
 * Stripe Checkout integration point.
 *
 * When ready to enable Stripe:
 * 1. npm install stripe
 * 2. Set PAYMENT_PROVIDER=stripe and Stripe env vars
 * 3. Implement createStripeCheckoutSession below
 * 4. Wire app/api/webhooks/stripe/route.ts to verify events
 */

import { env, isStripeConfigured } from "@/lib/env"
import type {
  CheckoutRequest,
  CheckoutResult,
  ValidatedLineItem,
} from "@/lib/payments/types"

export function getStripeSuccessUrl(sessionIdPlaceholder = "{CHECKOUT_SESSION_ID}") {
  return `${env.siteUrl}/success?session_id=${sessionIdPlaceholder}`
}

export function getStripeCancelUrl() {
  return `${env.siteUrl}/checkout/cancel`
}

export async function createStripeCheckoutSession(
  _items: ValidatedLineItem[],
  _customer: CheckoutRequest["customer"]
): Promise<CheckoutResult> {
  if (!isStripeConfigured()) {
    return {
      ok: false,
      status: 503,
      code: "PROVIDER_NOT_CONFIGURED",
      message:
        "Stripe env vars are missing. Set STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.",
    }
  }

  return {
    ok: false,
    status: 501,
    code: "STRIPE_NOT_INSTALLED",
    message:
      "Install the stripe package and implement createStripeCheckoutSession.",
  }
}
