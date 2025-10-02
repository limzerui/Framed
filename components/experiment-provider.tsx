"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { initExperiment, getVariant, type Variant } from "@/lib/experiment"

type ExperimentContextType = {
  variant: Variant
}

const ExperimentContext = createContext<ExperimentContextType>({ variant: "hybrid" })

export const useExperiment = () => useContext(ExperimentContext)

export default function ExperimentProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<Variant>(getVariant())

  useEffect(() => {
    const v = initExperiment()
    setVariant(v)
  }, [])

  return (
    <ExperimentContext.Provider value={{ variant }}>{children}</ExperimentContext.Provider>
  )
}

