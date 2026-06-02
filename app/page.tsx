"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ComingSoonSection } from "@/components/coming-soon-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ImpactSection } from "@/components/impact-section"
import { InclusionSection } from "@/components/inclusion-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"

export default function Home() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background"
      >
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <ComingSoonSection />
          <HowItWorksSection />
          <ImpactSection />
          <InclusionSection />
          <CTASection />
        </main>
        <Footer />
        <Chatbot />
      </motion.div>
    </AnimatePresence>
  )
}
