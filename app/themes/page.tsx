"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { trackEvent } from "@/lib/analytics"

const themes = [
  { id: "minimal", name: "Minimal", preview: "/minimal.png" },
  { id: "warm", name: "Warm", preview: "/warm.png" },
  { id: "bold", name: "Bold", preview: "/bold.png" },
  { id: "vintage", name: "Vintage", preview: "/vintage.png" },
  { id: "artistic", name: "Artistic", preview: "/artistic.png" },
]

const knownThemes = new Set(themes.map((theme) => theme.id))

const purposeCopy: Record<string, { title: string; helper: string }> = {
  event: {
    title: "Choose a theme for your event story",
    helper: "We’ll use this in your highlight recap.",
  },
  travel: {
    title: "Which theme matches your trip?",
    helper: "Pick the vibe that captures your journey.",
  },
  gifting: {
    title: "Pick a look your recipient will love",
    helper: "You can tweak layouts later.",
  },
}

export default function ThemesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState<string | null>(null)
  const [purpose, setPurpose] = useState<string>("")

  useEffect(() => {
    const queryPurpose = searchParams.get("event")
    const storedPurpose = typeof window !== "undefined" ? localStorage.getItem("selectedPurpose") : null
    const resolvedPurpose = queryPurpose ?? storedPurpose ?? "undisclosed"
    setPurpose(resolvedPurpose)

    const storedTheme = typeof window !== "undefined" ? localStorage.getItem("selectedTheme") : null
    if (storedTheme && knownThemes.has(storedTheme)) {
      setSelected(storedTheme)
    } else if (storedTheme && typeof window !== "undefined") {
      localStorage.removeItem("selectedTheme")
      localStorage.removeItem("selectedStyle")
    }

    trackEvent("theme_step_view", {
      category: "engagement",
      purpose: resolvedPurpose,
    })
  }, [searchParams])

  const heading = useMemo(() => {
    const copy = purposeCopy[purpose]
    if (copy) return copy
    return {
      title: "Choose your zine theme",
      helper: "Pick the tone that fits your story. You can change this later.",
    }
  }, [purpose])

  const handleSelect = (themeId: string) => {
    setSelected(themeId)
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTheme", themeId)
      localStorage.setItem("selectedStyle", themeId)
    }

    const resolvedPurpose = purpose || "undisclosed"

    trackEvent("theme_selected", {
      category: "engagement",
      label: themeId,
      theme: themeId,
      purpose: resolvedPurpose,
    })

    router.push(`/audience?event=${encodeURIComponent(resolvedPurpose)}&theme=${encodeURIComponent(themeId)}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-gray-900">
            FRAMED
          </Link>
          <span className="text-sm text-gray-600">Step 2 of 4 · Themes</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-600 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
            Picking the visual direction
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">{heading.title}</h1>
          <p className="mt-4 text-lg text-gray-600 text-pretty">{heading.helper}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {themes.map((t, index) => (
            <motion.button
              key={t.id}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => handleSelect(t.id)}
              className={`group overflow-hidden rounded-2xl border bg-white text-left transition-all duration-300 w-full max-w-xs ${
                selected === t.id
                  ? "border-gray-900 shadow-xl"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
              }`}
            >
              <div className="aspect-[4/5] bg-gray-50 flex items-center justify-center p-8">
                <img
                  src={t.preview}
                  alt={`${t.name} theme preview`}
                  className="h-full w-full object-contain transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">{t.name}</span>
                  {selected === t.id && (
                    <span className="inline-flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-gray-900 text-white">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <Link
            href="/start"
            className="text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
          >
            ← Back to previous step
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
