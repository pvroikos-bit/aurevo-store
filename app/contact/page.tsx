export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-6 text-4xl font-bold">
        Contact Us
      </h1>

      <div className="rounded-xl border border-border p-6">
        <p className="text-lg">
          📧 Email: skroojmoney@gmail.com
        </p>

        <p className="mt-4">
          Need help with your order, suppliers, or product access?
        </p>

        <p className="mt-2">
          Join our Discord support server:
        </p>

        <a
          href="https://discord.gg/kAbCfrZ6rA"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          Join Discord Support
        </a>
      </div>
    </main>
  )
}