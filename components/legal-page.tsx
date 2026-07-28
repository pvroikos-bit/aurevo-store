import Link from "next/link"
import { cn, contentPageHeadingClass, contentPageMainClass } from "@/lib/utils"

type LegalSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type LegalPageProps = {
  title: string
  lastUpdated: string
  intro?: string
  sections: LegalSection[]
  contactEmail: string
}

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
  contactEmail,
}: LegalPageProps) {
  return (
    <main id="main-content" className={contentPageMainClass}>
      <h1 className={contentPageHeadingClass}>{title}</h1>

      <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Last updated: {lastUpdated}
      </p>

      {intro ? (
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {intro}
        </p>
      ) : null}

      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-heading text-lg font-semibold tracking-[-0.01em] text-foreground sm:text-xl">
              {section.title}
            </h2>

            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="mt-3 text-sm leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}

            {section.bullets && section.bullets.length > 0 ? (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <p className="mt-10 rounded-2xl border border-border/40 bg-card/15 p-4 text-sm leading-relaxed text-muted-foreground sm:p-5">
        Questions about this policy? Email{" "}
        <a
          href={`mailto:${contactEmail}`}
          className={cn(
            "font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          {contactEmail}
        </a>{" "}
        or visit our{" "}
        <Link
          href="/contact"
          className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Contact
        </Link>{" "}
        page.
      </p>
    </main>
  )
}
