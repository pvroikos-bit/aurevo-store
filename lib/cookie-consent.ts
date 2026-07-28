"use client"

export const COOKIE_CONSENT_STORAGE_KEY = "cookie-consent-preferences"
export const COOKIE_CONSENT_OPEN_EVENT = "cookie-consent:open"

export type CookieConsentPreferences = {
  essential: true
  analytics: boolean
}

type StoredCookieConsentPreferences = CookieConsentPreferences & {
  version: 1
  updatedAt: string
}

export function getDefaultCookiePreferences(): CookieConsentPreferences {
  return {
    essential: true,
    analytics: false,
  }
}

export function readCookiePreferences():
  | StoredCookieConsentPreferences
  | null {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)

    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw) as Partial<StoredCookieConsentPreferences>

    if (
      parsed.version !== 1 ||
      typeof parsed.analytics !== "boolean" ||
      parsed.essential !== true ||
      typeof parsed.updatedAt !== "string"
    ) {
      return null
    }

    return {
      version: 1,
      essential: true,
      analytics: parsed.analytics,
      updatedAt: parsed.updatedAt,
    }
  } catch {
    return null
  }
}

export function writeCookiePreferences(
  preferences: CookieConsentPreferences
): void {
  if (typeof window === "undefined") {
    return
  }

  const payload: StoredCookieConsentPreferences = {
    version: 1,
    essential: true,
    analytics: preferences.analytics,
    updatedAt: new Date().toISOString(),
  }

  window.localStorage.setItem(
    COOKIE_CONSENT_STORAGE_KEY,
    JSON.stringify(payload)
  )
}

export function hasAnalyticsConsent(): boolean {
  return readCookiePreferences()?.analytics === true
}

export function openCookiePreferences(): void {
  if (typeof window === "undefined") {
    return
  }

  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT))
}
