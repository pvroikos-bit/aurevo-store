"use client"

import { Globe } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LanguageSelector() {
  const router = useRouter()

  const chooseLanguage = (lang: "en" | "el") => {
    localStorage.setItem("language", lang)
    router.push(`/${lang}`)
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060B14] px-6">
      <div className="absolute h-[700px] w-[700px] rounded-full bg-blue-500/10 blur-[180px]" />

      <div className="relative z-10 w-full max-w-xl">
        <div className="text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <Globe className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-5xl font-bold tracking-tight">
            Skrooj<span className="text-primary">Money</span>
          </h1>

          <p className="mt-5 text-lg text-muted-foreground">
            Choose your preferred language
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5">
          <button
            onClick={() => chooseLanguage("en")}
            className="rounded-2xl border border-primary/40 bg-card p-6 transition duration-300 hover:scale-105 hover:border-primary hover:bg-primary/10"
          >
            <div className="text-5xl">🇬🇧</div>

            <h2 className="mt-4 text-xl font-semibold">
              English
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Continue in English
            </p>
          </button>

          <button
            onClick={() => chooseLanguage("el")}
            className="rounded-2xl border border-primary/40 bg-card p-6 transition duration-300 hover:scale-105 hover:border-primary hover:bg-primary/10"
          >
            <div className="text-5xl">🇬🇷</div>

            <h2 className="mt-4 text-xl font-semibold">
              Ελληνικά
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Συνέχεια στα Ελληνικά
            </p>
          </button>
        </div>
      </div>
    </main>
  )
}