
"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { useRef } from "react"

export default function InteractiveSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.9)
  const clipPath = useTransform(x, (value) => `inset(0 ${100 - value * 100}% 0 0)`)

  const handleDrag = (event: any, info: any) => {
    if (containerRef.current) {
      const bounds = containerRef.current.getBoundingClientRect()
      const newX = (info.point.x - bounds.left) / bounds.width
      x.set(newX)
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[60vh] rounded-xl shadow-2xl overflow-hidden cursor-ew-resize"
      style={{ touchAction: "none" }}
      onPan={handleDrag}
    >
      <video
        src="/marketing_without_logo.mp4"
        alt="Marketing reel without logo"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      >
        Your browser does not support the video tag.
      </video>
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath }}
      >
        <video
          src="/clutter.mov"
          alt="Clutter video"
          className="absolute inset-0 w-full h-full object-cover"
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
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: useTransform(x, (value) => `${value * 100}%`) }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDrag={handleDrag}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}
