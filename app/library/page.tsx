"use client"
import React, { useState, useRef } from "react"
import Link from "next/link"
import { Pencil, BookOpen, FileText, Plus, Check, Upload, Presentation, Users } from "lucide-react"
import { DEMO_DOCUMENTS } from "@/lib/demo-data"
import { KnowledgeDocument } from "@/lib/types"

const FILTER_OPTIONS = [
  { id: "all",  label: "All"             },
  { id: "curr", label: "Curriculum"      },
  { id: "std",  label: "Standards"       },
  { id: "fb2",  label: "Lesson feedback" },
  { id: "pol",  label: "AI policy"       },
]

const DOC_FILTER_MAP: Record<string, string> = {
  curriculum_map:       "curr",
  ai_literacy_framework:"curr",
  standard:             "std",
  prior_feedback:       "fb2",
  policy:               "pol",
}

const DOC_DETAILS: Record<string, { pageInfo: string; sourceDate: string; lessonCount: string; badgeClass: "tl" | "nv" }> = {
  "doc-1": { pageInfo: "PDF · 12 pages",  sourceDate: "Used in 3 lessons",  lessonCount: "3 lessons",  badgeClass: "tl" },
  "doc-2": { pageInfo: "DOCX · 4 pages",  sourceDate: "Spring 2024",        lessonCount: "1 lesson",   badgeClass: "tl" },
  "doc-3": { pageInfo: "PDF · 8 pages",   sourceDate: "Updated Sep 2024",   lessonCount: "5 lessons",  badgeClass: "tl" },
  "doc-4": { pageInfo: "PDF · 24 pages",  sourceDate: "AI4K12 Initiative",  lessonCount: "2 lessons",  badgeClass: "tl" },
  "doc-5": { pageInfo: "PDF · 18 pages",  sourceDate: "NGSS Lead States",   lessonCount: "Not yet used", badgeClass: "nv" },
}

function getDocType(sourceType: string): { label: string; iconClass: "pdf" | "doc" } {
  switch (sourceType) {
    case "curriculum_map":        return { label: "Curriculum Map",       iconClass: "doc" }
    case "prior_feedback":        return { label: "Past Lesson Feedback", iconClass: "doc" }
    case "policy":                return { label: "School AI Policy",     iconClass: "pdf" }
    case "ai_literacy_framework": return { label: "AI Literacy Framework",iconClass: "pdf" }
    case "standard":              return { label: "Academic Standards",   iconClass: "pdf" }
    case "upload":                return { label: "Uploaded Resource",    iconClass: "doc" }
    default:                      return { label: sourceType,             iconClass: "doc" }
  }
}

const RECENT_LESSONS = [
  { title: "Can Data Predict Tomorrow's Weather?", meta: "Gr. 6 · Science · Jan 15" },
  { title: "Bias in Facial Recognition",           meta: "Gr. 8 · Social Studies · Jan 10" },
  { title: "Recommendation Systems",               meta: "Gr. 7 · Math · Jan 4" },
]

export default function LibraryPage() {
  const [activeFilter, setActiveFilter]     = useState("all")
  const [selectedDocId, setSelectedDocId]   = useState<string | null>(null)
  const [uploadedDocs, setUploadedDocs]     = useState<KnowledgeDocument[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const newDoc: KnowledgeDocument = {
      id: `upload-${Date.now()}`,
      fileName: file.name,
      sourceType: "upload",
      status: "ready",
      trustLevel: "medium",
      includeInSearch: true,
    }
    setUploadedDocs(prev => [...prev, newDoc])
    setSelectedDocId(newDoc.id)
    e.target.value = ""
  }

  const allDocs  = [...DEMO_DOCUMENTS, ...uploadedDocs]
  const filtered = allDocs.filter(d => {
    if (activeFilter === "all") return true
    return DOC_FILTER_MAP[d.sourceType] === activeFilter
  })

  const selectedDoc = selectedDocId ? allDocs.find(d => d.id === selectedDocId) ?? null : null

  return (
    <>
      <nav className="ws-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/" className="ws-logo">
            <div className="ws-logo-mark"><Pencil /></div>
            <span className="ws-logo-text">Teacher Co-Pilot</span>
          </Link>
        </div>
        <div className="ws-nav-links">
          <button className="ws-btn on"><BookOpen /> Library</button>
          <Link href="/community" className="ws-btn"><Users /> Community</Link>
          <Link href="/" className="ws-btn"><Presentation /> Demo</Link>
          <Link href="/lesson/new" className="ws-btn cta"><Plus /> New lesson</Link>
        </div>
      </nav>

      <div className="ws-screen">
        {/* Main content */}
        <div className="lib-main">
          <span className="lib-chap">Knowledge Library</span>
          <h1 className="lib-h">Your teaching resources</h1>
          <p className="lib-sub">Curriculum maps, standards, policy docs, and past lesson feedback — click any card to preview</p>

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

          <div className="lib-dgrid">
            {filtered.map(doc => {
              const { label, iconClass } = getDocType(doc.sourceType)
              const detail = DOC_DETAILS[doc.id]
              const isSel  = selectedDocId === doc.id
              return (
                <div
                  key={doc.id}
                  className={`lib-dc${isSel ? " sel" : ""}`}
                  onClick={() => setSelectedDocId(doc.id)}
                >
                  <div className="lib-dc-check"><Check /></div>
                  <div className={`lib-d-ic ${iconClass}`}><FileText /></div>
                  <div className="lib-d-name">{doc.fileName}</div>
                  <div className="lib-d-type">{label}</div>
                  <div className="lib-d-foot">
                    <span className={`ws-bdg ${detail?.badgeClass ?? "tl"}`}>
                      {detail?.badgeClass === "nv" ? "Available" : "Ready"}
                    </span>
                    <span style={{ fontSize: 10, color: "var(--t3)" }}>{detail?.lessonCount ?? ""}</span>
                  </div>
                </div>
              )
            })}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.md"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <button className="lib-upl" onClick={() => fileInputRef.current?.click()}>
              <Upload />
              <span>Upload a resource</span>
              <span style={{ fontSize: 11, color: "var(--t3)" }}>PDF, DOCX, or TXT</span>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lib-sb">
          <p className="sb-lbl">Resource preview</p>

          {selectedDoc ? (
            <>
              <div className="sb-iblk">
                <p className="sb-ilbl">Name</p>
                <p className="sb-ival">{selectedDoc.fileName}</p>
              </div>
              <div className="sb-iblk">
                <p className="sb-ilbl">Type</p>
                <p className="sb-ival">{getDocType(selectedDoc.sourceType).label}</p>
              </div>
              <div className="sb-iblk">
                <p className="sb-ilbl">Details</p>
                <p className="sb-ival">{DOC_DETAILS[selectedDoc.id]?.pageInfo ?? "—"}</p>
              </div>
              <div className="sb-iblk">
                <p className="sb-ilbl">Source / date</p>
                <p className="sb-ival">{DOC_DETAILS[selectedDoc.id]?.sourceDate ?? "—"}</p>
              </div>
              <Link
                href="/lesson/new"
                className="ws-btn cta"
                style={{ width: "100%", marginTop: ".75rem", justifyContent: "center" }}
              >
                <Plus /> Use in new lesson
              </Link>
            </>
          ) : (
            <p style={{ fontSize: 12, color: "var(--t3)", fontStyle: "italic", lineHeight: 1.6 }}>
              Click any resource card to preview details and see which lessons use it.
            </p>
          )}

          <div style={{ marginTop: "1.125rem", borderTop: "1px solid var(--bd)", paddingTop: ".875rem" }}>
            <p className="sb-lbl">Recent lessons</p>
            {RECENT_LESSONS.map((l, i) => (
              <div key={i} className="sb-mr">
                <FileText />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "var(--tx)" }}>{l.title}</div>
                  <div style={{ fontSize: 10.5, color: "var(--t3)" }}>{l.meta}</div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/lesson/new"
            className="ws-btn cta"
            style={{ width: "100%", marginTop: "1rem", justifyContent: "center" }}
          >
            <Plus /> New lesson
          </Link>
        </div>
      </div>
    </>
  )
}
