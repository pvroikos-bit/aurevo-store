import { JsonLd } from "@/components/seo/json-ld"
import { createPageMetadata, faqItems } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers about instant delivery, lifetime access, refunds, and SkroojMoney digital products.",
  path: "/faq",
})

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <JsonLd data={faqSchema} />
      {children}
    </>
  )
}
