import { NextResponse } from 'next/server'
import { generateFeatherlessCompletion } from "@/lib/ai/featherless"

export async function POST(req: Request) {
  try {
    const { skill } = await req.json()

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill is required' },
        { status: 400 }
      )
    }

    const jsonFormatStr = `
{
  "isValid": true/false,
  "correctedName": "Standardized skill name if misspelled, or original",
  "category": "Frontend/Backend/Data Science/etc",
  "description": "Short 1-sentence description"
}`;

    const fullResponse = await generateFeatherlessCompletion([
      {
        role: "system",
        content: `You are a skill validator. Your job is to check if the user's input is a valid professional tech/soft skill. You must return ONLY valid JSON matching this format: ${jsonFormatStr}`
      },
      {
        role: "user",
        content: `Validate this skill: ${skill}`
      }
    ], { temperature: 0.1 })

    // Extract JSON from response in case of markdown wrappers
    const jsonStr = fullResponse.replace(/```json\n?|\n?```/g, '').trim();
    const data = JSON.parse(jsonStr);

    return NextResponse.json(data)

  } catch (error) {
    console.error('Featherless skill validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate skill' },
      { status: 500 }
    )
  }
}