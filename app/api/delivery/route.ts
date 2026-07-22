import { NextResponse } from "next/server"

import { getDeliveryItemsForSessionId } from "@/lib/delivery/grants"
import { env } from "@/lib/env"
import { validateStripeReadiness } from "@/lib/payments/stripe-config"

export const runtime = "nodejs"

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

  const items = await getDeliveryItemsForSessionId(sessionId)

  if (items === null) {
    return NextResponse.json(
      {
        code: "INVALID_SESSION",
        message: "Checkout session not found.",
      },
      { status: 404 }
    )
  }

  return NextResponse.json({
    items,
    fulfilled: items.length > 0,
  })
}
