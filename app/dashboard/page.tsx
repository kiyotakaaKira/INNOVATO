"use client"

import { Target, Map, Code2, BookOpen } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { StartJourneyCard } from "@/components/dashboard/start-journey-card"
import { RecentJourneys } from "@/components/dashboard/recent-journeys"
import { CareerReadinessCard } from "@/components/dashboard/career-readiness-card"
import { SkillGapPreviewCard } from "@/components/dashboard/skill-gap-card"

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 min-h-screen">
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-indigo-400">Home</span>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back,{" "}
            <span className="career-gradient">
              Explorer
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">Your career readiness journey continues</p>
        </div>
        
        {/* Top Right Mini Badge */}
        <div className="hidden sm:flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full">
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-sm font-semibold text-indigo-300">Score: 68%</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Target} label="Career Readiness" value="68%" subValue="+5% this week" color="indigo" index={0} />
        <StatsCard icon={Map} label="Active Career Paths" value={2} subValue="1 milestone due" color="violet" index={1} />
        <StatsCard icon={Code2} label="Projects Completed" value={7} subValue="+2 this month" color="blue" index={2} />
        <StatsCard icon={BookOpen} label="Skills Mastered" value={14} subValue="3 in progress" color="success" index={3} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Left Column - 2/3 width */}
        <div className="xl:col-span-2 space-y-6">
          <StartJourneyCard />
          <RecentJourneys />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <CareerReadinessCard />
        </div>
      </div>
      
      {/* Bottom Area */}
      <div className="grid grid-cols-1 gap-6">
        <SkillGapPreviewCard />
      </div>
    </div>
  )
}
