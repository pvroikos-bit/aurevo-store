import { products } from "@/lib/store-data"
import { BuyNowButton } from "@/components/buy-now-button"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product = products.find((p) => p.id === id)

  if (!product) {
    return <h1>Product not found</h1>
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-2xl border border-border object-cover"
            />
          </div>
        </div>

        <div>
          {product.badge && (
            <span className="inline-block rounded-full bg-blue-500 px-3 py-1 text-sm text-white">
              {product.badge}
            </span>
          )}

          <h1 className="mt-4 text-5xl font-bold">
            {product.name}
          </h1>

          <p className="mt-4 text-lg opacity-80">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-4xl font-bold">
              €{product.price}
            </span>

            {product.oldPrice && (
              <span className="text-xl line-through opacity-60">
                €{product.oldPrice}
              </span>
            )}
          </div>

          <div className="mt-6 space-y-3">
            <p>✅ Verified supplier contact</p>
            <p>🌍 Fast international shipping</p>
            <p>💰 High profit margins</p>
            <p>⚡ Beginner-friendly setup</p>
            <p>🚀 Instant digital delivery</p>
          </div>

          <div className="mt-8 rounded-xl border border-border p-4">
            <p className="font-semibold">
              ⭐⭐⭐⭐⭐ 4.9/5 Rating
            </p>

            <p className="mt-2 text-sm opacity-80">
              Trusted by 18,000+ resellers worldwide.
            </p>
          </div>

          <BuyNowButton
            id={product.id}
            name={product.name}
            price={product.price}
          />
        </div>
      </div>
    </div>
  )
}