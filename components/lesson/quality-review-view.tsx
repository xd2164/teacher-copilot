"use client"
import React from "react"
import { QualityReview } from "@/lib/types"

interface QualityReviewViewProps {
  review: QualityReview
}

// Assign a score (0–100) to each strength/weakness for bar display
function scoreForIndex(total: number, index: number, isStrength: boolean): number {
  if (isStrength) {
    // strengths get high scores
    return Math.round(85 - (index / Math.max(total - 1, 1)) * 20)
  } else {
    // weaknesses get medium scores
    return Math.round(55 - (index / Math.max(total - 1, 1)) * 15)
  }
}

export function QualityReviewView({ review }: QualityReviewViewProps) {
  return (
    <div>
      <span className="ws-bkh">Quality Review</span>

      {/* Readiness badge */}
      <div style={{ marginBottom: "1rem" }}>
        <span className={`ws-bdg ${review.readiness === "ready" ? "tl" : review.readiness === "needs_revision" ? "am" : "nv"}`}
          style={{ fontSize: 12, padding: "4px 12px" }}>
          {review.readiness === "ready"
            ? "Ready for classroom use"
            : review.readiness === "needs_revision"
            ? "Needs revision"
            : "Not ready"}
        </span>
        <p style={{ fontSize: 11, color: "var(--t3)", marginTop: 5, fontStyle: "italic" }}>
          AI assessment — final decision is yours.
        </p>
      </div>

      {/* Strengths */}
      {review.strengths.length > 0 && (
        <>
          <p className="ws-glbl" style={{ marginBottom: ".5rem" }}>Strengths</p>
          <div style={{ marginBottom: "1rem" }}>
            {review.strengths.map((s, i) => {
              const score = scoreForIndex(review.strengths.length, i, true)
              return (
                <div key={i} className="ws-qr">
                  <span className="ws-ql">{s}</span>
                  <div className="ws-qbw">
                    <div className="ws-qb hi" style={{ width: `${score}%` }} />
                  </div>
                  <span className="ws-qs hi">{score}%</span>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Required revisions */}
      {review.requiredRevisions.length > 0 && (
        <>
          <p className="ws-glbl" style={{ marginBottom: ".5rem" }}>Required Before Teaching</p>
          <div style={{ marginBottom: "1rem" }}>
            {review.requiredRevisions.map((r, i) => (
              <div key={i} className="ws-scen">
                <div className="ws-scen-h"><em>Action needed</em></div>
                <div className="ws-scen-b">{r}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Weaknesses */}
      {review.weaknesses.length > 0 && (
        <>
          <p className="ws-glbl" style={{ marginBottom: ".5rem" }}>Optional Improvements</p>
          <div style={{ marginBottom: "1rem" }}>
            {review.weaknesses.map((w, i) => {
              const score = scoreForIndex(review.weaknesses.length, i, false)
              return (
                <div key={i} className="ws-qr">
                  <span className="ws-ql">{w}</span>
                  <div className="ws-qbw">
                    <div className="ws-qb md" style={{ width: `${score}%` }} />
                  </div>
                  <span className="ws-qs md">{score}%</span>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Safety notes */}
      {review.safetyNotes.length > 0 && (
        <>
          <p className="ws-glbl" style={{ marginBottom: ".5rem" }}>Safety & Policy Notes</p>
          <div style={{ marginBottom: "1rem" }}>
            {review.safetyNotes.map((note, i) => (
              <div key={i} className="ws-prml">{note}</div>
            ))}
          </div>
        </>
      )}

      {/* Teacher decisions */}
      {review.teacherDecisions.length > 0 && (
        <>
          <p className="ws-glbl" style={{ marginBottom: ".5rem" }}>Teacher Decisions Still Needed</p>
          <div>
            {review.teacherDecisions.map((td, i) => (
              <div key={i} className="ws-etb" style={{ marginBottom: 6 }}>
                <div className="ws-eth-h">Decision {i + 1}</div>
                <div className="ws-eth-b">{td}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
