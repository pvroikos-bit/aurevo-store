"use client"

import { useEffect } from "react"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { siteConfig } from "@/lib/seo"
import {
  centeredPageHeadingClass,
  centeredPageMainClass,
  cn,
  primaryActionClass,
  secondaryActionClass,
} from "@/lib/utils"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <PageShell>
      <main id="main-content" className={centeredPageMainClass}>
        <h1 className={centeredPageHeadingClass}>Something went wrong</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          We hit an unexpected error. You can try again, return home, or contact
          support if this keeps happening.
        </p>
        {error.digest ? (
          <p className="mt-3 break-all text-xs text-muted-foreground">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className={cn(primaryActionClass, "w-full sm:w-auto")}
          >
            Try again
          </button>
          <Link
            href="/"
            className={cn(secondaryActionClass, "w-full sm:w-auto")}
          >
            Return home
          </Link>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Need help?{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {siteConfig.email}
          </a>
        </p>
      </main>
    </PageShell>
  )
}
