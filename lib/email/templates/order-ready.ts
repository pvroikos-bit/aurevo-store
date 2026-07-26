const WHATSAPP_URL = "https://wa.link/yzvwzk"
const DISCORD_URL = "https://discord.gg/2VTNdBy8ez"

export const orderReadyEmailTemplate = {
  subject: "🎉 Your SkroojMoney Order is Ready!",
  text: `🎉 Thank You for Your Purchase!

Your payment has been successfully processed.

Your digital products are now ready. Click the buttons below to access them instantly.

📲 WhatsApp Community
Click the button below to join our exclusive WhatsApp community and access your digital product.
Join WhatsApp Community: ${WHATSAPP_URL}

💬 Private Discord Server
Click the button below to join our private Discord server and gain full access to your digital product and future updates.
Join Discord Server: ${DISCORD_URL}

If you experience any issues accessing your purchase, simply reply to this email and we'll be happy to help.

Thank you for choosing SkroojMoney.
We truly appreciate your support and hope you enjoy your purchase!`,
  html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Your SkroojMoney Order is Ready</title>
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
                  🎉 Thank You for Your Purchase!
                </h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:16px 28px 0 28px;">
                <p style="margin:0;font-size:16px;line-height:1.6;color:#c4c4c4;">
                  Your payment has been successfully processed.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:12px 28px 0 28px;">
                <p style="margin:0;font-size:15px;line-height:1.6;color:#a3a3a3;">
                  Your digital products are now ready. Click the buttons below to access them instantly.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 28px 0 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;background-color:#0a0a0a;border:1px solid #1f1f1f;border-radius:14px;">
                  <tr>
                    <td style="padding:20px;">
                      <h2 style="margin:0;font-size:18px;line-height:1.4;font-weight:700;color:#ffffff;">
                        📲 WhatsApp Community
                      </h2>
                      <p style="margin:10px 0 0 0;font-size:14px;line-height:1.6;color:#a3a3a3;">
                        Click the button below to join our exclusive WhatsApp community and access your digital product.
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
                        💬 Private Discord Server
                      </h2>
                      <p style="margin:10px 0 0 0;font-size:14px;line-height:1.6;color:#a3a3a3;">
                        Click the button below to join our private Discord server and gain full access to your digital product and future updates.
                      </p>
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:18px;width:100%;">
                        <tr>
                          <td align="center" bgcolor="#5865F2" style="border-radius:12px;background-color:#5865F2;">
                            <a href="${DISCORD_URL}" target="_blank" style="display:inline-block;width:100%;box-sizing:border-box;padding:16px 20px;font-size:16px;font-weight:700;line-height:1.2;color:#ffffff;text-decoration:none;text-align:center;">
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
                  If you experience any issues accessing your purchase, simply reply to this email and we'll be happy to help.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:16px 28px 40px 28px;">
                <p style="margin:0;font-size:15px;line-height:1.6;color:#e5e5e5;font-weight:600;">
                  Thank you for choosing SkroojMoney.
                </p>
                <p style="margin:8px 0 0 0;font-size:14px;line-height:1.6;color:#a3a3a3;">
                  We truly appreciate your support and hope you enjoy your purchase!
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
