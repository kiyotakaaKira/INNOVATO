"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, ChevronRight, BarChart3, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { roleRequirements, availableSkills, calculateSkillGap } from "@/lib/mock-data/skill-gap"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface SkillGapReport {
  matchPercentage: number;
  presentSkills: string[];
  missingSkills: string[];
  recommendations: string[];
}

export default function SkillGapPage() {
  const [targetRole, setTargetRole] = useState<string>("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [report, setReport] = useState<SkillGapReport | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const roles = Object.keys(roleRequirements)

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const generateReport = async () => {
    if (!targetRole) return;
    setIsLoading(true)
    try {
      const res = await fetch('/api/skill-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole, skills: selectedSkills })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      
      setReport({
        matchPercentage: data.readinessScore || 0,
        presentSkills: data.presentSkills || [],
        missingSkills: data.missingSkills || [],
        recommendations: data.learningOrder || data.recommendations || []
      } as any)
    } catch (err) {
      console.error(err)
      alert("Failed to generate skill gap report")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setTargetRole("")
    setSelectedSkills([])
    setReport(null)
  }

  // Colors for charts
  const CHART_COLORS = ['#4f46e5', '#8b5cf6', '#3b82f6', '#ec4899']; // Indigo, Violet, Blue, Pink (valid brand colors)

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Intelligence</span>
          <span>/</span>
          <span className="text-indigo-400">Skill Gap</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Skill Gap Intelligence</h1>
        <p className="text-muted-foreground">Compare your current profile against target role requirements to see exactly what's missing.</p>
      </div>

      {!report ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl space-y-8"
        >
          {/* Step 1 */}
          <div className="p-6 rounded-2xl glass-panel border-indigo-500/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-sm">1</span>
              Select Target Career
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {roles.map(role => (
                <button
                  key={role}
                  onClick={() => setTargetRole(role)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    targetRole === role 
                      ? "bg-indigo-500/20 border-indigo-500 text-white"
                      : "bg-background/50 border-indigo-500/10 text-muted-foreground hover:border-indigo-500/30"
                  }`}
                >
                  <span className="font-medium block">{role}</span>
                  <span className="text-xs mt-1 block opacity-80">{roleRequirements[role].length} core skills</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl glass-panel border-indigo-500/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-sm">2</span>
              Select Current Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {availableSkills.map(skill => {
                const isSelected = selectedSkills.includes(skill)
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-full border text-sm transition-all ${
                      isSelected
                        ? "bg-violet-500/20 border-violet-500 text-white"
                        : "bg-background/50 border-indigo-500/10 text-muted-foreground hover:border-indigo-500/30"
                    }`}
                  >
                    {skill}
                  </button>
                )
              })}
            </div>
          </div>

          <Button 
            onClick={generateReport}
            disabled={!targetRole || isLoading}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-8 py-6 rounded-xl text-lg font-semibold"
          >
            {isLoading ? "Analyzing..." : "Generate Gap Report"} <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 max-w-6xl"
        >
          {/* Header Action */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={resetForm} className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10">
              Run New Analysis
            </Button>
          </div>

          {/* Top Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-panel border-indigo-500/20 col-span-1 md:col-span-2 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10 blur-3xl">
                <div className="w-32 h-32 bg-indigo-500 rounded-full" />
              </div>
              <h3 className="text-muted-foreground font-medium mb-1">Target Role</h3>
              <h2 className="text-3xl font-bold text-white mb-6">{targetRole}</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Skill Match Score</span>
                  <span className="font-bold text-white">{report.matchPercentage}%</span>
                </div>
                <Progress value={report.matchPercentage} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  You have {report.presentSkills.length} of {roleRequirements[targetRole].length} required skills.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border-indigo-500/20 flex flex-col items-center justify-center">
              <h3 className="text-muted-foreground font-medium mb-4">Coverage Chart</h3>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Present", value: report.presentSkills.length },
                        { name: "Missing", value: report.missingSkills.length }
                      ]}
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#4f46e5" /> {/* Indigo */}
                      <Cell fill="#1e1b4b" /> {/* Dark bg */}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Comparison View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Present Skills */}
            <div className="p-6 rounded-2xl glass-panel border-indigo-500/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Present Skills
              </h3>
              <div className="space-y-3">
                {report.presentSkills.length > 0 ? (
                  report.presentSkills.map(skill => (
                    <div key={skill} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-50">{skill}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm italic p-4 text-center">No matching skills found.</p>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="p-6 rounded-2xl glass-panel border-indigo-500/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Missing Skills
              </h3>
              <div className="space-y-3">
                {report.missingSkills.length > 0 ? (
                  report.missingSkills.map(skill => (
                    <div key={skill} className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-50">{skill}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm italic p-4 text-center">You have all required skills!</p>
                )}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-6 rounded-2xl glass-panel border-indigo-500/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-violet-400" />
              Recommended Learning Order
            </h3>
            {report.recommendations.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {report.recommendations.map((skill, idx) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-200">
                      <span className="opacity-50 mr-2">{idx + 1}.</span> {skill}
                    </div>
                    {idx < report.recommendations.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">You are fully equipped for this role. Consider exploring advanced specializations or adjacent career paths!</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
