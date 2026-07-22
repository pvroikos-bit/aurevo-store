import { contentPageHeadingClass, contentPageMainClass } from "@/lib/utils"

export default function PrivacyPage() {
  return (
    <main id="main-content" className={contentPageMainClass}>
      <h1 className={contentPageHeadingClass}>Privacy Policy</h1>

      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          We collect only the information necessary to process orders and
          provide support.
        </p>

        <p>We never sell customer data to third parties.</p>
      </div>
    </main>
  )
}
