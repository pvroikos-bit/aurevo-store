const logos = ["VISA", "Mastercard", "PayPal", "Crypto", "Apple Pay", "Stripe"]

export function TrustBar() {
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
Trusted by 18,000+ Resellers • Instant Delivery • Secure Payments        </p>
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
  <div className="rounded-xl border border-border bg-card p-4 text-center">
    🔒 Secure Payments
  </div>

  <div className="rounded-xl border border-border bg-card p-4 text-center">
    ⚡ Instant Access
  </div>

  <div className="rounded-xl border border-border bg-card p-4 text-center">
    🌍 Worldwide Delivery
  </div>

  <div className="rounded-xl border border-border bg-card p-4 text-center">
    💎 Lifetime Access
  </div>
</div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logos.map((logo) => (
            <span
              key={logo}
className="font-heading text-xl font-bold tracking-tight text-muted-foreground/70 transition-colors hover:text-primary"            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
