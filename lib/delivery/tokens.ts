import { createHmac, timingSafeEqual } from "node:crypto"

import type { DeliveryTokenPayload } from "@/lib/delivery/types"

const DEFAULT_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7

function getDeliveryTokenSecret(): string {
  const secret = process.env.DELIVERY_TOKEN_SECRET?.trim()

  if (secret) {
    return secret
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("DELIVERY_TOKEN_SECRET is required in production.")
  }

  return "dev-only-delivery-token-secret"
}

function signPayload(payload: DeliveryTokenPayload): string {
  const secret = getDeliveryTokenSecret()
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = createHmac("sha256", secret).update(data).digest("base64url")

  return `${data}.${signature}`
}

export function createDeliveryToken(
  sessionId: string,
  productId: string,
  ttlSeconds = DEFAULT_TOKEN_TTL_SECONDS
): string {
  const payload: DeliveryTokenPayload = {
    sid: sessionId,
    pid: productId,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  }

  return signPayload(payload)
}

export function verifyDeliveryToken(token: string): DeliveryTokenPayload | null {
  const [data, signature] = token.split(".")

  if (!data || !signature) {
    return null
  }

  const secret = getDeliveryTokenSecret()
  const expectedSignature = createHmac("sha256", secret)
    .update(data)
    .digest("base64url")

  const provided = Buffer.from(signature)
  const expected = Buffer.from(expectedSignature)

  if (provided.length !== expected.length) {
    return null
  }

  if (!timingSafeEqual(provided, expected)) {
    return null
  }

  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString("utf8")
    ) as DeliveryTokenPayload

    if (
      typeof payload.sid !== "string" ||
      typeof payload.pid !== "string" ||
      typeof payload.exp !== "number"
    ) {
      return null
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return payload
  } catch {
    return null
  }
}
