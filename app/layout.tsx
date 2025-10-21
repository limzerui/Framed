import type React from "react"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import AnalyticsProvider from "@/components/analytics-provider"
import ExperimentProvider from "@/components/experiment-provider"
import PriceProvider from "@/components/price-provider"
import { Suspense } from "react"
import "./globals.css"

import { Inter, Geist, Geist_Mono, Source_Serif_4, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts (assigned to constants as required by Next.js)
const v0Geist = V0_Font_Geist({
  weight: ["100","200","300","400","500","600","700","800","900"],
  subsets: ["latin"],
  preload: false
})
const v0GeistMono = V0_Font_Geist_Mono({
  weight: ["100","200","300","400","500","600","700","800","900"],
  subsets: ["latin"],
  preload: false
})
const v0SourceSerif4 = V0_Font_Source_Serif_4({
  weight: ["200","300","400","500","600","700","800","900"],
  subsets: ["latin"],
  preload: false
})

// Initialize fonts with proper const assignments
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const geist = Geist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

const geistMono = Geist_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const sourceSerif4 = Source_Serif_4({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  display: "swap",
})

export const metadata = {
  title: "Framed - Turn your camera roll into a printed zine",
  description: "From digital clutter to a designer-curated keepsake. Launch offer: $15.",
  openGraph: {
    title: "Framed - Turn your camera roll into a printed zine",
    description: "From digital clutter to a designer-curated keepsake. Launch offer: $15.",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable} ${geistMono.variable} ${sourceSerif4.variable} antialiased`}
    >
      <head>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Framed",
              description:
                "Turn your camera roll into a printed zine. From digital clutter to a designer-curated keepsake.",
              brand: {
                "@type": "Brand",
                name: "Framed",
              },
              offers: {
                "@type": "Offer",
                price: "15",
                priceCurrency: "USD",
                availability: "https://schema.org/PreOrder",
              },
              category: "Design Services",
            }),
          }}
        />
      </head>
      <body className="font-sans bg-white text-gray-900">
        <AnalyticsProvider>
          <ExperimentProvider>
            <PriceProvider>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </PriceProvider>
          </ExperimentProvider>
        </AnalyticsProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}