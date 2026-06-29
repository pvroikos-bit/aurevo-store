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

export function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [cart, setCart] = useState<CartLineItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")

    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

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
                quantity: p.quantity + 1,
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
              quantity: item.quantity + 1,
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
