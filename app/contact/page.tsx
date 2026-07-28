import Link from "next/link"
import { Mail, MessageCircle } from "lucide-react"
import { env } from "@/lib/env"
import { siteConfig } from "@/lib/seo"
import {
  cn,
  contentPageHeadingClass,
  contentPageMainClass,
  focusRingClass,
  primaryActionClass,
  secondaryActionClass,
} from "@/lib/utils"

export default function ContactPage() {
  return (
    <main id="main-content" className={contentPageMainClass}>
      <h1 className={contentPageHeadingClass}>Contact Us</h1>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Need help with an order, product access, or a billing question? Reach out
        and include your order email plus receipt ID when possible.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="rounded-2xl border border-border/40 bg-card/15 p-5 sm:p-6">
          <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <Mail className="size-4 text-primary" aria-hidden />
          </div>
          <h2 className="mt-4 font-heading text-lg font-semibold text-foreground">
            Email support
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Best for order issues, missing emails, and access problems.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className={cn(
              "mt-4 inline-flex break-all text-sm font-semibold text-primary underline-offset-4 hover:underline",
              focusRingClass
            )}
          >
            {siteConfig.email}
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            Typical reply time: {siteConfig.supportHours}.
          </p>
        </div>

        <div className="rounded-2xl border border-border/40 bg-card/15 p-5 sm:p-6">
          <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <MessageCircle className="size-4 text-primary" aria-hidden />
          </div>
          <h2 className="mt-4 font-heading text-lg font-semibold text-foreground">
            Community Discord
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Join the public community for updates and general reseller questions.
          </p>
          <a
            href={env.social.discord}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(primaryActionClass, "mt-5 w-full sm:w-auto")}
          >
            Open Discord
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border/40 bg-background/30 p-5 text-sm leading-relaxed text-muted-foreground sm:p-6">
        <p className="font-medium text-foreground">Before you message</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Check spam/junk for your SkroojMoney order confirmation.</li>
          <li>Include your checkout email and Stripe receipt or session ID.</li>
          <li>
            Review the{" "}
            <Link
              href="/faq"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              FAQ
            </Link>{" "}
            and{" "}
            <Link
              href="/refund-policy"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Refund Policy
            </Link>{" "}
            for common delivery questions.
          </li>
        </ul>
        <Link
          href="/faq"
          className={cn(secondaryActionClass, "mt-5 w-full sm:w-auto")}
        >
          Read FAQ
        </Link>
      </div>
    </main>
  )
}
