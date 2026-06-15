"use client"
import React, { useRef } from "react"
import { KnowledgeDocument } from "@/lib/types"
import { sourceTypeLabel } from "@/lib/utils"
import { BookOpen, FileText, Shield, GraduationCap, Plus, Eye, EyeOff, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface KnowledgeLibraryProps {
  documents: KnowledgeDocument[]
  onUpload: (doc: KnowledgeDocument) => void
  onToggle: (docId: string) => void
}

const SOURCE_ICONS: Record<string, React.ReactNode> = {
  curriculum_map: <BookOpen className="w-3.5 h-3.5" />,
  prior_feedback: <FileText className="w-3.5 h-3.5" />,
  policy: <Shield className="w-3.5 h-3.5" />,
  standard: <GraduationCap className="w-3.5 h-3.5" />,
  ai_literacy_framework: <GraduationCap className="w-3.5 h-3.5" />,
  lesson_plan: <FileText className="w-3.5 h-3.5" />,
  reflection: <FileText className="w-3.5 h-3.5" />,
  student_work: <FileText className="w-3.5 h-3.5" />,
}

const SOURCE_COLORS: Record<string, string> = {
  curriculum_map: "bg-blue-50 text-blue-600",
  prior_feedback: "bg-amber-50 text-amber-600",
  policy: "bg-red-50 text-red-600",
  standard: "bg-green-50 text-green-600",
  ai_literacy_framework: "bg-purple-50 text-purple-600",
  lesson_plan: "bg-indigo-50 text-indigo-600",
  reflection: "bg-pink-50 text-pink-600",
  student_work: "bg-teal-50 text-teal-600",
}

function StatusIcon({ status }: { status: string }) {
  if (status === "ready") return <CheckCircle2 className="w-3 h-3 text-green-500" />
  if (status === "processing") return <Clock className="w-3 h-3 text-amber-500 animate-spin" />
  if (status === "needs_review") return <AlertCircle className="w-3 h-3 text-amber-500" />
  return <Clock className="w-3 h-3 text-gray-400" />
}

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    ready: "Ready to use",
    processing: "Processing...",
    uploading: "Uploading...",
    needs_review: "Needs review",
  }
  return labels[status] || status
}

export function KnowledgeLibrary({ documents, onUpload, onToggle }: KnowledgeLibraryProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const newDoc: KnowledgeDocument = {
        id: uuidv4(),
        fileName: file.name,
        sourceType: guessSourceType(file.name),
        status: "processing",
        trustLevel: "medium",
        includeInSearch: true,
      }
      onUpload(newDoc)

      // Simulate processing
      setTimeout(() => {
        onUpload({ ...newDoc, status: "ready" })
      }, 2000)
    })

    e.target.value = ""
  }

  function guessSourceType(fileName: string): KnowledgeDocument["sourceType"] {
    const lower = fileName.toLowerCase()
    if (lower.includes("curriculum") || lower.includes("scope")) return "curriculum_map"
    if (lower.includes("feedback") || lower.includes("review")) return "prior_feedback"
    if (lower.includes("policy") || lower.includes("guideline")) return "policy"
    if (lower.includes("standard") || lower.includes("ngss") || lower.includes("ccss")) return "standard"
    if (lower.includes("ai") || lower.includes("literacy") || lower.includes("framework")) return "ai_literacy_framework"
    if (lower.includes("reflection") || lower.includes("notes")) return "reflection"
    return "lesson_plan"
  }

  const usedDocs = documents.filter(d => d.usedInCurrentLesson)
  const unusedDocs = documents.filter(d => !d.usedInCurrentLesson)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">Knowledge Library</h2>
        <p className="text-xs text-gray-500 mt-0.5">Your curriculum & teaching resources</p>
      </div>

      {/* Document list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin py-2">
        {usedDocs.length > 0 && (
          <div className="px-3 mb-1">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Used in this lesson</p>
            {usedDocs.map(doc => (
              <DocumentItem key={doc.id} doc={doc} onToggle={onToggle} />
            ))}
          </div>
        )}

        {unusedDocs.length > 0 && (
          <div className="px-3">
            {usedDocs.length > 0 && (
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2 mt-3">Available</p>
            )}
            {unusedDocs.map(doc => (
              <DocumentItem key={doc.id} doc={doc} onToggle={onToggle} />
            ))}
          </div>
        )}

        {documents.length === 0 && (
          <div className="px-4 py-8 text-center">
            <BookOpen className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-500">No resources yet. Upload your curriculum map, standards, or AI policy to get started.</p>
          </div>
        )}
      </div>

      {/* Add resource button */}
      <div className="p-3 border-t border-gray-200">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt,.md"
          className="hidden"
          onChange={handleFileSelect}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-blue-300 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Resource
        </button>
        <p className="text-xs text-gray-400 text-center mt-1.5">PDF, DOCX, or TXT</p>
      </div>
    </div>
  )
}

function DocumentItem({ doc, onToggle }: { doc: KnowledgeDocument; onToggle: (id: string) => void }) {
  const iconClass = SOURCE_COLORS[doc.sourceType] || "bg-gray-50 text-gray-600"

  return (
    <div className={`group flex items-start gap-2 rounded-lg px-2 py-2 mb-1 hover:bg-gray-50 transition-colors ${!doc.includeInSearch ? "opacity-50" : ""}`}>
      <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${iconClass}`}>
        {SOURCE_ICONS[doc.sourceType] || <FileText className="w-3.5 h-3.5" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-800 truncate leading-tight">{doc.fileName}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <StatusIcon status={doc.status} />
          <span className="text-xs text-gray-400">{statusLabel(doc.status)}</span>
        </div>
      </div>
      <button
        onClick={() => onToggle(doc.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5"
        title={doc.includeInSearch ? "Exclude from retrieval" : "Include in retrieval"}
      >
        {doc.includeInSearch
          ? <Eye className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
          : <EyeOff className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
        }
      </button>
    </div>
  )
}
