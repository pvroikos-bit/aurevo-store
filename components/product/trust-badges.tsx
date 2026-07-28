import { Headphones, RefreshCw, ShieldCheck, Zap } from "lucide-react"

const badges = [
  {
    icon: Zap,
    label: "Instant Delivery",
    desc: "Access within minutes",
  },
  {
    icon: ShieldCheck,
    label: "Secure Payment",
    desc: "Stripe-protected checkout",
  },
  {
    icon: RefreshCw,
    label: "Lifetime Access",
    desc: "Updates included forever",
  },
  {
    icon: Headphones,
    label: "Priority Support",
    desc: "Help when you need it",
  },
] as const

export function TrustBadges() {
  return (
    <div
      aria-label="Purchase trust assurances"
      className="mt-4 rounded-2xl border border-border/40 bg-card/15 p-3.5 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.03)] sm:mt-5 sm:p-4"
    >
      <ul className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {badges.map(({ icon: Icon, label, desc }) => (
          <li
            key={label}
            className="group flex items-start gap-2.5 rounded-xl border border-border/35 bg-background/30 px-3 py-2.5 transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/25 hover:bg-card/25 motion-reduce:transform-none motion-reduce:transition-none"
          >
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-primary/15 motion-reduce:transition-none">
              <Icon className="size-3.5 text-primary" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold leading-snug tracking-[-0.01em] text-foreground sm:text-xs">
                {label}
              </span>
              <span className="mt-0.5 block text-[10px] leading-snug text-muted-foreground sm:text-[11px]">
                {desc}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
