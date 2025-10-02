"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getPrice, initPriceExperiment, type PriceVariant } from "@/lib/price"

type PriceContextType = { price: PriceVariant }

const PriceContext = createContext<PriceContextType>({ price: 15 })

export const usePrice = () => useContext(PriceContext)

export default function PriceProvider({ children }: { children: React.ReactNode }) {
  const [price, setPrice] = useState<PriceVariant>(getPrice())

  useEffect(() => {
    const p = initPriceExperiment()
    setPrice(p)
  }, [])

  return <PriceContext.Provider value={{ price }}>{children}</PriceContext.Provider>
}

