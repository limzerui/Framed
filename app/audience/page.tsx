"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { trackEvent } from "@/lib/analytics"

const audiences = [
  {
    id: "myself",
    label: "Myself",
    description: "A personal keepsake to reflect on when you need it.",
  },
  {
    id: "partner",
    label: "My partner",
    description: "A thoughtful way to revisit your favorite moments together.",
  },
  {
    id: "family",
    label: "Family",
    description: "Pull scattered memories into something everyone can hold.",
  },
  {
    id: "friend",
    label: "A friend",
    description: "Surprise someone with snapshots of your inside jokes.",
  },
  {
    id: "team",
    label: "A team or group",
    description: "Celebrate a shared win or milestone in print.",
  },
]

export default function AudiencePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null)
  const [purpose, setPurpose] = useState<string>("")
  const [theme, setTheme] = useState<string>("")

  useEffect(() => {
    const queryPurpose = searchParams.get("event")
    const queryTheme = searchParams.get("theme")

    const storedPurpose = typeof window !== "undefined" ? localStorage.getItem("selectedPurpose") : null
    const storedTheme = typeof window !== "undefined" ? localStorage.getItem("selectedTheme") : null
    const storedAudience = typeof window !== "undefined" ? localStorage.getItem("selectedAudience") : null

    const resolvedPurpose = queryPurpose ?? storedPurpose ?? "undisclosed"
    const resolvedTheme = queryTheme ?? storedTheme ?? "unset"

    setPurpose(resolvedPurpose)
    setTheme(resolvedTheme)

    if (storedAudience) {
      setSelectedAudience(storedAudience)
    }

    trackEvent("audience_step_view", {
      category: "engagement",
      purpose: resolvedPurpose,
      theme: resolvedTheme,
    })
  }, [searchParams])

  const handleSelect = (audienceId: string) => {
    setSelectedAudience(audienceId)
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedAudience", audienceId)
    }

    trackEvent("audience_selected", {
      category: "engagement",
      label: audienceId,
      audience: audienceId,
      purpose,
      theme,
    })
  }

  const handleContinue = () => {
    if (!selectedAudience) return

    const resolvedPurpose = purpose || "undisclosed"
    const resolvedTheme = theme || "unset"

    trackEvent("audience_continue", {
      category: "conversion",
      label: selectedAudience,
      audience: selectedAudience,
      purpose: resolvedPurpose,
      theme: resolvedTheme,
    })

    router.push(
      `/thanks?event=${encodeURIComponent(resolvedPurpose)}&theme=${encodeURIComponent(
        resolvedTheme,
      )}&audience=${encodeURIComponent(selectedAudience)}`,
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-gray-900">
            FRAMED
          </Link>
          <span className="text-sm text-gray-600">Step 3 of 4 · Who is this for?</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 text-balance">Who will open this zine first?</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto text-pretty">
            A little context helps us tailor the narrative and tone. Pick the answer that feels closest&mdash;we track this to learn what to build next.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {audiences.map((audience, index) => (
            <motion.button
              key={audience.id}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => handleSelect(audience.id)}
              className={`text-left border rounded-2xl p-6 transition-all duration-300 ${
                selectedAudience === audience.id
                  ? "border-gray-900 bg-gray-50 shadow-xl"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-900">{audience.label}</h3>
              <p className="mt-2 text-gray-600">{audience.description}</p>
            </motion.button>
          ))}
        </motion.div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={handleContinue}
            disabled={!selectedAudience}
            className={`px-8 py-3 rounded-lg font-semibold ${
              selectedAudience ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
          <Link
            href={`/themes?event=${encodeURIComponent(purpose || "")}`}
            className="text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
          >
            ← Back
          </Link>
        </div>
      </main>
    </div>
  )
}
