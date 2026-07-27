"use client"

import { useEffect } from "react"
import { toGa4Item, trackViewItem } from "@/lib/analytics/ga4"

type ViewItemTrackerProps = {
  id: string
  name: string
  price: number
}

export function ViewItemTracker({ id, name, price }: ViewItemTrackerProps) {
  useEffect(() => {
    trackViewItem(toGa4Item({ id, name, price, quantity: 1 }))
  }, [id, name, price])

  return null
}
