export type OrderReadyDeliveryLink = {
  name: string
  label: string
  downloadUrl: string
}

export type OrderReadyEmailInput = {
  orderReference: string
  deliveryItems: OrderReadyDeliveryLink[]
}

const BASE_SUBJECT = "🎉 Welcome to SkroojMoney – Your Order Is Ready"

const BASE_BODY = `Hi,
Thank you for your purchase, and welcome to SkroojMoney!

Your payment has been successfully confirmed, and your order is now ready.

Join our private Discord community using the link below:
https://discord.gg/AKgqy7ByuC

If you prefer, you can also contact our supplier directly on WhatsApp:
📱 +30 697 662 5690

Our Greek supplier is available to assist you in both English and Greek.

Inside our Discord server, you'll get:
• Full access to your purchased products
• Step-by-step guidance
• Product updates
• Direct support from our team
• Access to our private community

Please join the Discord server using the same email address you used for your purchase whenever possible.

If you need any assistance, simply send us your order number on Discord, WhatsApp, or by replying to this email, and we'll be happy to help.

Thank you for choosing SkroojMoney!

Best regards,
The SkroojMoney Team`

function buildDeliverySection(deliveryItems: OrderReadyDeliveryLink[]): string {
  if (deliveryItems.length === 0) {
    return `Your digital access
------------------
Your purchase confirmation is ready. Join Discord using the link above to receive product access and support from our team.`
  }

  const lines = deliveryItems.map(
    (item, index) =>
      `${index + 1}. ${item.name}
   ${item.label}: ${item.downloadUrl}`
  )

  return `Your secure download / access links
------------------------------------
${lines.join("\n\n")}

These links are private and tied to your paid order. Do not share them.`
}

export function buildOrderReadyEmail(input: OrderReadyEmailInput): {
  subject: string
  text: string
  html: string
} {
  const orderSection = `Order reference
---------------
${input.orderReference}`

  const deliverySection = buildDeliverySection(input.deliveryItems)

  const text = `${BASE_BODY}

${orderSection}

${deliverySection}`

  const downloadHtml =
    input.deliveryItems.length > 0
      ? `<h2 style="font-size:16px;margin:24px 0 8px;">Your secure download / access links</h2>
<ul>${input.deliveryItems
          .map(
            (item) =>
              `<li style="margin:0 0 12px;"><strong>${escapeHtml(item.name)}</strong><br/><a href="${escapeHtml(item.downloadUrl)}">${escapeHtml(item.label)}</a></li>`
          )
          .join("")}</ul>
<p style="color:#555;font-size:13px;">These links are private and tied to your paid order. Do not share them.</p>`
      : `<h2 style="font-size:16px;margin:24px 0 8px;">Your digital access</h2>
<p>Your purchase confirmation is ready. Join Discord using the link above to receive product access and support from our team.</p>`

  const html = `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;line-height:1.5;color:#111;max-width:640px;margin:0 auto;padding:24px;">
  <p>Hi,</p>
  <p>Thank you for your purchase, and welcome to SkroojMoney!</p>
  <p>Your payment has been successfully confirmed, and your order is now ready.</p>
  <p>Join our private Discord community using the link below:<br/>
  <a href="https://discord.gg/AKgqy7ByuC">https://discord.gg/AKgqy7ByuC</a></p>
  <p>If you prefer, you can also contact our supplier directly on WhatsApp:<br/>
  📱 +30 697 662 5690</p>
  <p>Our Greek supplier is available to assist you in both English and Greek.</p>
  <p>Inside our Discord server, you'll get:</p>
  <ul>
    <li>Full access to your purchased products</li>
    <li>Step-by-step guidance</li>
    <li>Product updates</li>
    <li>Direct support from our team</li>
    <li>Access to our private community</li>
  </ul>
  <p>Please join the Discord server using the same email address you used for your purchase whenever possible.</p>
  <p>If you need any assistance, simply send us your order number on Discord, WhatsApp, or by replying to this email, and we'll be happy to help.</p>
  <p>Thank you for choosing SkroojMoney!</p>
  <p>Best regards,<br/>The SkroojMoney Team</p>
  <hr style="border:none;border-top:1px solid #ddd;margin:24px 0;" />
  <h2 style="font-size:16px;margin:0 0 8px;">Order reference</h2>
  <p style="font-family:monospace;word-break:break-all;">${escapeHtml(input.orderReference)}</p>
  ${downloadHtml}
</body>
</html>`

  return {
    subject: BASE_SUBJECT,
    text,
    html,
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

/** @deprecated Prefer buildOrderReadyEmail for order-specific content. */
export const orderReadyEmailTemplate = {
  subject: BASE_SUBJECT,
  body: BASE_BODY,
}
