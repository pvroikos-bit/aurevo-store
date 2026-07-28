import Link from "next/link"
import { contentPageHeadingClass, contentPageMainClass } from "@/lib/utils"
import { faqItems, siteConfig } from "@/lib/seo"

export default function FAQPage() {
  return (
    <main id="main-content" className={contentPageMainClass}>
      <h1 className={contentPageHeadingClass}>Frequently Asked Questions</h1>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Quick answers about delivery, access, payments, and support. Still stuck?{" "}
        <Link
          href="/contact"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Contact us
        </Link>{" "}
        at {siteConfig.email}.
      </p>

      <div className="mt-8 space-y-4">
        {faqItems.map((item) => (
          <section
            key={item.question}
            className="rounded-2xl border border-border/40 bg-card/15 p-5 sm:p-6"
          >
            <h2 className="font-heading text-base font-semibold leading-snug tracking-[-0.01em] text-foreground sm:text-lg">
              {item.question}
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </section>
        ))}
      </div>
    </main>
  )
}
