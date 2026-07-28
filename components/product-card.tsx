"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Infinity as InfinityIcon,
  Plus,
  ShieldCheck,
  Star,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/store-data"
import { useCart } from "@/components/cart-context"
import { toGa4Item, trackAddToCart } from "@/lib/analytics/ga4"
import { formatInteger } from "@/lib/utils"

function badgeStyles(badge: string) {
  switch (badge) {
    case "Best Value":
      return "border-primary/40 bg-primary/15 text-primary"
    case "Popular":
      return "border-border/60 bg-muted/30 text-foreground/85"
    case "New":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
    case "Limited":
      return "border-amber-500/30 bg-amber-500/10 text-amber-400"
    default:
      return "border-border/50 bg-background/90 text-foreground/75"
  }
}

function isLimitedStock(stock: string) {
  return stock !== "Unlimited" && stock !== "In Stock"
}

type ProductCardProps = {
  product: Product
  highlighted?: boolean
}

export function ProductCard({ product, highlighted = false }: ProductCardProps) {
  const { addToCart } = useCart()

  const savings =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : null

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card/20 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)] transition-[border-color,background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:bg-card/35 motion-reduce:transform-none motion-reduce:transition-none ${
        highlighted
          ? "border-primary/35 shadow-[0_0_0_1px_oklch(0.62_0.19_256/0.12),0_20px_48px_-28px_oklch(0.62_0.19_256/0.45)]"
          : "border-border/35 hover:border-border/55 hover:shadow-[0_20px_40px_-28px_oklch(0_0_0/0.55)]"
      }`}
    >
      {highlighted && (
        <span className="absolute right-3 top-3 z-10 rounded-full border border-primary/35 bg-background/95 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-primary min-[360px]:text-[10px]">
          Top pick
        </span>
      )}

      <Link
        href={`/products/${product.id}`}
        aria-label={`View ${product.name}`}
        className="flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-muted/15 sm:aspect-square">
          {product.badge && (
            <span
              className={`absolute left-3 top-3 z-10 max-w-[calc(100%-5.5rem)] truncate rounded-full border px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] min-[360px]:max-w-none min-[360px]:text-[10px] ${badgeStyles(product.badge)}`}
            >
              {product.badge}
            </span>
          )}

          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent"
          />
        </div>

        <div className="flex flex-1 flex-col px-4 pt-4 min-[360px]:px-5 min-[360px]:pt-5 sm:px-6 sm:pt-5">
          <div className="mb-2.5 flex flex-col items-start gap-1.5 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between min-[390px]:gap-2">
            <span className="rounded-full border border-border/40 bg-muted/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {product.category}
            </span>
            <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <Star
                  className="size-3 shrink-0 fill-primary/80 text-primary/80"
                  aria-hidden
                />
                <span className="tabular-nums font-medium">{product.rating}.0</span>
              </span>
              {product.sales > 0 && (
                <>
                  <span className="text-muted-foreground/35" aria-hidden>
                    ·
                  </span>
                  <span className="flex items-center gap-0.5 tabular-nums">
                    <TrendingUp className="size-3 shrink-0" aria-hidden />
                    {formatInteger(product.sales)}+ sold
                  </span>
                </>
              )}
            </span>
          </div>

          <h3 className="line-clamp-2 break-words font-heading text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-foreground sm:text-lg">
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground/90 sm:text-sm">
            {product.description}
          </p>

          <div className="mt-auto pt-4 sm:pt-5">
            <div className="rounded-xl border border-border/35 bg-background/25 p-3 min-[360px]:p-3.5">
              <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-heading text-xl font-bold tracking-tight tabular-nums text-foreground sm:text-2xl">
                      €{product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs tabular-nums text-muted-foreground/65 line-through sm:text-sm">
                        €{product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {savings !== null && savings > 0 && (
                    <span className="inline-flex w-fit rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      Save {savings}% today
                    </span>
                  )}
                </div>

                <span
                  className={`shrink-0 text-[10px] sm:text-xs ${
                    isLimitedStock(product.stock)
                      ? "font-medium text-amber-400/90"
                      : "text-muted-foreground/60"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {product.stock === "Unlimited" ? (
                      <InfinityIcon className="size-3 shrink-0" aria-hidden />
                    ) : null}
                    <span className="truncate">{product.stock}</span>
                  </span>
                </span>
              </div>
            </div>

            <p className="mt-2.5 flex items-center gap-1.5 text-[10px] text-muted-foreground/70 sm:text-xs">
              <ShieldCheck className="size-3 shrink-0 text-primary/70" aria-hidden />
              Instant digital delivery after payment
            </p>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4 pt-1 min-[360px]:px-5 min-[360px]:pb-5 sm:px-6 sm:pb-6">
        <Button
          className="min-h-11 h-11 w-full justify-center gap-1.5 rounded-full text-[13px] font-semibold shadow-[0_8px_24px_-12px_oklch(0.62_0.19_256/0.55)] transition-[box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-[0_12px_28px_-12px_oklch(0.62_0.19_256/0.65)] motion-reduce:transform-none sm:text-sm"
          onClick={() => {
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
            })
            trackAddToCart(
              toGa4Item({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
              })
            )
          }}
        >
          <Plus className="size-3.5 shrink-0" aria-hidden />
          Add to Cart
        </Button>
      </div>
    </article>
  )
}
