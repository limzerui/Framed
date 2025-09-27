"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: boolean
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    amount: 0.3,
  })

  const variants = stagger ? staggerContainer : fadeInUp

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
