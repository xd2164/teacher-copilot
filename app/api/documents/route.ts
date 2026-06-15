import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

const documents: Record<string, unknown>[] = []

export async function GET() {
  return NextResponse.json({ documents })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // In production: extract text, chunk, embed, and store in pgvector
    // For demo: just register the document
    const doc = {
      id: uuidv4(),
      fileName: file.name,
      fileSize: file.size,
      sourceType: guessSourceType(file.name),
      status: "ready",
      trustLevel: "medium",
      includeInSearch: true,
      createdAt: new Date().toISOString(),
    }

    documents.push(doc)
    return NextResponse.json({ document: doc }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

function guessSourceType(fileName: string): string {
  const lower = fileName.toLowerCase()
  if (lower.includes("curriculum") || lower.includes("scope")) return "curriculum_map"
  if (lower.includes("feedback") || lower.includes("review")) return "prior_feedback"
  if (lower.includes("policy") || lower.includes("guideline")) return "policy"
  if (lower.includes("standard") || lower.includes("ngss")) return "standard"
  if (lower.includes("ai") || lower.includes("literacy")) return "ai_literacy_framework"
  return "lesson_plan"
}
