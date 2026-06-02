"use client"

import { motion } from "framer-motion"
import { Target, ArrowRight, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const gaps = [
  { skill: "Machine Learning", priority: "High", coverage: 30 },
  { skill: "Statistical Analysis", priority: "High", coverage: 45 },
  { skill: "Python (Advanced)", priority: "Medium", coverage: 60 },
]

export function SkillGapPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-panel p-6 rounded-2xl hover-indigo-glow transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            Skill Gap Intelligence
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Top priorities to reach your career goal</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-sm cursor-pointer hover:bg-indigo-500/20 transition-colors">
          <Target className="h-4 w-4 text-indigo-400" />
          <span className="text-indigo-100">Data Scientist</span>
          <span className="text-xs text-indigo-400/70 ml-1">(Edit)</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {gaps.map((gap, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 bg-secondary/30 p-3.5 rounded-xl border border-white/5">
            <div className="flex-1 font-medium text-foreground">{gap.skill}</div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  gap.priority === "High"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                {gap.priority} Priority
              </span>
              
              <div className="flex-1 sm:w-32 h-1.5 bg-indigo-950/40 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    gap.priority === "High" ? "bg-red-500" : "bg-amber-500"
                  }`}
                  style={{ width: `${gap.coverage}%` }}
                />
              </div>
              <span className="text-xs font-mono text-muted-foreground w-8 text-right">{gap.coverage}%</span>
            </div>
          </div>
        ))}
      </div>

      <Link href="/dashboard/journeys">
        <Button variant="outline" className="w-full border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-300">
          See Full Gap Analysis
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    </motion.div>
  )
}
