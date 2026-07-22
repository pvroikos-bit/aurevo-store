import { env } from "@/lib/env"
import { siteConfig } from "@/lib/seo"
import {
  cn,
  contentPageHeadingClass,
  contentPageMainClass,
  focusRingClass,
  primaryActionClass,
} from "@/lib/utils"

export default function ContactPage() {
  return (
    <main id="main-content" className={contentPageMainClass}>
      <h1 className={contentPageHeadingClass}>Contact Us</h1>

      <div className="rounded-xl border border-border p-4 sm:p-6">
        <p className="text-base sm:text-lg">
          📧 Email:{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className={cn(
              "font-medium text-primary underline-offset-4 hover:underline",
              focusRingClass
            )}
          >
            {siteConfig.email}
          </a>
        </p>

        <p className="mt-4 leading-relaxed text-muted-foreground">
          Need help with your order, suppliers, or product access?
        </p>

        <p className="mt-2 leading-relaxed text-muted-foreground">
          Join our Discord support server:
        </p>

        <a
          href={env.social.discord}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(primaryActionClass, "mt-6")}
        >
          Join Discord Support
        </a>
      </div>
    </main>
  )
}
