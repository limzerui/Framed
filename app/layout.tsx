import type React from "react"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import AnalyticsProvider from "@/components/analytics-provider"
import { Suspense } from "react"
import "./globals.css"

const geist = V0_Font_Geist({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })
const geistMono = V0_Font_Geist_Mono({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })
const sourceSerif4 = V0_Font_Source_Serif_4({ weight: ["200", "300", "400", "500", "600", "700", "800", "900"] })

import { Inter, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
V0_Font_Geist({ weight: ["100","200","300","400","500","600","700","800","900"] })
V0_Font_Geist_Mono({ weight: ["100","200","300","400","500","600","700","800","900"] })
V0_Font_Source_Serif_4({ weight: ["200","300","400","500","600","700","800","900"] })

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  title: "Zine Studio - Turn your camera roll into a printed zine",
  description: "From digital clutter to a designer-curated keepsake. Launch offer: $15.",
  openGraph: {
    title: "Zine Studio - Turn your camera roll into a printed zine",
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
    <html lang="en" className={`${inter.variable} ${geist.variable} antialiased`}>
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
              name: "Zine Studio",
              description:
                "Turn your camera roll into a printed zine. From digital clutter to a designer-curated keepsake.",
              brand: {
                "@type": "Brand",
                name: "Zine Studio",
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
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </AnalyticsProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
