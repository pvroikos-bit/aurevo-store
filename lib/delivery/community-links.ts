function isAbsoluteHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "https:"
  } catch {
    return false
  }
}

const DEFAULT_WHATSAPP_URL = "https://wa.link/yzvwzk"

function readDeliveryDiscordUrl(): string {
  return (
    process.env.DELIVERY_DISCORD_URL?.trim() ||
    process.env.NEXT_PUBLIC_DELIVERY_DISCORD_URL?.trim() ||
    ""
  )
}

function readDeliveryWhatsAppUrl(): string {
  return (
    process.env.DELIVERY_WHATSAPP_URL?.trim() ||
    process.env.NEXT_PUBLIC_DELIVERY_WHATSAPP_URL?.trim() ||
    ""
  )
}

export function getDeliveryDiscordUrl(): string | null {
  const url = readDeliveryDiscordUrl()
  return isAbsoluteHttpsUrl(url) ? url : null
}

/**
 * WhatsApp link is needed on the paid success page and order emails.
 * We support overriding it via DELIVERY_WHATSAPP_URL, but keep a safe
 * default so delivery doesn’t break when env vars aren’t configured yet.
 */
export function getDeliveryWhatsAppUrl(): string {
  const url = readDeliveryWhatsAppUrl()
  return isAbsoluteHttpsUrl(url) ? url : DEFAULT_WHATSAPP_URL
}
