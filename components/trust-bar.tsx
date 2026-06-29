import {
  CreditCard,
  Gem,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react"

const logos = ["VISA", "Mastercard", "PayPal", "Crypto", "Apple Pay", "Stripe"]

const trustItems = [
  { icon: ShieldCheck, label: "Secure Payments" },
  { icon: Zap, label: "Instant Access" },
  { icon: Globe, label: "Worldwide Delivery" },
  { icon: Gem, label: "Lifetime Access" },
]

export function TrustBar() {
  return (
    <section
      className="border-y border-border/60 bg-card/30"
      aria-label="Trust and payment assurances"
    >
      <div className="mx-auto max-w-7xl px-3 py-6 min-[360px]:px-4 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground min-[360px]:text-xs">
          Trusted by 18,000+ Resellers
        </p>
        <p className="mb-5 text-center text-[11px] leading-relaxed text-muted-foreground/70 min-[360px]:mb-6 min-[360px]:text-xs">
          Instant delivery · Secure checkout · Verified supplier network
        </p>

        <div className="mb-6 grid grid-cols-2 gap-2.5 min-[360px]:mb-8 min-[360px]:gap-3 md:grid-cols-4 md:gap-4">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border/50 bg-card/40 px-2.5 py-3.5 text-center transition-[border-color,background-color] duration-200 ease-out hover:border-border/80 hover:bg-card/60 motion-reduce:transition-none min-[360px]:gap-2 min-[360px]:px-3 min-[360px]:py-4"
            >
              <item.icon
                className="size-4 text-muted-foreground"
                aria-hidden
              />
              <span className="text-xs font-medium text-foreground/85">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70">
            <CreditCard className="size-3.5" aria-hidden />
            Accepted payment methods
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 min-[360px]:gap-x-8 sm:gap-x-10 sm:gap-y-3">
            {logos.map((logo) => (
              <span
                key={logo}
                className="font-heading text-base font-bold tracking-tight text-muted-foreground/65 transition-colors duration-200 ease-out hover:text-foreground/75 motion-reduce:transition-none min-[360px]:text-lg sm:text-xl"
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
