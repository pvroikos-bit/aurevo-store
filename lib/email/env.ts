const DEFAULT_RESEND_FROM_EMAIL = "SkroojMoney <skroojmoney@gmail.com>"

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

export function getResendFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_RESEND_FROM_EMAIL
}

export function validateResendEnv(): ResendEnvValidation {
  const missing: string[] = []
  const apiKey = process.env.RESEND_API_KEY?.trim()

  if (!apiKey) {
    missing.push("RESEND_API_KEY")
  }

  if (missing.length > 0) {
    return { ok: false, missing }
  }

  const configuredFrom = process.env.RESEND_FROM_EMAIL?.trim()

  return {
    ok: true,
    apiKeyPresent: true,
    fromEmail: configuredFrom || DEFAULT_RESEND_FROM_EMAIL,
    fromEmailSource: configuredFrom ? "env" : "default",
  }
}
