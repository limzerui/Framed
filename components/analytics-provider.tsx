"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackEvent } from "@/lib/analytics"

declare global {
  interface Window {
    va?: any
    gtag?: any
  }
}

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views
    trackEvent("page_view", {
      category: "navigation",
      label: pathname,
      page: pathname,
    })

    // Track user agent and device info
    if (typeof window !== "undefined") {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent)

      trackEvent("device_info", {
        category: "technical",
        is_mobile: isMobile,
        is_tablet: isTablet,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        user_agent: navigator.userAgent,
      })
    }
  }, [pathname])

  return <>{children}</>
}
