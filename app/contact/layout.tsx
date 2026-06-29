import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact SkroojMoney support by email or Discord for help with orders, suppliers, and product access.",
  path: "/contact",
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
