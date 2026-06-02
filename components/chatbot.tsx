"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, X, Loader2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

// Detect and format lesson modules vs regular chat
function formatBotResponse(text: string): {
  isLesson: boolean
  content: React.ReactNode
  plainText: string
} {
  // Remove all template tags
  let cleaned = text
    .replace(/<prompt_template[\s\S]*?<\/prompt_template>/g, "")
    .replace(/<instruction[\s\S]*?<\/instruction>/g, "")
    .replace(/<focus[\s\S]*?<\/focus>/g, "")
    .replace(/<task[\s\S]*?<\/task>/g, "")
    .replace(/<warning[\s\S]*?<\/warning>/g, "")
    .replace(/<reflection[\s\S]*?<\/reflection>/g, "")
    .replace(/<\/?\w+>/g, "")
    .trim()

  // Check if this is a lesson module (contains lesson-like content)
  const isLesson = /Lesson:|Task:|Warning:|Reflection:|Focus:/i.test(text)

  if (isLesson) {
    // Parse lesson structure
    const sections = cleaned.split(/(?=(?:Lesson|Task|Focus|Warning|Reflection)[:\.]\s)/i)

    const formattedContent = (
      <div className="space-y-3">
        {sections.map((section, idx) => {
          const trimmed = section.trim()
          if (!trimmed) return null

          const titleMatch = trimmed.match(/^(Lesson|Task|Focus|Warning|Reflection)[:.]/)
          if (!titleMatch) {
            return (
              <p key={idx} className="text-muted-foreground text-sm leading-relaxed">
                {trimmed}
              </p>
            )
          }

          const title = titleMatch[1]
          const content = trimmed.replace(/^(Lesson|Task|Focus|Warning|Reflection)[:\.]\s*/, "")

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400" />
                <h4 className="font-semibold text-foreground text-sm">{title}</h4>
              </div>
              <p className="text-muted-foreground text-sm ml-4 leading-relaxed">{content.trim()}</p>
            </div>
          )
        })}
      </div>
    )

    return { isLesson: true, content: formattedContent, plainText: cleaned }
  }

  // Regular chat message - just clean it up
  const plainText = cleaned.replace(/\s+/g, " ").trim()

  return { isLesson: false, content: plainText, plainText }
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hi! 👋 I'm INNOVATO's AI assistant. Help students with career guidance, skill planning, and platform navigation. Focus on career readiness, skill gaps, and growth roadmaps. Just tell me what you'd like to learn, and I'll break it down into easy lessons with practical tasks. Let's get started!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.response || "Sorry, I couldn't process that. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 text-white shadow-lg shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/70 transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-h-[600px] rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-background via-background to-indigo-950/30 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 p-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                INNOVATO Assistant
              </h3>
              <p className="text-white/80 text-sm">Always here to help you learn</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const formatted = message.type === "bot" ? formatBotResponse(message.content) : null

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "user" ? (
                      <div className="max-w-xs px-4 py-3 rounded-lg bg-indigo-600 text-white rounded-br-none">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    ) : (
                      <div
                        className={`max-w-sm px-4 py-3 rounded-lg rounded-bl-none border border-indigo-500/20 ${
                          formatted?.isLesson
                            ? "bg-gradient-to-br from-indigo-950/40 to-violet-950/40"
                            : "bg-secondary/50"
                        }`}
                      >
                        {formatted?.isLesson ? (
                          <div className="text-sm">{formatted.content}</div>
                        ) : (
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {formatted?.plainText}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )
              })}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary/50 text-foreground rounded-lg rounded-bl-none border border-indigo-500/20 px-4 py-2 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="border-t border-indigo-500/20 p-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-lg bg-secondary/50 border border-indigo-500/20 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm placeholder:text-muted-foreground disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={isLoading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

