"use client"
import React, { useRef, useEffect } from "react"
import Link from "next/link"
import { ChatMessage, KnowledgeDocument } from "@/lib/types"
import { MessageBubble } from "./message-bubble"
import { ChatInput } from "./chat-input"
import { Bot, BookOpen, ArrowRight } from "lucide-react"
import { track } from "@/lib/analytics"

interface ChatPanelProps {
  messages: ChatMessage[]
  isGenerating: boolean
  onSendMessage: (content: string) => void
  documents?: KnowledgeDocument[]
}

const SUGGESTIONS = [
  "Make it more hands-on",
  "Add ethics discussion",
  "Add multilingual support",
  "Shorten to 30 min",
]

function TypingIndicator() {
  return (
    <div className="ws-msg a">
      <div className="ws-mav"><Bot /></div>
      <div className="ws-mi">
        <div className="ws-mb" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {[0, 150, 300].map(delay => (
            <span key={delay} style={{
              width: 6, height: 6, borderRadius: "50%", background: "var(--nvm)",
              display: "inline-block", animation: "bounce 1s infinite",
              animationDelay: `${delay}ms`,
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ChatPanel({ messages, isGenerating, onSendMessage, documents }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const hasUserMsg    = messages.some(m => m.role === "user")
  const activeDocs    = (documents ?? []).filter(d => d.includeInSearch)
  const shownDocs     = activeDocs.slice(0, 2)
  const extraCount    = activeDocs.length - shownDocs.length

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isGenerating])

  return (
    <>
      {/* Header */}
      <div className="ch-head">
        <p className="ch-eye">Design · Create · Reflect</p>
        <div className="ch-title">Co-Pilot</div>
        <p className="ch-sub">AI literacy instructional design</p>
      </div>

      {/* Sources in context */}
      {activeDocs.length > 0 && (
        <div className="ws-sources">
          <span className="ws-src-label"><BookOpen style={{ width: 10, height: 10, display: "inline", marginRight: 3 }} />{activeDocs.length} sources</span>
          {shownDocs.map(d => (
            <span key={d.id} className="ws-src-chip" title={d.fileName}>
              {d.fileName.replace(/\.[^.]+$/, "")}
            </span>
          ))}
          {extraCount > 0 && <span className="ws-src-more">+{extraCount} more</span>}
          <Link href="/library" className="ws-src-link">
            Manage <ArrowRight />
          </Link>
        </div>
      )}

      {/* Messages */}
      <div className="ch-msgs scrollbar-thin">
        {messages.map(m => <MessageBubble key={m.id} message={m} />)}
        {isGenerating && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input + suggestions */}
      <div className="ch-foot">
        <ChatInput onSend={onSendMessage} disabled={isGenerating} />
        <p className="ch-hint">Enter to send · Shift+Enter for new line</p>
      </div>

      {/* Suggestion chips — only shown before first user message */}
      {!hasUserMsg && (
        <div className="ws-suggests">
          {SUGGESTIONS.map(s => (
            <button key={s} className="ws-sug" onClick={() => { track("suggestion_clicked", { label: s }); onSendMessage(s) }}>
              {s}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
