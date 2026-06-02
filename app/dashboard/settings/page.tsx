"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, User, Monitor, Shield, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

const tabs = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Monitor },
  { id: "privacy", label: "Privacy", icon: Shield },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  
  // Account state
  const [name, setName] = useState("Explorer")
  const [username, setUsername] = useState("explorer_01")
  
  // Notification state
  const [notifState, setNotifState] = useState({
    milestones: true,
    weekly: true,
    projects: false,
    reminders: true,
  })

  // Appearance state
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Privacy state
  const [publicProfile, setPublicProfile] = useState(true)

  const handleSave = () => {
    toast.success("Settings saved successfully", {
      description: "Your preferences have been updated.",
    })
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Tabs */}
        <div className="md:col-span-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-9">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="glass-panel p-6 sm:p-8 rounded-2xl min-h-[400px]"
          >
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Account Information</h3>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value="student@university.edu" disabled className="bg-secondary/30" />
                      <p className="text-xs text-muted-foreground">Email is tied to your authentication provider.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-secondary/50 border-indigo-500/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-secondary/50 border-indigo-500/20" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-indigo-500/10">
                  <Button variant="outline" className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10">
                    Change Password
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-white/5">
                    <div>
                      <h4 className="font-medium text-foreground">Career Milestones</h4>
                      <p className="text-sm text-muted-foreground">Receive updates when you level up or hit goals.</p>
                    </div>
                    <Switch checked={notifState.milestones} onCheckedChange={(c) => setNotifState({...notifState, milestones: c})} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-white/5">
                    <div>
                      <h4 className="font-medium text-foreground">Weekly Progress</h4>
                      <p className="text-sm text-muted-foreground">Summary of your skill growth and readiness score.</p>
                    </div>
                    <Switch checked={notifState.weekly} onCheckedChange={(c) => setNotifState({...notifState, weekly: c})} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-white/5">
                    <div>
                      <h4 className="font-medium text-foreground">New Projects</h4>
                      <p className="text-sm text-muted-foreground">Alerts when new industry projects match your profile.</p>
                    </div>
                    <Switch checked={notifState.projects} onCheckedChange={(c) => setNotifState({...notifState, projects: c})} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-white/5">
                    <div>
                      <h4 className="font-medium text-foreground">Assessment Reminders</h4>
                      <p className="text-sm text-muted-foreground">Reminders to re-assess skills for an updated score.</p>
                    </div>
                    <Switch checked={notifState.reminders} onCheckedChange={(c) => setNotifState({...notifState, reminders: c})} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Appearance & Accessibility</h3>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label>Language Preference</Label>
                    <select className="flex h-10 w-full items-center justify-between rounded-md border border-indigo-500/20 bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                      <option>English</option>
                      <option>Hindi (हिंदी)</option>
                      <option>Tamil (தமிழ்)</option>
                      <option>Telugu (తెలుగు)</option>
                    </select>
                  </div>
                  <div className="pt-6 space-y-4">
                    <Label className="block mb-2">Accessibility Toggles</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">High Contrast Mode</span>
                      <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Reduced Motion</span>
                      <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Privacy & Data</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-white/5">
                    <div>
                      <h4 className="font-medium text-foreground">Public Profile</h4>
                      <p className="text-sm text-muted-foreground">Allow institutions and employers to view your readiness score.</p>
                    </div>
                    <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
                  </div>
                  
                  <div className="pt-6 border-t border-indigo-500/10 max-w-md">
                    <Label className="block mb-3">Data Usage</Label>
                    <select className="flex h-10 w-full items-center justify-between rounded-md border border-indigo-500/20 bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                      <option>Share anonymized data for AI training</option>
                      <option>Strictly necessary data only</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button for all tabs */}
            <div className="mt-10 flex justify-end">
              <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500 gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
