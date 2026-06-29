import { faqItems } from "@/lib/seo"

export default function FAQPage() {
  return (
    <main id="main-content" className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-6 text-4xl font-bold">
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
