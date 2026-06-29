import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Checkout",
  description: "Complete your SkroojMoney order securely.",
  path: "/checkout",
  noIndex: true,
})

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
