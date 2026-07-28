import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Checkout Cancelled",
  description:
    "Your payment was not completed. Return to checkout or continue browsing products.",
  path: "/checkout/cancel",
  noIndex: true,
})

export default function CheckoutCancelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
