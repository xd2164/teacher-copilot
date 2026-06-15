"use client"
import React from "react"
import { QualityReview } from "@/lib/types"
import { readinessColor } from "@/lib/utils"
import { CheckCircle2, XCircle, AlertTriangle, Shield, Sparkles } from "lucide-react"

interface QualityReviewViewProps {
  review: QualityReview
}

export function QualityReviewView({ review }: QualityReviewViewProps) {
  return (
    <div className="p-4 space-y-4">
      {/* Overall readiness */}
      <div className={`rounded-xl border p-4 ${readinessColor(review.readiness)}`}>
        <div className="flex items-center gap-2 mb-1">
          {review.readiness === "ready"
            ? <CheckCircle2 className="w-5 h-5" />
            : review.readiness === "needs_revision"
            ? <AlertTriangle className="w-5 h-5" />
            : <XCircle className="w-5 h-5" />
          }
          <span className="font-semibold text-sm">
            {review.readiness === "ready" ? "Ready for classroom use"
              : review.readiness === "needs_revision" ? "Needs revision before teaching"
              : "Not ready — requires significant changes"}
          </span>
        </div>
        <p className="text-xs opacity-75">
          This is an AI assessment. The final decision about classroom readiness is yours.
        </p>
      </div>

      {/* Strengths */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-green-600" />
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Strengths</p>
        </div>
        <ul className="space-y-1.5">
          {review.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Required revisions */}
      {review.requiredRevisions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Required Before Teaching</p>
          </div>
          <ul className="space-y-1.5">
            {review.requiredRevisions.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50 rounded-lg px-3 py-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weaknesses */}
      {review.weaknesses.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-3.5 h-3.5 text-gray-400" />
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Optional Improvements</p>
          </div>
          <ul className="space-y-1.5">
            {review.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                <span className="text-gray-300 mt-0.5">·</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety notes */}
      {review.safetyNotes.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-3.5 h-3.5 text-blue-500" />
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Safety & Policy Notes</p>
          </div>
          <ul className="space-y-1.5">
            {review.safetyNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-blue-800 bg-blue-50 rounded-lg px-3 py-2">
                <Shield className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Teacher decisions */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Teacher Decisions Still Needed</p>
        </div>
        <ul className="space-y-1.5">
          {review.teacherDecisions.map((td, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-700 border border-amber-200 bg-amber-50 rounded-lg px-3 py-2">
              <span className="text-amber-500 font-bold mt-0.5">→</span>
              {td}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
