"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Map, Loader2, ArrowLeft, CheckCircle, BookOpen, Target } from "lucide-react"
import Link from "next/link"

function RoadmapFlowchart({ roadmapJson }: { roadmapJson: string }) {
  try {
    // Handle if it's already an object
    let roadmap
    if (typeof roadmapJson === 'string') {
      let jsonStr = roadmapJson.trim()
      
      // Remove markdown code blocks
      jsonStr = jsonStr.replace(/```json\n?|```\n?/g, '')
      jsonStr = jsonStr.replace(/^```[\s\S]*?^```/gm, '')
      
      // Extract JSON from text that may have prefixes like "Here is the..."
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        jsonStr = jsonMatch[0]
      }
      
      // Handle incomplete JSON (missing closing braces)
      const openBraces = (jsonStr.match(/\{/g) || []).length
      const closeBraces = (jsonStr.match(/\}/g) || []).length
      if (openBraces > closeBraces) {
        jsonStr += '}'.repeat(openBraces - closeBraces)
      }
      
      // Try to parse the string
      roadmap = JSON.parse(jsonStr)
    } else {
      roadmap = roadmapJson
    }
    
    const phases = roadmap.phases || []

    const getResourceIcon = (type: string) => {
      const lowerType = type?.toLowerCase() || ''
      if (lowerType.includes('video')) return '📹'
      if (lowerType.includes('article')) return '📄'
      if (lowerType.includes('course')) return '🎓'
      if (lowerType.includes('documentation')) return '📚'
      if (lowerType.includes('interactive')) return '⚡'
      if (lowerType.includes('project')) return '🏗️'
      if (lowerType.includes('book')) return '📖'
      if (lowerType.includes('tutorial')) return '🎬'
      return '🔗'
    }

    return (
      <div className="space-y-8">
        {/* Header Info Card */}
        {roadmap.skill_name && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative overflow-hidden rounded-2xl p-8"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-violet-600/20 to-blue-600/20 blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-blue-600/10" />
            
            {/* Border glow */}
            <div className="absolute inset-0 rounded-2xl border border-indigo-500/30 group-hover:border-violet-500/50 transition-colors" />
            
            {/* Content */}
            <div className="relative space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-indigo-300 uppercase tracking-widest mb-2">Learning Roadmap</p>
                  <h3 className="text-3xl font-bold text-white mb-2">{roadmap.skill_name}</h3>
                  <p className="text-muted-foreground">Master this skill with a structured learning path</p>
                </div>
                <div className="text-5xl">🚀</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                {roadmap.difficulty_level && (
                  <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <p className="text-xs text-muted-foreground">Level</p>
                    <p className="font-bold text-indigo-300 capitalize">{roadmap.difficulty_level.replace(/_/g, ' ')}</p>
                  </div>
                )}
                {roadmap.total_duration_months && (
                  <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-bold text-violet-300">{roadmap.total_duration_months} months</p>
                  </div>
                )}
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-xs text-muted-foreground">Phases</p>
                  <p className="font-bold text-blue-300">{phases.length}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Timeline/Flowchart */}
        <div className="relative">
          {phases.map((phase: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative"
            >
              {/* Connecting Line to Next Phase */}
              {idx < phases.length - 1 && (
                <div className="absolute left-8 top-20 w-1 bg-gradient-to-b from-violet-500 via-indigo-500 to-blue-500 rounded-full shadow-lg shadow-violet-500/50" style={{ height: '580px' }} />
              )}

              <div className="flex gap-6" style={{ paddingBottom: idx < phases.length - 1 ? '5rem' : '0' }}>
                {/* Phase Number Circle */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-violet-500/50 relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {idx + 1}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 blur-xl opacity-50 -z-10" />
                  </motion.div>
                </div>

                {/* Phase Content */}
                <div className="flex-1 space-y-4">
                  {/* Phase Header Card */}
                  <motion.div
                    className="group relative overflow-hidden rounded-2xl p-6 cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-background to-violet-950/30 group-hover:from-indigo-900/60 group-hover:to-violet-900/40 transition-all duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent" />
                    
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl border border-indigo-500/30 group-hover:border-violet-400/50 transition-colors" />
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300 -z-10" />

                    {/* Content */}
                    <div className="relative space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-1">Phase {idx + 1}</p>
                          <h4 className="text-2xl font-bold text-white">{phase.title}</h4>
                        </div>
                        <span className="text-3xl opacity-70 group-hover:opacity-100 transition-opacity">📍</span>
                      </div>
                      
                      {phase.goal && (
                        <p className="text-muted-foreground leading-relaxed">{phase.goal}</p>
                      )}

                      {phase.duration_weeks && (
                        <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30">
                          <p className="text-xs font-medium text-indigo-300">⏱️ {phase.duration_weeks} weeks</p>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Topics Section */}
                  {phase.topics && Array.isArray(phase.topics) && phase.topics.length > 0 && (
                    <div className="space-y-3">
                      <h5 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                        <span className="text-lg">📚</span> Topics to Master
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {phase.topics.map((topic: any, tidx: number) => (
                          <motion.div
                            key={tidx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.15 + tidx * 0.05 }}
                            className="group relative overflow-hidden rounded-xl p-4 border border-indigo-500/20 hover:border-indigo-400/50 transition-all cursor-pointer"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-violet-600/5 group-hover:from-indigo-600/15 group-hover:to-violet-600/10 transition-all" />
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur -z-10 transition-opacity" />
                            
                            <div className="relative space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <h6 className="font-semibold text-white leading-tight flex-1">{topic.name}</h6>
                                <span className="text-lg flex-shrink-0">✓</span>
                              </div>
                              
                              {topic.why_important && (
                                <p className="text-xs text-muted-foreground italic">{topic.why_important}</p>
                              )}
                              
                              {topic.time_hours && (
                                <div className="flex items-center gap-1 text-xs font-medium text-violet-400 pt-1">
                                  <span>⏱️</span>
                                  <span>{topic.time_hours}h</span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resources Section */}
                  {phase.resources && Array.isArray(phase.resources) && phase.resources.length > 0 && (
                    <div className="space-y-3">
                      <h5 className="text-sm font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
                        <span className="text-lg">🎯</span> Learning Resources
                      </h5>
                      <div className="space-y-2">
                        {phase.resources.map((resource: any, ridx: number) => (
                          <motion.a
                            key={ridx}
                            href={resource.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.15 + ridx * 0.03 }}
                            className="group relative overflow-hidden rounded-lg p-4 border border-blue-500/20 hover:border-blue-400/50 transition-all flex items-start gap-3 cursor-pointer"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 group-hover:from-blue-600/15 group-hover:to-cyan-600/10 transition-all" />
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 blur -z-10 transition-opacity" />
                            
                            <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                              {getResourceIcon(resource.type)}
                            </span>
                            
                            <div className="relative flex-1 min-w-0">
                              <p className="font-semibold text-white truncate group-hover:text-violet-300 transition-colors">
                                {resource.title}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">{resource.type}</p>
                              {resource.duration && (
                                <p className="text-xs text-blue-400 mt-1">⏱️ {resource.duration}</p>
                              )}
                            </div>
                            
                            <span className="text-xl flex-shrink-0 group-hover:translate-x-1 transition-transform">→</span>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Milestone Section */}
                  {phase.milestone && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.15 + 0.3 }}
                      className="relative overflow-hidden rounded-lg p-4 border border-green-500/30 bg-green-500/5"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/5" />
                      <div className="relative flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0 animate-pulse">🎖️</span>
                        <div>
                          <p className="font-bold text-green-400">Phase Milestone</p>
                          <p className="text-sm text-green-300/80">{phase.milestone}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Completion Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: phases.length * 0.15 }}
          className="relative overflow-hidden rounded-2xl p-6 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-blue-600/20 blur-xl" />
          <div className="absolute inset-0 border border-indigo-500/30 rounded-2xl" />
          
          <div className="relative space-y-3">
            <p className="text-5xl">🏆</p>
            <p className="text-xl font-bold text-white">Ready to Start Your Journey?</p>
            <p className="text-muted-foreground">Follow this roadmap phase by phase and become an expert in {roadmap.skill_name}</p>
          </div>
        </motion.div>
      </div>
    )
  } catch (e) {
    console.error('RoadmapFlowchart parse error:', e)
    return (
      <div className="rounded-2xl glass-panel border-red-500/20 bg-red-500/10 p-6">
        <p className="text-red-400 font-semibold mb-2">Error parsing roadmap data</p>
        <details className="text-xs text-red-300/70 cursor-pointer">
          <summary>Show raw data</summary>
          <pre className="mt-2 p-2 bg-background rounded text-muted-foreground overflow-auto max-h-48">
            {typeof roadmapJson === 'string' ? roadmapJson : JSON.stringify(roadmapJson, null, 2)}
          </pre>
        </details>
      </div>
    )
  }
}

export default function RoadmapsPage() {
  const [skill, setSkill] = useState("")
  const [experience, setExperience] = useState("complete_beginner")
  const [timeCommitment, setTimeCommitment] = useState("10")
  const [learningGoal, setLearningGoal] = useState("get_job")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill, experience, timeCommitment, learningGoal }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate roadmap")
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 mb-6">
              <Map className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300 uppercase tracking-wider">
                Smart Roadmaps
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Get Your Learning Roadmap
            </h1>
            <p className="text-muted-foreground text-lg">
              Receive a personalized learning path tailored to your goals and current skill level.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="mb-8"
          >
            <div className="rounded-2xl glass-panel border-violet-500/20 p-6 space-y-4">
              <div>
                <label htmlFor="skill" className="block text-sm font-medium mb-2">
                  What skill do you want to learn?
                </label>
                <input
                  id="skill"
                  type="text"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="e.g., Full Stack Development, Data Science..."
                  className="w-full px-4 py-3 rounded-xl bg-background border border-violet-500/20 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  required
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium mb-2">
                  Experience Level
                </label>
                <select
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-violet-500/20 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                >
                  <option value="complete_beginner">Complete Beginner</option>
                  <option value="some_experience">Some Experience</option>
                  <option value="intermidiate">Intermediate</option>
                </select>
              </div>
              <div>
                <label htmlFor="timeCommitment" className="block text-sm font-medium mb-2">
                  Time Commitment (hours per week)
                </label>
                <select
                  id="timeCommitment"
                  value={timeCommitment}
                  onChange={(e) => setTimeCommitment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-violet-500/20 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                >
                  <option value="5">5 hours</option>
                  <option value="10">10 hours</option>
                  <option value="15">15 hours</option>
                  <option value="20">20 hours</option>
                  <option value="25">25+ hours</option>
                </select>
              </div>
              <div>
                <label htmlFor="learningGoal" className="block text-sm font-medium mb-2">
                  Learning Goal
                </label>
                <select
                  id="learningGoal"
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-violet-500/20 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                >
                  <option value="get_job">Get a job</option>
                  <option value="freelance">Freelance</option>
                  <option value="build_projects">Build projects</option>
                </select>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 hover:from-violet-500 hover:via-indigo-500 hover:to-violet-500 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Roadmap...
                  </>
                ) : (
                  "Generate Roadmap"
                )}
              </Button>
            </div>
          </motion.form>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl glass-panel border-red-500/20 bg-red-500/10 p-6 mb-8"
            >
              <p className="text-red-400">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Your Learning Roadmap
              </h2>
              {result.roadmap ? (
                <RoadmapFlowchart roadmapJson={result.roadmap} />
              ) : result.answer ? (
                <RoadmapFlowchart roadmapJson={result.answer} />
              ) : result.data?.outputs ? (
                <RoadmapFlowchart roadmapJson={typeof result.data.outputs === 'string' 
                  ? result.data.outputs 
                  : JSON.stringify(result.data.outputs)} />
              ) : result.output ? (
                <RoadmapFlowchart roadmapJson={result.output} />
              ) : (
                <div className="rounded-2xl glass-panel border-violet-500/20 p-6">
                  <p className="text-muted-foreground">No roadmap data received</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
