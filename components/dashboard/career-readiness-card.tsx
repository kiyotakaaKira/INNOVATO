"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const data = [
  { subject: "Technical", score: 72 },
  { subject: "Analytical", score: 65 },
  { subject: "Communication", score: 58 },
  { subject: "Domain", score: 70 },
]

export function CareerReadinessCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-panel p-6 rounded-2xl h-full flex flex-col"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground">Readiness Breakdown</h3>
        <p className="text-sm text-muted-foreground mt-1">Based on your latest assessment</p>
      </div>

      <div className="flex-grow w-full h-[250px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis 
              dataKey="subject" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94A3B8", fontSize: 12 }} 
            />
            <Tooltip
              cursor={{ fill: "rgba(99,102,241,0.1)" }}
              contentStyle={{ backgroundColor: "#0B1120", borderColor: "rgba(99,102,241,0.2)", borderRadius: "8px" }}
              itemStyle={{ color: "#F8FAFC" }}
            />
            <Bar dataKey="score" fill="#6366F1" radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Link href="/dashboard/journeys/new" className="mt-auto block">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white border-0 transition-colors">
          Take New Assessment
        </Button>
      </Link>
    </motion.div>
  )
}
