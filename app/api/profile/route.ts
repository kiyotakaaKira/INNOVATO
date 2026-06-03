import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { parseResumePDF } from "@/lib/services/resumeParser"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const github = formData.get("github") as string | null
    const linkedin = formData.get("linkedin") as string | null
    const portfolio = formData.get("portfolio") as string | null
    const resumeFile = formData.get("resume") as File | null

    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Prepare update data
    const updateData: any = {
      id: user.id,
      updated_at: new Date().toISOString(),
    }

    // Add links if provided
    if (github || linkedin || portfolio) {
      updateData.github_url = github || null
      updateData.linkedin_url = linkedin || null
      updateData.portfolio_url = portfolio || null
    }

    // Handle resume upload and parsing
    if (resumeFile) {
      // Validate file
      if (resumeFile.type !== "application/pdf") {
        return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
      }

      if (resumeFile.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 })
      }

      // Parse PDF and extract data
      const arrayBuffer = await resumeFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const resumeData = await parseResumePDF(buffer)

      // Store parsed resume data
      updateData.resume_full_name = resumeData.fullName
      updateData.resume_email = resumeData.email
      updateData.resume_phone = resumeData.phone
      updateData.resume_summary = resumeData.summary
      updateData.resume_skills = resumeData.skills
      updateData.resume_experience = resumeData.experience
      updateData.resume_education = resumeData.education
    }

    // Update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .upsert(updateData, { onConflict: "id" })
      .select()

    if (updateError) {
      console.error("[Profile API] Update error:", updateError)
      return NextResponse.json({ error: "Failed to save profile" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Profile updated successfully" })
  } catch (error: any) {
    console.error("[Profile API] Error:", error.message)
    return NextResponse.json({ error: error.message || "Failed to process request" }, { status: 500 })
  }
}
