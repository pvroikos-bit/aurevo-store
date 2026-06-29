import { faqItems } from "@/lib/seo"

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-6 text-4xl font-bold">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6">
        {faqItems.map((item) => (
          <section key={item.question}>
            <h2 className="font-bold">{item.question}</h2>
            <p>{item.answer}</p>
          </section>
        ))}
      </div>
    </main>
  )
}
