import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Refund Policy",
  description:
    "Review the SkroojMoney refund policy for digital products, access delivery, and support requests.",
  path: "/refund-policy",
})

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
