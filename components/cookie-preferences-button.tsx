"use client"

import { openCookiePreferences } from "@/lib/cookie-consent"
import { cn, focusRingClass } from "@/lib/utils"

type CookiePreferencesButtonProps = {
  className?: string
}

export function CookiePreferencesButton({
  className,
}: CookiePreferencesButtonProps) {
  return (
    <button
      type="button"
      onClick={() => openCookiePreferences()}
      className={cn(
        "flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground",
        focusRingClass,
        className
      )}
    >
      Cookie Preferences
    </button>
  )
}
