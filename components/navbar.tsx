"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCTAClick = () => {
    // Analytics tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "hero_cta_click", {
        event_category: "engagement",
        event_label: "navbar_cta",
      })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="font-bold text-xl text-gray-900">
            Zine Studio
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:block">
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How it works
            </a>
          </div>

          {/* CTA Button */}
          <Link
            href="/start"
            onClick={handleCTAClick}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Get your zine for $15
          </Link>
        </div>
      </div>
    </nav>
  )
}
