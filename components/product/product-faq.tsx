"use client"

import { useId, useState } from "react"
import { ChevronDown } from "lucide-react"
import { siteConfig } from "@/lib/seo"
import { cn } from "@/lib/utils"

const faqItems = [
  {
    question: "What do I receive after purchase?",
    answer:
      "Instant digital access to your full product — verified vendors, contacts, and resources. Ready the moment checkout completes.",
  },
  {
    question: "How fast is delivery?",
    answer:
      "Immediate. Access arrives within minutes. EU supplier shipments typically land in 4–9 days.",
  },
  {
    question: "Is this beginner friendly?",
    answer:
      "Yes. Clear, step-by-step guidance so you can start sourcing and selling with confidence — no experience required.",
  },
  {
    question: "Will I receive future updates?",
    answer:
      "Yes. Lifetime updates are included free, so your access stays current as listings and resources improve.",
  },
  {
    question: "Can I use this worldwide?",
    answer:
      "Yes. Access from anywhere. Verified vendors ship to 100+ countries.",
  },
  {
    question: "How can I contact support?",
    answer: `Email ${siteConfig.email} anytime. Our team responds quickly on purchases and access.`,
  },
] as const


export function ProductFaq() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      aria-labelledby="product-faq-heading"
      className="mt-12 sm:mt-16"
    >
      <h2
        id="product-faq-heading"
        className="font-heading text-[1.625rem] font-semibold tracking-[-0.025em] text-balance text-foreground min-[360px]:text-2xl sm:text-3xl"
      >
        Frequently Asked Questions
      </h2>

      <div className="mt-5 rounded-2xl border border-border/50 bg-card/20 sm:mt-6">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index
          const panelId = `${baseId}-panel-${index}`
          const triggerId = `${baseId}-trigger-${index}`

          return (
            <div
              key={item.question}
              className="border-b border-border/40 last:border-b-0"
            >
              <h3>
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left outline-none transition-colors duration-200 ease-out hover:bg-muted/10 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-inset min-[360px]:px-5 min-[360px]:py-4 sm:px-6 sm:py-5"
                >
                  <span className="text-sm font-medium leading-snug tracking-[-0.01em] text-foreground sm:text-[0.9375rem]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out motion-reduce:transition-none",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                hidden={!isOpen}
                className="overflow-hidden px-4 pb-4 min-[360px]:px-5 sm:px-6 sm:pb-5"
              >
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
