import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { createPageMetadata } from "@/lib/seo"
import {
  centeredPageHeadingClass,
  centeredPageMainClass,
  cn,
  primaryActionClass,
  secondaryActionClass,
} from "@/lib/utils"

export const metadata = createPageMetadata({
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist or may have been moved.",
  noIndex: true,
})

export default function NotFound() {
  return (
    <PageShell>
      <main id="main-content" className={centeredPageMainClass}>
        <h1 className={centeredPageHeadingClass}>Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you requested could not be found or may have moved.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className={cn(primaryActionClass, "w-full sm:w-auto")}
          >
            Return home
          </Link>
          <Link
            href="/contact"
            className={cn(secondaryActionClass, "w-full sm:w-auto")}
          >
            Contact support
          </Link>
        </div>
      </main>
    </PageShell>
  )
}
