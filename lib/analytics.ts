// Analytics utility functions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    // Vercel Analytics
    if (window.va) {
      window.va("track", eventName, properties)
    }

    // Google Analytics (if available)
    if (window.gtag) {
      window.gtag("event", eventName, {
        event_category: properties?.category || "engagement",
        event_label: properties?.label,
        value: properties?.value,
        ...properties,
      })
    }

    // Console log for development
    if (process.env.NODE_ENV === "development") {
      console.log("📊 Analytics Event:", eventName, properties)
    }
  }
}

export const trackScrollDepth = (depth: number) => {
  trackEvent("scroll_depth", {
    category: "engagement",
    label: `${depth}%`,
    value: depth,
  })
}

// Hook for scroll depth tracking
export const useScrollDepth = () => {
  if (typeof window === "undefined") return

  let tracked25 = false
  let tracked50 = false
  let tracked75 = false
  let tracked90 = false

  const handleScroll = () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100

    if (scrollPercent >= 25 && !tracked25) {
      tracked25 = true
      trackEvent("scroll_25", { category: "engagement" })
    }

    if (scrollPercent >= 50 && !tracked50) {
      tracked50 = true
      trackEvent("scroll_50", { category: "engagement" })
    }

    if (scrollPercent >= 75 && !tracked75) {
      tracked75 = true
      trackEvent("scroll_75", { category: "engagement" })
    }

    if (scrollPercent >= 90 && !tracked90) {
      tracked90 = true
      trackEvent("scroll_90", { category: "engagement" })
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true })
  return () => window.removeEventListener("scroll", handleScroll)
}

// Time on page tracking
export const useTimeOnPage = () => {
  if (typeof window === "undefined") return

  const startTime = Date.now()
  let tracked30s = false
  let tracked60s = false
  let tracked120s = false

  const checkTimeSpent = () => {
    const timeSpent = (Date.now() - startTime) / 1000

    if (timeSpent >= 30 && !tracked30s) {
      tracked30s = true
      trackEvent("time_on_page_30s", {
        category: "engagement",
        value: 30,
      })
    }

    if (timeSpent >= 60 && !tracked60s) {
      tracked60s = true
      trackEvent("time_on_page_60s", {
        category: "engagement",
        value: 60,
      })
    }

    if (timeSpent >= 120 && !tracked120s) {
      tracked120s = true
      trackEvent("time_on_page_120s", {
        category: "engagement",
        value: 120,
      })
    }
  }

  const interval = setInterval(checkTimeSpent, 5000) // Check every 5 seconds

  // Track exit time
  const handleBeforeUnload = () => {
    const totalTime = (Date.now() - startTime) / 1000
    trackEvent("page_exit", {
      category: "engagement",
      label: "time_spent",
      value: Math.round(totalTime),
    })
  }

  window.addEventListener("beforeunload", handleBeforeUnload)

  return () => {
    clearInterval(interval)
    window.removeEventListener("beforeunload", handleBeforeUnload)
  }
}

// Conversion funnel tracking
export const trackFunnelStep = (step: string, properties?: Record<string, any>) => {
  trackEvent("funnel_step", {
    category: "conversion",
    label: step,
    ...properties,
  })
}

// A/B test variant tracking
export const trackVariant = (testName: string, variant: string) => {
  trackEvent("ab_test_view", {
    category: "experiment",
    label: `${testName}_${variant}`,
    test_name: testName,
    variant: variant,
  })
}

// Feature flag tracking
export const getVariant = (): "apple" | "adobe" | "hybrid" => {
  if (typeof window === "undefined") return "hybrid"

  const variant = (process.env.NEXT_PUBLIC_VARIANT as "apple" | "adobe" | "hybrid") || "hybrid"

  // Track which variant the user sees
  trackVariant("landing_design", variant)

  return variant
}
