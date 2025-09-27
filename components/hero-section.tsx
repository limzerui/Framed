"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"
import { fadeInUp, staggerContainer, scrollIndicatorAnimation, prefersReducedMotion } from "@/lib/animations"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Subtle parallax effect - disabled for reduced motion
  const y = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion() ? "0%" : "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion() ? 1 : 0.3])

  const handlePrimaryCTA = () => {
    trackEvent("hero_cta_click", {
      category: "conversion",
      label: "primary_cta",
      value: 15,
    })
  }

  const handleSecondaryCTA = () => {
    trackEvent("hero_cta_click", {
      category: "engagement",
      label: "secondary_cta",
    })
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Rule of thirds overlay grid - subtle */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-gray-400" />
              ))}
            </div>
          </div>

          {/* Hero image placeholder */}
          <img
            src="/minimalist-photography-workspace-with-scattered-ph.jpg"
            alt="Curated zine creation workspace"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial="initial" animate="animate" variants={staggerContainer}>
          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance leading-tight"
          >
            Turn your camera roll into a printed zine.
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-pretty">
            From digital clutter to a designer-curated keepsake. Launch offer: $15.
          </motion.p>

          {/* CTA Group */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: prefersReducedMotion() ? 1 : 1.05 }}
              whileTap={{ scale: prefersReducedMotion() ? 1 : 0.95 }}
            >
              <Link
                href="/start"
                onClick={handlePrimaryCTA}
                className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start for $15 →
              </Link>
            </motion.div>

            <motion.a
              href="#how-it-works"
              onClick={handleSecondaryCTA}
              whileHover={{ y: prefersReducedMotion() ? 0 : -2 }}
              className="text-gray-700 hover:text-gray-900 font-medium text-lg underline underline-offset-4 hover:underline-offset-8 transition-all duration-200"
            >
              See how it works
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-500 font-medium">Scroll to explore</span>
            <motion.div
              animate={scrollIndicatorAnimation}
              className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/40 z-5" />
    </section>
  )
}
