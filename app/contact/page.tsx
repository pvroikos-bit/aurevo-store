import { cn, focusRingClass, primaryActionClass } from "@/lib/utils"

export default function ContactPage() {
  return (
    <main id="main-content" className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-6 text-4xl font-bold">Contact Us</h1>

      <div className="rounded-xl border border-border p-6">
        <p className="text-lg">
          📧 Email:{" "}
          <a
            href="mailto:skroojmoney@gmail.com"
            className={cn(
              "font-medium text-primary underline-offset-4 hover:underline",
              focusRingClass
            )}
          >
            skroojmoney@gmail.com
          </a>
        </p>

        <p className="mt-4 leading-relaxed text-muted-foreground">
          Need help with your order, suppliers, or product access?
        </p>

        <p className="mt-2 leading-relaxed text-muted-foreground">
          Join our Discord support server:
        </p>

        <a
          href="https://discord.gg/kAbCfrZ6rA"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(primaryActionClass, "mt-6")}
        >
          Join Discord Support
        </a>
      </div>
    </main>
  )
}
