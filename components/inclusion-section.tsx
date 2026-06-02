"use client"

import { motion } from "framer-motion"
import { Wifi, Smartphone, Globe2, Accessibility, IndianRupee, School } from "lucide-react"

const features = [
  {
    icon: Wifi,
    title: "Low Bandwidth Optimized",
    description: "Designed for students with limited connectivity. Core features work on 2G/3G networks.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Full platform access from any smartphone. No laptop required to start your career journey.",
  },
  {
    icon: Globe2,
    title: "Regional Language Support",
    description: "Platform content available in 10+ Indian regional languages via AI translation.",
  },
  {
    icon: Accessibility,
    title: "Accessibility Compliant",
    description: "WCAG 2.1 AA compliant. Screen reader support, keyboard navigation, high contrast modes.",
  },
  {
    icon: IndianRupee,
    title: "Free for Students",
    description: "Core assessment, roadmap, and project features are free. Career readiness has no price barrier.",
  },
  {
    icon: School,
    title: "Institution Partnerships",
    description: "Colleges and universities can integrate INNOVATO into their placement and skilling programs.",
  },
]

export function InclusionSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-overlay opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Built for <span className="career-gradient">Every Indian Student</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed with inclusion at its core — so no student gets left behind.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 p-6 glass-panel rounded-2xl"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2 text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
