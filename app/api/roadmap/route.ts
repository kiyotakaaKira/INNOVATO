import { NextResponse } from 'next/server'
import { generateFeatherlessJSON, FeatherlessServiceError } from "@/lib/services/featherlessService"

export async function POST(req: Request) {
  try {
    const { skill, experience, timeCommitment, learningGoal } = await req.json()

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill is required' },
        { status: 400 }
      )
    }

    console.log('[Roadmap API] Generating roadmap for', skill)

    const systemPrompt = `You are an expert curriculum architect. Your job is to create a detailed learning roadmap for a student.
    
You must return ONLY a JSON object exactly matching this structure:
{
  "milestones": ["string"],
  "weeklyPlan": ["string"],
  "projects": ["string"],
  "estimatedTimeline": "string (e.g., '12 Weeks')"
}`;

    const userPrompt = `Skill: ${skill}\nExperience: ${experience || 'beginner'}\nTime commitment: ${timeCommitment || '10'} hours/week\nGoal: ${learningGoal || 'get a job'}\n\nGenerate the roadmap JSON.`;

    const data = await generateFeatherlessJSON([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ])

    return NextResponse.json(data)

  } catch (error: any) {
    console.error('[Roadmap API] Error:', error.message)
    if (error instanceof FeatherlessServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    return NextResponse.json(
      { error: 'Failed to generate roadmap' },
      { status: 500 }
    )
  }
}
