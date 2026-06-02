import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "INNOVATO — AI Career Readiness Platform",
  description:
    "INNOVATO uses AI-powered assessments, personalized roadmaps, and project-based learning to help students become industry-ready professionals.",
}

export const viewport: Viewport = {
  themeColor: "#050816",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
