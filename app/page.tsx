"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ExplainerSections from "@/components/explainer-sections"
import Footer from "@/components/footer"
import { useScrollDepth, useTimeOnPage, trackFunnelStep } from "@/lib/analytics"

export default function HomePage() {
  // Initialize tracking hooks
  const cleanupScrollDepth = useScrollDepth()
  const cleanupTimeOnPage = useTimeOnPage()

  useEffect(() => {
    // Track funnel entry
    trackFunnelStep("landing_page_view")

    return () => {
      if (cleanupScrollDepth) cleanupScrollDepth()
      if (cleanupTimeOnPage) cleanupTimeOnPage()
    }
  }, [cleanupScrollDepth, cleanupTimeOnPage])

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ExplainerSections />
      <Footer />
    </main>
  )
}
