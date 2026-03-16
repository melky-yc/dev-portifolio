/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co", pathname: "/storage/**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
}

export default nextConfig
