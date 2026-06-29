import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Order Confirmed",
  description: "Your SkroojMoney purchase was successful.",
  path: "/success",
  noIndex: true,
})

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
