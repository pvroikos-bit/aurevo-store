export type Product = {
  id: string
  name: string
  category: string
  description: string
  price: number
  oldPrice?: number
  image: string
  images?: string[]
  badge?: string
  stock: string
  rating: number
  sales: number
  featured?: boolean
  checkoutUrl?: string
  stripePriceId?: string
  /** Product-specific deliverables shown on the product page. */
  whatsIncluded?: string[]
}

const categoryWhatsIncluded: Record<string, string[]> = {
  Bundles: [
    "Verified suppliers, tools, and templates in one vault",
    "Winning products list and reselling resources",
    "Instant digital delivery after purchase",
    "Lifetime updates included",
  ],
  Guides: [
    "Premium digital playbook download",
    "Sourcing, pricing, scaling, and automation strategies",
    "Instant access after purchase",
    "Lifetime access to your copy",
  ],
  Tools: [
    "Full digital tool access",
    "Lifetime updates and priority support",
    "Instant activation after purchase",
    "Beginner-friendly setup",
  ],
  Suppliers: [
    "✅ 1:1 Premium Vendors",
    "🚚 Fast EU Shipping (4–9 Days)",
    "🧾 Receipt Included",
    "🌍 Worldwide Shipping",
    "💬 Step-by-Step Support from Our Team",
  ],
}

export function getProductWhatsIncluded(product: Product): string[] {
  if (product.whatsIncluded?.length) {
    return product.whatsIncluded
  }

  return (
    categoryWhatsIncluded[product.category] ?? [
      "Instant digital delivery after purchase",
      "Lifetime access to your purchase",
      "Secure checkout",
    ]
  )
}

export function getRelatedProducts(
  currentProduct: Product,
  limit = 3
): Product[] {
  const others = products.filter((product) => product.id !== currentProduct.id)
  const sameCategory = others.filter(
    (product) => product.category === currentProduct.category
  )
  const otherCategories = others.filter(
    (product) => product.category !== currentProduct.category
  )

  return [...sameCategory, ...otherCategories].slice(0, limit)
}

export const products: Product[] = [
  {
    id: "all-in-one-supplier-vault",
    name: "All-In-One Products Pack",
    category: "Bundles",
    description:
      "Every verified supplier, tool, and template we offer — bundled into one premium vault. The fastest way to launch your reselling business.",
    price: 1.99,
    oldPrice: 89.99,
    image: "/products/supplier-bundle.png",
    badge: "Best Value",
    stock: "Unlimited",
    rating: 5,
    sales: 4820,
    featured: true,
    checkoutUrl:
  "https://skrooj.mysellauth.com/product/all-in-one-products-pack",
    whatsIncluded: [
      "500+ verified supplier contacts",
      "Winning products list",
      "Reselling blueprint ebook",
      "Receipt generator tool access",
      "Instant digital delivery",
      "Lifetime updates",
    ],
  },
  {
    id: "reselling-blueprint",
    name: "Reselling ebook, Best Seller",
    category: "Guides",
    description:
      "A 120-page premium playbook covering sourcing, pricing, scaling, and automation — written by 7-figure resellers.",
    price: 19.99,
    oldPrice: 49.99,
    image: "/products/ebook-guide.png",
    badge: "New",
    stock: "Unlimited",
    rating: 5,
    sales: 2140,
    featured: true,
    whatsIncluded: [
      "120-page premium reselling playbook",
      "Sourcing, pricing, scaling, and automation guides",
      "Written by experienced resellers",
      "Instant PDF download",
      "Lifetime access",
    ],
  },
  {
    id: "receipt-generator",
    name: "Receipt Generator, All Products",
    category: "Tools",
    description:
      "Generate clean, accurate receipts for 400+ brands instantly. Lifetime updates and priority support included.",
    price: 19.99,
    oldPrice: 59.99,
    image: "/products/receipt-tool.png",
    badge: "Popular",
    stock: "Unlimited",
    rating: 5,
    sales: 3675,
    featured: true,
    checkoutUrl: "#",
    whatsIncluded: [
      "Receipt generator for 400+ brands",
      "Lifetime updates",
      "Priority support",
      "Instant tool access after purchase",
    ],
  },
  {
  id: "airpods-pro-2",
  name: "AirPods Pro 2 ANC Vendor",
  category: "Suppliers",
  description:
    "🎧 Premium AirPods Pro 2 supplier • Verified contact ✅ • Fast shipping 🌍 • High margins 💰",
  price: 19.99,
  oldPrice: 29.99,
  image: "/products/airpods-pro2.png",
  badge: "Limited",
  stock: "12 left",
  rating: 5,
  sales: 612,
  checkoutUrl:
    "https://skrooj.mysellauth.com/product/airp0ds-pro-2-vendor",
},
{
  id: "airpods-pro-3",
  name: "AirP0ds Pro 3 Vendor",
  category: "Suppliers",
  description:
    "🎧 Premium AirPods Pro 3 supplier • Verified contact ✅ • Fast shipping 🌍 • High margins 💰",
  price: 19.99,
  oldPrice: 29.99,
  image: "/products/airpods-pro3.png",
  badge: "Limited",
  stock: "12 left",
  rating: 5,
  sales: 612,
  checkoutUrl: "https://skrooj.mysellauth.com/product/airp0ds-pro-3-vendor",
},
{
  id: "airpods-4-anc",
  name: "AirP0ds 4 ANC Vendor",
  category: "Suppliers",
  description:
    "🎧 Premium AirPods 4 supplier • Verified contact ✅ • Fast shipping 🌍 • High margins 💰",
  price: 19.99,
  oldPrice: 29.99,
  image: "/products/airpods4-anc.png",
  badge: "Limited",
  stock: "12 left",
  rating: 5,
  sales: 612,
  checkoutUrl: "#",
},
{
  id: "airpods-max",
  name: "AirP0ds Max ANC Vendor",
  category: "Suppliers",
  description:
    "🎧 Premium AirPods Max supplier • Verified contact ✅ • Fast shipping 🌍 • High margins 💰",
  price: 19.99,
  oldPrice: 29.99,
  image: "/products/airpods-max.png",
  badge: "Limited",
  stock: "12 left",
  rating: 5,
  sales: 612,
  checkoutUrl: "#",
},
{
  id: "lv-imagination-vendor",
  name: "Lv Imag!nat1on Cologne Vendors",
  category: "Suppliers",
  description:
    "💎 Luxury fragrance suppliers • Top designer brands 🔥 • Worldwide shipping 🌍 • High profits 💰",
  price: 19.99,
  oldPrice: 29.99,
  image: "/products/cologne-supplier.png",
  stock: "In Stock",
  rating: 5,
  sales: 1890,
  checkoutUrl: "#",
},
{
  id: "rolex-vendor",
  name: "R0$ex Vendor",
  category: "Suppliers",
  description:
    "⌚ Premium watch supplier • Luxury models 💎 • Trusted vendor ✅ • Strong margins 💰",
  price: 19.99,
  oldPrice: 34.99,
  image: "/products/watch-supplier.png",
  stock: "In Stock",
  rating: 5,
  sales: 1340,
  checkoutUrl: "#",
},
{
  id: "nike-shox-vendor",
  name: "N!KE Sh0x Vendor",
  category: "Suppliers",
  description:
    "Trusted apparel and footwear suppliers with the best margins on premium streetwear and designer pieces.",
  price: 14.99,
  oldPrice: 24.99,
  image: "/products/apparel-supplier.png",
  stock: "In Stock",
  rating: 5,
  sales: 2510,
  checkoutUrl: "#",
},
{
  id: "iphone-17-pro",
  name: "!ph0ne 17 Pro Vendor",
  category: "Suppliers",
  description:
    "Reliable electronics suppliers covering phones, audio, and accessories at unbeatable reseller pricing.",
  price: 14.99,
  oldPrice: 24.99,
  image: "/products/tech-supplier.png",
  stock: "In Stock",
  rating: 4,
  sales: 980,
  checkoutUrl: "#",
},
{
  id: "prada-glasses",
  name: "Pr@da Glasses Vendor",
  category: "Suppliers",
  description:
    "Premium eyewear supplier • Verified contact ✅ • Worldwide shipping 🌍 • High margins 💰",
  price: 14.99,
  oldPrice: 24.99,
  image: "/products/pr@da-glass.png",
  stock: "In Stock",
  rating: 4,
  sales: 980,
  checkoutUrl: "#",
},
]

export type Testimonial = {
  name: string
  handle: string
  date: string
  rating: number
  text: string
}

export const testimonials: Testimonial[] = [
  {
  name: "Alex M.",
  handle: "@alexm",
  date: "Jun 12, 2025",
  rating: 5,
  text: "The supplier list saved me weeks of research. Found several products worth testing immediately."
},
{
  name: "Daniel R.",
  handle: "@danielr",
  date: "Jun 08, 2025",
  rating: 5,
  text: "Fast delivery and well organized. Everything was easy to access after purchase."
},
{
  name: "Michael T.",
  handle: "@michaelt",
  date: "Jun 02, 2025",
  rating: 4.8,
  text: "Good selection of suppliers. The fragrance contacts alone were worth the price."
},
{
  name: "Sarah W.",
  handle: "@sarahw",
  date: "May 27, 2025",
  rating: 5,
  text: "Clean dashboard, instant access and useful resources for beginners."
},
{
  name: "Chris P.",
  handle: "@chrisp",
  date: "May 19, 2025",
  rating: 5,
  text: "Exactly what I was looking for. No unnecessary content, just useful supplier information."
},
{
  name: "Kevin J.",
  handle: "@kevinj",
  date: "May 11, 2025",
  rating: 5,
  text: "The All-In-One Vault is a great starting point if you're building your first store."
}
]
