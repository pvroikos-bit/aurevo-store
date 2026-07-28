import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

type PageShellProps = {
  children: React.ReactNode
  /** Optional top announcement (homepage only). */
  announcement?: React.ReactNode
}

/** Shared chrome for customer-facing pages — header, footer, consistent trust frame. */
export function PageShell({ children, announcement }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {announcement}
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
