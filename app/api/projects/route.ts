import { NextResponse } from "next/server"
import { generateFeatherlessJSON, FeatherlessServiceError } from "@/lib/services/featherlessService"

export async function POST(req: Request) {
  try {
    const { targetRole, currentSkills } = await req.json()

    if (!targetRole) {
      return NextResponse.json({ error: "targetRole is required" }, { status: 400 })
    }

    console.log(`[Projects API] Generating projects for ${targetRole}`)

    const systemPrompt = `You are a Project Recommendation Engine AI. Your task is to recommend a portfolio of realistic, resume-worthy projects tailored to a specific target role and user's skills.

You must return ONLY a JSON object exactly matching this structure:
{
  "beginner": [
    {
      "title": "string",
      "difficulty": "string",
      "skillsCovered": ["string"],
      "description": "string"
    }
  ],
  "intermediate": [
    {
      "title": "string",
      "difficulty": "string",
      "skillsCovered": ["string"],
      "description": "string"
    }
  ],
  "advanced": [
    {
      "title": "string",
      "difficulty": "string",
      "skillsCovered": ["string"],
      "description": "string"
    }
  ]
}`

    const userPrompt = `Target Role: ${targetRole}\nCurrent Skills: ${(currentSkills || []).join(", ")}\n\nGenerate the project recommendations JSON.`

    const data = await generateFeatherlessJSON([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ])

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[Projects API] Error:", error.message)
    if (error instanceof FeatherlessServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    return NextResponse.json({ error: "Failed to generate project recommendations" }, { status: 500 })
  }
}
