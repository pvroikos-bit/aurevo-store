import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Stable locale formatting — avoids SSR/client hydration mismatches. */
export function formatInteger(value: number): string {
  return value.toLocaleString('en-US')
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id)

  if (!element) {
    return
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  element.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  })
}

export const focusRingClass =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export const inputFieldClass = cn(
  'w-full rounded-lg border border-border bg-background p-3 text-foreground placeholder:text-muted-foreground transition-colors',
  focusRingClass
)

export const primaryActionClass = cn(
  'inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition-[background-color,opacity] hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60',
  focusRingClass
)

export const secondaryActionClass = cn(
  'inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-8 py-3 font-semibold transition-colors hover:bg-muted/40',
  focusRingClass
)

export const centeredPageMainClass =
  'mx-auto max-w-3xl px-3 py-16 text-center min-[360px]:px-4 sm:px-6 sm:py-24'

export const centeredPageHeadingClass =
  'font-heading text-[1.75rem] font-bold leading-tight tracking-tight text-balance min-[360px]:text-3xl sm:text-4xl lg:text-5xl'

export const contentPageMainClass =
  'mx-auto max-w-4xl px-3 py-16 min-[360px]:px-4 sm:px-6 sm:py-20'

export const contentPageHeadingClass =
  'mb-6 font-heading text-[1.625rem] font-bold leading-tight tracking-tight text-balance min-[360px]:text-3xl sm:text-4xl'
