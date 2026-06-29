import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Read the SkroojMoney terms of service for digital product purchases, usage rights, and account policies.",
  path: "/terms",
})

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
