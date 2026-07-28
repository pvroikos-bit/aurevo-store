const DEFAULT_RESEND_FROM_EMAIL = "SkroojMoney <orders@skrooj.com>"
const REQUIRED_FROM_DOMAIN = "skrooj.com"

export type ResendEnvValidation =
  | {
      ok: true
      apiKeyPresent: true
      fromEmail: string
      fromEmailSource: "env" | "default"
    }
  | {
      ok: false
      missing: string[]
    }

function extractFromAddress(fromEmail: string): string | null {
  const angleMatch = fromEmail.match(/<([^>]+)>/)
  const address = (angleMatch?.[1] || fromEmail).trim().toLowerCase()

  if (!address.includes("@")) {
    return null
  }

  return address
}

export function isVerifiedSkroojFromEmail(fromEmail: string): boolean {
  const address = extractFromAddress(fromEmail)

  if (!address) {
    return false
  }

  return address.endsWith(`@${REQUIRED_FROM_DOMAIN}`)
}

export function getResendFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_RESEND_FROM_EMAIL
}

export function validateResendEnv(): ResendEnvValidation {
  const missing: string[] = []
  const apiKey = process.env.RESEND_API_KEY?.trim()

  if (!apiKey) {
    missing.push("RESEND_API_KEY")
  }

  const configuredFrom = process.env.RESEND_FROM_EMAIL?.trim()
  const fromEmail = configuredFrom || DEFAULT_RESEND_FROM_EMAIL

  if (!isVerifiedSkroojFromEmail(fromEmail)) {
    missing.push("RESEND_FROM_EMAIL(@skrooj.com)")
  }

  if (missing.length > 0) {
    return { ok: false, missing }
  }

  return {
    ok: true,
    apiKeyPresent: true,
    fromEmail,
    fromEmailSource: configuredFrom ? "env" : "default",
  }
}
