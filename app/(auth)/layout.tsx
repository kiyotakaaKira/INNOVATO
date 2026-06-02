import type React from "react"
import { AuthBackground } from "@/components/auth/auth-background"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <AuthBackground />

      {/* Logo */}
      <Link href="/" className="absolute top-8 left-8 z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center font-bold text-white text-lg">
            V
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            INNOVATO
          </span>
        </div>
      </Link>

      <div className="relative z-10">{children}</div>
    </div>
  )
}
