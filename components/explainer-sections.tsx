"use client"

import { motion } from "framer-motion"
import { trackEvent } from "@/lib/analytics"
import { fadeInUp } from "@/lib/animations"
import InteractiveSlider from "@/components/interactive-slider"

export default function ExplainerSections() {
  return (
    <div>
      {/* Panel 1: Transformation Section */}
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
              <InteractiveSlider />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">From clutter to calm.</h2>
              <p className="text-lg text-gray-600 max-w-prose">
                No sorting. No templates. Just upload — we handle the rest.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Panel 2: How it works */}
      <section id="how-it-works" className="relative min-h-screen snap-start flex items-center bg-[#F6EDE3]">
        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Camera Roll → Coffee Table.</h2>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Upload",
                desc: "Drop in your photos — as they are.",
              },
              {
                step: "02",
                title: "Curate",
                desc: "We edit, select, and sequence your photos.",
              },
              {
                step: "03",
                title: "Design",
                desc: "A unique layout is crafted for your story.",
              },
              {
                step: "04",
                title: "Print",
                desc: "Delivered to your door.",
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
