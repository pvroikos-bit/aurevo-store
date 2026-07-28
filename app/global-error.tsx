"use client"

import { useEffect } from "react"
import { siteConfig } from "@/lib/seo"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0f0f14",
          color: "#f5f5f5",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: 480, textAlign: "center" }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: 12 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#a3a3a3", lineHeight: 1.6, marginBottom: 24 }}>
            {siteConfig.name} could not load this page. Please try again or email{" "}
            {siteConfig.email}.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              border: 0,
              borderRadius: 999,
              background: "#e11d48",
              color: "white",
              fontWeight: 600,
              padding: "12px 24px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
