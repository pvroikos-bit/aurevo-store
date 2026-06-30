import { NextResponse } from "next/server"
import { env } from "@/lib/env"
import { createCheckoutSession } from "@/lib/payments/checkout"
import { paymentLog } from "@/lib/payments/logger"
import type { CheckoutRequest } from "@/lib/payments/types"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let body: CheckoutRequest

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { code: "INVALID_BODY", message: "Invalid JSON body." },
      { status: 400 }
    )
  }

  const result = await createCheckoutSession(body)

  if (!result.ok) {
    if (result.status >= 500) {
      paymentLog("error", "checkout_session_failed", {
        code: result.code,
        provider: env.paymentProvider,
      })
    }

    return NextResponse.json(
      { code: result.code, message: result.message },
      { status: result.status }
    )
  }

  return NextResponse.json(result.data)
}
