import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const activeModel = process.env.FEATHERLESS_MODEL || "Qwen/Qwen3-14B"

    return NextResponse.json({
      status: "healthy",
      provider: "Featherless",
      model: activeModel,
      connected: true
    })
  } catch (error) {
    return NextResponse.json({
      status: "unhealthy",
      error: "Failed to connect to AI provider"
    }, { status: 500 })
  }
}
