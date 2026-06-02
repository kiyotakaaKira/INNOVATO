"use client"

import { motion } from "framer-motion"
import { Target, Map, Code2, BarChart3, GitBranch, TrendingUp, Sparkles } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const features = [
  {
    icon: Target,
    title: "AI Career Readiness Assessment",
    description:
      "Evaluate technical, analytical, communication, and problem-solving skills to get your personalized Career Readiness Score.",
    gradient: "from-indigo-500 to-indigo-600",
    glowColor: "rgba(99,102,241,0.3)",
    href: "/skills",
    tag: "Core",
    tagColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: Map,
    title: "Personalized Growth Roadmaps",
    description:
      "Generate adaptive learning journeys based on your career goals and current capability profile.",
    gradient: "from-violet-500 to-violet-600",
    glowColor: "rgba(139,92,246,0.3)",
    href: "/roadmaps",
    tag: "Core",
    tagColor: "text-violet-300 bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Code2,
    title: "Industry-Aligned Projects",
    description:
      "Build real-world portfolio projects mapped directly to industry requirements and hiring benchmarks.",
    gradient: "from-blue-500 to-indigo-600",
    glowColor: "rgba(59,130,246,0.3)",
    href: "/projects",
    tag: "Core",
    tagColor: "text-blue-300 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: BarChart3,
    title: "Skill Gap Intelligence",
    description:
      "Compare your current profile against target role requirements to see exactly what's missing and what to prioritize.",
    gradient: "from-indigo-500 to-violet-600",
    glowColor: "rgba(99,102,241,0.3)",
    href: "/dashboard/skill-gap",
    tag: "AI-Powered",
    tagColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: GitBranch,
    title: "Career Path Explorer",
    description:
      "Visualize progression paths — from junior to senior roles — with skill requirements, timelines, and project recommendations.",
    gradient: "from-violet-500 to-blue-600",
    glowColor: "rgba(139,92,246,0.3)",
    href: "/dashboard/career-path",
    tag: "AI-Powered",
    tagColor: "text-violet-300 bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: TrendingUp,
    title: "Employability Insights Dashboard",
    description:
      "Track Career Readiness Score, project completion, skill growth, and portfolio strength with weekly trend analytics.",
    gradient: "from-blue-500 to-violet-600",
    glowColor: "rgba(56,189,248,0.25)",
    href: "/dashboard/insights",
    tag: "Analytics",
    tagColor: "text-sky-300 bg-sky-500/10 border-sky-500/20",
  },
]

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/25 mb-6"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300 uppercase tracking-wider">
              Core Platform Features
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-balance mb-6">
            Everything You Need to{" "}
            <span className="career-gradient">Become Job-Ready</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six AI-powered modules working together to take you from where you are to where you want to be.
          </p>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link key={feature.title} href={feature.href}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative group cursor-pointer h-full"
              >
                {/* Hover glow behind card */}
                <motion.div
                  animate={{
                    opacity: hoveredIndex === index ? 0.5 : 0,
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl`}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-full p-7 rounded-2xl glass-panel hover:border-indigo-500/40 transition-all duration-300 overflow-hidden"
                >
                  {/* Tag */}
                  <span
                    className={`absolute top-5 right-5 text-xs font-semibold px-2.5 py-1 rounded-full border ${feature.tagColor}`}
                  >
                    {feature.tag}
                  </span>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [-5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                    className={`inline-flex p-3.5 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5 shadow-lg`}
                    style={{ boxShadow: `0 4px 20px ${feature.glowColor}` }}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>

                  <h3 className="text-lg font-bold mb-3 text-foreground leading-snug pr-14">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  {/* Bottom indigo gradient reveal */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
