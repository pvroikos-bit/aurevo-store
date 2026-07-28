export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-3 py-16 min-[360px]:px-4 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl animate-pulse space-y-4" aria-hidden>
        <div className="h-4 w-24 rounded-full bg-muted/40" />
        <div className="h-10 w-3/4 rounded-xl bg-muted/40" />
        <div className="h-4 w-full rounded-lg bg-muted/30" />
        <div className="h-4 w-5/6 rounded-lg bg-muted/30" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="h-40 rounded-2xl border border-border/30 bg-card/20" />
          <div className="h-40 rounded-2xl border border-border/30 bg-card/20" />
        </div>
      </div>
      <p className="sr-only">Loading page…</p>
    </div>
  )
}
