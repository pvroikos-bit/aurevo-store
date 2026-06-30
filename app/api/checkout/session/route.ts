import { NextResponse } from "next/server"
import { env, validateStripeEnv } from "@/lib/env"
import { retrieveCheckoutSession } from "@/lib/payments/providers/stripe"
import { isCheckoutSessionPaid } from "@/lib/payments/stripe-utils"

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

  const validation = validateStripeEnv()

  if (!validation.ok) {
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

  return NextResponse.json({
    paid: isCheckoutSessionPaid(session),
    status: session.status,
    sessionId: session.id,
  })
}
