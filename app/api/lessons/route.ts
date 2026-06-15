import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// In-memory store for demo (replace with Prisma in production)
const lessons: Record<string, unknown>[] = []

export async function GET() {
  return NextResponse.json({ lessons })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const lesson = {
      id: uuidv4(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    lessons.push(lesson)
    return NextResponse.json({ lesson }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create lesson" }, { status: 500 })
  }
}
