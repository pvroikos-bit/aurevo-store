import { LegalPage } from "@/components/legal-page"
import { siteConfig } from "@/lib/seo"

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="July 27, 2026"
      intro={`These Terms of Service (“Terms”) govern your use of ${siteConfig.url} and any digital products purchased from ${siteConfig.name}. By browsing or completing a purchase, you agree to these Terms.`}
      contactEmail={siteConfig.email}
      sections={[
        {
          title: "Digital products",
          bullets: [
            "All products sold on this site are digital goods (supplier lists, guides, tools, or access credentials).",
            "Access is delivered electronically after successful payment — typically by email and/or community invite links.",
            "Products are licensed for personal use by the purchasing customer only.",
          ],
        },
        {
          title: "License and restrictions",
          bullets: [
            "You may use purchased materials for your own reselling or business activities.",
            "You may not resell, redistribute, publicly share, or publish our lists, guides, or private community access.",
            "You may not scrape, copy, or reverse-engineer the store for competing products.",
            "We may revoke access if we reasonably believe these Terms were violated.",
          ],
        },
        {
          title: "Accounts, orders, and payments",
          bullets: [
            "You must provide accurate checkout information (email and billing details).",
            "Payments are processed securely by Stripe. Prices are shown in EUR unless stated otherwise.",
            "An order is confirmed when Stripe reports a successful paid payment.",
          ],
        },
        {
          title: "No guarantee of earnings",
          paragraphs: [
            "Supplier contacts, guides, and tools are informational resources. Results depend on your effort, market conditions, and compliance with local laws. We do not guarantee profits, sales volume, or supplier availability over time.",
          ],
        },
        {
          title: "Refunds",
          paragraphs: [
            "Refund eligibility is described in our Refund Policy. Because products are digital and delivered immediately, most sales are final once access is granted.",
          ],
        },
        {
          title: "Disclaimer of warranties",
          paragraphs: [
            "The site and products are provided “as is” to the fullest extent permitted by law. We do not warrant uninterrupted access or that supplier contacts will remain valid indefinitely.",
          ],
        },
        {
          title: "Limitation of liability",
          paragraphs: [
            `To the maximum extent permitted by law, ${siteConfig.name} is not liable for indirect, incidental, or consequential damages arising from use of the site or products. Our total liability for any claim related to a purchase is limited to the amount you paid for that purchase.`,
          ],
        },
        {
          title: "Changes to the Terms",
          paragraphs: [
            "We may update these Terms periodically. Continued use of the site after changes constitutes acceptance of the revised Terms.",
          ],
        },
      ]}
    />
  )
}
