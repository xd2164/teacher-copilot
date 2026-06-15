"use client"
import React from "react"
import { DraftRevision } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { GitBranch, AlertTriangle } from "lucide-react"

interface DraftTimelineViewProps {
  revisions: DraftRevision[]
}

export function DraftTimelineView({ revisions }: DraftTimelineViewProps) {
  return (
    <div className="p-4">
      <div className="bg-blue-50 rounded-lg px-3 py-2 mb-4">
        <p className="text-xs text-blue-700">
          This timeline shows how the lesson evolved through teacher–AI collaboration. Each revision shows what changed, why, and what decisions remain.
        </p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {[...revisions].reverse().map((revision, i) => (
            <div key={revision.versionNumber} className="relative flex gap-4">
              {/* Node */}
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                i === 0 ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-600"
              }`}>
                <span className="text-xs font-bold">{revision.versionNumber}</span>
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-sm font-medium text-gray-900">{revision.summary}</p>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{formatDate(revision.timestamp)}</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">What changed</p>
                    <ul className="space-y-0.5">
                      {revision.whatChanged.map((change, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-xs text-gray-600">
                          <GitBranch className="w-3 h-3 text-blue-400 flex-shrink-0 mt-0.5" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-0.5">Why</p>
                    <p className="text-xs text-gray-600">{revision.whyChanged}</p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">Teacher decision: {revision.teacherDecision}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
