import { contentPageHeadingClass, contentPageMainClass } from "@/lib/utils"
import { faqItems } from "@/lib/seo"

export default function FAQPage() {
  return (
    <main id="main-content" className={contentPageMainClass}>
      <h1 className={contentPageHeadingClass}>
        Frequently Asked Questions
      </h1>

      <div className="space-y-8">
        {faqItems.map((item) => (
          <section key={item.question}>
            <h2 className="text-lg font-bold leading-snug">
              {item.question}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </section>
        ))}
      </div>
    </main>
  )
}
