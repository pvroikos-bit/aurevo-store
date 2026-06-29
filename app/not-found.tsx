import Link from "next/link"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist or may have been moved.",
  noIndex: true,
})

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-muted-foreground">
        The page you requested could not be found.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
      >
        Return home
      </Link>
    </main>
  )
}
