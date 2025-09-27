"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"

const styles = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean lines, lots of white space, timeless elegance",
    tags: ["Clean", "Simple", "Modern"],
    preview: "/minimal-zine-layout-clean-white-space.jpg",
  },
  {
    id: "warm",
    name: "Warm",
    description: "Cozy tones, intimate feeling, personal touch",
    tags: ["Cozy", "Personal", "Intimate"],
    preview: "/warm-cozy-zine-layout-earth-tones.jpg",
  },
  {
    id: "bold",
    name: "Bold",
    description: "High contrast, dramatic layouts, statement pieces",
    tags: ["Dramatic", "High Contrast", "Statement"],
    preview: "/bold-high-contrast-zine-layout-dramatic.jpg",
  },
  {
    id: "vintage",
    name: "Vintage",
    description: "Classic typography, timeless feel, nostalgic charm",
    tags: ["Classic", "Timeless", "Nostalgic"],
    preview: "/vintage-classic-zine-layout-retro-typography.jpg",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design, sharp edges, cutting-edge",
    tags: ["Contemporary", "Sharp", "Cutting-edge"],
    preview: "/modern-contemporary-zine-layout-geometric.jpg",
  },
  {
    id: "artistic",
    name: "Artistic",
    description: "Creative layouts, experimental design, unique expression",
    tags: ["Creative", "Experimental", "Unique"],
    preview: "/artistic-creative-zine-layout-experimental-design.jpg",
  },
]

function StylePickerContent() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Pre-select style from URL parameter
    const preselectedStyle = searchParams.get("style")
    if (preselectedStyle && styles.find((s) => s.id === preselectedStyle)) {
      setSelectedStyle(preselectedStyle)
    }

    // Track page visit
    trackEvent("start_page_visit", {
      category: "engagement",
      label: preselectedStyle || "direct",
    })
  }, [searchParams])

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId)

    // Store in localStorage for persistence
    localStorage.setItem("selectedStyle", styleId)

    trackEvent("style_selected", {
      category: "conversion",
      label: styleId,
    })
  }

  const handleContinue = () => {
    if (!selectedStyle) return

    trackEvent("start_click", {
      category: "conversion",
      label: selectedStyle,
      value: 15,
    })

    router.push(`/thanks?style=${selectedStyle}`)
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
            <div className="text-sm text-gray-500">Step 1 of 2</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">Choose your zine style</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            Each style brings a different mood and personality to your photo story. Pick the one that feels right for
            your memories.
          </p>
        </motion.div>

        {/* Style Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {styles.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleStyleSelect(style.id)}
              className={`cursor-pointer group transition-all duration-300 ${
                selectedStyle === style.id ? "ring-2 ring-gray-900 ring-offset-4" : "hover:shadow-xl"
              }`}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Preview Image */}
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                  <img
                    src={style.preview || "/placeholder.svg"}
                    alt={`${style.name} style preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{style.name}</h3>
                    {selectedStyle === style.id && (
                      <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 text-pretty">{style.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {style.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={handleContinue}
            disabled={!selectedStyle}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
              selectedStyle
                ? "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue to upload →
          </button>

          {selectedStyle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-500 mt-4"
            >
              You selected: <span className="font-medium">{styles.find((s) => s.id === selectedStyle)?.name}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-8"
        >
          <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4">
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
            <p className="text-gray-600">Loading styles...</p>
          </div>
        </div>
      }
    >
      <StylePickerContent />
    </Suspense>
  )
}
