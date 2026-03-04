import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { TransitionOverlayProvider } from "@/components/transition-overlay"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Melchisedek Lima — Full Stack Developer",
  description:
    "Portfolio de Melchisedek Lima, Desenvolvedor Full Stack com foco em backend. Java, Spring Boot, PostgreSQL, Angular, React.",
  icons: {
    icon: [
      { url: "/icons/logo-16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/icons/logo-32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: "/icons/logo-180.svg",
  },
  openGraph: {
    title: "Melchisedek Lima — Full Stack Developer",
    description:
      "Portfolio de Melchisedek Lima, Desenvolvedor Full Stack.",
    type: "website",
    images: ["/icons/logo-192.svg"],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <TransitionOverlayProvider>
            {children}
            <Toaster richColors position="top-center" />
            <Analytics />
          </TransitionOverlayProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
