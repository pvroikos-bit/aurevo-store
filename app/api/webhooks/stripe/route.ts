import { NextResponse } from "next/server"

/**
 * Stripe webhook handler stub.
 *
 * When Stripe is enabled:
 * 1. npm install stripe
 * 2. Verify signature with STRIPE_WEBHOOK_SECRET
 * 3. Handle checkout.session.completed to fulfill orders
 */

export async function POST() {
  return NextResponse.json(
    {
      code: "STRIPE_NOT_INSTALLED",
      message:
        "Stripe webhooks are not configured yet. Implement this route after installing stripe.",
    },
    { status: 501 }
  )
}
