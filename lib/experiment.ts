"use client"

// Client-side experiment helper for layout/feel variants

export type Variant = "zen" | "hybrid"

declare global {
  interface Window {
    va?: any
    gtag?: any
  }
}

const EXPERIMENT_NAME = "landing_design"
const STORAGE_KEY = "ab_variant"

// Read a forced variant from URL (?variant=zen) or env (NEXT_PUBLIC_VARIANT)
const getForcedVariant = (): Variant | null => {
  if (typeof window === "undefined") return null
  const url = new URL(window.location.href)
  const fromQuery = url.searchParams.get("variant") as Variant | null
  if (fromQuery === "zen" || fromQuery === "hybrid") return fromQuery

  const fromEnv = (process.env.NEXT_PUBLIC_VARIANT as Variant | undefined) || undefined
  if (fromEnv === "zen" || fromEnv === "hybrid") return fromEnv
  return null
}

export const getStoredVariant = (): Variant | null => {
  if (typeof window === "undefined") return null
  const v = window.localStorage.getItem(STORAGE_KEY) as Variant | null
  if (v === "zen" || v === "hybrid") return v
  return null
}

const storeVariant = (variant: Variant) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, variant)
  document.cookie = `${STORAGE_KEY}=${variant}; path=/; max-age=${60 * 60 * 24 * 180}`
}

const chooseRandom = (): Variant => (Math.random() < 0.5 ? "zen" : "hybrid")

export const initExperiment = (): Variant => {
  if (typeof window === "undefined") return (process.env.NEXT_PUBLIC_VARIANT as Variant) || "hybrid"

  const forced = getForcedVariant()
  const existing = getStoredVariant()
  const variant: Variant = forced || existing || chooseRandom()

  if (!existing || forced) storeVariant(variant)

  // Expose to CSS for theming
  document.documentElement.dataset.variant = variant

  // Track exposure once per session (inline to avoid circular imports)
  try {
    const sessionKey = `${STORAGE_KEY}_session_tracked_${variant}`
    if (!sessionStorage.getItem(sessionKey)) {
      if (window.va) {
        window.va("track", "ab_test_view", {
          category: "experiment",
          label: `${EXPERIMENT_NAME}_${variant}`,
          test_name: EXPERIMENT_NAME,
          variant,
        })
      }
      if (window.gtag) {
        window.gtag("event", "ab_test_view", {
          event_category: "experiment",
          event_label: `${EXPERIMENT_NAME}_${variant}`,
          test_name: EXPERIMENT_NAME,
          variant,
        })
      }
      sessionStorage.setItem(sessionKey, "1")
    }
  } catch {}

  return variant
}

export const getVariant = (): Variant => {
  return (
    getStoredVariant() || (process.env.NEXT_PUBLIC_VARIANT as Variant) || "hybrid"
  )
}

