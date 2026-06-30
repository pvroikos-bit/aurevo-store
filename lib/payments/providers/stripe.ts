import { env, validateStripeEnv } from "@/lib/env"
import { getStripeClient } from "@/lib/stripe/client"
import { paymentLog } from "@/lib/payments/logger"
import { toStripeLineItems, buildCheckoutMetadata } from "@/lib/payments/stripe-utils"
import type {
  CheckoutRequest,
  CheckoutResult,
  ValidatedLineItem,
} from "@/lib/payments/types"

export function getStripeSuccessUrl(
  sessionIdPlaceholder = "{CHECKOUT_SESSION_ID}"
) {
  return `${env.siteUrl}/success?session_id=${sessionIdPlaceholder}`
}

export function getStripeCancelUrl() {
  return `${env.siteUrl}/checkout/cancel`
}

export async function createStripeCheckoutSession(
  items: ValidatedLineItem[],
  customer: CheckoutRequest["customer"]
): Promise<CheckoutResult> {
  const validation = validateStripeEnv()

  if (!validation.ok) {
    paymentLog("error", "stripe_env_invalid", {
      missing: validation.missing.join(","),
    })

    return {
      ok: false,
      status: 503,
      code: "PROVIDER_NOT_CONFIGURED",
      message:
        "Payment system is not configured. Please try again later.",
    }
  }

  if (validation.warnings.length > 0) {
    paymentLog("warn", "stripe_env_warnings", {
      warnings: validation.warnings.join("|"),
    })
  }

  try {
    const stripe = getStripeClient()
    const metadata = buildCheckoutMetadata(items, customer)

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customer.email,
      line_items: toStripeLineItems(items),
      success_url: getStripeSuccessUrl(),
      cancel_url: getStripeCancelUrl(),
      metadata,
      payment_intent_data: {
        metadata,
      },
    })

    if (!session.url) {
      paymentLog("error", "stripe_session_missing_url", {
        session_id: session.id,
      })

      return {
        ok: false,
        status: 502,
        code: "STRIPE_ERROR",
        message: "Unable to start checkout. Please try again.",
      }
    }

    paymentLog("info", "stripe_checkout_session_created", {
      session_id: session.id,
      item_count: items.length,
    })

    return {
      ok: true,
      data: {
        provider: "stripe",
        redirectUrl: session.url,
        sessionId: session.id,
      },
    }
  } catch (error) {
    paymentLog("error", "stripe_checkout_session_failed", {
      error_type:
        error instanceof Error ? error.constructor.name : "unknown",
    })

    return {
      ok: false,
      status: 502,
      code: "STRIPE_ERROR",
      message: "Unable to start checkout. Please try again.",
    }
  }
}

export async function retrieveCheckoutSession(sessionId: string) {
  const validation = validateStripeEnv()

  if (!validation.ok) {
    return null
  }

  try {
    const stripe = getStripeClient()
    return await stripe.checkout.sessions.retrieve(sessionId)
  } catch (error) {
    paymentLog("error", "stripe_session_retrieve_failed", {
      session_id: sessionId,
      error_type:
        error instanceof Error ? error.constructor.name : "unknown",
    })

    return null
  }
}
