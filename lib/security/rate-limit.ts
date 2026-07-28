type RateLimitOptions = {
  keyPrefix: string
  limit: number
  windowMs: number
}

type RateLimitState = {
  count: number
  resetAt: number
}

declare global {
  var __rateLimitStore: Map<string, RateLimitState> | undefined
}

function getStore(): Map<string, RateLimitState> {
  if (!globalThis.__rateLimitStore) {
    globalThis.__rateLimitStore = new Map()
  }

  return globalThis.__rateLimitStore
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown"
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown"
}

export function checkRateLimit(
  request: Request,
  { keyPrefix, limit, windowMs }: RateLimitOptions
): { ok: true } | { ok: false; retryAfterSeconds: number } {
  const now = Date.now()
  const key = `${keyPrefix}:${getClientIp(request)}`
  const store = getStore()
  const existing = store.get(key)

  if (!existing || existing.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })
    return { ok: true }
  }

  if (existing.count >= limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000)
      ),
    }
  }

  existing.count += 1
  store.set(key, existing)
  return { ok: true }
}
