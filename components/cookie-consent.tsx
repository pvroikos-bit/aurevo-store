"use client"

import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import { Settings2, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  COOKIE_CONSENT_OPEN_EVENT,
  getDefaultCookiePreferences,
  readCookiePreferences,
  writeCookiePreferences,
  type CookieConsentPreferences,
} from "@/lib/cookie-consent"

type CookieConsentProps = {
  gaMeasurementId?: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    __ga4Loaded?: boolean
    __ga4InitPromise?: Promise<void>
  }
}

function getGaDisableKey(measurementId: string): string {
  return `ga-disable-${measurementId}`
}

async function ensureGa4Loaded(measurementId: string): Promise<void> {
  if (typeof window === "undefined" || !measurementId) {
    return
  }

  if (window.__ga4Loaded) {
    return
  }

  if (window.__ga4InitPromise) {
    await window.__ga4InitPromise
    return
  }

  window.__ga4InitPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-ga4-id="${measurementId}"]`
    )

    const initialize = () => {
      window.dataLayer = window.dataLayer || []
      window.gtag =
        window.gtag ||
        function gtag(...args: unknown[]) {
          window.dataLayer?.push(args)
        }

      window.gtag("js", new Date())
      window.gtag("config", measurementId, {
        anonymize_ip: true,
      })
      window.__ga4Loaded = true
      resolve()
    }

    if (existingScript?.dataset.loaded === "true") {
      initialize()
      return
    }

    if (existingScript) {
      existingScript.addEventListener("load", initialize, { once: true })
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google Analytics.")),
        { once: true }
      )
      return
    }

    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    script.dataset.ga4Id = measurementId
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true"
        initialize()
      },
      { once: true }
    )
    script.addEventListener(
      "error",
      () => reject(new Error("Failed to load Google Analytics.")),
      { once: true }
    )
    document.head.appendChild(script)
  })

  try {
    await window.__ga4InitPromise
  } finally {
    window.__ga4InitPromise = undefined
  }
}

function updateGa4ConsentState(
  measurementId: string,
  preferences: CookieConsentPreferences
): void {
  if (typeof window === "undefined" || !measurementId) {
    return
  }

  ;(window as unknown as Record<string, unknown>)[
    getGaDisableKey(measurementId)
  ] =
    !preferences.analytics

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: preferences.analytics ? "granted" : "denied",
    })
  }
}

export function CookieConsent({ gaMeasurementId }: CookieConsentProps) {
  const defaultPreferences = useMemo(() => getDefaultCookiePreferences(), [])
  const [draftPreferences, setDraftPreferences] =
    useState<CookieConsentPreferences | null>(null)
  const [showCustomize, setShowCustomize] = useState(false)
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const storedPreferences = isClient ? readCookiePreferences() : null
  const preferences = useMemo<CookieConsentPreferences>(
    () =>
      draftPreferences ??
      (storedPreferences
        ? {
            essential: true,
            analytics: storedPreferences.analytics,
          }
        : defaultPreferences),
    [defaultPreferences, draftPreferences, storedPreferences]
  )
  const showBanner = isClient && storedPreferences === null && !showCustomize

  useEffect(() => {
    const open = () => {
      setShowCustomize(true)
    }

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, open)
    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, open)
  }, [])

  useEffect(() => {
    if (!isClient || !gaMeasurementId) {
      return
    }

    updateGa4ConsentState(gaMeasurementId, preferences)

    if (!preferences.analytics) {
      return
    }

    void ensureGa4Loaded(gaMeasurementId)
  }, [gaMeasurementId, isClient, preferences])

  const savePreferences = (next: CookieConsentPreferences) => {
    setDraftPreferences(next)
    writeCookiePreferences(next)
    setShowCustomize(false)
  }

  const acceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
    })
  }

  const rejectNonEssential = () => {
    savePreferences({
      essential: true,
      analytics: false,
    })
  }

  if (!isClient) {
    return null
  }

  return (
    <>
      {showBanner ? (
        <div className="fixed inset-x-0 bottom-0 z-[120] p-3 sm:p-4">
          <div className="mx-auto max-w-5xl rounded-3xl border border-primary/25 bg-background/95 p-4 shadow-[0_24px_60px_-24px_oklch(0_0_0/0.8)] backdrop-blur-md sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  <ShieldCheck className="size-3.5" aria-hidden />
                  Privacy choices
                </div>
                <h2 className="mt-3 font-heading text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                  We use cookies to keep checkout working and improve analytics.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Essential cookies keep your cart and checkout working. Analytics
                  cookies help us understand store performance and are only enabled
                  if you allow them.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  className="h-11 rounded-full px-5 font-semibold"
                  onClick={() => setShowCustomize(true)}
                >
                  Customize
                </Button>
                <Button
                  variant="outline"
                  className="h-11 rounded-full px-5 font-semibold"
                  onClick={rejectNonEssential}
                >
                  Reject Non-Essential
                </Button>
                <Button
                  className="h-11 rounded-full px-5 font-semibold shadow-[0_10px_28px_-14px_oklch(0.62_0.19_256/0.7)]"
                  onClick={acceptAll}
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showCustomize ? (
        <div className="fixed inset-0 z-[130] flex items-end justify-center bg-black/70 p-3 sm:items-center sm:p-6">
          <div className="w-full max-w-2xl rounded-3xl border border-primary/20 bg-background p-5 shadow-[0_24px_64px_-24px_oklch(0_0_0/0.9)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  <Settings2 className="size-3.5" aria-hidden />
                  Cookie settings
                </div>
                <h2 className="mt-3 font-heading text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                  Choose your privacy preferences
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Essential cookies are always on because they keep the cart and
                  checkout working. Analytics is optional and only enables Google
                  Analytics 4 after you allow it.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCustomize(false)}
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:bg-card/40 hover:text-foreground"
                aria-label="Close cookie settings"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-border/40 bg-card/15 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">
                      Essential cookies
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Required for cart persistence, checkout, and core site
                      functionality.
                    </p>
                  </div>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Always active
                  </span>
                </div>
              </div>

              <label className="flex items-start justify-between gap-4 rounded-2xl border border-border/40 bg-card/15 p-4">
                <div>
                  <p className="font-semibold text-foreground">
                    Analytics cookies
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Enables Google Analytics 4 page and ecommerce events to help us
                    improve the store experience.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.analytics}
                  onClick={() =>
                    setDraftPreferences((current) => ({
                      ...(current ?? preferences),
                      analytics: !(current ?? preferences).analytics,
                    }))
                  }
                  className={`relative mt-1 inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors ${
                    preferences.analytics
                      ? "border-primary/40 bg-primary"
                      : "border-border/50 bg-muted/40"
                  }`}
                >
                  <span
                    className={`ml-1 inline-block size-5 rounded-full bg-white transition-transform ${
                      preferences.analytics ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                className="h-11 rounded-full px-5 font-semibold"
                onClick={rejectNonEssential}
              >
                Reject Non-Essential
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-full px-5 font-semibold"
                onClick={() =>
                  savePreferences({
                    essential: true,
                    analytics: preferences.analytics,
                  })
                }
              >
                Save Preferences
              </Button>
              <Button
                className="h-11 rounded-full px-5 font-semibold"
                onClick={acceptAll}
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
