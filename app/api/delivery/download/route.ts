import { NextResponse } from "next/server"

import { resolveDeliveryTarget } from "@/lib/delivery/grants"
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

  const token = new URL(request.url).searchParams.get("token")

  if (!token) {
    return NextResponse.json(
      {
        code: "INVALID_SESSION",
        message: "Missing download token.",
      },
      { status: 400 }
    )
  }

  const target = await resolveDeliveryTarget(token)

  if (!target) {
    return NextResponse.json(
      {
        code: "INVALID_SESSION",
        message: "Download link is invalid or expired.",
      },
      { status: 403 }
    )
  }

  return NextResponse.redirect(target.url, 302)
}
