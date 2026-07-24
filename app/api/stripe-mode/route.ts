import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function secretPrefix(value: string | undefined): "sk_live" | "sk_test" | null {
  if (!value) return null
  if (value.startsWith("sk_live_")) return "sk_live"
  if (value.startsWith("sk_test_")) return "sk_test"
  return null
}

function publishablePrefix(
  value: string | undefined
): "pk_live" | "pk_test" | null {
  if (!value) return null
  if (value.startsWith("pk_live_")) return "pk_live"
  if (value.startsWith("pk_test_")) return "pk_test"
  return null
}

export async function GET() {
  const secret = process.env.STRIPE_SECRET_KEY?.trim()
  const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim()

  const secretPref = secretPrefix(secret)
  const publishablePref = publishablePrefix(publishable)

  return NextResponse.json({
    livemode: secretPref === "sk_live",
    secretPrefix: secretPref,
    publishablePrefix: publishablePref,
  })
}
