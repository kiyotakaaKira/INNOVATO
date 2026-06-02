import { NextResponse } from "next/server"
import { generateFeatherlessCompletion, FeatherlessServiceError } from "@/lib/services/featherlessService"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    console.log("[Chat API] Processing message:", message)

    const fullResponse = await generateFeatherlessCompletion([
      {
        role: "system",
        content: `You are Innovato AI.

You help students with:

Career Guidance
Skill Development
Roadmap Planning
Project Recommendations
Employability Preparation

Always give practical answers.

Always focus on career readiness.

Never act like a generic chatbot.`
      },
      {
        role: "user",
        content: message
      }
    ], { temperature: 0.7 })

    return NextResponse.json({ response: fullResponse })
  } catch (error: any) {
    console.error("[Chat API] Error:", error.message)
    if (error instanceof FeatherlessServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
