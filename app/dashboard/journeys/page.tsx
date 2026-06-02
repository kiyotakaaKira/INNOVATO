"use client"

import { motion } from "framer-motion"
import { Map, Clock, ArrowRight, CheckCircle2, Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const activeJourneys = [
  { title: "Frontend Developer Core", progress: 65, milestones: 12, due: "Next: React Hooks" },
  { title: "UI/UX Fundamentals", progress: 30, milestones: 8, due: "Next: Color Theory" },
]

const completedJourneys = [
  { title: "HTML & CSS Mastery", date: "April 2026", score: "92%" },
  { title: "JavaScript Basics", date: "May 2026", score: "88%" },
]

const recommendedJourneys = [
  { title: "AI Engineer", duration: "12 weeks", skills: 15, projects: 4 },
  { title: "Data Scientist", duration: "16 weeks", skills: 18, projects: 5 },
  { title: "Full Stack Developer", duration: "20 weeks", skills: 22, projects: 6 },
]

export default function JourneysPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Career Journeys</h1>
          <p className="text-muted-foreground mt-1">Track and manage your learning roadmaps</p>
        </div>
        <Link href="/dashboard/journeys/new">
          <Button className="bg-indigo-600 hover:bg-indigo-500 gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" /> New Journey
          </Button>
        </Link>
      </div>

      <div className="space-y-12">
        {/* Active Journeys */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Play className="w-4 h-4 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Active Journeys</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {activeJourneys.map((journey, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-foreground">{journey.title}</h3>
                  <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    {journey.progress}%
                  </span>
                </div>
                
                <div className="h-2 bg-indigo-950/40 rounded-full overflow-hidden mb-6">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" 
                    style={{ width: `${journey.progress}%` }} 
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">
                    <span className="block">{journey.milestones} Milestones</span>
                    <span className="block mt-1 text-indigo-400/80">{journey.due}</span>
                  </div>
                  <Button variant="outline" className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recommended Journeys */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Map className="w-4 h-4 text-violet-400" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Recommended for You</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedJourneys.map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="glass-panel p-5 rounded-2xl flex flex-col h-full hover-indigo-glow transition-all duration-300"
              >
                <h3 className="font-bold text-foreground mb-4">{rec.title}</h3>
                
                <div className="space-y-2 mb-6 flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <Clock className="w-4 h-4 text-violet-400" /> {rec.duration}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" /> {rec.skills} Skills
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <Map className="w-4 h-4 text-violet-400" /> {rec.projects} Projects
                  </div>
                </div>
                
                <Button className="w-full bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500 hover:text-white transition-colors border border-indigo-500/20">
                  Start Journey
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Completed Journeys */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Completed</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 opacity-70">
            {completedJourneys.map((comp, idx) => (
              <div key={idx} className="bg-secondary/20 p-5 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{comp.title}</h3>
                  <p className="text-xs text-muted-foreground">Completed: {comp.date}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-emerald-400">{comp.score}</span>
                  <p className="text-[10px] text-muted-foreground">Score</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
