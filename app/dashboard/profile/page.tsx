"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Link as LinkIcon, Github, Linkedin, Code2, Award, Briefcase, Plus, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const masteredSkills = ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS"]
const inProgressSkills = ["Python", "Machine Learning", "Data Visualization"]

const projects = [
  { title: "E-Commerce Platform", role: "Full Stack", date: "May 2026", link: "#" },
  { title: "AI Content Generator", role: "Frontend", date: "April 2026", link: "#" },
]

const achievements = [
  { title: "Frontend Scholar", desc: "Completed 5 UI projects", icon: Award },
  { title: "Fast Learner", desc: "Finished roadmap in 3 weeks", icon: Zap },
]
import { Zap } from "lucide-react" // Added for Fast Learner

export default function ProfilePage() {
  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()

  const handleSaveLinks = async () => {
    try {
      setIsSaving(true)
      setSaveStatus("idle")

      // Validate at least one URL or resume
      if (!github && !linkedin && !portfolio && !resumeFile) {
        toast({
          title: "Error",
          description: "Please add at least one link or upload a resume.",
          variant: "destructive",
        })
        setIsSaving(false)
        return
      }

      const formData = new FormData()
      if (github) formData.append("github", github)
      if (linkedin) formData.append("linkedin", linkedin)
      if (portfolio) formData.append("portfolio", portfolio)
      if (resumeFile) formData.append("resume", resumeFile)

      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save profile")
      }

      setSaveStatus("success")
      toast({
        title: "Success",
        description: "Your profile has been updated!",
      })

      setResumeFile(null)

      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error: any) {
      setSaveStatus("error")
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleResumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Error",
          description: "Only PDF files are allowed.",
          variant: "destructive",
        })
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB.",
          variant: "destructive",
        })
        return
      }
      setResumeFile(file)
      toast({
        title: "Success",
        description: `Resume selected: ${file.name}`,
      })
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your career profile and portfolio</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 p-1 mb-4">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                <span className="text-2xl font-bold text-foreground">E</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-foreground">Explorer</h2>
            <p className="text-sm text-muted-foreground mb-4">student@university.edu</p>
            <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
              Career Level 3
            </Badge>
          </motion.div>

          {/* Portfolio Links Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 rounded-2xl space-y-4"
          >
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-indigo-400" /> Links
            </h3>
            <div className="space-y-3">
              <div className="relative">
                <Github className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="GitHub URL"
                  className="pl-9 bg-secondary/50 border-indigo-500/20"
                />
              </div>
              <div className="relative">
                <Linkedin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="LinkedIn URL"
                  className="pl-9 bg-secondary/50 border-indigo-500/20"
                />
              </div>
              <div className="relative">
                <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="Portfolio URL"
                  className="pl-9 bg-secondary/50 border-indigo-500/20"
                />
              </div>
              <Button 
                onClick={handleSaveLinks}
                disabled={isSaving}
                className={`w-full gap-2 transition-all ${
                  saveStatus === "success"
                    ? "bg-green-600 hover:bg-green-500"
                    : saveStatus === "error"
                      ? "bg-red-600 hover:bg-red-500"
                      : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                {isSaving ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="inline-block"
                    >
                      <Upload className="w-4 h-4" />
                    </motion.div>
                    Saving...
                  </>
                ) : saveStatus === "success" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Saved!
                  </>
                ) : saveStatus === "error" ? (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    Try Again
                  </>
                ) : (
                  "Save Profile"
                )}
              </Button>
            </div>
          </motion.div>

          {/* Resume Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <h3 className="font-semibold text-foreground mb-4">Resume</h3>
            <label className="border-2 border-dashed border-indigo-500/30 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-indigo-500/5 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleResumeSelect}
              />
              <Upload className="w-8 h-8 text-indigo-400 mb-3" />
              <p className="text-sm font-medium text-foreground">
                {resumeFile ? resumeFile.name : "Upload Resume (PDF)"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Max 5MB</p>
            </label>
            {resumeFile && (
              <motion.button
                onClick={() => setResumeFile(null)}
                className="mt-3 w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Clear selection
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Skills</h3>
              <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">
                <Plus className="w-4 h-4 mr-1" /> Add Skill
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground mb-3 block">Mastered (Validated)</Label>
                <div className="flex flex-wrap gap-2">
                  {masteredSkills.map((skill) => (
                    <Badge key={skill} className="bg-indigo-500/15 text-indigo-200 border-indigo-500/30 hover:bg-indigo-500/25 px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-3 block mt-5">In Progress</Label>
                <div className="flex flex-wrap gap-2">
                  {inProgressSkills.map((skill) => (
                    <Badge key={skill} className="bg-violet-500/15 text-violet-200 border-violet-500/30 hover:bg-violet-500/25 px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <h3 className="text-lg font-bold text-foreground mb-6">Completed Projects</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-secondary/40 border border-indigo-500/10 p-5 rounded-xl hover:border-indigo-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Code2 className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{proj.title}</h4>
                  <p className="text-xs text-muted-foreground mb-4">{proj.role} • {proj.date}</p>
                  <Link href={proj.link} className="text-sm text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center">
                    View Details <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <h3 className="text-lg font-bold text-foreground mb-6">Achievements</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((ach, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-secondary/30 p-4 rounded-xl border border-white/5">
                  <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <ach.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{ach.title}</h4>
                    <p className="text-xs text-muted-foreground">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
