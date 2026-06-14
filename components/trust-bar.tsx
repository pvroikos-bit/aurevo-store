const logos = ["VISA", "Mastercard", "PayPal", "Crypto", "Apple Pay", "Stripe"]

export function TrustBar() {
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Secure checkout with trusted payment partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logos.map((logo) => (
            <span
              key={logo}
              className="font-heading text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
