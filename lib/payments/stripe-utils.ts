import type Stripe from "stripe"
import type {
  CheckoutCustomer,
  ValidatedLineItem,
} from "@/lib/payments/types"

const METADATA_SEPARATOR = " | "

export function buildCheckoutMetadata(
  items: ValidatedLineItem[],
  customer: CheckoutCustomer
): Stripe.MetadataParam {
  const metadata: Record<string, string> = {
    product_id: items.map((item) => item.id).join(","),
    product_name: items.map((item) => item.name).join(METADATA_SEPARATOR),
    price: items.map((item) => item.price.toFixed(2)).join(","),
  }

  if (customer.email) {
    metadata.customer_email = customer.email
  }

  if (customer.discordUsername) {
    metadata.discord_username = customer.discordUsername
  }

  return metadata
}

export function toStripeLineItems(
  items: ValidatedLineItem[]
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  return items.map((item) => {
    if (item.stripePriceId) {
      return {
        price: item.stripePriceId,
        quantity: item.quantity,
      }
    }

    return {
      quantity: item.quantity,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.name,
          metadata: {
            product_id: item.id,
            product_name: item.name,
            price: item.price.toFixed(2),
          },
        },
      },
    }
  })
}

export function isCheckoutSessionPaid(
  session: Stripe.Checkout.Session
): boolean {
  return session.payment_status === "paid"
}
