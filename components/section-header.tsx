type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  align?: "center" | "left"
  headingId?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  headingId,
}: SectionHeaderProps) {
  const alignClass =
    align === "center"
      ? "mx-auto max-w-2xl text-center"
      : "max-w-xl text-left"

  return (
    <div className={alignClass}>
      <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/90">
        {eyebrow}
      </span>

      <h2
        id={headingId}
        className="mt-4 font-heading text-[1.75rem] font-bold leading-[1.12] tracking-[-0.03em] text-balance text-foreground min-[360px]:text-3xl sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>

      {description ? (
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base sm:leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export const homeSectionClass =
  "relative mx-auto max-w-7xl px-3 min-[360px]:px-4 sm:px-6 lg:px-8"

export const homeSectionPaddingClass = "py-16 sm:py-24 lg:py-28"

export const homeSectionDividerClass =
  "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
