import { NextResponse } from "next/server"
import { env } from "@/lib/env"
import { buildPurchasePayloadFromSession } from "@/lib/analytics/purchase-from-session"
import { fulfillCheckoutSession } from "@/lib/delivery/fulfillment"
import { paymentLog } from "@/lib/payments/logger"
import { retrieveCheckoutSession } from "@/lib/payments/providers/stripe"
import { validateStripeReadiness } from "@/lib/payments/stripe-config"
import { isCheckoutSessionPaid } from "@/lib/payments/stripe-utils"

export const runtime = "nodejs"

function errorDetails(error: unknown): {
  error_type: string
  error_message: string
} {
  if (error instanceof Error) {
    return {
      error_type: error.constructor.name,
      error_message: error.message,
    }
  }

  return {
    error_type: "unknown",
    error_message: String(error),
  }
}

export async function GET(request: Request) {
  if (env.paymentProvider !== "stripe") {
    return NextResponse.json(
      {
        code: "PROVIDER_NOT_CONFIGURED",
        message: "Stripe is not the active payment provider.",
      },
      { status: 400 }
    )
  }

  const readiness = validateStripeReadiness()

  if (!readiness.ok) {
    return NextResponse.json(
      {
        code: "PROVIDER_NOT_CONFIGURED",
        message: "Stripe is not configured.",
      },
      { status: 503 }
    )
  }

  const sessionId = new URL(request.url).searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json(
      {
        code: "INVALID_SESSION",
        message: "Missing session_id.",
      },
      { status: 400 }
    )
  }

  const session = await retrieveCheckoutSession(sessionId)

  if (!session) {
    return NextResponse.json(
      {
        code: "INVALID_SESSION",
        message: "Checkout session not found.",
      },
      { status: 404 }
    )
  }

  const paid = isCheckoutSessionPaid(session)

  if (paid) {
    try {
      // Success page verification is the fallback when Stripe webhooks are missing
      // or misconfigured. Idempotency is enforced inside sendOrderReadyEmailOnce.
      await fulfillCheckoutSession(session, `verify-${session.id}`)
    } catch (error) {
      paymentLog("error", "checkout_session_verify_fulfillment_failed", {
        session_id: session.id,
        ...errorDetails(error),
      })
    }
  }

  return NextResponse.json({
    paid,
    status: session.status,
    sessionId: session.id,
    purchase: paid ? buildPurchasePayloadFromSession(session) : null,
  })
}
