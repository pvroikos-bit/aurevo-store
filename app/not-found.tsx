import Link from "next/link"
import { createPageMetadata } from "@/lib/seo"
import { cn, primaryActionClass } from "@/lib/utils"

export const metadata = createPageMetadata({
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist or may have been moved.",
  noIndex: true,
})

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-muted-foreground">
        The page you requested could not be found.
      </p>
      <Link href="/" className={cn(primaryActionClass, "mt-8 rounded-full px-6 text-sm")}>
        Return home
      </Link>
    </main>
  )
}
