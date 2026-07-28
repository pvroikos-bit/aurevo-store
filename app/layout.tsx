import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { CookieConsent } from "@/components/cookie-consent"
import { rootMetadata } from "@/lib/seo"

const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-YSNSEPW5PK"
const clarityProjectId =
  process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID?.trim() || "xtfz57vdzx"

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})

export const metadata = rootMetadata

const gaConsentBootstrapScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 2000
});
window.__ga4ConsentDefaultSet = true;
`.trim()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
  <html
    lang="en"
    className={`dark ${geistSans.variable} ${geistMono.variable} ${playfair.variable} bg-background`}
  >
    <head>
      {process.env.NODE_ENV === "production" ? (
        <script dangerouslySetInnerHTML={{ __html: gaConsentBootstrapScript }} />
      ) : null}
    </head>
    <body className="font-sans antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring/60 focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <CartProvider>
        {children}
      </CartProvider>

      {process.env.NODE_ENV === "production" && <Analytics />}
      {process.env.NODE_ENV === "production" ? (
        <CookieConsent
          gaMeasurementId={gaMeasurementId}
          clarityProjectId={clarityProjectId}
        />
      ) : null}
    </body>
  </html>
  )
}
