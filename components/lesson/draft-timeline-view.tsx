"use client"
import React from "react"
import { DraftRevision } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface DraftTimelineViewProps {
  revisions: DraftRevision[]
}

export function DraftTimelineView({ revisions }: DraftTimelineViewProps) {
  const sorted = [...revisions].reverse()

  return (
    <div>
      {sorted.map((revision, i) => {
        const isCurrent = i === 0
        return (
          <div key={revision.versionNumber} className="ws-hi">
            <span className={`ws-hdot${isCurrent ? " c" : ""}`} />
            <span className="ws-hv">v{revision.versionNumber}</span>
            <div style={{ flex: 1 }}>
              <h4>{revision.summary}</h4>
              <p>
                {revision.whatChanged.join(" · ")}
              </p>
              <p style={{ marginTop: 2 }}>
                <strong style={{ color: "var(--tx)", fontWeight: 500 }}>Why:</strong> {revision.whyChanged}
              </p>
              <p style={{ marginTop: 2 }}>
                <strong style={{ color: "var(--tx)", fontWeight: 500 }}>Decision:</strong> {revision.teacherDecision}
              </p>
              <div className="ws-ht">{formatDate(revision.timestamp)}</div>
              {!isCurrent && (
                <span className="ws-rst">Restore this version</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
