import { NextRequest, NextResponse } from "next/server"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return NextResponse.json({ id, message: "Lesson endpoint" })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    return NextResponse.json({ id, ...body, updatedAt: new Date().toISOString() })
  } catch {
    return NextResponse.json({ error: "Failed to update lesson" }, { status: 500 })
  }
}
