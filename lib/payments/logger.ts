type LogLevel = "info" | "warn" | "error"

const SENSITIVE_KEYS = new Set([
  "email",
  "customer_email",
  "discord_username",
  "secret",
  "token",
])

function sanitizeMeta(
  meta?: Record<string, unknown>
): Record<string, unknown> | undefined {
  if (!meta) {
    return undefined
  }

  const safe: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(meta)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      continue
    }

    safe[key] = value
  }

  return safe
}

export function paymentLog(
  level: LogLevel,
  message: string,
  meta?: Record<string, unknown>
): void {
  const payload = {
    scope: "payments",
    level,
    message,
    ...sanitizeMeta(meta),
    timestamp: new Date().toISOString(),
  }

  const line = JSON.stringify(payload)

  if (level === "error") {
    console.error(line)
    return
  }

  if (level === "warn") {
    console.warn(line)
    return
  }

  console.info(line)
}
