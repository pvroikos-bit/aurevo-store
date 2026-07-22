"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { CartLineItem } from "@/lib/payments/types"

type CartContextType = {
  cart: CartLineItem[]
  addToCart: (item: Omit<CartLineItem, "quantity">) => void
  replaceCart: (item: Omit<CartLineItem, "quantity">) => void
  removeFromCart: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)
const CART_STORAGE_KEY = "cart"
const MAX_QUANTITY = 99

function normalizeQuantity(value: unknown): number {
  const quantity = Math.floor(Number(value))

  if (!Number.isFinite(quantity) || quantity < 1) {
    return 1
  }

  return Math.min(quantity, MAX_QUANTITY)
}

function parseStoredCart(raw: string | null): CartLineItem[] {
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as unknown

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.flatMap((item) => {
      if (
        !item ||
        typeof item !== "object" ||
        typeof (item as CartLineItem).id !== "string" ||
        typeof (item as CartLineItem).name !== "string" ||
        typeof (item as CartLineItem).price !== "number"
      ) {
        return []
      }

      return [
        {
          id: (item as CartLineItem).id,
          name: (item as CartLineItem).name,
          price: (item as CartLineItem).price,
          quantity: normalizeQuantity((item as CartLineItem).quantity),
        },
      ]
    })
  } catch {
    return []
  }
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [cart, setCart] = useState<CartLineItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    queueMicrotask(() => {
      setCart(parseStoredCart(localStorage.getItem(CART_STORAGE_KEY)))
      setHydrated(true)
    })
  }, [])

  useEffect(() => {
    if (!hydrated) {
      return
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart, hydrated])

  const addToCart = (
    item: Omit<CartLineItem, "quantity">
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.id === item.id
      )

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                quantity: normalizeQuantity(p.quantity + 1),
              }
            : p
        )
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ]
    })
  }

  const replaceCart = (
    item: Omit<CartLineItem, "quantity">
  ) => {
    setCart([
      {
        ...item,
        quantity: 1,
      },
    ])
  }

  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: normalizeQuantity(item.quantity + 1),
            }
          : item
      )
    )
  }

  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (id: string) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        replaceCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    )
  }

  return context
}
