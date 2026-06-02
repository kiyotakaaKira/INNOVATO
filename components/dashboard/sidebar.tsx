"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, Map, User, Settings, LogOut, Compass, ChevronRight } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/journeys", icon: Map, label: "Career Journeys" },
  { href: "/dashboard/profile", icon: User, label: "My Profile" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export function DashboardSidebar({ user }: { user: SupabaseUser }) {
  const pathname = usePathname()
  const router = useRouter()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient()
    if (supabase) {
      await supabase.auth.signOut()
      router.push("/")
    }
  }

  // Mock Career Readiness Score
  const currentScore = 68

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col z-40 bg-[#070D1A] border-r border-indigo-500/10">
      <div className="relative z-10 flex flex-col h-full p-5">
        
        {/* Logo area */}
        <div className="mb-10 pl-2">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-md shadow-indigo-500/20"
            >
              <Compass className="h-5 w-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground leading-none tracking-wide">INNOVATO</span>
              <span className="text-[10px] text-muted-foreground leading-none mt-1">Career Readiness Platform</span>
            </div>
          </Link>
        </div>

        {/* User Card — Career Readiness */}
        <div className="mb-8 p-4 rounded-xl glass-panel border-indigo-500/15">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">Career Readiness</span>
            <span className="text-sm font-bold text-indigo-400">{currentScore}%</span>
          </div>
          
          <div className="relative h-2 bg-indigo-950/50 rounded-full overflow-hidden mb-3">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${currentScore}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Career Level 3</span>
            <span>2,450 pts</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                className="block"
              >
                <div
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-indigo-500/15 text-indigo-100"
                      : "text-muted-foreground hover:bg-indigo-500/5 hover:text-foreground"
                  }`}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>

                  <item.icon className={`w-5 h-5 ${isActive ? "text-indigo-400" : ""}`} />
                  
                  <span className="font-medium text-sm">{item.label}</span>
                  
                  <ChevronRight
                    className={`w-4 h-4 ml-auto transition-opacity ${
                      isActive ? "text-indigo-400 opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Profile Area */}
        <div className="mt-auto pt-4 border-t border-indigo-500/10">
          <div className="flex items-center gap-3 p-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">
                {user.email?.charAt(0).toUpperCase() || "E"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user.user_metadata?.name || user.email?.split("@")[0] || "Explorer"}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors group"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
