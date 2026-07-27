import {
  CreditCard,
  Headphones,
  RefreshCw,
  ShieldCheck,
  Zap,
} from "lucide-react"

const logos = ["VISA", "Mastercard", "PayPal", "Crypto", "Apple Pay", "Stripe"]

const trustItems = [
  {
    icon: ShieldCheck,
    label: "Secure Payments",
    desc: "Stripe-protected checkout",
  },
  {
    icon: Zap,
    label: "Instant Delivery",
    desc: "Access in minutes",
  },
  {
    icon: RefreshCw,
    label: "Lifetime Updates",
    desc: "Always stay current",
  },
  {
    icon: Headphones,
    label: "24/7 Support",
    desc: "Help when you need it",
  },
]

export function TrustBar() {
  return (
    <section
      className="border-y border-border/50 bg-card/20"
      aria-label="Trust and payment assurances"
    >
      <div className="mx-auto max-w-7xl px-3 py-8 min-[360px]:px-4 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-2 gap-3 min-[360px]:gap-4 md:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border/40 bg-background/20 px-3 py-4 text-center shadow-[inset_0_1px_0_0_oklch(1_0_0/0.03)] transition-[border-color,background-color,box-shadow] duration-200 ease-out hover:border-primary/25 hover:bg-card/30 motion-reduce:transition-none min-[360px]:px-4 min-[360px]:py-5"
            >
              <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <item.icon className="size-[18px] text-primary" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground sm:text-sm">
                  {item.label}
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground sm:text-xs">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-border/40 pt-8">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
            <CreditCard className="size-3.5" aria-hidden />
            Accepted payment methods
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 min-[360px]:gap-x-9 sm:gap-x-11">
            {logos.map((logo) => (
              <span
                key={logo}
                className="font-heading text-base font-bold tracking-tight text-muted-foreground/60 transition-colors duration-200 ease-out hover:text-foreground/80 motion-reduce:transition-none min-[360px]:text-lg sm:text-xl"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
