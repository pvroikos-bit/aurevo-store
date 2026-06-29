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
  const { replaceCart } = useCart()

  return (
    <button
      type="button"
      onClick={() => {
        replaceCart({
          id,
          name,
          price,
        })

        router.push("/checkout")
      }}
      className="mt-8 w-full rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground outline-none transition-[background-color,transform] duration-200 ease-out hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px active:bg-primary/95 motion-reduce:transition-none motion-reduce:active:translate-y-0"
    >
      Buy Now 💪
    </button>
  )
}
