"use client"

import { motion } from "framer-motion"
import { trackEvent } from "@/lib/analytics"
import AnimatedSection from "@/components/animated-section"
import { fadeInUp, staggerContainer, floatingAnimation, hoverScale, prefersReducedMotion } from "@/lib/animations"

export default function ExplainerSections() {
  const handleLearnMoreClick = (section: string) => {
    trackEvent("card_learn_more", {
      category: "engagement",
      label: section,
    })
  }

  return (
    <div className="bg-white">
      {/* Section 1: What is a zine? */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection stagger>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeInUp} className="order-2 lg:order-1">
                <motion.img
                  src="/vintage-zine-collection-spread.jpg"
                  alt="Collection of vintage zines"
                  className="w-full h-auto rounded-lg shadow-2xl"
                  whileHover={prefersReducedMotion() ? {} : hoverScale}
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="order-1 lg:order-2">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-balance">What is a zine?</h2>

                <div className="prose prose-lg text-gray-600 mb-8">
                  <p className="text-pretty">
                    A zine is a small-circulation, self-published work of original or appropriated texts and images.
                    Think of it as your personal magazine—intimate, authentic, and entirely yours.
                  </p>

                  <motion.blockquote
                    className="border-l-4 border-gray-900 pl-6 italic text-xl text-gray-800 my-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    "Every photo tells a story. A zine tells the whole chapter."
                  </motion.blockquote>

                  <p className="text-pretty">
                    Unlike digital albums that get lost in the cloud, a printed zine becomes a tangible piece of your
                    history—something you can hold, share, and treasure for years to come.
                  </p>
                </div>

                <motion.button
                  onClick={() => handleLearnMoreClick("what-is-zine")}
                  className="text-gray-900 font-semibold hover:text-gray-700 transition-colors underline underline-offset-4"
                  whileHover={{ x: prefersReducedMotion() ? 0 : 4 }}
                >
                  Learn more about zines →
                </motion.button>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 2: How we curate */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-balance">
                How we curate your story
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                Our design experts transform your random camera roll into a cohesive, beautiful narrative.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  step: "01",
                  title: "Upload",
                  description: "Share your favorite photos with us—no need to organize or edit.",
                  icon: "📸",
                },
                {
                  step: "02",
                  title: "Analyze",
                  description: "Our team identifies themes, emotions, and visual connections in your collection.",
                  icon: "🔍",
                },
                {
                  step: "03",
                  title: "Design",
                  description:
                    "We craft a unique layout that tells your story with professional typography and spacing.",
                  icon: "✨",
                },
                {
                  step: "04",
                  title: "Print",
                  description: "Your zine is printed on premium paper and shipped directly to your door.",
                  icon: "📦",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center group"
                  whileHover={{ y: prefersReducedMotion() ? 0 : -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto group-hover:bg-gray-800 transition-colors"
                    whileHover={prefersReducedMotion() ? {} : { scale: 1.1 }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-pretty">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 3: What you get */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection stagger>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-balance">What you get</h2>

                <div className="space-y-6 mb-8">
                  {[
                    {
                      title: "Premium 32-page zine",
                      description: "High-quality matte paper with professional binding",
                    },
                    {
                      title: "Custom design & layout",
                      description: "Unique typography and spacing tailored to your photos",
                    },
                    {
                      title: "Curated photo selection",
                      description: "Expert editing to create a cohesive visual narrative",
                    },
                    {
                      title: "Fast shipping",
                      description: "Delivered to your door within 7-10 business days",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="flex items-start space-x-4"
                      whileHover={{ x: prefersReducedMotion() ? 0 : 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-gray-600 text-pretty">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={() => handleLearnMoreClick("what-you-get")}
                  className="text-gray-900 font-semibold hover:text-gray-700 transition-colors underline underline-offset-4"
                  whileHover={{ x: prefersReducedMotion() ? 0 : 4 }}
                >
                  See sample zines →
                </motion.button>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="relative">
                  <motion.img
                    src="/open-zine-spread-with-beautiful-photo-layout.jpg"
                    alt="Sample zine spread showing curated photo layout"
                    className="w-full h-auto rounded-lg shadow-2xl"
                    whileHover={prefersReducedMotion() ? {} : hoverScale}
                  />

                  {/* Floating elements for visual interest */}
                  <motion.div
                    animate={floatingAnimation}
                    className="absolute -top-4 -right-4 w-24 h-24 bg-gray-100 rounded-lg shadow-lg flex items-center justify-center"
                  >
                    <span className="text-2xl">📖</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Style Teaser Strip */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Choose your style</h2>
              <p className="text-gray-600 text-pretty">Each style brings a different mood to your story</p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
            >
              {[
                { name: "Minimal", preview: "Clean lines, lots of white space", slug: "minimal" },
                { name: "Warm", preview: "Cozy tones, intimate feeling", slug: "warm" },
                { name: "Bold", preview: "High contrast, dramatic layouts", slug: "bold" },
                { name: "Vintage", preview: "Classic typography, timeless feel", slug: "vintage" },
                { name: "Modern", preview: "Contemporary design, sharp edges", slug: "modern" },
                { name: "Artistic", preview: "Creative layouts, experimental", slug: "artistic" },
              ].map((style, index) => (
                <motion.a
                  key={index}
                  href={`/start?style=${style.slug}`}
                  variants={fadeInUp}
                  onClick={() =>
                    trackEvent("style_preview_click", {
                      category: "engagement",
                      label: style.slug,
                    })
                  }
                  className="flex-shrink-0 w-48 h-64 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 snap-start group cursor-pointer"
                  whileHover={{
                    y: prefersReducedMotion() ? 0 : -8,
                    scale: prefersReducedMotion() ? 1 : 1.02,
                  }}
                >
                  <div className="h-3/4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={`/.jpg?key=07la2&height=200&width=180&query=${style.name.toLowerCase()} zine style preview`}
                      alt={`${style.name} style preview`}
                      className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                      {style.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-pretty">{style.preview}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection stagger>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold mb-6 text-balance">
              Get your zine for $15
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-8 text-pretty">
              Limited launch offer. Usually $25. No subscription, no hidden fees.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <motion.a
                href="/start"
                onClick={() =>
                  trackEvent("final_cta_click", {
                    category: "conversion",
                    label: "bottom_cta",
                    value: 15,
                  })
                }
                className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                whileHover={{
                  scale: prefersReducedMotion() ? 1 : 1.05,
                  y: prefersReducedMotion() ? 0 : -2,
                }}
                whileTap={{ scale: prefersReducedMotion() ? 1 : 0.95 }}
              >
                Start creating your zine →
              </motion.a>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-sm text-gray-400 mt-6">
              30-day money-back guarantee
            </motion.p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
