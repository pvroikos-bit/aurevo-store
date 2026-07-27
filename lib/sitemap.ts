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

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function buildSitemapEntries(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    // Prefer trailing slash on the homepage for crawler consistency.
    url: route === "" ? `${siteConfig.url}/` : absoluteUrl(route),
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

export function getSitemapXml(): string {
  const entries = buildSitemapEntries()

  const urls = entries
    .map((entry) => {
      const lastmod =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified
            ? new Date(entry.lastModified).toISOString()
            : undefined

      const priority =
        typeof entry.priority === "number"
          ? entry.priority.toFixed(1)
          : undefined

      return [
        "<url>",
        `<loc>${escapeXml(entry.url)}</loc>`,
        lastmod ? `<lastmod>${lastmod}</lastmod>` : "",
        entry.changeFrequency
          ? `<changefreq>${entry.changeFrequency}</changefreq>`
          : "",
        priority ? `<priority>${priority}</priority>` : "",
        "</url>",
      ]
        .filter(Boolean)
        .join("")
    })
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`
}
