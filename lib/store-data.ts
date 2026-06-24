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
    id: "all-in-one-supplier-vault",
    name: "All-In-One Products Pack",
    category: "Bundles",
    description:
      "Every verified supplier, tool, and template we offer — bundled into one premium vault. The fastest way to launch your reselling business.",
    price: 49.99,
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
  },
  {
    id: "earphones",
    name: "AirP0ds Pro 2",
    category: "earphones",
   description:"🎧 Premium AirPods Pro 2 supplier • Verified contact ✅ • Fast shipping 🌍 • High margins 💰",
    price: 19.99,
   oldPrice: 29.99,
    image: "/products/mentorship.png",
    badge: "Limited",
    stock: "12 left",
    rating: 5,
    sales: 612,
  },
  {
    id: "cologne-supplier",
    name: "All Cologne Designer Vendors",
    category: "Suppliers",
    description:
  "💎 Luxury fragrance suppliers • Top designer brands 🔥 • Worldwide shipping 🌍 • High profits 💰",
    price: 19.99,
    oldPrice: 29.99,
    image: "/products/cologne-supplier.png",
    stock: "In Stock",
    rating: 5,
    sales: 1890,
  },
  {
    id: "watch-supplier",
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
  },
  {
    id: "apparel-supplier",
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
  },
  {
    id: "tech-supplier",
    name: "!ph0ne 17 pro",
    category: "Suppliers",
    description:
      "Reliable electronics suppliers covering phones, audio, and accessories at unbeatable reseller pricing.",
    price: 14.99,
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
