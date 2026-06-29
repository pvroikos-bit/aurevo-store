import { env } from "@/lib/env"
import { createStripeCheckoutSession } from "@/lib/payments/providers/stripe"
import type {
  CheckoutRequest,
  CheckoutResult,
  ValidatedLineItem,
} from "@/lib/payments/types"
import { validateCheckoutRequest } from "@/lib/payments/validate"

function unavailableProductMessage(name: string): string {
  return `${name} is not available for checkout yet.`
}

function isCheckoutUrlReady(url?: string): boolean {
  return Boolean(url && url !== "#")
}

export function createExternalCheckout(
  items: ValidatedLineItem[]
): CheckoutResult {
  if (items.length > 1) {
    return {
      ok: false,
      status: 400,
      code: "MULTI_ITEM_UNSUPPORTED",
      message:
        "Legacy checkout supports one product at a time. Remove extra items or wait for Stripe checkout.",
    }
  }

  const [item] = items

  if (!isCheckoutUrlReady(item.checkoutUrl)) {
    return {
      ok: false,
      status: 400,
      code: "PRODUCT_UNAVAILABLE",
      message: unavailableProductMessage(item.name),
    }
  }

  return {
    ok: true,
    data: {
      provider: "external",
      redirectUrl: item.checkoutUrl!,
    },
  }
}

export async function createStripeCheckout(
  items: ValidatedLineItem[],
  customer: CheckoutRequest["customer"]
): Promise<CheckoutResult> {
  const missingPriceIds = items.filter((item) => !item.stripePriceId)

  if (missingPriceIds.length > 0) {
    return {
      ok: false,
      status: 400,
      code: "PRODUCT_UNAVAILABLE",
      message:
        "One or more products are missing Stripe price IDs. Add stripePriceId in store data before enabling Stripe.",
    }
  }

  return createStripeCheckoutSession(items, customer)
}

export async function createCheckoutSession(
  input: CheckoutRequest
): Promise<CheckoutResult> {
  const validation = validateCheckoutRequest(input)

  if (!validation.ok) {
    return validation
  }

  if (env.paymentProvider === "stripe") {
    return createStripeCheckout(validation.items, validation.customer)
  }

  return createExternalCheckout(validation.items)
}
