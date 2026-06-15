"use client"
import React, { useRef, useEffect, useState } from "react"
import { ChatMessage } from "@/lib/types"
import { MessageBubble } from "./message-bubble"
import { ChatInput } from "./chat-input"
import { QuickCommands } from "./quick-commands"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatPanelProps {
  messages: ChatMessage[]
  isGenerating: boolean
  onSendMessage: (content: string) => void
}

export function ChatPanel({ messages, isGenerating, onSendMessage }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [showCommands, setShowCommands] = useState(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isGenerating])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Design–Create–Reflect Co-Pilot</h2>
            <p className="text-xs text-gray-500">AI literacy instructional design assistant</p>
          </div>
        </div>
        <button
          onClick={() => setShowCommands(!showCommands)}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          {showCommands ? "Hide commands" : "Show commands"}
        </button>
      </div>

      {/* Quick commands */}
      {showCommands && (
        <QuickCommands onSelect={(cmd) => { onSendMessage(cmd); setShowCommands(false) }} />
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isGenerating && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <ChatInput
          onSend={onSendMessage}
          disabled={isGenerating}
          placeholder="What lesson are you planning? Or ask me to revise, reflect, or create student materials..."
        />
      </div>
    </div>
  )
}
