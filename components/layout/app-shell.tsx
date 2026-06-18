"use client"
import React, { useState, useCallback } from "react"
import Link from "next/link"
import { ChatPanel } from "@/components/chat/chat-panel"
import { LessonDraftPanel } from "@/components/lesson/lesson-draft-panel"
import { DEMO_DOCUMENTS, DEMO_LESSON, DEMO_INITIAL_MESSAGES, DEMO_TEACHER_MOVES, DEMO_REVISIONS, DEMO_QUALITY_REVIEW } from "@/lib/demo-data"
import { ChatMessage, LessonDraft, KnowledgeDocument } from "@/lib/types"
import { getDemoResponse } from "@/lib/demo-responses"
import { BookOpen, Pencil, Presentation, Plus, Users } from "lucide-react"
import { track } from "@/lib/analytics"

export function AppShell() {
  const [messages, setMessages]       = useState<ChatMessage[]>(DEMO_INITIAL_MESSAGES)
  const [currentDraft, setCurrentDraft] = useState<LessonDraft>(DEMO_LESSON)
  const [documents, setDocuments]     = useState<KnowledgeDocument[]>(DEMO_DOCUMENTS)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeView, setActiveView]   = useState<"draft" | "teacher-moves" | "timeline" | "design-space" | "quality">("draft")
  const [lessonUpdated, setLessonUpdated] = useState(false)

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setIsGenerating(true)

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600))

    const demoReply = getDemoResponse(content, currentDraft)

    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: "assistant",
      content: demoReply.message,
      timestamp: new Date(),
      stage: demoReply.stage,
      retrievalSummary: demoReply.retrievalSummary,
    }
    setMessages(prev => [...prev, assistantMessage])

    if (demoReply.updatedDraft) {
      setCurrentDraft(demoReply.updatedDraft)
      setActiveView("draft")
      setLessonUpdated(true)
      setTimeout(() => setLessonUpdated(false), 2200)
      track("lesson_updated")
    }

    setIsGenerating(false)
  }, [currentDraft])

  const handleToggleDocument = (docId: string) => {
    setDocuments(prev =>
      prev.map(d => d.id === docId ? { ...d, includeInSearch: !d.includeInSearch } : d)
    )
  }

  const handleDocumentUpload = useCallback((file: File) => {
    const newDoc: KnowledgeDocument = {
      id: `upload-${Date.now()}`,
      fileName: file.name,
      sourceType: "upload",
      status: "ready",
      trustLevel: "medium",
      includeInSearch: true,
    }
    setDocuments(prev => [...prev, newDoc])
    track("document_uploaded", { file_type: file.name.split(".").pop() ?? "unknown" })
  }, [])

  return (
    <>
      <nav className="ws-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/" className="ws-logo">
            <div className="ws-logo-mark"><Pencil /></div>
            <span className="ws-logo-text">Teacher Co-Pilot</span>
          </Link>
          <span className="ws-nav-sep">/</span>
          <span className="ws-nav-crumb">New lesson</span>
        </div>
        <div className="ws-nav-links">
          <Link href="/library" className="ws-btn"><BookOpen /> Library</Link>
          <Link href="/community" className="ws-btn"><Users /> Community</Link>
          <button className="ws-btn on"><Pencil /> Lesson</button>
          <Link href="/lesson/new" className="ws-btn cta"><Plus /> New lesson</Link>
        </div>
      </nav>

      <div className="ws-screen">
        <div className="chat-col">
          <ChatPanel
            messages={messages}
            isGenerating={isGenerating}
            onSendMessage={handleSendMessage}
            documents={documents}
            onUpload={handleDocumentUpload}
          />
        </div>
        <div className="les-col">
          <LessonDraftPanel
            draft={currentDraft}
            teacherMoves={DEMO_TEACHER_MOVES}
            revisions={DEMO_REVISIONS}
            qualityReview={DEMO_QUALITY_REVIEW}
            activeView={activeView}
            onViewChange={setActiveView}
            justUpdated={lessonUpdated}
          />
        </div>
      </div>
    </>
  )
}
