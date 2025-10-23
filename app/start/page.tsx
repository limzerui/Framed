"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { trackEvent } from "@/lib/analytics"
import { usePrice } from "@/components/price-provider"

const purposes = [
  {
    id: "event",
    name: "An event",
    subtitle: "Weddings, birthdays, milestone moments",
    illustration: "/events.jpg",
  },
  {
    id: "travel",
    name: "A trip",
    subtitle: "Travel stories, adventures, city guides",
    illustration: "/trip.jpg",
  },
  {
    id: "gifting",
    name: "A gift",
    subtitle: "Something thoughtful for someone you love",
    illustration: "/gift.png",
  },
]

function EventSelection() {
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null)
  const router = useRouter()
  const { price } = usePrice()

  useEffect(() => {
    trackEvent("purpose_step_view", {
      category: "engagement",
    })

    const saved = typeof window !== "undefined" ? localStorage.getItem("selectedPurpose") : null
    if (saved) {
      setSelectedPurpose(saved)
    }
  }, [])

  const handleSelect = (purposeId: string) => {
    setSelectedPurpose(purposeId)
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedPurpose", purposeId)
    }

    trackEvent("purpose_selected", {
      category: "conversion",
      label: purposeId,
      purpose: purposeId,
    })

    router.push(`/themes?event=${purposeId}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl text-gray-900">
              FRAMED
          </Link>
          <div className="text-sm text-gray-500">Step 1 of 4</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">What are you making this zine for?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            Choose the scenario that fits best—we’ll recommend layouts with your story in mind. You can still change your mind later.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {purposes.map((purpose, index) => (
            <motion.button
              key={purpose.id}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleSelect(purpose.id)}
              className={`group overflow-hidden rounded-2xl bg-white border transition-all duration-300 text-left ${
                selectedPurpose === purpose.id ? "border-gray-900 shadow-xl" : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
              }`}
            >
              <div className="aspect-[4/5] bg-gray-100">
                <img
                  src={purpose.illustration}
                  alt={`${purpose.name} zine inspiration`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">{purpose.name}</h3>
                  {selectedPurpose === purpose.id && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-900 text-white flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="mt-3 text-gray-600">{purpose.subtitle}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
          >
            ← Back to home
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

export default function StartPage() {
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
      <EventSelection />
    </Suspense>
  )
}
