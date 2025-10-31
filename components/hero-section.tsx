"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"
import { fadeInUp, staggerContainer, scrollIndicatorAnimation, prefersReducedMotion } from "@/lib/animations"
import { usePrice } from "@/components/price-provider"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { price } = usePrice()
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
      value: price,
      price,
    })
  }

  const handleSecondaryCTA = () => {
    trackEvent("hero_cta_click", {
      category: "engagement",
      label: "secondary_cta",
    })
  }

  return (
    <section ref={containerRef} className="relative min-h-screen snap-start overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img
          src="/image.png"
          alt="Warm, homey zine layout"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-36 text-center">
        <motion.div initial="initial" animate="animate" variants={staggerContainer}>
          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance leading-tight"
          >
            A home for your photos.
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-black mb-8 max-w-2xl mx-auto text-pretty">
            Designer‑curated zines that feel personal.
          </motion.p>

          {/* CTA Group */}
          <motion.div variants={fadeInUp} className="flex flex-col justify-center items-center gap-4">
            <Link
              href="/start"
              onClick={() => trackEvent("hero_cta_click", { category: "engagement", label: "try_me_cta" })}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
            >
              Try Me
            </Link>
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
      </div>

      {/* Scroll indicator (bottom center, no label) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20 bottom-1 sm:bottom-2 md:bottom-4"
      >
        <motion.div
          animate={scrollIndicatorAnimation}
          className="w-7 h-12 border-2 border-gray-300 rounded-full flex justify-center bg-white/60 backdrop-blur-sm"
        >
          <div className="w-1 h-3 bg-gray-600 rounded-full mt-2" />
        </motion.div>
      </motion.div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/20 z-5" />
    </section>
  )
}
