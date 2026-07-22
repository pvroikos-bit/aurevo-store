import { contentPageHeadingClass, contentPageMainClass } from "@/lib/utils"

export default function TermsPage() {
  return (
    <main id="main-content" className={contentPageMainClass}>
      <h1 className={contentPageHeadingClass}>Terms of Service</h1>

      <p className="leading-relaxed text-muted-foreground">
        By purchasing any product from SkroojMoney, you agree to these terms.
      </p>

      <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <li>• Digital products are for personal use only.</li>
        <li>• Redistribution is prohibited.</li>
        <li>• Refunds follow our refund policy.</li>
        <li>• Access may be revoked for abuse.</li>
      </ul>
    </main>
  )
}
