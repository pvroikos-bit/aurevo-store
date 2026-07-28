import { PageShell } from "@/components/page-shell"

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PageShell>{children}</PageShell>
}
