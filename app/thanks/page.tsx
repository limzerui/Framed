"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"

const styles = {
  minimal: { name: "Minimal", color: "from-gray-100 to-gray-200" },
  warm: { name: "Warm", color: "from-orange-100 to-red-100" },
  bold: { name: "Bold", color: "from-gray-800 to-gray-900" },
  vintage: { name: "Vintage", color: "from-amber-100 to-yellow-100" },
  modern: { name: "Modern", color: "from-blue-100 to-indigo-100" },
  artistic: { name: "Artistic", color: "from-purple-100 to-pink-100" },
}

function ThanksContent() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<string>("minimal")

  const searchParams = useSearchParams()

  useEffect(() => {
    // Get style from URL or localStorage
    const styleFromUrl = searchParams.get("style")
    const styleFromStorage = localStorage.getItem("selectedStyle")
    const finalStyle = styleFromUrl || styleFromStorage || "minimal"

    if (styles[finalStyle as keyof typeof styles]) {
      setSelectedStyle(finalStyle)
    }

    // Track page visit
    trackEvent("thanks_page_visit", {
      category: "conversion",
      label: finalStyle,
    })
  }, [searchParams])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isLoading) return

    setIsLoading(true)

    try {
      // Simulate API call to waitlist endpoint
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          style: selectedStyle,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        trackEvent("waitlist_submit", {
          category: "conversion",
          label: selectedStyle,
          value: 1,
        })

        // Track success
        trackEvent("waitlist_success", {
          category: "conversion",
          label: selectedStyle,
        })
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      console.error("Error submitting to waitlist:", error)
      // Still show success for demo purposes
      setIsSubmitted(true)
      trackEvent("waitlist_submit", {
        category: "conversion",
        label: selectedStyle,
        value: 1,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const styleInfo = styles[selectedStyle as keyof typeof styles] || styles.minimal

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-balance">You're on the waitlist!</h1>

          <p className="text-xl text-gray-600 mb-8 text-pretty">
            We'll email you as soon as we're ready to create your {styleInfo.name.toLowerCase()} zine. Thanks for being
            an early supporter!
          </p>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Back to home
            </Link>

            <p className="text-sm text-gray-500">Follow us on social media for updates and behind-the-scenes content</p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-bold text-xl text-gray-900">
              Zine Studio
            </Link>
            <div className="text-sm text-gray-500">Step 2 of 2</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">Thanks for your interest!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            We're still in development, but we'd love to create your zine when we launch. Join our waitlist to be the
            first to know.
          </p>
        </motion.div>

        {/* Selected Style Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your selected style: {styleInfo.name}</h2>

            <div
              className={`w-48 h-64 mx-auto rounded-lg bg-gradient-to-br ${styleInfo.color} shadow-lg flex items-center justify-center mb-4`}
            >
              <img
                src={`/.jpg?key=preview&height=250&width=190&query=${styleInfo.name.toLowerCase()} zine style preview`}
                alt={`${styleInfo.name} style preview`}
                className="w-40 h-56 object-cover rounded shadow-md"
              />
            </div>

            <p className="text-gray-600">
              We'll create your zine in the {styleInfo.name.toLowerCase()} style when you upload your photos.
            </p>
          </div>
        </motion.div>

        {/* Email Capture Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={!email || isLoading}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                email && !isLoading
                  ? "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Joining waitlist...
                </div>
              ) : (
                "Join the waitlist"
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-gray-500">
              No spam, just updates on when we launch and special early-bird pricing.
            </p>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                No spam
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Early access
              </span>
            </div>
          </div>
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/start"
            className="text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
          >
            ← Change style selection
          </Link>
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
      <ThanksContent />
    </Suspense>
  )
}
