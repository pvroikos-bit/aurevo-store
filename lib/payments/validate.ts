import { products } from "@/lib/store-data"
import { isValidEmail } from "@/lib/payments/cart"
import { resolveStripePriceId } from "@/lib/payments/stripe-price-map"
import type {
  CheckoutFailure,
  CheckoutRequest,
  CheckoutShipping,
  ValidatedLineItem,
} from "@/lib/payments/types"

const MAX_QUANTITY = 99
const MAX_FIELD_LENGTH = 120
const MAX_PHONE_LENGTH = 32
const COUNTRY_CODE_PATTERN = /^[A-Z]{2}$/

function normalizeQuantity(value: unknown): number | null {
  const quantity = Math.floor(Number(value))

  if (!Number.isFinite(quantity) || quantity < 1) {
    return null
  }

  return Math.min(quantity, MAX_QUANTITY)
}

function normalizeRequiredText(
  value: unknown,
  maxLength = MAX_FIELD_LENGTH
): string | null {
  if (typeof value !== "string") {
    return null
  }

  const trimmed = value.trim().replace(/\s+/g, " ")

  if (!trimmed || trimmed.length > maxLength) {
    return null
  }

  return trimmed
}

function normalizeOptionalText(
  value: unknown,
  maxLength = MAX_FIELD_LENGTH
): string | undefined {
  if (typeof value !== "string") {
    return undefined
  }

  const trimmed = value.trim().replace(/\s+/g, " ")

  if (!trimmed) {
    return undefined
  }

  if (trimmed.length > maxLength) {
    return undefined
  }

  return trimmed
}

function validateShipping(
  shipping: CheckoutRequest["customer"]["shipping"] | undefined
): { ok: true; shipping: CheckoutShipping } | CheckoutFailure {
  if (!shipping || typeof shipping !== "object") {
    return {
      ok: false,
      status: 400,
      code: "INVALID_SHIPPING",
      message: "Enter your shipping details.",
    }
  }

  const fullName = normalizeRequiredText(shipping.fullName)
  const country = normalizeRequiredText(shipping.country, 2)?.toUpperCase()
  const city = normalizeRequiredText(shipping.city)
  const postalCode = normalizeRequiredText(shipping.postalCode, 32)
  const streetAddress = normalizeRequiredText(shipping.streetAddress)
  const apartment = normalizeOptionalText(shipping.apartment)
  const phone = normalizeOptionalText(shipping.phone, MAX_PHONE_LENGTH)

  if (!fullName) {
    return {
      ok: false,
      status: 400,
      code: "INVALID_SHIPPING",
      message: "Enter your full name.",
    }
  }

  if (!country || !COUNTRY_CODE_PATTERN.test(country)) {
    return {
      ok: false,
      status: 400,
      code: "INVALID_SHIPPING",
      message: "Select a valid country.",
    }
  }

  if (!city) {
    return {
      ok: false,
      status: 400,
      code: "INVALID_SHIPPING",
      message: "Enter your city.",
    }
  }

  if (!postalCode) {
    return {
      ok: false,
      status: 400,
      code: "INVALID_SHIPPING",
      message: "Enter your postal / ZIP code.",
    }
  }

  if (!streetAddress) {
    return {
      ok: false,
      status: 400,
      code: "INVALID_SHIPPING",
      message: "Enter your street address.",
    }
  }

  if (shipping.phone && !phone) {
    return {
      ok: false,
      status: 400,
      code: "INVALID_SHIPPING",
      message: "Enter a valid phone number.",
    }
  }

  if (shipping.apartment && !apartment) {
    return {
      ok: false,
      status: 400,
      code: "INVALID_SHIPPING",
      message: "Enter a valid apartment / suite.",
    }
  }

  return {
    ok: true,
    shipping: {
      fullName,
      country,
      city,
      postalCode,
      streetAddress,
      ...(phone ? { phone } : {}),
      ...(apartment ? { apartment } : {}),
    },
  }
}

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

  const shippingResult = validateShipping(input.customer?.shipping)

  if (!shippingResult.ok) {
    return shippingResult
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

    const quantity = normalizeQuantity(item.quantity)

    if (quantity === null) {
      return {
        ok: false,
        status: 400,
        code: "INVALID_BODY",
        message: `Invalid quantity for ${product.name}.`,
      }
    }

    validatedItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
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
      shipping: shippingResult.shipping,
    },
  }
}
