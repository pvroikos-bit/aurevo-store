import { LegalPage } from "@/components/legal-page"
import { siteConfig } from "@/lib/seo"

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      lastUpdated="July 27, 2026"
      intro={`${siteConfig.name} sells digital products with instant delivery. Please read this policy carefully before purchasing.`}
      contactEmail={siteConfig.email}
      sections={[
        {
          title: "All sales are generally final",
          paragraphs: [
            "Because access is delivered electronically immediately after payment, we cannot reverse digital delivery the way a physical return works. Once your order confirmation and access links have been sent, the sale is final.",
          ],
        },
        {
          title: "When we can help",
          bullets: [
            "You paid but did not receive the confirmation email or access instructions within a reasonable time.",
            "A delivered link is broken or inaccessible due to an error on our side.",
            "A duplicate charge occurred for the same order.",
          ],
          paragraphs: [
            "In these cases, contact support with your Stripe receipt or checkout session ID. We will verify the payment and restore access or correct the issue as appropriate.",
          ],
        },
        {
          title: "What is not refundable",
          bullets: [
            "Change of mind after digital access was delivered.",
            "Failure to check spam/junk folders for the order email.",
            "Dissatisfaction with business results after using supplier lists or guides.",
            "Purchases made with incorrect email addresses provided at checkout (we will still try to re-send access if you contact us promptly).",
          ],
        },
        {
          title: "How to contact support",
          paragraphs: [
            `Email ${siteConfig.email} with your order email, approximate purchase time, and any receipt ID. We aim to reply within 1–2 business days.`,
          ],
        },
        {
          title: "Chargebacks",
          paragraphs: [
            "If you open a chargeback without contacting us first about a delivery issue, we may share order and delivery records with the payment processor. We encourage reaching out so we can resolve access problems quickly.",
          ],
        },
      ]}
    />
  )
}
