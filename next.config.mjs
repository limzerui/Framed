/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    unoptimized: true,
  },
  // Enable analytics in production
  env: {
    NEXT_PUBLIC_VARIANT: process.env.NEXT_PUBLIC_VARIANT || 'hybrid'
  }
}

export default nextConfig
