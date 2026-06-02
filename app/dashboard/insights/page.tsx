"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Target, Award, TrendingUp, Activity, Lightbulb, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { 
  mockStudents, 
  generateGrowthMetrics, 
  generateWeeklyProgress, 
  generateRadarData 
} from "@/lib/mock-data/employability-insights"
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, 
  BarChart, Bar, Legend, PieChart, Pie, Cell 
} from "recharts"

export default function InsightsPage() {
  const profile = mockStudents[0]
  
  const [readinessScore, setReadinessScore] = useState(0)
  const [portfolioStrength, setPortfolioStrength] = useState(0)
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const growthData = generateGrowthMetrics()
  const weeklyData = generateWeeklyProgress()
  const radarData = generateRadarData(profile)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/employability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            skills: profile.skills, 
            projects: ["AI Analyzer Project", "Portfolio Website"].slice(0, profile.projects), 
            hoursLearned: profile.hoursLearned || 74
          })
        })
        const data = await res.json()
        if (!data.error) {
          setReadinessScore(data.careerReadiness || 0)
          setPortfolioStrength(data.portfolioStrength || 0)
          setRecommendations(data.recommendations || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Analytics</span>
            <span>/</span>
            <span className="text-blue-400">Employability Insights</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Employability Insights Dashboard</h1>
          <p className="text-muted-foreground">Measurable career readiness analytics to track your professional growth.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-background/50 border border-blue-500/20 px-4 py-2 rounded-xl">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Profile Analyzed</p>
            <p className="text-sm font-semibold text-white">{profile.name} • {profile.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
            {profile.name.charAt(0)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        
        {/* Widget 1: Career Readiness Score */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl glass-panel border-blue-500/20 flex flex-col items-center justify-center text-center relative overflow-hidden col-span-1 md:col-span-2 lg:col-span-1"
        >
          <div className="absolute -top-4 -right-4 text-blue-500/10">
            <Target className="w-24 h-24" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 z-10 flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-400" /> Career Readiness
          </h3>
          <div className="relative w-32 h-32 flex items-center justify-center z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ value: readinessScore }, { value: 100 - readinessScore }]}
                  cx="50%" cy="50%" innerRadius={45} outerRadius={60}
                  startAngle={90} endAngle={-270}
                  dataKey="value" stroke="none"
                >
                  <Cell fill="#3b82f6" /> {/* Blue */}
                  <Cell fill="#1e293b" /> {/* Muted bg */}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{readinessScore}</span>
              <span className="text-xs text-blue-400">/ 100</span>
            </div>
          </div>
        </motion.div>

        {/* Widget 2: Portfolio Strength */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl glass-panel border-indigo-500/20 flex flex-col items-center justify-center text-center relative overflow-hidden col-span-1 md:col-span-2 lg:col-span-1"
        >
          <div className="absolute -bottom-4 -left-4 text-indigo-500/10">
            <Award className="w-24 h-24" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 z-10 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-400" /> Portfolio Strength
          </h3>
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-blue-400 mb-2 z-10">
            {isLoading ? "..." : portfolioStrength}
          </div>
          <p className="text-xs text-muted-foreground z-10">Top 15% in your cohort</p>
        </motion.div>

        {/* Portfolio Radar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl glass-panel border-blue-500/20 col-span-1 md:col-span-2"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" /> Competency Breakdown
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(59, 130, 246, 0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Radar name="Student" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Widget 3: Skill Growth */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl glass-panel border-blue-500/20"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" /> Skill Growth Trend (6 Weeks)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 6, fill: '#60a5fa' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Widget 4: Weekly Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl glass-panel border-blue-500/20"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" /> Weekly Learning Hours
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '8px' }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                />
                <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Widget 5: Recommendations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl glass-panel border-blue-500/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" /> Actionable Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            <p className="text-muted-foreground text-sm col-span-2">Generating AI insights...</p>
          ) : (
            recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-blue-500/10 hover:border-blue-500/30 transition-colors">
                <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground text-sm">{rec}</p>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  )
}

function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
