"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { GitBranch, Code2, TrendingUp, Building2, Star, Zap } from "lucide-react"

const metrics = [
  { value: 50000, suffix: "+", label: "Career Paths Generated", icon: GitBranch },
  { value: 12000, suffix: "+", label: "Projects Completed", icon: Code2 },
  { value: 89, suffix: "%", label: "Readiness Improvement", icon: TrendingUp },
  { value: 200, suffix: "+", label: "Partner Companies", icon: Building2 },
  { value: 95, suffix: "%", label: "Student Satisfaction", icon: Star },
  { value: 8, suffix: "x", label: "Faster Time to Hire", icon: Zap },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const duration = 2000 // 2 seconds

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      if (progress < duration) {
        const nextValue = Math.floor(Math.easeOutQuart(progress, 0, value, duration))
        setCount(nextValue)
        requestAnimationFrame(updateCount)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, value])

  // Simple easing function
  Math.easeOutQuart = function (t: number, b: number, c: number, d: number) {
    t /= d
    t--
    return -c * (t * t * t * t - 1) + b
  }

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function ImpactSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-card border-y border-indigo-500/10">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 via-transparent to-violet-950/20" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Platform <span className="career-gradient">Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real numbers from students accelerating their career readiness.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center hover-indigo-glow transition-all"
            >
              <div className="p-3 bg-indigo-500/10 rounded-xl mb-4 text-indigo-400">
                <metric.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl md:text-4xl font-black career-gradient mb-2">
                <Counter value={metric.value} suffix={metric.suffix} />
              </div>
              <div className="text-sm font-medium text-muted-foreground">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

declare global {
  interface Math {
    easeOutQuart(t: number, b: number, c: number, d: number): number
  }
}
