import type { Metadata } from "next"

export const siteConfig = {
  name: "SkroojMoney",
  legalName: "SkroojMoney",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://skroojmoney.com",
  defaultTitle:
    "SkroojMoney — Premium Digital Products & Reselling Suppliers",
  defaultDescription:
    "SkroojMoney is the premium marketplace for verified reselling suppliers, digital tools, and mentorship. Instant delivery, secure payments, trusted by 18,000+ resellers.",
  locale: "en_US",
  email: "support@skroojmoney.com",
  twitterHandle: "@skroojmoneyy",
  ogImage: "/apple-icon.png",
} as const

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
  return `${siteConfig.url}${normalizedPath === "/" ? "" : normalizedPath}`
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
          alt: `${siteConfig.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
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
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: siteConfig.ogImage,
        width: 180,
        height: 180,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [siteConfig.ogImage],
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
    answer: "Instantly after purchase.",
  },
  {
    question: "Do I get lifetime access?",
    answer: "Yes.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Please read our refund policy.",
  },
] as const
