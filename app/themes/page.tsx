"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const themes = [
  { id: "minimal", name: "Minimal", preview: "/minimal-zine-layout-clean-white-space.jpg" },
  { id: "warm", name: "Warm", preview: "/warm-cozy-zine-layout-earth-tones.jpg" },
  { id: "bold", name: "Bold", preview: "/bold-high-contrast-zine-layout-dramatic.jpg" },
  { id: "vintage", name: "Vintage", preview: "/vintage-classic-zine-layout-retro-typography.jpg" },
  { id: "modern", name: "Modern", preview: "/modern-contemporary-zine-layout-geometric.jpg" },
  { id: "artistic", name: "Artistic", preview: "/artistic-creative-zine-layout-experimental-design.jpg" },
]

export default function ThemesPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (!selected) return
    localStorage.setItem("selectedStyle", selected)
    router.push(`/thanks?style=${selected}`)
  }

  return (
    <div className="min-h-screen bg-[#F6EDE3]">
      <header className="border-b border-gray-200/60 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-gray-900">FRAMED</Link>
          <span className="text-sm text-gray-600">Choose a theme</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">Choose your theme</h1>
        <p className="text-gray-700 text-center mt-3 max-w-2xl mx-auto">
          Pick a mood that fits your story. You can change this later.
        </p>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`text-left group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all ${
                selected === t.id ? "ring-2 ring-gray-900" : ""
              }`}
            >
              <div className="aspect-[4/5] bg-gray-100">
                <img src={t.preview} alt={`${t.name} preview`} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="font-semibold text-gray-900">{t.name}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`px-8 py-3 rounded-lg font-semibold ${
              selected ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  )
}

