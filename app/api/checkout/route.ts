import { NextResponse } from "next/server"
import { createCheckoutSession } from "@/lib/payments/checkout"
import type { CheckoutRequest } from "@/lib/payments/types"

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
    return NextResponse.json(
      { code: result.code, message: result.message },
      { status: result.status }
    )
  }

  return NextResponse.json(result.data)
}
