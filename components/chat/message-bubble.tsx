"use client"
import React from "react"
import { ChatMessage } from "@/lib/types"
import { Sparkles, User, Database } from "lucide-react"
import { cn, formatDate } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MessageBubbleProps {
  message: ChatMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === "assistant"

  return (
    <div className={cn("flex items-start gap-3", !isAssistant && "flex-row-reverse")}>
      {/* Avatar */}
      <div className={cn(
        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
        isAssistant ? "bg-blue-600" : "bg-gray-200"
      )}>
        {isAssistant
          ? <Sparkles className="w-3.5 h-3.5 text-white" />
          : <User className="w-3.5 h-3.5 text-gray-600" />
        }
      </div>

      <div className={cn("max-w-[85%] space-y-2", !isAssistant && "items-end flex flex-col")}>
        {/* Retrieval summary */}
        {isAssistant && message.retrievalSummary && message.retrievalSummary.length > 0 && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-xs">
            <div className="flex items-center gap-1.5 text-blue-700 font-medium mb-1.5">
              <Database className="w-3 h-3" />
              Context retrieved from your materials
            </div>
            <ul className="space-y-0.5">
              {message.retrievalSummary.map((item, i) => (
                <li key={i} className="text-blue-600 flex items-start gap-1">
                  <span className="mt-0.5">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Message bubble */}
        <div className={cn(
          "rounded-xl px-4 py-3 text-sm shadow-sm",
          isAssistant
            ? "bg-white border border-gray-200 rounded-tl-sm text-gray-800"
            : "bg-blue-600 text-white rounded-tr-sm"
        )}>
          {isAssistant ? (
            <div className="prose prose-sm max-w-none prose-p:my-1 prose-li:my-0.5 prose-headings:my-2">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {/* Stage badge + timestamp */}
        <div className={cn("flex items-center gap-2 text-xs text-gray-400", !isAssistant && "flex-row-reverse")}>
          {message.stage && isAssistant && (
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              message.stage === "understand" && "bg-gray-100 text-gray-600",
              message.stage === "retrieve" && "bg-blue-50 text-blue-600",
              message.stage === "generate" && "bg-green-50 text-green-600",
              message.stage === "revise" && "bg-amber-50 text-amber-600",
              message.stage === "reflect" && "bg-purple-50 text-purple-600",
            )}>
              {message.stage}
            </span>
          )}
          <span>{formatDate(message.timestamp)}</span>
        </div>
      </div>
    </div>
  )
}
