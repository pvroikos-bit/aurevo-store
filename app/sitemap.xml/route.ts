import { getSitemapXml } from "@/lib/sitemap"

export const runtime = "nodejs"

export async function GET() {
  return new Response(getSitemapXml(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  })
}
