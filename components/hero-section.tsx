"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Compass, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Hero3D } from "./hero-3d"
import { useRef } from "react"

const stats = [
  { value: "50K+", label: "Career Paths Generated", color: "from-indigo-400 to-indigo-600" },
  { value: "12K+", label: "Projects Completed", color: "from-violet-400 to-violet-600" },
  { value: "89%", label: "Readiness Improvement", color: "from-sky-400 to-blue-600" },
  { value: "200+", label: "Partner Companies", color: "from-emerald-400 to-green-600" },
]

const pills = ["Career Readiness Score", "Skill Gap Analysis", "Growth Roadmap"]

export function HeroSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Deep background */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_40%,transparent_100%)]" />

      {/* Single centered indigo radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-600/[0.08] blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/[0.07] blur-3xl pointer-events-none" />

      {/* 3D Background */}
      <Hero3D />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300 backdrop-blur-sm">
            <Compass className="h-4 w-4 text-indigo-400" />
            🚀 Built for SahAI for Shiksha 2026
          </span>
        </motion.div>

        {/* H1 — three lines */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8"
          aria-label="Build Skills. Prove Capability. Get Career Ready."
        >
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="block text-foreground"
          >
            Build Skills.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="block text-foreground"
          >
            Prove Capability.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="block career-gradient"
          >
            Get Career Ready.
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed"
        >
          INNOVATO uses AI-powered assessments, personalized roadmaps, and project-based learning
          to help students become industry-ready professionals.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Link href="/signup">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-10 py-7 text-lg group shadow-2xl shadow-indigo-500/25 border-0"
              >
                <span className="flex items-center gap-2">
                  Start Your Career Journey
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </Link>
          <Link href="#features">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-indigo-500/40 hover:border-indigo-500/70 hover:bg-indigo-500/10 px-10 py-7 text-lg bg-transparent backdrop-blur-sm text-foreground"
              >
                Explore Platform
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Preview pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-20"
        >
          {pills.map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-indigo-300 border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm"
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative p-5 rounded-2xl glass-panel group cursor-default hover-indigo-glow transition-all duration-300"
            >
              <div
                className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1.5 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5 text-indigo-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
