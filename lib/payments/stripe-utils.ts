import type Stripe from "stripe"
import type {
  CheckoutCustomer,
  CheckoutShipping,
  ValidatedLineItem,
} from "@/lib/payments/types"

const METADATA_SEPARATOR = " | "

export function buildCheckoutMetadata(
  items: ValidatedLineItem[],
  customer: CheckoutCustomer
): Stripe.MetadataParam {
  const { shipping } = customer

  const metadata: Record<string, string> = {
    product_id: items.map((item) => item.id).join(","),
    product_name: items.map((item) => item.name).join(METADATA_SEPARATOR),
    price: items.map((item) => item.price.toFixed(2)).join(","),
    quantity: items.map((item) => String(item.quantity)).join(","),
    shipping_full_name: shipping.fullName,
    shipping_country: shipping.country,
    shipping_city: shipping.city,
    shipping_postal_code: shipping.postalCode,
    shipping_street: shipping.streetAddress,
  }

  if (customer.email) {
    metadata.customer_email = customer.email
  }

  if (customer.discordUsername) {
    metadata.discord_username = customer.discordUsername
  }

  if (shipping.phone) {
    metadata.shipping_phone = shipping.phone
  }

  if (shipping.apartment) {
    metadata.shipping_apartment = shipping.apartment
  }

  return metadata
}

export function toStripeShippingDetails(
  shipping: CheckoutShipping
): Stripe.Checkout.SessionCreateParams.PaymentIntentData.Shipping {
  return {
    name: shipping.fullName,
    ...(shipping.phone ? { phone: shipping.phone } : {}),
    address: {
      line1: shipping.streetAddress,
      ...(shipping.apartment ? { line2: shipping.apartment } : {}),
      city: shipping.city,
      postal_code: shipping.postalCode,
      country: shipping.country,
    },
  }
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
