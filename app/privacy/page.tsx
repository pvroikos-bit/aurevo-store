import { LegalPage } from "@/components/legal-page"
import { siteConfig } from "@/lib/seo"

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="July 27, 2026"
      intro={`${siteConfig.name} (“we”, “us”) operates ${siteConfig.url}. This policy explains what information we collect when you browse or buy digital products, how we use it, and your choices.`}
      contactEmail={siteConfig.email}
      sections={[
        {
          title: "Information we collect",
          bullets: [
            "Account and order details you provide at checkout (name, email, billing address, optional phone and Discord username).",
            "Payment information processed by Stripe — we do not store full card numbers on our servers.",
            "Technical data such as browser type, device, and approximate location derived from IP address for security and analytics.",
            "Usage analytics via Google Analytics 4 (page views and ecommerce events) when you visit the site in production.",
          ],
        },
        {
          title: "How we use information",
          bullets: [
            "To process payments, confirm orders, and deliver digital product access.",
            "To send order confirmation emails and respond to support requests.",
            "To improve site performance, prevent fraud, and understand which products customers browse or purchase.",
            "To comply with legal and accounting obligations.",
          ],
        },
        {
          title: "Processors and third parties",
          paragraphs: [
            "We share data only with service providers needed to run the store:",
          ],
          bullets: [
            "Stripe — payment processing and fraud prevention.",
            "Resend — transactional order emails.",
            "Vercel — website hosting and infrastructure.",
            "Google Analytics — aggregated traffic and conversion analytics.",
          ],
        },
        {
          title: "Cookies and analytics",
          paragraphs: [
            "We use essential cookies required for the site to function (for example, cart state in your browser). Google Analytics may set cookies or similar identifiers to measure visits. You can block analytics cookies in your browser settings; essential checkout features will still work.",
          ],
        },
        {
          title: "Data retention",
          paragraphs: [
            "Order and support records are kept as long as needed for delivery, chargeback defense, tax, and legal compliance. Analytics data is retained according to Google Analytics settings for our property.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Depending on where you live, you may request access, correction, or deletion of personal data we hold about you. Email us with your order reference and we will respond within a reasonable time.",
          ],
        },
        {
          title: "Children",
          paragraphs: [
            "Our products are intended for adults. We do not knowingly collect personal information from children under 16.",
          ],
        },
        {
          title: "Changes",
          paragraphs: [
            "We may update this policy as our services change. The “Last updated” date at the top reflects the latest revision.",
          ],
        },
      ]}
    />
  )
}
