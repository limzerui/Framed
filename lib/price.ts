"use client"

// Client-side price A/B test: 15 vs 40

export type PriceVariant = 15 | 40

const EXPERIMENT_NAME = "price_test"
const STORAGE_KEY = "ab_price"

declare global {
  interface Window {
    va?: any
    gtag?: any
  }
}

const getForcedPrice = (): PriceVariant | null => {
  if (typeof window === "undefined") return null
  const url = new URL(window.location.href)
  const q = url.searchParams.get("price")
  if (q === "15" || q === "40") return Number(q) as PriceVariant

  const env = process.env.NEXT_PUBLIC_PRICE
  if (env === "15" || env === "40") return Number(env) as PriceVariant
  return null
}

export const getStoredPrice = (): PriceVariant | null => {
  if (typeof window === "undefined") return null
  const s = window.localStorage.getItem(STORAGE_KEY)
  if (s === "15" || s === "40") return Number(s) as PriceVariant
  return null
}

const storePrice = (p: PriceVariant) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, String(p))
  document.cookie = `${STORAGE_KEY}=${p}; path=/; max-age=${60 * 60 * 24 * 180}`
}

const chooseRandom = (): PriceVariant => (Math.random() < 0.5 ? 15 : 40)

export const initPriceExperiment = (): PriceVariant => {
  if (typeof window === "undefined") return (process.env.NEXT_PUBLIC_PRICE === "40" ? 40 : 15)

  const forced = getForcedPrice()
  const existing = getStoredPrice()
  const price: PriceVariant = forced ?? existing ?? chooseRandom()

  if (!existing || forced) storePrice(price)

  // Expose as data attribute for optional CSS/telemetry usage
  document.documentElement.dataset.price = String(price)

  // Track exposure once per session
  try {
    const sessionKey = `${STORAGE_KEY}_session_tracked_${price}`
    if (!sessionStorage.getItem(sessionKey)) {
      if (window.va) {
        window.va("track", "ab_test_view", {
          category: "experiment",
          label: `${EXPERIMENT_NAME}_${price}`,
          test_name: EXPERIMENT_NAME,
          variant: String(price),
          price,
        })
      }
      if (window.gtag) {
        window.gtag("event", "ab_test_view", {
          event_category: "experiment",
          event_label: `${EXPERIMENT_NAME}_${price}`,
          test_name: EXPERIMENT_NAME,
          variant: String(price),
          price,
        })
      }
      sessionStorage.setItem(sessionKey, "1")
    }
  } catch {}

  return price
}

export const getPrice = (): PriceVariant => {
  // Prefer stored value; fall back to env → default 15
  return (
    getStoredPrice() ?? (process.env.NEXT_PUBLIC_PRICE === "40" ? 40 : 15)
  )
}

