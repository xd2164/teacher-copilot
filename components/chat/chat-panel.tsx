"use client"
import React, { useRef, useEffect } from "react"
import { ChatMessage } from "@/lib/types"
import { MessageBubble } from "./message-bubble"
import { ChatInput } from "./chat-input"
import { Bot } from "lucide-react"

interface ChatPanelProps {
  messages: ChatMessage[]
  isGenerating: boolean
  onSendMessage: (content: string) => void
}

function TypingIndicator() {
  return (
    <div className="ws-msg a">
      <div className="ws-mav"><Bot /></div>
      <div className="ws-mi">
        <div className="ws-mb" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "var(--nvm)",
            display: "inline-block", animation: "bounce 1s infinite",
            animationDelay: "0ms"
          }} />
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "var(--nvm)",
            display: "inline-block", animation: "bounce 1s infinite",
            animationDelay: "150ms"
          }} />
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "var(--nvm)",
            display: "inline-block", animation: "bounce 1s infinite",
            animationDelay: "300ms"
          }} />
        </div>
      </div>
    </div>
  )
}

export function ChatPanel({ messages, isGenerating, onSendMessage }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isGenerating])

  return (
    <>
      <div className="ch-head">
        <p className="ch-eye">Design · Create · Reflect</p>
        <div className="ch-title">Co-Pilot</div>
        <p className="ch-sub">AI literacy instructional design</p>
      </div>
      <div className="ch-msgs scrollbar-thin">
        {messages.map(m => <MessageBubble key={m.id} message={m} />)}
        {isGenerating && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
      <div className="ch-foot">
        <ChatInput onSend={onSendMessage} disabled={isGenerating} />
        <p className="ch-hint">Enter to send · Shift+Enter for new line</p>
      </div>
    </>
  )
}
