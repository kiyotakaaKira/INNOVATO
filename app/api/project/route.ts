import { NextResponse } from 'next/server'
import { generateFeatherlessCompletion } from "@/lib/ai/featherless"

export async function POST(req: Request) {
  try {
    const { skill, level, mode } = await req.json()

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill is required' },
        { status: 400 }
      )
    }

    // Validate mode parameter
    const validMode = mode === 'suggest' || mode === 'guide' ? mode : 'guide'

    const systemPrompt = `You are an expert Project Mentor and senior developer. 
If the mode is 'suggest', brainstorm 3 creative and realistic project ideas for the specified skill and level.
If the mode is 'guide', provide a step-by-step architecture, tools needed, and implementation plan for a project using the specified skill.
Format your output in clean Markdown.`;

    const userPrompt = validMode === 'guide' 
      ? `Help me build a project for ${skill} at ${level || 'beginner'} level. Provide step-by-step guidance.`
      : `Suggest 3 project ideas for ${skill} at ${level || 'beginner'} level.`;

    console.log('Sending to Featherless Project Mentor:', userPrompt)

    const fullResponse = await generateFeatherlessCompletion([
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: userPrompt
      }
    ], { temperature: 0.7, max_tokens: 1500 })

    return NextResponse.json({ answer: fullResponse })

  } catch (error) {
    console.error('Featherless project guidance error:', error)
    return NextResponse.json(
      { error: 'Failed to generate project guidance' },
      { status: 500 }
    )
  }
}
