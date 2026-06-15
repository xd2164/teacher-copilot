"use client"
import React from "react"

interface QuickCommandsProps {
  onSelect: (command: string) => void
}

const COMMANDS = [
  { label: "Create new lesson", value: "Create a new lesson" },
  { label: "Make more hands-on", value: "Make this more hands-on" },
  { label: "Add ethical discussion", value: "Add ethical discussion questions" },
  { label: "Add AI literacy connections", value: "Add stronger AI literacy connections" },
  { label: "Adapt for multilingual learners", value: "Add support for multilingual learners" },
  { label: "Create student worksheet", value: "Create a student-facing worksheet" },
  { label: "Create teacher guide", value: "Create a teacher guide" },
  { label: "Create exit ticket", value: "Create an exit ticket" },
  { label: "Shorten to 30 minutes", value: "Shorten this to 30 minutes" },
  { label: "Use my curriculum map", value: "Use my curriculum map to strengthen this lesson" },
  { label: "Compare draft versions", value: "Compare draft versions" },
  { label: "Save reflection", value: "I want to save a reflection about this lesson" },
  { label: "Export lesson", value: "Export this lesson" },
  { label: "Run quality check", value: "Run a quality check on this lesson" },
]

export function QuickCommands({ onSelect }: QuickCommandsProps) {
  return (
    <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
      <p className="text-xs font-medium text-blue-700 mb-2">Quick commands</p>
      <div className="flex flex-wrap gap-2">
        {COMMANDS.map((cmd) => (
          <button
            key={cmd.value}
            onClick={() => onSelect(cmd.value)}
            className="text-xs px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
          >
            {cmd.label}
          </button>
        ))}
      </div>
    </div>
  )
}
