import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Infinity as InfinityIcon, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/store-data"

export function ProductCard({ product }: { product: Product }) {
  return (
<Link
  href={`/products/${product.id}`}
  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50"
>      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary backdrop-blur">
            {product.badge}
          </span>
        )}
        <Image
  src={product.image}
  alt={product.name}
  fill
  className="object-cover"
/>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3 fill-primary text-primary" />
            {product.rating}.0
          </span>
        </div>

        <h3 className="font-heading text-lg font-semibold leading-snug text-foreground">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">€{product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs text-primary">
            {product.stock === "Unlimited" ? (
              <InfinityIcon className="size-3.5" />
            ) : null}
            {product.stock}
          </span>
        </div>
  <Button className="mt-5 h-10 w-full justify-center gap-2 text-sm">
    View Details
    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
  </Button>
</div>
</Link>
)
}