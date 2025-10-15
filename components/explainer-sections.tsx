"use client"

import { motion } from "framer-motion"
import { trackEvent } from "@/lib/analytics"
import { fadeInUp } from "@/lib/animations"

export default function ExplainerSections() {
  return (
    <div>
      {/* Panel 1: What is a zine? */}
      <section className="relative min-h-screen snap-start flex items-center">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="order-2 lg:order-1"
            >
              <video
                src="/marketing_without_logo.mp4"
                aria-label="Framed marketing reel showing printed zine spreads"
                className="w-full h-[60vh] object-cover rounded-xl shadow-2xl"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What is a zine?</h2>
              <p className="text-lg text-gray-600 max-w-prose">
                A small, personal book that turns loose photos into a quiet, intentional story you can hold.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Panel 2: How it works (overlay on imagery) */}
      <section id="how-it-works" className="relative min-h-screen snap-start flex items-center bg-[#F6EDE3]">
        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">How we curate your story</h2>
            <p className="mt-4 text-xl text-gray-700">
              Our design experts transform your random camera roll into a cohesive, beautiful narrative.
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Upload",
                desc: "Share your favorite photos with us—no need to organize or edit.",
              },
              {
                step: "02",
                title: "Analyze",
                desc: "We identify themes, emotions, and visual connections in your collection.",
              },
              {
                step: "03",
                title: "Design",
                desc: "A unique layout that tells your story with professional typography and spacing.",
              },
              {
                step: "04",
                title: "Print",
                desc: "Your zine is printed on premium paper and shipped directly to your door.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center max-w-md mx-auto"
              >
                <div className="mx-auto w-24 h-24 rounded-full bg-stone-900 text-white flex items-center justify-center text-2xl font-semibold">
                  {item.step}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-gray-700 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
