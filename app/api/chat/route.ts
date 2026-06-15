import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are a chat-based K–12 AI literacy instructional design co-pilot called the Design–Create–Reflect Teacher Co-Pilot.

You help teachers design, revise, and reflect on lessons using the Design–Create–Reflect framework.

You are NOT a generic lesson-plan generator. You are a teacher-centered planning partner.

Your responsibilities:
- Ask only for missing information. Never ask for more than 3 things at once.
- Use uploaded curriculum resources, prior lesson feedback, standards, and school policies when available.
- Create lessons that integrate AI literacy into subject-area learning.
- Make AI concepts age-appropriate and concrete — avoid jargon.
- Include ethical reflection in every lesson.
- Suggest practical teacher moves.
- Support differentiation for multilingual learners and students needing additional support.
- Explain why you made major design choices.
- Keep the teacher in control. Never imply the AI output is automatically correct.
- Clearly flag what the teacher should review before classroom use.
- Preserve teacher agency, ownership, and privacy.
- Make source use visible in plain language.

Use the Design–Create–Reflect structure:
1. Design: frame the learning goal, student question, prior knowledge, activity, and misconception to surface.
2. Create: provide the activity, student steps, teacher moves, and materials.
3. Reflect: include discussion prompts, ethical reflection, and exit ticket.

When revising:
- Preserve useful parts of the lesson.
- Make the requested change concrete.
- Explain what changed and why.
- Flag tradeoffs.
- Identify teacher decision points.

When reflecting:
- Summarize what worked.
- Capture student confusion or misconceptions.
- Identify future improvements.
- Store reusable insights for future planning only with teacher approval.

IMPORTANT: If the teacher hasn't provided a lesson topic yet, ask what lesson they are planning.
If they have provided a topic but not grade/duration/device access, ask for those (no more than 3 at once).
Once you have enough information, generate a complete lesson draft.

When you generate a lesson, format it clearly with sections: Learning Goals, Design Phase, Create Phase, Reflect Phase, Teacher Moves, Differentiation, Exit Ticket.

Always end revision responses with a "Teacher decision needed:" note flagging what the teacher should verify before teaching.`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, currentDraft, documents } = body

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { message: "ANTHROPIC_API_KEY is not set. Please add it to your .env.local file.", stage: "understand" },
        { status: 200 }
      )
    }

    // Build context from documents
    const docContext = documents && documents.length > 0
      ? `\n\nTeacher's uploaded resources: ${documents.map((d: { fileName: string; sourceType: string }) => `${d.fileName} (${d.sourceType})`).join(", ")}`
      : ""

    // Build current lesson context
    const lessonContext = currentDraft && currentDraft.lessonTitle !== ""
      ? `\n\nCurrent lesson draft: "${currentDraft.lessonTitle}" for ${currentDraft.gradeLevel} ${currentDraft.subject}, ${currentDraft.duration}. Currently at version ${currentDraft.versionNumber}.`
      : ""

    const systemWithContext = SYSTEM_PROMPT + docContext + lessonContext

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: systemWithContext,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    })

    const assistantContent = response.content[0]
    if (assistantContent.type !== "text") {
      throw new Error("Unexpected response type")
    }

    const messageText = assistantContent.text

    // Detect stage from message content
    let stage: string = "understand"
    if (messageText.toLowerCase().includes("i found") || messageText.toLowerCase().includes("retrieved")) {
      stage = "retrieve"
    } else if (messageText.toLowerCase().includes("here is") || messageText.toLowerCase().includes("lesson title") || messageText.toLowerCase().includes("## design phase")) {
      stage = "generate"
    } else if (messageText.toLowerCase().includes("i revised") || messageText.toLowerCase().includes("what changed")) {
      stage = "revise"
    } else if (messageText.toLowerCase().includes("reflection") || messageText.toLowerCase().includes("what worked")) {
      stage = "reflect"
    }

    // Extract retrieval summary if applicable
    let retrievalSummary: string[] | undefined
    if (stage === "retrieve" || messageText.toLowerCase().includes("i found") || messageText.toLowerCase().includes("your curriculum")) {
      const lines = messageText.split("\n").filter(line =>
        line.includes("curriculum") || line.includes("feedback") || line.includes("policy") || line.includes("standard") || line.includes("prior")
      ).slice(0, 4).map(l => l.replace(/^[-*•]\s*/, "").replace(/\*\*/g, "").trim())
      if (lines.length > 0) {
        retrievalSummary = lines
      }
    }

    // Try to extract updated lesson from message if it contains lesson structure
    let updatedDraft = null
    if (stage === "generate" || stage === "revise") {
      updatedDraft = tryExtractDraftUpdate(messageText, currentDraft)
    }

    return NextResponse.json({
      message: messageText,
      stage,
      retrievalSummary,
      updatedDraft,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        message: "I encountered an issue connecting to the AI service. Please check your ANTHROPIC_API_KEY in .env.local and try again.",
        stage: "understand",
      },
      { status: 200 }
    )
  }
}

function tryExtractDraftUpdate(message: string, currentDraft: Record<string, unknown> | null) {
  if (!currentDraft) return null

  // If the message contains lesson structure, bump version
  if (message.includes("Design Phase") || message.includes("Create Phase") || message.includes("Reflect Phase")) {
    return {
      ...currentDraft,
      versionNumber: (currentDraft.versionNumber as number || 1) + 1,
      changeRationale: extractChangeRationale(message),
    }
  }
  return null
}

function extractChangeRationale(message: string): string {
  const lines = message.split("\n")
  const whyLine = lines.find(l => l.toLowerCase().includes("why") || l.toLowerCase().includes("because") || l.toLowerCase().includes("i revised"))
  return whyLine?.replace(/^[-*#]\s*/, "").trim() || "Revised based on teacher feedback."
}
