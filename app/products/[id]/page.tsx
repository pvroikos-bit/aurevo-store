import { products } from "@/lib/store-data"

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
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="flex justify-center">
  <img
    src={product.image}
    alt={product.name}
    className="h-28 w-auto rounded-xl border object-contain"
  />
</div>
        </div>

        <div>
<span className="inline-block rounded-full bg-blue-500 px-3 py-1 text-sm">            {product.badge}
          </span>

          <h1 className="mt-4 text-5xl font-bold">
            {product.name}
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-4xl font-bold">
              €{product.price}
            </span>

            <span className="text-xl line-through opacity-60">
              €{product.oldPrice}
            </span>
          </div>

          <p className="mt-6 text-lg opacity-80">
            {product.description}
          </p>

<button className="mt-8 w-full rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700">            Buy Now 💪
          </button>
        </div>
      </div>
    </div>
  )
}