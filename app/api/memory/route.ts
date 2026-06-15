import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { v4 as uuidv4 } from "uuid"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const REFLECTION_PROMPT = `You are helping a K–12 teacher extract reusable teaching insights from a post-lesson reflection.

Extract insights focusing on:
- What activities worked well
- What confused students
- What should change next time
- Student misconceptions
- Equity and access issues
- Useful teaching moves
- Grade-level fit
- Technology constraints
- Future lesson design implications

Return JSON ONLY with this structure:
{
  "summary": "2-3 sentence summary",
  "insights": [
    { "category": "string", "insight": "string", "tags": ["string"] }
  ],
  "futureRecommendations": ["string"],
  "memoryItems": [
    { "category": "string", "insight": "string", "tags": ["string"] }
  ]
}`

// In-memory store for demo
const memoryItems: unknown[] = []

export async function GET() {
  return NextResponse.json({ items: memoryItems })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reflection, lessonTitle, action } = body

    if (action === "save") {
      const item = {
        id: uuidv4(),
        ...body.item,
        createdAt: new Date().toISOString(),
      }
      memoryItems.push(item)
      return NextResponse.json({ saved: true, item })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        summary: "Add your ANTHROPIC_API_KEY to enable reflection analysis.",
        insights: [],
        futureRecommendations: [],
        memoryItems: [],
      })
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: REFLECTION_PROMPT,
      messages: [{
        role: "user",
        content: `Lesson: ${lessonTitle}\n\nTeacher reflection: ${reflection}`,
      }],
    })

    const content = response.content[0]
    if (content.type !== "text") throw new Error("Unexpected response")

    const parsed = JSON.parse(content.text)
    return NextResponse.json(parsed)
  } catch {
    return NextResponse.json({ error: "Memory processing failed" }, { status: 500 })
  }
}
