import { NextResponse } from "next/server"
import { env } from "@/lib/env"
import { createCheckoutSession } from "@/lib/payments/checkout"
import { paymentLog } from "@/lib/payments/logger"
import type { CheckoutRequest } from "@/lib/payments/types"
import { checkRateLimit } from "@/lib/security/rate-limit"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, {
    keyPrefix: "checkout-create",
    limit: 12,
    windowMs: 5 * 60 * 1000,
  })

  if (!rateLimit.ok) {
    return NextResponse.json(
      {
        code: "RATE_LIMITED",
        message: "Too many checkout attempts. Please try again shortly.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      }
    )
  }

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
