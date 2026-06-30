import { products } from "@/lib/store-data"
import { isValidEmail } from "@/lib/payments/cart"
import { resolveStripePriceId } from "@/lib/payments/stripe-price-map"
import type {
  CheckoutFailure,
  CheckoutRequest,
  ValidatedLineItem,
} from "@/lib/payments/types"

type ValidationSuccess = {
  ok: true
  items: ValidatedLineItem[]
  customer: CheckoutRequest["customer"]
}

type ValidationResult = ValidationSuccess | CheckoutFailure

export function validateCheckoutRequest(
  input: CheckoutRequest
): ValidationResult {
  if (!input.items?.length) {
    return {
      ok: false,
      status: 400,
      code: "EMPTY_CART",
      message: "Your cart is empty.",
    }
  }

  const email = input.customer?.email?.trim() ?? ""

  if (!isValidEmail(email)) {
    return {
      ok: false,
      status: 400,
      code: "INVALID_EMAIL",
      message: "Enter a valid email address.",
    }
  }

  const validatedItems: ValidatedLineItem[] = []

  for (const item of input.items) {
    const product = products.find((entry) => entry.id === item.id)

    if (!product) {
      return {
        ok: false,
        status: 404,
        code: "PRODUCT_NOT_FOUND",
        message: `Product not found: ${item.id}`,
      }
    }

    validatedItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: Math.max(1, item.quantity),
      stripePriceId: resolveStripePriceId(
        product.id,
        product.stripePriceId
      ),
      checkoutUrl: product.checkoutUrl,
    })
  }

  return {
    ok: true,
    items: validatedItems,
    customer: {
      email,
      discordUsername: input.customer?.discordUsername?.trim() || undefined,
    },
  }
}
