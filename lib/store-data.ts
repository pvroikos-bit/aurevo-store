export type Product = {
  id: string
  name: string
  category: string
  description: string
  price: number
  oldPrice?: number
  image: string
  badge?: string
  stock: string
  rating: number
  sales: number
  featured?: boolean
}

export const products: Product[] = [
  {
    id: "all-in-one-bundle",
    name: "All-In-One Supplier Vault",
    category: "Bundles",
    description:
      "Every verified supplier, tool, and template we offer — bundled into one premium vault. The fastest way to launch your reselling business.",
    price: 39.99,
    oldPrice: 89.99,
    image: "/products/supplier-bundle.png",
    badge: "Best Value",
    stock: "Unlimited",
    rating: 5,
    sales: 4820,
    featured: true,
  },
  {
    id: "reselling-blueprint",
    name: "The Reselling Blueprint",
    category: "Guides",
    description:
      "A 120-page premium playbook covering sourcing, pricing, scaling, and automation — written by 7-figure resellers.",
    price: 24.99,
    oldPrice: 49.99,
    image: "/products/ebook-guide.png",
    badge: "New",
    stock: "Unlimited",
    rating: 5,
    sales: 2140,
    featured: true,
  },
  {
    id: "receipt-generator",
    name: "Receipt Generator Pro",
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
  },
  {
    id: "mentorship",
    name: "1:1 Elite Mentorship",
    category: "Coaching",
    description:
      "Weekly private calls with a dedicated mentor, custom growth roadmap, and direct access to our inner circle.",
    price: 47.0,
    oldPrice: 99.0,
    image: "/products/mentorship.png",
    badge: "Limited",
    stock: "12 left",
    rating: 5,
    sales: 612,
  },
  {
    id: "cologne-supplier",
    name: "Designer Cologne Supplier",
    category: "Suppliers",
    description:
      "Verified contacts for premium 1:1 designer fragrances with worldwide shipping and tracked delivery.",
    price: 14.99,
    oldPrice: 29.99,
    image: "/products/cologne-supplier.png",
    stock: "In Stock",
    rating: 5,
    sales: 1890,
  },
  {
    id: "watch-supplier",
    name: "Luxury Watch Supplier",
    category: "Suppliers",
    description:
      "Top-tier horology suppliers offering premium timepieces with authentication and insured shipping.",
    price: 14.99,
    oldPrice: 34.99,
    image: "/products/watch-supplier.png",
    stock: "In Stock",
    rating: 5,
    sales: 1340,
  },
  {
    id: "apparel-supplier",
    name: "Apparel & Sneaker Supplier",
    category: "Suppliers",
    description:
      "Trusted apparel and footwear suppliers with the best margins on premium streetwear and designer pieces.",
    price: 12.99,
    oldPrice: 24.99,
    image: "/products/apparel-supplier.png",
    stock: "In Stock",
    rating: 5,
    sales: 2510,
  },
  {
    id: "tech-supplier",
    name: "Premium Tech Supplier",
    category: "Suppliers",
    description:
      "Reliable electronics suppliers covering phones, audio, and accessories at unbeatable reseller pricing.",
    price: 12.99,
    oldPrice: 24.99,
    image: "/products/tech-supplier.png",
    stock: "In Stock",
    rating: 4,
    sales: 980,
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
    name: "Marcus T.",
    handle: "@marcusresells",
    date: "Jun 09, 2026",
    rating: 5,
    text: "Made back my investment in the first week. The All-In-One Vault is genuinely the best money I've spent on my business.",
  },
  {
    name: "Sofia R.",
    handle: "@sofiaflips",
    date: "Jun 06, 2026",
    rating: 5,
    text: "The mentorship calls changed everything. Went from $0 to consistent $3k months in 90 days. Incredible support.",
  },
  {
    name: "David K.",
    handle: "@dk_trades",
    date: "May 30, 2026",
    rating: 5,
    text: "Instant delivery, real suppliers, no fluff. Receipt Generator Pro alone is worth the price. Highly recommend.",
  },
  {
    name: "Amara N.",
    handle: "@amara.co",
    date: "May 24, 2026",
    rating: 5,
    text: "I was skeptical at first but the quality is unmatched. Everything is verified and the team actually replies fast.",
  },
  {
    name: "Liam P.",
    handle: "@liamp",
    date: "May 18, 2026",
    rating: 5,
    text: "Premium feel from start to finish. The blueprint is packed with strategies I hadn't seen anywhere else.",
  },
  {
    name: "Chloe W.",
    handle: "@chloewins",
    date: "May 11, 2026",
    rating: 5,
    text: "Best reselling platform I've used. Clean dashboard, fast delivery, and the suppliers are top quality.",
  },
]
