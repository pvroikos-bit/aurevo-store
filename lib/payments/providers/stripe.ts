import Stripe from "stripe"
import { getStripeClient } from "@/lib/stripe/client"
import { paymentLog } from "@/lib/payments/logger"
import {
  getStripeCancelUrl,
  getStripeSuccessUrl,
  validateStripeReadiness,
} from "@/lib/payments/stripe-config"
import { toStripeLineItems, buildCheckoutMetadata, toStripeShippingDetails } from "@/lib/payments/stripe-utils"
import type {
  CheckoutRequest,
  CheckoutResult,
  ValidatedLineItem,
} from "@/lib/payments/types"

function logStripeReadinessWarnings(): void {
  const readiness = validateStripeReadiness()

  if (readiness.warnings.length > 0) {
    paymentLog("warn", "stripe_readiness_warnings", {
      warnings: readiness.warnings.join("|"),
    })
  }
}

// TEMP: verbose Stripe checkout error logging for debugging.
function logStripeCheckoutError(error: unknown): void {
  if (error instanceof Stripe.errors.StripeError) {
    console.error("[stripe checkout] session create failed", {
      message: error.message,
      type: error.type,
      code: error.code,
      raw: error.raw,
      stack: error.stack,
    })
    return
  }

  console.error("[stripe checkout] session create failed", {
    message: error instanceof Error ? error.message : String(error),
    type:
      error && typeof error === "object" && "type" in error
        ? (error as { type: unknown }).type
        : undefined,
    code:
      error && typeof error === "object" && "code" in error
        ? (error as { code: unknown }).code
        : undefined,
    raw:
      error && typeof error === "object" && "raw" in error
        ? (error as { raw: unknown }).raw
        : undefined,
    stack: error instanceof Error ? error.stack : undefined,
  })
}

export async function createStripeCheckoutSession(
  items: ValidatedLineItem[],
  customer: CheckoutRequest["customer"]
): Promise<CheckoutResult> {
  const readiness = validateStripeReadiness()

  if (!readiness.ok) {
    paymentLog("error", "stripe_readiness_invalid", {
      errors: readiness.errors.join("|"),
    })

    return {
      ok: false,
      status: 503,
      code: "PROVIDER_NOT_CONFIGURED",
      message:
        "Payment system is not configured. Please try again later.",
    }
  }

  logStripeReadinessWarnings()

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
        shipping: toStripeShippingDetails(customer.shipping),
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
    logStripeCheckoutError(error)

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
  const readiness = validateStripeReadiness()

  if (!readiness.ok) {
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
