import type { ProductAccessLink } from "@/lib/delivery/types"

/**
 * SERVER ONLY — private download/access URLs for each catalog product.
 *
 * Edit the `url` values below. These links are never exposed to the browser
 * directly; customers receive signed proxy URLs after verified payment.
 *
 * For production, you can also set PRODUCT_ACCESS_LINKS (JSON) in env vars
 * to override without editing this file. See .env.example.
 */
const defaultProductAccessLinks: Record<string, ProductAccessLink> = {
  "all-in-one-supplier-vault": {
    label: "Access Supplier Vault",
    url: "",
  },
  "reselling-blueprint": {
    label: "Download Reselling Blueprint",
    url: "",
  },
  "receipt-generator": {
    label: "Access Receipt Generator",
    url: "",
  },
  "airpods-pro-2": {
    label: "Access AirPods Pro 2 Vendor",
    url: "",
  },
  "airpods-pro-3": {
    label: "Access AirPods Pro 3 Vendor",
    url: "",
  },
  "airpods-4-anc": {
    label: "Access AirPods 4 ANC Vendor",
    url: "",
  },
  "airpods-max": {
    label: "Access AirPods Max Vendor",
    url: "",
  },
  "lv-imagination-vendor": {
    label: "Access LV Imagination Vendor",
    url: "",
  },
  "rolex-vendor": {
    label: "Access Rolex Vendor",
    url: "",
  },
  "nike-shox-vendor": {
    label: "Access Nike Shox Vendor",
    url: "",
  },
  "iphone-17-pro": {
    label: "Access iPhone 17 Pro Vendor",
    url: "",
  },
  "prada-glasses": {
    label: "Access Prada Glasses Vendor",
    url: "",
  },
}

function parseEnvOverrides(): Record<string, ProductAccessLink> {
  const raw = process.env.PRODUCT_ACCESS_LINKS

  if (!raw?.trim()) {
    return {}
  }

  try {
    const parsed = JSON.parse(raw) as unknown

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {}
    }

    const overrides: Record<string, ProductAccessLink> = {}

    for (const [productId, value] of Object.entries(parsed)) {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        continue
      }

      const entry = value as Partial<ProductAccessLink>
      const url = typeof entry.url === "string" ? entry.url.trim() : ""
      const label =
        typeof entry.label === "string" && entry.label.trim()
          ? entry.label.trim()
          : "Download"

      if (url) {
        overrides[productId] = { label, url }
      }
    }

    return overrides
  } catch {
    return {}
  }
}

function isAbsoluteHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function getProductAccessLink(
  productId: string
): ProductAccessLink | null {
  const envOverrides = parseEnvOverrides()
  const envEntry = envOverrides[productId]
  const defaultEntry = defaultProductAccessLinks[productId]
  const url = envEntry?.url || defaultEntry?.url.trim() || ""

  if (!url || !isAbsoluteHttpUrl(url)) {
    return null
  }

  return {
    label: envEntry?.label || defaultEntry?.label || "Download",
    url,
  }
}

export function listConfiguredProductAccessIds(): string[] {
  return Object.keys(defaultProductAccessLinks).filter(
    (productId) => getProductAccessLink(productId) !== null
  )
}
