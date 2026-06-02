"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Compass, ClipboardCheck, Target, Map, Code2, TrendingUp } from "lucide-react"

const colorMap: Record<string, { badge: string; icon: string; bar: string; glow: string }> = {
  indigo: {
    badge: "from-indigo-600 to-indigo-500",
    icon: "text-indigo-400",
    bar: "from-indigo-500 to-indigo-400",
    glow: "shadow-indigo-500/20",
  },
  violet: {
    badge: "from-violet-600 to-violet-500",
    icon: "text-violet-400",
    bar: "from-violet-500 to-violet-400",
    glow: "shadow-violet-500/20",
  },
  blue: {
    badge: "from-blue-600 to-indigo-500",
    icon: "text-sky-400",
    bar: "from-blue-500 to-indigo-400",
    glow: "shadow-blue-500/20",
  },
}

const steps = [
  {
    number: "01",
    title: "Choose Your Career Goal",
    description:
      "Select your target role — Data Scientist, Full Stack Developer, AI Engineer, Product Manager, and more.",
    icon: Compass,
    color: "indigo",
  },
  {
    number: "02",
    title: "Complete Career Assessment",
    description:
      "AI evaluates your technical skills, analytical thinking, communication, and domain knowledge.",
    icon: ClipboardCheck,
    color: "violet",
  },
  {
    number: "03",
    title: "Identify Skill Gaps",
    description:
      "See exactly what's missing between your current profile and your target role requirements.",
    icon: Target,
    color: "blue",
  },
  {
    number: "04",
    title: "Receive Personalized Roadmap",
    description:
      "Get an adaptive learning sequence with milestones, weekly objectives, and project recommendations.",
    icon: Map,
    color: "indigo",
  },
  {
    number: "05",
    title: "Build Industry Projects",
    description:
      "Complete real-world projects that build your portfolio and prove capability to employers.",
    icon: Code2,
    color: "violet",
  },
  {
    number: "06",
    title: "Track Career Readiness",
    description:
      "Monitor your Career Readiness Score, skill growth, and portfolio strength on your personal dashboard.",
    icon: TrendingUp,
    color: "blue",
  },
]

export function HowItWorksSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/10 via-background to-violet-950/10" />
      <div className="absolute inset-0 grid-overlay opacity-50 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_40%,transparent_100%)]" />

      {/* Glow blobs */}
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.15, 0.05, 0.15] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
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
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-sm font-medium text-indigo-300 uppercase tracking-wider">
              Your Journey
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-balance mb-5">
            Your Path from{" "}
            <span className="career-gradient">Student to Professional</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A structured 6-step journey powered by AI
          </p>
        </motion.div>

        {/* Steps grid — alternating layout on desktop */}
        <div className="relative">
          {/* Vertical connecting line (desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-violet-500/40 to-blue-500/60 hidden md:block" />

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {steps.map((step, index) => {
              const colors = colorMap[step.color]
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative ${!isLeft ? "md:mt-16" : ""}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="relative p-7 rounded-2xl glass-panel hover:border-indigo-500/30 group overflow-hidden transition-all duration-300"
                  >
                    {/* Step number badge */}
                    <motion.div
                      whileHover={{ rotate: 5 }}
                      className={`absolute -top-3 -left-3 w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.badge} flex items-center justify-center shadow-lg ${colors.glow} z-10`}
                    >
                      <span className="text-lg font-black text-white career-gradient" style={{WebkitTextFillColor: 'white', backgroundClip: 'unset'}}>
                        {step.number}
                      </span>
                    </motion.div>

                    {/* Icon */}
                    <div className="flex justify-end mb-4">
                      <div className={`p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/15 group-hover:bg-indigo-500/20 transition-colors`}>
                        <step.icon className={`h-5 w-5 ${colors.icon}`} />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {step.description}
                    </p>

                    {/* Progress bar decoration */}
                    <div className="mt-5 h-1 bg-indigo-500/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${((index + 1) / steps.length) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.15 }}
                        className={`h-full bg-gradient-to-r ${colors.bar} rounded-full`}
                      />
                    </div>

                    {/* Corner glow */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
