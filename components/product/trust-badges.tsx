import { CreditCard, Lock, Star, Zap } from "lucide-react"

const badges = [
  { icon: Lock, label: "Secure Checkout" },
  { icon: Zap, label: "Instant Digital Delivery" },
  { icon: CreditCard, label: "Visa • Mastercard • Apple Pay" },
  { icon: Star, label: "Trusted by 18,000+ Customers" },
] as const

export function TrustBadges() {
  return (
    <div
      aria-label="Purchase trust assurances"
      className="mt-4 rounded-2xl border border-border/50 bg-card/20 p-3.5 sm:mt-5 sm:p-4"
    >
      <ul className="grid grid-cols-1 gap-2.5 min-[390px]:grid-cols-2 sm:gap-3">
        {badges.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2.5 rounded-xl border border-border/40 bg-background/40 px-3 py-2.5"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border/45 bg-muted/25">
              <Icon className="size-3.5 text-primary/85" aria-hidden />
            </span>
            <span className="text-[11px] font-medium leading-snug tracking-[-0.01em] text-foreground/85 sm:text-xs">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
