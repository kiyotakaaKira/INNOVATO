"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Briefcase, ChevronRight, CheckCircle2, Clock, Map, Star } from "lucide-react"
import Link from "next/link"
import { careerPaths, RoleDetails } from "@/lib/mock-data/career-paths"

export default function CareerPathPage() {
  const [selectedPathId, setSelectedPathId] = useState<string>(careerPaths[0].id)
  const [dynamicRoles, setDynamicRoles] = useState<RoleDetails[]>(careerPaths[0].roles)
  const [selectedRole, setSelectedRole] = useState<RoleDetails | null>(careerPaths[0].roles[0])
  const [isLoading, setIsLoading] = useState(false)

  const handlePathSelect = async (path: typeof careerPaths[0]) => {
    if (selectedPathId === path.id) return;
    setSelectedPathId(path.id)
    setIsLoading(true)
    try {
      const res = await fetch('/api/career-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole: path.name })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      
      const roles = data.careerPath
      setDynamicRoles(roles)
      setSelectedRole(roles[0])
    } catch (err) {
      console.error(err)
      setDynamicRoles(path.roles)
      setSelectedRole(path.roles[0])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Intelligence</span>
          <span>/</span>
          <span className="text-violet-400">Career Path</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Career Path Explorer</h1>
        <p className="text-muted-foreground">Visualize complete career progression pathways and skill requirements.</p>
      </div>

      {/* Path Selector */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {careerPaths.map(path => (
          <button
            key={path.id}
            onClick={() => handlePathSelect(path)}
            disabled={isLoading}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
              selectedPathId === path.id
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                : "bg-background/50 border border-violet-500/20 text-muted-foreground hover:bg-violet-500/10 hover:text-violet-200"
            } ${isLoading && selectedPathId !== path.id ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {path.name} {isLoading && selectedPathId === path.id && "..."}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: The Tree View */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-2xl glass-panel border-violet-500/20">
            <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
              <Map className="w-5 h-5 text-violet-400" /> Progression Pathway
            </h3>
            
            <div className={`relative pl-6 border-l-2 border-violet-500/20 space-y-8 py-2 ${isLoading ? 'opacity-50' : ''}`}>
              {dynamicRoles.map((role, idx) => {
                const isSelected = selectedRole?.id === role.id;
                
                return (
                  <motion.div 
                    key={role.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* The node dot */}
                    <div className={`absolute -left-[35px] w-5 h-5 rounded-full border-4 border-background ${
                      isSelected ? "bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.6)]" : "bg-violet-900/50"
                    } transition-all duration-300`} />
                    
                    {/* The node card */}
                    <button
                      onClick={() => setSelectedRole(role)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        isSelected 
                          ? "bg-violet-500/20 border border-violet-500/50 translate-x-2" 
                          : "bg-background/50 border border-violet-500/10 hover:border-violet-500/30 hover:bg-violet-500/5"
                      }`}
                    >
                      <h4 className={`font-semibold ${isSelected ? 'text-white' : 'text-violet-200'}`}>
                        {role.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {role.experience}
                      </p>
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Details Panel */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selectedRole && (
              <motion.div
                key={selectedRole.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-8 rounded-2xl glass-panel border-violet-500/20 h-full relative overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedRole.title}</h2>
                    <p className="text-violet-300 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Avg. Experience: {selectedRole.experience}
                    </p>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                    <span className="text-xs text-muted-foreground block mb-1">Expected Salary</span>
                    <span className="font-semibold text-white">{selectedRole.salary}</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-violet-400" /> Role Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedRole.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-violet-400" /> Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRole.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 rounded-lg bg-violet-900/30 border border-violet-500/20 text-violet-100 text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-violet-400" /> Recommended Projects
                    </h3>
                    <ul className="space-y-3">
                      {selectedRole.projects.map((project, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-background/40 border border-violet-500/10">
                          <ChevronRight className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
