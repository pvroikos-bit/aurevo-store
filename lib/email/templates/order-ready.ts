const WHATSAPP_URL = "https://wa.link/yzvwzk"
const SUPPORT_EMAIL = "orders@skrooj.com"

function getDeliveryDiscordUrl(): string {
  return (
    process.env.NEXT_PUBLIC_DELIVERY_DISCORD_URL?.trim() ||
    "https://discord.gg/2VTNdBy8ez"
  )
}

export type OrderReadyProduct = {
  name: string
  quantity: number
}

export type OrderReadyEmailContent = {
  subject: string
  text: string
  html: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function formatProductLine(product: OrderReadyProduct): string {
  const qty = product.quantity > 1 ? ` × ${product.quantity}` : ""
  return `${product.name}${qty}`
}

function buildProductListText(products: OrderReadyProduct[]): string {
  if (products.length === 0) {
    return "- Your digital product order"
  }

  return products.map((product) => `- ${formatProductLine(product)}`).join("\n")
}

function buildProductListHtml(products: OrderReadyProduct[]): string {
  const items =
    products.length > 0
      ? products
      : [{ name: "Your digital product order", quantity: 1 }]

  return items
    .map(
      (product) =>
        `<li style="margin:0 0 8px 0;font-size:15px;line-height:1.5;color:#e5e5e5;">${escapeHtml(formatProductLine(product))}</li>`
    )
    .join("")
}

export function buildOrderReadyEmail(
  products: OrderReadyProduct[]
): OrderReadyEmailContent {
  const productListText = buildProductListText(products)
  const productListHtml = buildProductListHtml(products)
  const discordUrl = getDeliveryDiscordUrl()

  return {
    subject: "Your SkroojMoney Order",
    text: `Thank you for your purchase!

Your payment has been successfully processed and your order is confirmed.

Order details:
${productListText}

Your digital products are ready. Access them using the links below:

WhatsApp Community
Join here to access your digital product:
${WHATSAPP_URL}

Private Discord Server
Join here for full product access and future updates:
${discordUrl}

Need help? Reply to this email or contact ${SUPPORT_EMAIL} and we'll be happy to help.

Thank you for choosing SkroojMoney.`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Your SkroojMoney Order</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0a0a0a;color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#0a0a0a;margin:0;padding:0;width:100%;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;width:100%;background-color:#111111;border:1px solid #1f1f1f;border-radius:20px;overflow:hidden;">
            <tr>
              <td align="center" style="padding:40px 28px 16px 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" style="width:72px;height:72px;border-radius:999px;background-color:#12261a;border:1px solid #22c55e;">
                      <span style="display:inline-block;font-size:36px;line-height:72px;color:#22c55e;">✓</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:8px 28px 0 28px;">
                <h1 style="margin:0;font-size:28px;line-height:1.25;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
                  Thank you for your purchase!
                </h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:16px 28px 0 28px;">
                <p style="margin:0;font-size:16px;line-height:1.6;color:#c4c4c4;">
                  Your payment has been successfully processed and your order is confirmed.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 0 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;background-color:#0a0a0a;border:1px solid #1f1f1f;border-radius:14px;">
                  <tr>
                    <td style="padding:20px;">
                      <h2 style="margin:0 0 12px 0;font-size:16px;line-height:1.4;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:0.04em;">
                        Order confirmation
                      </h2>
                      <ul style="margin:0;padding:0 0 0 18px;">
                        ${productListHtml}
                      </ul>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:20px 28px 0 28px;">
                <p style="margin:0;font-size:15px;line-height:1.6;color:#a3a3a3;">
                  Your digital products are ready. Use the access links below to get started instantly.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 0 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;background-color:#0a0a0a;border:1px solid #1f1f1f;border-radius:14px;">
                  <tr>
                    <td style="padding:20px;">
                      <h2 style="margin:0;font-size:18px;line-height:1.4;font-weight:700;color:#ffffff;">
                        WhatsApp Community
                      </h2>
                      <p style="margin:10px 0 0 0;font-size:14px;line-height:1.6;color:#a3a3a3;">
                        Join our exclusive WhatsApp community to access your digital product.
                      </p>
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:18px;width:100%;">
                        <tr>
                          <td align="center" bgcolor="#25D366" style="border-radius:12px;background-color:#25D366;">
                            <a href="${WHATSAPP_URL}" target="_blank" style="display:inline-block;width:100%;box-sizing:border-box;padding:16px 20px;font-size:16px;font-weight:700;line-height:1.2;color:#ffffff;text-decoration:none;text-align:center;">
                              Join WhatsApp Community
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px 0 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;background-color:#0a0a0a;border:1px solid #1f1f1f;border-radius:14px;">
                  <tr>
                    <td style="padding:20px;">
                      <h2 style="margin:0;font-size:18px;line-height:1.4;font-weight:700;color:#ffffff;">
                        Private Discord Server
                      </h2>
                      <p style="margin:10px 0 0 0;font-size:14px;line-height:1.6;color:#a3a3a3;">
                        Join our private Discord server for full product access and future updates.
                      </p>
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:18px;width:100%;">
                        <tr>
                          <td align="center" bgcolor="#5865F2" style="border-radius:12px;background-color:#5865F2;">
                            <a href="${discordUrl}" target="_blank" style="display:inline-block;width:100%;box-sizing:border-box;padding:16px 20px;font-size:16px;font-weight:700;line-height:1.2;color:#ffffff;text-decoration:none;text-align:center;">
                              Join Discord Server
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:28px 28px 0 28px;">
                <p style="margin:0;font-size:14px;line-height:1.6;color:#a3a3a3;">
                  Need help? Reply to this email or contact
                  <a href="mailto:${SUPPORT_EMAIL}" style="color:#22c55e;text-decoration:none;">${SUPPORT_EMAIL}</a>
                  and we'll be happy to help.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:16px 28px 40px 28px;">
                <p style="margin:0;font-size:15px;line-height:1.6;color:#e5e5e5;font-weight:600;">
                  Thank you for choosing SkroojMoney.
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:20px 0 0 0;font-size:12px;line-height:1.5;color:#737373;text-align:center;">
            SkroojMoney
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  }
}
