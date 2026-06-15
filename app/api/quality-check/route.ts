import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const QUALITY_PROMPT = `You are a critical reviewer of K–12 AI literacy lesson plans.

Evaluate the lesson on:
1. Age appropriateness
2. Subject alignment
3. AI literacy accuracy
4. Ethical reflection quality
5. Student engagement
6. Teacher usability
7. Assessment clarity
8. Accessibility and differentiation
9. Risk of misinformation
10. Whether the teacher remains in control
11. Clarity of teacher decision points

Return a JSON object ONLY (no other text) with this exact structure:
{
  "readiness": "ready" | "needs_revision" | "not_ready",
  "strengths": ["string", ...],
  "weaknesses": ["string", ...],
  "requiredRevisions": ["string", ...],
  "safetyNotes": ["string", ...],
  "teacherDecisions": ["string", ...]
}`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lesson } = body

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        readiness: "needs_revision",
        strengths: ["Quality check requires ANTHROPIC_API_KEY"],
        weaknesses: [],
        requiredRevisions: ["Set ANTHROPIC_API_KEY in .env.local to enable quality checking"],
        safetyNotes: [],
        teacherDecisions: [],
      })
    }

    const lessonSummary = `
Lesson: ${lesson.lessonTitle}
Grade: ${lesson.gradeLevel}
Subject: ${lesson.subject}
Duration: ${lesson.duration}
AI Literacy Goals: ${lesson.aiLiteracyGoals?.join("; ")}
Ethical reflection: ${lesson.reflectPhase?.ethicalReflection}
Exit ticket: ${lesson.reflectPhase?.exitTicket}
Differentiation for multilingual learners: ${lesson.differentiation?.multilingualLearners?.join("; ")}
Teacher decision points: ${lesson.teacherDecisionPoints?.join("; ")}
`

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: QUALITY_PROMPT,
      messages: [{ role: "user", content: `Review this lesson:\n${lessonSummary}` }],
    })

    const content = response.content[0]
    if (content.type !== "text") throw new Error("Unexpected response")

    const parsed = JSON.parse(content.text)
    return NextResponse.json(parsed)
  } catch {
    return NextResponse.json({
      readiness: "needs_revision",
      strengths: [],
      weaknesses: [],
      requiredRevisions: ["Quality check failed — review lesson manually"],
      safetyNotes: [],
      teacherDecisions: [],
    })
  }
}
