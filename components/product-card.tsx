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
import { formatInteger } from "@/lib/utils"

function badgeStyles(badge: string) {
  switch (badge) {
    case "Best Value":
      return "border-primary/35 bg-primary/10 text-primary"
    case "Popular":
      return "border-border/60 bg-muted/30 text-foreground/80"
    case "New":
      return "border-border/60 bg-background/90 text-foreground/75"
    case "Limited":
      return "border-border/55 bg-muted/25 text-muted-foreground"
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
    <Link
      href={`/products/${product.id}`}
      aria-label={`View ${product.name}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card/25 shadow-[0_1px_0_0_oklch(1_0_0/0.03)] outline-none transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-border/60 hover:bg-card/45 hover:shadow-[0_12px_32px_-24px_oklch(0_0_0/0.5)] focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none motion-reduce:transition-none ${
        highlighted
          ? "border-primary/30"
          : "border-border/35"
      }`}
    >
      {highlighted && (
        <span className="absolute right-2.5 top-2.5 z-10 rounded-md border border-primary/30 bg-background/95 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-primary min-[360px]:right-3.5 min-[360px]:top-3.5 min-[360px]:text-[10px]">
          Top pick
        </span>
      )}

      <div className="relative aspect-square shrink-0 overflow-hidden bg-muted/20">
        {product.badge && (
          <span
            className={`absolute left-2.5 top-2.5 z-10 max-w-[calc(100%-5rem)] truncate rounded-md border px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.08em] min-[360px]:left-3.5 min-[360px]:top-3.5 min-[360px]:max-w-none min-[360px]:text-[10px] min-[360px]:tracking-[0.1em] ${badgeStyles(product.badge)}`}
          >
            {product.badge}
          </span>
        )}

        <Image
          src={product.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-background/5 to-transparent"
        />
      </div>

      <div className="flex min-h-[15rem] flex-1 flex-col px-4 pb-4 pt-3.5 min-[360px]:min-h-[14rem] min-[360px]:px-5 min-[360px]:pb-5 min-[360px]:pt-4 sm:min-h-[14.5rem] sm:px-6 sm:pb-6 sm:pt-5">
        <div className="mb-2 flex flex-col items-start gap-1 min-[390px]:mb-2.5 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between min-[390px]:gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/80">
            {product.category}
          </span>
          <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <Star
                className="size-3 shrink-0 fill-primary/80 text-primary/80"
                aria-hidden
              />
              <span className="tabular-nums">{product.rating}.0</span>
            </span>
            {product.sales > 0 && (
              <>
                <span className="text-muted-foreground/40" aria-hidden>
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

        <h3 className="line-clamp-2 break-words font-heading text-base font-semibold leading-snug tracking-[-0.01em] text-foreground min-[360px]:text-[1.0625rem] sm:text-lg">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-[2.5rem] break-words text-[13px] leading-relaxed text-muted-foreground/90">
          {product.description}
        </p>

        <div className="mt-auto pt-3.5 min-[360px]:pt-4 sm:pt-5">
          <div className="flex flex-col gap-1 min-[390px]:flex-row min-[390px]:flex-wrap min-[390px]:items-end min-[390px]:justify-between min-[390px]:gap-x-3 min-[390px]:gap-y-1">
            <div className="flex min-w-0 flex-col gap-0.5">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-heading text-lg font-bold tracking-tight tabular-nums text-foreground min-[360px]:text-xl">
                  €{product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-xs tabular-nums text-muted-foreground/70 line-through">
                    €{product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {savings !== null && savings > 0 && (
                <span className="text-[10px] font-medium text-primary/90">
                  Save {savings}% today
                </span>
              )}
            </div>

            <span
              className={`shrink-0 text-left text-[10px] min-[390px]:text-right ${
                isLimitedStock(product.stock)
                  ? "font-medium text-muted-foreground"
                  : "text-muted-foreground/55"
              }`}
            >
              <span className="flex items-center gap-1 min-[390px]:justify-end">
                {product.stock === "Unlimited" ? (
                  <InfinityIcon className="size-3 shrink-0" aria-hidden />
                ) : null}
                <span className="truncate">{product.stock}</span>
              </span>
            </span>
          </div>

          <p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground/60">
            <ShieldCheck className="size-3 shrink-0" aria-hidden />
            Instant digital delivery
          </p>

          <Button
            className="mt-3 min-h-11 h-11 w-full justify-center gap-1.5 rounded-full text-[13px] font-semibold sm:mt-4 sm:h-11 sm:text-sm"
            onClick={(e) => {
              e.preventDefault()

              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
              })
            }}
          >
            <Plus className="size-3.5 shrink-0" aria-hidden />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  )
}
