"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Users, Briefcase, Video, Award } from "lucide-react"

const comingSoonFeatures = [
  { icon: Video, label: "AI Mock Interviews", description: "Simulate real interview scenarios with AI feedback" },
  { icon: Briefcase, label: "Employer Connect", description: "Direct connections to hiring companies seeking skill-verified candidates" },
  { icon: Users, label: "Team Projects", description: "Collaborate on projects with peers to build teamwork credentials" },
  { icon: Award, label: "Certification Engine", description: "Industry-recognized certificates linked to your career readiness score" },
]

export function ComingSoonSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="coming-soon" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-950/10 to-background" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 border border-indigo-500/20 mb-6 shadow-lg shadow-indigo-500/20"
          >
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              In Development
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-balance">
            Coming Soon to{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              INNOVATO
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg">
            We're building powerful new features to accelerate your career journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {comingSoonFeatures.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative glass-panel p-6 rounded-2xl group hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.label}</h3>
                <p className="text-sm text-muted-foreground flex-grow leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
