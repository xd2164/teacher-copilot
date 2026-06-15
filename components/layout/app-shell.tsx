"use client"
import React, { useState } from "react"
import { KnowledgeLibrary } from "@/components/knowledge-library/knowledge-library"
import { ChatPanel } from "@/components/chat/chat-panel"
import { LessonDraftPanel } from "@/components/lesson/lesson-draft-panel"
import { DEMO_DOCUMENTS, DEMO_LESSON, DEMO_INITIAL_MESSAGES, DEMO_TEACHER_MOVES, DEMO_REVISIONS, DEMO_QUALITY_REVIEW } from "@/lib/demo-data"
import { ChatMessage, LessonDraft, KnowledgeDocument } from "@/lib/types"

export function AppShell() {
  const [messages, setMessages] = useState<ChatMessage[]>(DEMO_INITIAL_MESSAGES)
  const [currentDraft, setCurrentDraft] = useState<LessonDraft>(DEMO_LESSON)
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(DEMO_DOCUMENTS)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeView, setActiveView] = useState<"draft" | "teacher-moves" | "timeline" | "design-space" | "quality">("draft")

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setIsGenerating(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          currentDraft,
          documents: documents.filter(d => d.includeInSearch),
        }),
      })

      if (!response.ok) throw new Error("Chat request failed")

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
        stage: data.stage,
        retrievalSummary: data.retrievalSummary,
      }
      setMessages(prev => [...prev, assistantMessage])

      if (data.updatedDraft) {
        setCurrentDraft(data.updatedDraft)
      }
    } catch {
      const errorMessage: ChatMessage = {
        id: `msg-error-${Date.now()}`,
        role: "assistant",
        content: "I encountered an issue. Please check your API key in .env.local and try again.",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDocumentUpload = (doc: KnowledgeDocument) => {
    setDocuments(prev => [...prev, doc])
  }

  const handleToggleDocument = (docId: string) => {
    setDocuments(prev =>
      prev.map(d => d.id === docId ? { ...d, includeInSearch: !d.includeInSearch } : d)
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left: Knowledge Library */}
      <div className="w-64 flex-shrink-0 border-r border-gray-200 bg-white overflow-hidden flex flex-col">
        <KnowledgeLibrary
          documents={documents}
          onUpload={handleDocumentUpload}
          onToggle={handleToggleDocument}
        />
      </div>

      {/* Center: Chat */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden border-r border-gray-200">
        <ChatPanel
          messages={messages}
          isGenerating={isGenerating}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* Right: Lesson Draft */}
      <div className="w-[420px] flex-shrink-0 bg-white overflow-hidden flex flex-col">
        <LessonDraftPanel
          draft={currentDraft}
          teacherMoves={DEMO_TEACHER_MOVES}
          revisions={DEMO_REVISIONS}
          qualityReview={DEMO_QUALITY_REVIEW}
          activeView={activeView}
          onViewChange={setActiveView}
        />
      </div>
    </div>
  )
}
