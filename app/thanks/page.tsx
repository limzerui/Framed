"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { trackEvent } from "@/lib/analytics"

const themeLabels: Record<string, string> = {
  minimal: "Minimal",
  warm: "Warm",
  bold: "Bold",
  vintage: "Vintage",
  artistic: "Artistic",
}

const purposeLabels: Record<string, string> = {
  event: "An event",
  travel: "A trip",
  gifting: "A gift",
  undisclosed: "Undisclosed",
}

const audienceLabels: Record<string, string> = {
  myself: "Myself",
  partner: "Partner",
  family: "Family",
  friend: "Friend",
  team: "Team / group",
  unknown: "Unknown",
}

type SelectionState = {
  purpose: string
  theme: string
  audience: string
}

function RevealContent() {
  const searchParams = useSearchParams()
  const [selections, setSelections] = useState<SelectionState>({
    purpose: "undisclosed",
    theme: "unset",
    audience: "unknown",
  })

  const [contactValue, setContactValue] = useState<string>("")
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const isValidContact = (input: string): boolean => {
    // Basic validation for Telegram handle or email
    if (input.startsWith("@")) {
      return input.length > 1 // Just check if there's something after @
    } else if (input.includes("@") && input.includes(".")) {
      return true // Basic email check
    }
    return false
  }

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidContact(contactValue)) {
      setSubmissionStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmissionStatus("idle")

    try {
      // Simulate API call or direct analytics tracking
      trackEvent("contact_info_submitted", {
        category: "engagement",
        contact_value: contactValue,
      })
      setSubmissionStatus("success")
      setContactValue("") // Clear input on success
    } catch (error) {
      console.error("Failed to submit contact info:", error)
      setSubmissionStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const queryPurpose = searchParams.get("event")
    const queryTheme = searchParams.get("theme")
    const queryAudience = searchParams.get("audience")

    const storedPurpose = typeof window !== "undefined" ? localStorage.getItem("selectedPurpose") : null
    const storedTheme = typeof window !== "undefined" ? localStorage.getItem("selectedTheme") : null
    const storedAudience = typeof window !== "undefined" ? localStorage.getItem("selectedAudience") : null

    const purpose = queryPurpose ?? storedPurpose ?? "undisclosed"
    const theme = queryTheme ?? storedTheme ?? "unset"
    const audience = queryAudience ?? storedAudience ?? "unknown"

    setSelections({
      purpose,
      theme,
      audience,
    })

    trackEvent("experiment_reveal_view", {
      category: "engagement",
      purpose,
      theme,
      audience,
    })

    trackEvent("purchase", {
      category: "conversion",
      purpose,
      theme,
      audience,
    })
  }, [searchParams])

  const friendlyLabels = useMemo(() => {
    return {
      purpose: purposeLabels[selections.purpose] ?? selections.purpose,
      theme: themeLabels[selections.theme] ?? selections.theme,
      audience: audienceLabels[selections.audience] ?? selections.audience,
    }
  }, [selections])

  const handleRestart = () => {
    trackEvent("experiment_reveal_restart", {
      category: "engagement",
      ...selections,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">FRAMED</span>
          <span className="text-sm text-gray-500">Step 4 of 4 · Experiment reveal</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600 mb-8">
            <span className="w-2 h-2 rounded-full bg-gray-500" />
            You just helped us test the flow
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance mb-4">
            Thanks for walking through our prototype.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            We&apos;re experimenting with how people plan their photo zines. The steps you saw are part of an A/B test that helps us decide
            what to build next.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 bg-gray-50 border border-gray-200 rounded-3xl p-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-balance">Here&apos;s what we recorded from your journey:</h2>
          <dl className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <dt className="text-sm uppercase tracking-wide text-gray-500">Purpose</dt>
              <dd className="mt-2 text-xl font-semibold text-gray-900">{friendlyLabels.purpose}</dd>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <dt className="text-sm uppercase tracking-wide text-gray-500">Theme</dt>
              <dd className="mt-2 text-xl font-semibold text-gray-900">{friendlyLabels.theme}</dd>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <dt className="text-sm uppercase tracking-wide text-gray-500">Audience</dt>
              <dd className="mt-2 text-xl font-semibold text-gray-900">{friendlyLabels.audience}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-gray-500">
            These selections are anonymized and combined with variant data ({friendlyLabels.purpose?.toLowerCase()} · {friendlyLabels.theme?.toLowerCase()} ·{" "}
            {friendlyLabels.audience?.toLowerCase()}) so we can learn what matters before we ship the real experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center space-y-4"
        >
          <p className="text-gray-600 text-pretty">
            Want to try a different path? Restart below or head back to the homepage. Every run teaches us something new.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/start"
              onClick={handleRestart}
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 font-semibold transition-colors"
            >
              Restart flow
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              Back to home
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Stay in the loop!</h2>
          <p className="text-gray-600 mb-4">
            Enter your Telegram handle (e.g., @yourhandle) or email to get updates on Framed.
          </p>
          <form onSubmit={handleSubmitContact} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="@yourhandle or your@email.com"
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isSubmitting || !isValidContact(contactValue)}
              className={`w-full px-4 py-2 rounded-lg font-semibold text-white transition-colors
                ${isSubmitting || !isValidContact(contactValue)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"}
              `}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            {submissionStatus === "success" && (
              <p className="text-green-600 text-sm">Thanks! We'll keep you updated.</p>
            )}
            {submissionStatus === "error" && (
              <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
            )}
          </form>
        </motion.div>
      </main>
    </div>
  )
}

export default function ThanksPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <RevealContent />
    </Suspense>
  )
}

function isValidContact(input: string): boolean {
  // Basic validation for Telegram handle or email
  if (input.startsWith("@")) {
    return input.length > 1 // Just check if there's something after @
  } else if (input.includes("@") && input.includes(".")) {
    return true // Basic email check
  }
  return false
}
