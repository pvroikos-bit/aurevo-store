import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import { CartProvider } from "@/components/cart-context"
import { rootMetadata } from "@/lib/seo"

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
    <body className="font-sans antialiased">
      <CartProvider>
        {children}
      </CartProvider>

      {process.env.NODE_ENV === "production" && <Analytics />}
    </body>
  </html>
  )
}
