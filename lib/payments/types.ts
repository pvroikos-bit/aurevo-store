export type CartLineItem = {
  id: string
  name: string
  price: number
  quantity: number
}

export type CheckoutCustomer = {
  email: string
  discordUsername?: string
}

export type CheckoutRequest = {
  items: CartLineItem[]
  customer: CheckoutCustomer
}

export type ValidatedLineItem = CartLineItem & {
  stripePriceId?: string
  checkoutUrl?: string
}

export type CheckoutSession = {
  provider: "external" | "stripe"
  redirectUrl: string
  sessionId?: string
}

export type CheckoutErrorCode =
  | "EMPTY_CART"
  | "INVALID_EMAIL"
  | "PRODUCT_NOT_FOUND"
  | "PRODUCT_UNAVAILABLE"
  | "MULTI_ITEM_UNSUPPORTED"
  | "PROVIDER_NOT_CONFIGURED"
  | "STRIPE_ERROR"
  | "INVALID_BODY"
  | "INVALID_SESSION"
  | "WEBHOOK_ERROR"

export type CheckoutFailure = {
  ok: false
  status: number
  code: CheckoutErrorCode
  message: string
}

export type CheckoutSuccess = {
  ok: true
  data: CheckoutSession
}

export type CheckoutResult = CheckoutSuccess | CheckoutFailure
