import { contentPageHeadingClass, contentPageMainClass } from "@/lib/utils"

export default function RefundPolicyPage() {
  return (
    <main id="main-content" className={contentPageMainClass}>
      <h1 className={contentPageHeadingClass}>Refund Policy</h1>

      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Due to the digital nature of our products, all sales are final.
        </p>

        <p>Once access has been delivered, refunds cannot be issued.</p>

        <p>
          If you experience technical issues, please contact support.
        </p>
      </div>
    </main>
  )
}
