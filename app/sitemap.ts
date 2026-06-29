import type { MetadataRoute } from "next"
import { products } from "@/lib/store-data"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const staticRoutes = [
  "",
  "/faq",
  "/contact",
  "/terms",
  "/privacy",
  "/refund-policy",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }))

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.id}`),
    lastModified,
    changeFrequency: "weekly",
    priority: product.featured ? 0.9 : 0.8,
  }))

  return [...pages, ...productPages]
}
