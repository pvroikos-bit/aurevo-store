import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how SkroojMoney collects, uses, and protects your personal information when you use our store.",
  path: "/privacy",
})

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
