"use client"

// Animation variants and utilities for consistent motion design
import type { Variants } from "framer-motion"

// Reduced motion check
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

// Base animation variants
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.6,
      ease: "easeOut",
    },
  },
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.6,
      ease: "easeOut",
    },
  },
}

export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: prefersReducedMotion() ? 0 : -60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.6,
      ease: "easeOut",
    },
  },
}

export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: prefersReducedMotion() ? 0 : 60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.6,
      ease: "easeOut",
    },
  },
}

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.6,
      ease: "easeOut",
    },
  },
}

// Stagger container for sequential animations
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.2,
    },
  },
}

// Hover animations
export const hoverScale = {
  scale: prefersReducedMotion() ? 1 : 1.05,
  transition: { duration: 0.2 },
}

export const hoverLift = {
  y: prefersReducedMotion() ? 0 : -4,
  transition: { duration: 0.2 },
}

// Page transition variants
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : -20,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.3,
      ease: "easeIn",
    },
  },
}

// Floating animation for decorative elements
export const floatingAnimation = {
  y: prefersReducedMotion() ? 0 : [-10, 10, -10],
  transition: {
    duration: prefersReducedMotion() ? 0 : 4,
    repeat: prefersReducedMotion() ? 0 : Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

// Pulse animation for CTAs
export const pulseAnimation = {
  scale: prefersReducedMotion() ? 1 : [1, 1.02, 1],
  transition: {
    duration: prefersReducedMotion() ? 0 : 2,
    repeat: prefersReducedMotion() ? 0 : Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

// Scroll indicator animation
export const scrollIndicatorAnimation = {
  y: prefersReducedMotion() ? 0 : [0, 8, 0],
  transition: {
    duration: prefersReducedMotion() ? 0 : 2,
    repeat: prefersReducedMotion() ? 0 : Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}
