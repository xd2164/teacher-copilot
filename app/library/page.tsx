"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Pencil, BookOpen, FileText, Plus, Check, Upload, ArrowRight } from "lucide-react"
import { DEMO_DOCUMENTS } from "@/lib/demo-data"

const FILTER_OPTIONS = [
  { id: "all", label: "All" },
  { id: "curriculum_map", label: "Curriculum" },
  { id: "prior_feedback", label: "Feedback" },
  { id: "policy", label: "Policy" },
  { id: "ai_literacy_framework", label: "AI Framework" },
  { id: "standard", label: "Standards" },
]

function getDocType(sourceType: string): { label: string; iconClass: "pdf" | "doc" } {
  switch (sourceType) {
    case "curriculum_map": return { label: "Curriculum Map", iconClass: "doc" }
    case "prior_feedback": return { label: "Past Lesson Feedback", iconClass: "doc" }
    case "policy": return { label: "School AI Policy", iconClass: "pdf" }
    case "ai_literacy_framework": return { label: "AI Literacy Framework", iconClass: "pdf" }
    case "standard": return { label: "Academic Standards", iconClass: "pdf" }
    default: return { label: sourceType, iconClass: "doc" }
  }
}

const RECENT_LESSONS = [
  { title: "Can Data Predict Tomorrow's Weather?", meta: "Gr. 6 · Science · Jan 15" },
  { title: "Bias in Facial Recognition", meta: "Gr. 8 · Social Studies · Jan 10" },
  { title: "Recommendation Systems", meta: "Gr. 7 · Math · Jan 4" },
]

export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedDocId, setSelectedDocId] = useState<string | null>(DEMO_DOCUMENTS[0]?.id ?? null)

  const filtered = activeFilter === "all"
    ? DEMO_DOCUMENTS
    : DEMO_DOCUMENTS.filter(d => d.sourceType === activeFilter)

  const selectedDoc = DEMO_DOCUMENTS.find(d => d.id === selectedDocId) ?? null

  return (
    <>
      <nav className="ws-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/" className="ws-logo">
            <div className="ws-logo-mark"><Pencil /></div>
            <span className="ws-logo-text">Teacher Co-Pilot</span>
          </Link>
          <span className="ws-nav-sep">/</span>
          <span className="ws-nav-crumb">Knowledge Library</span>
        </div>
        <div className="ws-nav-links">
          <Link href="/lesson/new" className="ws-btn cta"><Plus /> New Lesson</Link>
          <span className="ws-bdg tl">Demo</span>
        </div>
      </nav>

      <div className="ws-screen">
        {/* Main content */}
        <div className="lib-main">
          <span className="lib-chap">Knowledge Library</span>
          <h1 className="lib-h">Your Teaching Materials</h1>
          <p className="lib-sub">Curriculum maps, standards, policies, and past lesson feedback</p>

          {/* Filter chips */}
          <div className="lib-fltrs">
            {FILTER_OPTIONS.map(f => (
              <button
                key={f.id}
                className={`lib-fb${activeFilter === f.id ? " on" : ""}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Document grid */}
          <div className="lib-dgrid">
            {filtered.map(doc => {
              const { label, iconClass } = getDocType(doc.sourceType)
              const isSel = selectedDocId === doc.id
              return (
                <div
                  key={doc.id}
                  className={`lib-dc${isSel ? " sel" : ""}`}
                  onClick={() => setSelectedDocId(doc.id)}
                >
                  <div className="lib-dc-check">
                    <Check />
                  </div>
                  <div className={`lib-d-ic ${iconClass}`}>
                    <FileText />
                  </div>
                  <div className="lib-d-name">{doc.fileName}</div>
                  <div className="lib-d-type">{label}</div>
                  <div className="lib-d-foot">
                    <span className="lib-d-count">{doc.gradeBand ?? "All grades"}</span>
                    <span className={`ws-bdg ${doc.status === "ready" ? "tl" : "am"}`}>
                      {doc.status === "ready" ? "Ready" : doc.status}
                    </span>
                  </div>
                </div>
              )
            })}

            {/* Upload tile */}
            <div className="lib-upl">
              <Upload />
              <span>Upload document</span>
              <span style={{ fontSize: 10, color: "var(--t3)" }}>PDF, DOCX, or TXT</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lib-sb">
          {selectedDoc ? (
            <>
              <p className="sb-lbl">Selected document</p>
              <div className="sb-iblk">
                <p className="sb-ilbl">Name</p>
                <p className="sb-ival">{selectedDoc.fileName}</p>
              </div>
              <div className="sb-iblk">
                <p className="sb-ilbl">Type</p>
                <p className="sb-ival">{getDocType(selectedDoc.sourceType).label}</p>
              </div>
              {selectedDoc.gradeBand && (
                <div className="sb-iblk">
                  <p className="sb-ilbl">Grade Band</p>
                  <p className="sb-ival">{selectedDoc.gradeBand}</p>
                </div>
              )}
              {selectedDoc.subject && (
                <div className="sb-iblk">
                  <p className="sb-ilbl">Subject</p>
                  <p className="sb-ival">{selectedDoc.subject}</p>
                </div>
              )}
              <div className="sb-iblk">
                <p className="sb-ilbl">Status</p>
                <p className="sb-ival">
                  <span className={`ws-bdg ${selectedDoc.status === "ready" ? "tl" : "am"}`}>
                    {selectedDoc.status === "ready" ? "Ready to use" : selectedDoc.status}
                  </span>
                </p>
              </div>
              <div className="sb-iblk">
                <p className="sb-ilbl">Trust level</p>
                <p className="sb-ival">{selectedDoc.trustLevel}</p>
              </div>

              <hr className="ws-rule" />

              <Link href="/lesson/new" className="ws-btn cta" style={{ width: "100%", justifyContent: "center", marginBottom: "1rem" }}>
                <ArrowRight /> Use in new lesson
              </Link>

              <hr className="ws-rule" />

              <p className="sb-lbl">Recent lessons</p>
              {RECENT_LESSONS.map((l, i) => (
                <div key={i} className="sb-mr">
                  <BookOpen />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 12, color: "var(--tx)" }}>{l.title}</div>
                    <div style={{ fontSize: 11, color: "var(--t3)" }}>{l.meta}</div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p style={{ fontSize: 12, color: "var(--t3)" }}>Select a document to preview</p>
          )}
        </div>
      </div>
    </>
  )
}
