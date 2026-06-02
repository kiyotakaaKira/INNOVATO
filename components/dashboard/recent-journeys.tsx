"use client"

import { motion } from "framer-motion"
import { BookOpen, Play, Clock, Target, Sparkles } from "lucide-react"
import Link from "next/link"

const mockJourneys = [
  {
    id: "1",
    title: "React Mastery",
    skill: "Frontend Development",
    progress: 65,
    hoursSpent: 24,
    lastActive: "2 hours ago",
    level: 4,
  },
  {
    id: "2",
    title: "Python for AI",
    skill: "Machine Learning",
    progress: 40,
    hoursSpent: 18,
    lastActive: "1 day ago",
    level: 3,
  },
  {
    id: "3",
    title: "UI/UX Design",
    skill: "Product Design",
    progress: 85,
    hoursSpent: 32,
    lastActive: "5 hours ago",
    level: 5,
  },
]

export function RecentJourneys() {
  if (mockJourneys.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-blue-500/10 backdrop-blur-sm border border-indigo-500/20 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">No Learning Journeys Yet</h3>
            <p className="text-gray-400">Start your first journey to begin tracking your progress!</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          Active Quests
        </h2>
        <Link href="/dashboard/journeys" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          View All
        </Link>
      </div>

      <div className="grid gap-4">
        {mockJourneys.map((journey, index) => (
          <motion.div
            key={journey.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.01, x: 4 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-5 rounded-xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-blue-500/10 backdrop-blur-sm border border-indigo-500/20 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500/10 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: `${journey.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>

              <div className="relative flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border border-indigo-500/40 flex flex-col items-center justify-center">
                    <span className="text-xs text-indigo-400">LVL</span>
                    <span className="text-lg font-bold text-white">{journey.level}</span>
                  </div>
                  {journey.progress >= 80 && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                    </motion.div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate">{journey.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-xs text-indigo-400">
                      {journey.skill}
                    </span>
                  </div>

                  <div className="relative h-2 bg-black/40 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${journey.progress}%` }}
                      transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: index * 0.3 }}
                    />
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {journey.progress}% Complete
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {journey.hoursSpent}h spent
                    </span>
                    <span className="text-indigo-400">{journey.lastActive}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25"
                >
                  <Play className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
