/**
 * Resend configuration helpers (server-side).
 */

export type ResendEnvValidation =
  | { ok: true; fromEmail: string; apiKeyPresent: true }
  | { ok: false; missing: string[] }

export function validateResendEnv(): ResendEnvValidation {
  const missing: string[] = []
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim()

  if (!apiKey) {
    missing.push("RESEND_API_KEY")
  }

  if (!fromEmail) {
    missing.push("RESEND_FROM_EMAIL")
  }

  if (missing.length > 0) {
    return { ok: false, missing }
  }

  return {
    ok: true,
    fromEmail: fromEmail!,
    apiKeyPresent: true,
  }
}
