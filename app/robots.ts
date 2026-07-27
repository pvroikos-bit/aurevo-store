import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  const host = new URL(siteConfig.url).host

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/success"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host,
  }
}
