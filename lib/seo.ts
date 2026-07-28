import type { Metadata } from "next"

export const siteConfig = {
  name: "SkroojMoney",
  legalName: "SkroojMoney",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://skrooj.com",
  defaultTitle:
    "SkroojMoney — Premium Digital Products & Reselling Suppliers",
  defaultDescription:
    "SkroojMoney is the premium marketplace for verified reselling suppliers, digital tools, and resources. Instant digital delivery and secure Stripe checkout.",
  locale: "en_US",
  email: "orders@skrooj.com",
  supportHours: "Typically within 1–2 business days",
  twitterHandle: "@skroojmoneyy",
  ogImage: "/og-image.png",
} as const

const OG_IMAGE_WIDTH = 1200
const OG_IMAGE_HEIGHT = 630

type PageMetadataOptions = {
  title: string
  description: string
  path?: string
  ogImage?: string
  noIndex?: boolean
  type?: "website" | "article"
  absoluteTitle?: boolean
}

export function absoluteUrl(path = ""): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${siteConfig.url}${normalizedPath === "/" ? "/" : normalizedPath}`
}

export function createPageMetadata({
  title,
  description,
  path = "",
  ogImage = siteConfig.ogImage,
  noIndex = false,
  type = "website",
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path || "/"
  const url = absoluteUrl(canonicalPath)
  const imageUrl = ogImage.startsWith("http")
    ? ogImage
    : absoluteUrl(ogImage)

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          type: "image/png",
          alt: `${siteConfig.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: siteConfig.twitterHandle,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  }
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: siteConfig.ogImage,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        type: "image/png",
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [siteConfig.ogImage],
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
    shortcut: "/icon-dark-32x32.png",
  },
}

export const faqItems = [
  {
    question: "How do I receive my products?",
    answer:
      "After Stripe confirms payment, you receive an order confirmation email with access instructions. Many products also include community access links (WhatsApp / Discord) on the success page.",
  },
  {
    question: "How fast is delivery?",
    answer:
      "Digital delivery is designed to be instant. Most customers receive access within minutes of a successful payment. If nothing arrives, check spam and contact orders@skrooj.com with your receipt.",
  },
  {
    question: "Do I get lifetime access?",
    answer:
      "Yes. Purchases include lifetime access to the digital product and free updates when we revise included materials, unless a specific product page states otherwise.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Checkout is powered by Stripe. Available methods depend on your location and typically include major cards and other Stripe-enabled options shown at payment.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Because products are digital and delivered immediately, sales are generally final once access is sent. We still help with missing emails, broken links, or duplicate charges — see our Refund Policy.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Email orders@skrooj.com with your order email and receipt ID. You can also use the Contact page. We typically reply within 1–2 business days.",
  },
] as const
