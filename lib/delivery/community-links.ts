function isAbsoluteHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "https:"
  } catch {
    return false
  }
}

function readDeliveryDiscordUrl(): string {
  return (
    process.env.DELIVERY_DISCORD_URL?.trim() ||
    process.env.NEXT_PUBLIC_DELIVERY_DISCORD_URL?.trim() ||
    ""
  )
}

export function getDeliveryDiscordUrl(): string | null {
  const url = readDeliveryDiscordUrl()
  return isAbsoluteHttpsUrl(url) ? url : null
}
