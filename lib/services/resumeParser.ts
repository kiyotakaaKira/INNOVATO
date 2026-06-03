export interface ResumeData {
  fullName: string | null
  email: string | null
  phone: string | null
  summary: string | null
  skills: string[]
  experience: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  education: Array<{
    degree: string
    school: string
    field: string
    year: string
  }>
  rawText: string
}

// Extract text from PDF buffer using simple regex patterns
export async function parseResumePDF(fileBuffer: Buffer): Promise<ResumeData> {
  try {
    // Convert PDF buffer to string - extract UTF-8 text
    // PDFs contain binary data with embedded text streams
    const bufferString = fileBuffer.toString("utf-8", 0, Math.min(fileBuffer.length, 100000))

    // Extract readable text by filtering out binary/special characters
    const text = bufferString
      .replace(/[^\x20-\x7E\n\r\t]/g, " ") // Keep only printable ASCII
      .split("\n")
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0)
      .join("\n")

    // Extract email
    const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i)
    const email = emailMatch ? emailMatch[1] : null

    // Extract phone
    const phoneMatch = text.match(
      /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/
    )
    const phone = phoneMatch ? phoneMatch[0].trim() : null

    // Extract name (usually first meaningful text)
    const lines = text.split("\n").filter((line: string) => line.trim().length > 0)
    const fullName = lines[0]?.trim() || null

    // Extract skills section
    const skills: string[] = []
    const skillsMatch = text.match(/skills?[\s\n:]*([^]*?)(?:experience|education|projects|$)/i)
    if (skillsMatch) {
      const skillsText = skillsMatch[1]
      const skillsList = skillsText
        .split(/[,\n•-]/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0 && s.length < 50)
      skills.push(...skillsList.slice(0, 20)) // Limit to 20 skills
    }

    // Extract experience
    const experience: ResumeData["experience"] = []
    const expMatch = text.match(
      /(?:experience|employment|work history)[\s\n]*([^]*?)(?:education|skills|projects|$)/i
    )
    if (expMatch) {
      const expText = expMatch[1]
      // Simple pattern: look for job titles and company names
      const jobs = expText.split(/\n(?=[A-Z][a-z]+\s+(?:at|,|\-|–))/i)
      for (const job of jobs.slice(0, 5)) {
        // Limit to 5 jobs
        const lines = job.split("\n").filter((l: string) => l.trim())
        if (lines.length > 0) {
          experience.push({
            title: lines[0]?.trim() || "Position",
            company: lines[1]?.trim() || "Company",
            duration: lines[2]?.trim() || "",
            description: lines.slice(3).join(" ").trim().slice(0, 200),
          })
        }
      }
    }

    // Extract education
    const education: ResumeData["education"] = []
    const eduMatch = text.match(
      /(?:education|qualifications)[\s\n]*([^]*?)(?:skills|experience|projects|$)/i
    )
    if (eduMatch) {
      const eduText = eduMatch[1]
      const schools = eduText.split(/\n(?=[A-Z].*(?:University|College|Institute|School))/i)
      for (const school of schools.slice(0, 3)) {
        // Limit to 3 education entries
        const lines = school.split("\n").filter((l: string) => l.trim())
        if (lines.length > 0) {
          education.push({
            degree: lines[0]?.trim() || "Degree",
            school: lines[1]?.trim() || "School",
            field: lines[2]?.trim() || "",
            year: lines[3]?.trim() || "",
          })
        }
      }
    }

    // Extract summary (first paragraph-like text)
    const summaryMatch = text.match(
      /(?:professional\s+summary|objective|about|profile)[\s\n]*([^\n]*(?:\n(?![A-Z]{2,})[^\n]*){0,3})/i
    )
    const summary = summaryMatch ? summaryMatch[1].trim().slice(0, 500) : null

    return {
      fullName,
      email,
      phone,
      summary,
      skills,
      experience,
      education,
      rawText: text.slice(0, 2000), // Store first 2000 chars of raw text
    }
  } catch (error) {
    console.error("Error parsing PDF:", error)
    throw new Error("Failed to parse resume PDF")
  }
}
