"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

type StatColor = "indigo" | "violet" | "blue" | "success" | "warning"

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  subValue: string
  color: StatColor
  index: number
}

const colorStyles: Record<StatColor, { bg: string; text: string; gradient: string }> = {
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    gradient: "from-indigo-400 to-indigo-600",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    gradient: "from-violet-400 to-violet-600",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    gradient: "from-blue-400 to-blue-600",
  },
  success: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    gradient: "from-emerald-400 to-emerald-600",
  },
  warning: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    gradient: "from-amber-400 to-amber-600",
  },
}

export function StatsCard({ icon: Icon, label, value, subValue, color, index }: StatsCardProps) {
  const style = colorStyles[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-5 rounded-2xl glass-panel border border-indigo-500/15 relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20 transition-opacity duration-300 group-hover:opacity-40 ${style.bg}`} />
      
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${style.bg}`}>
          <Icon className={`w-5 h-5 ${style.text}`} />
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
        <h3 className={`text-2xl font-bold bg-gradient-to-r ${style.gradient} bg-clip-text text-transparent inline-block`}>
          {value}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 font-medium">{subValue}</p>
      </div>
    </motion.div>
  )
}
