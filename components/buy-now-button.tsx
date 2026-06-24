"use client"

import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-context"

type Props = {
  id: string
  name: string
  price: number
}

export function BuyNowButton({
  id,
  name,
  price,
}: Props) {
  const router = useRouter()
  const { addToCart } = useCart()

  return (
    <button
      onClick={() => {
        addToCart({
          id,
          name,
          price,
        })

        router.push("/checkout")
      }}
      className="mt-8 w-full rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition hover:opacity-90"
    >
      Buy Now 💪
    </button>
  )
}