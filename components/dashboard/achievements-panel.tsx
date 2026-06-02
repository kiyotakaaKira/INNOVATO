"use client"

import { motion } from "framer-motion"
import { Trophy, Star, Flame, Target, Zap, Lock } from "lucide-react"

const achievements = [
  { id: "1", icon: Flame, label: "7 Day Streak", unlocked: true, color: "orange" },
  { id: "2", icon: Star, label: "First Journey", unlocked: true, color: "yellow" },
  { id: "3", icon: Target, label: "5 Skills", unlocked: false, color: "purple" },
  { id: "4", icon: Trophy, label: "Master Level", unlocked: false, color: "pink" },
]

export function AchievementsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="relative p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-blue-500/10 backdrop-blur-sm border border-indigo-500/20"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Achievements
        </h3>
        <span className="text-xs text-gray-400">2 / 4 Unlocked</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.1, y: -4 }}
            className="relative group cursor-pointer"
          >
            <div
              className={`relative p-4 rounded-xl border ${
                achievement.unlocked
                  ? "bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border-indigo-500/40"
                  : "bg-black/20 border-white/10"
              }`}
            >
              {achievement.unlocked ? (
                <achievement.icon
                  className={`w-6 h-6 mx-auto ${
                    achievement.color === "orange"
                      ? "text-orange-400"
                      : achievement.color === "yellow"
                        ? "text-yellow-400"
                        : achievement.color === "purple"
                          ? "text-indigo-400"
                          : "text-violet-400"
                  }`}
                />
              ) : (
                <Lock className="w-6 h-6 mx-auto text-white/30" />
              )}

              {achievement.unlocked && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-indigo-500/20 blur-md -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                />
              )}
            </div>

            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-black/80 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {achievement.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-indigo-500/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-white font-medium">Current Streak</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-orange-400">7</span>
            <span className="text-gray-400">days</span>
            <Zap className="w-4 h-4 text-yellow-400 ml-1" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
