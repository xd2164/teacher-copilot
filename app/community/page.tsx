"use client"
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, BookOpen, Presentation, Plus, Users, BadgeCheck, Star } from "lucide-react"
import { COMMUNITY_LESSONS, type CommunityLesson } from "@/lib/community-data"
import { track } from "@/lib/analytics"

const GRADE_FILTERS = [
  { id: "all", label: "All grades" },
  { id: "k5",  label: "K–5"        },
  { id: "ms",  label: "6–8"        },
  { id: "hs",  label: "9–12"       },
]

function matchesGrade(lesson: CommunityLesson, filter: string) {
  if (filter === "all") return true
  if (filter === "k5")  return /[K12345]/.test(lesson.grade) && !lesson.grade.includes("6")
  if (filter === "ms")  return lesson.grade.includes("6") || lesson.grade.includes("7") || lesson.grade.includes("8")
  if (filter === "hs")  return lesson.grade.includes("9") || lesson.grade.includes("10") || lesson.grade.includes("11") || lesson.grade.includes("12")
  return true
}

const AVATAR_COLORS = ["#1B4B8A","#0F6E56","#7A4510","#5B3A8A","#1A6B7A","#7A1010","#107A5E"]

function TeacherAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase()
  const color    = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
  return <div className="cm-av" style={{ background: color }}>{initials}</div>
}

export default function CommunityPage() {
  const router               = useRouter()
  const [grade, setGrade]    = useState("all")
  const [adapted, setAdapted] = useState<string | null>(null)

  const filtered   = COMMUNITY_LESSONS.filter(l => matchesGrade(l, grade))
  const totalUses  = COMMUNITY_LESSONS.reduce((s, l) => s + l.uses, 0)
  const stateCount = new Set(COMMUNITY_LESSONS.map(l => l.state)).size

  const handleAdapt = (lesson: CommunityLesson) => {
    track("community_lesson_adapted", { lesson_id: lesson.id })
    setAdapted(lesson.id)
    setTimeout(() => router.push("/lesson/new"), 900)
  }

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
          <Link href="/library" className="ws-btn"><BookOpen /> Library</Link>
          <button className="ws-btn on"><Users /> Community</button>
          <Link href="/" className="ws-btn"><Presentation /> Demo</Link>
          <Link href="/lesson/new" className="ws-btn cta"><Plus /> New lesson</Link>
        </div>
      </nav>

      <div className="cm-page">
        {/* Hero */}
        <div className="cm-hero">
          <p className="cm-hero-eye">Community Resources</p>
          <h1 className="cm-hero-h">
            High-quality AI literacy lessons,<br />shared by teachers for teachers
          </h1>
          <p className="cm-hero-sub">
            Browse, adapt, and share lesson plans built with the Design–Create–Reflect framework.
            Every lesson is classroom-tested and ready to customize with Co-Pilot.
          </p>
          <div className="cm-stats">
            <div className="cm-stat">
              <div className="cm-stat-n">{COMMUNITY_LESSONS.length}</div>
              <div className="cm-stat-l">Lessons shared</div>
            </div>
            <div className="cm-stat">
              <div className="cm-stat-n">{totalUses.toLocaleString()}</div>
              <div className="cm-stat-l">Times adapted</div>
            </div>
            <div className="cm-stat">
              <div className="cm-stat-n">{stateCount}</div>
              <div className="cm-stat-l">States represented</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="cm-body">
          <div className="cm-flt">
            {GRADE_FILTERS.map(f => (
              <button key={f.id} className={`cm-fb${grade === f.id ? " on" : ""}`}
                onClick={() => setGrade(f.id)}>
                {f.label}
              </button>
            ))}
            <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--t3)", alignSelf: "center" }}>
              {filtered.length} lesson{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="cm-grid">
            {filtered.map(lesson => (
              <div key={lesson.id} className="cm-card">
                <div className="cm-card-top">
                  <h3 className="cm-card-title">{lesson.title}</h3>
                  <span className="cm-ai-tag">{lesson.aiConcept}</span>
                </div>

                <div className="cm-grade-sub">
                  <span className="cm-meta-tag">{lesson.grade}</span>
                  <span className="cm-meta-tag">{lesson.subject}</span>
                  <span className="cm-meta-tag">{lesson.duration}</span>
                </div>

                <p className="cm-card-desc">{lesson.description}</p>

                <div className="cm-card-tags">
                  {lesson.tags.map(t => <span key={t} className="cm-tag">{t}</span>)}
                </div>

                <div className="cm-card-foot">
                  <div className="cm-teacher">
                    <TeacherAvatar name={lesson.teacher} />
                    <div className="cm-teacher-info">
                      <div className="cm-teacher-name">
                        {lesson.teacher}
                        {lesson.verified && (
                          <BadgeCheck style={{ width: 11, height: 11, display: "inline", marginLeft: 3, color: "var(--tl)", verticalAlign: "middle" }} />
                        )}
                      </div>
                      <div className="cm-teacher-school">{lesson.school} · {lesson.state}</div>
                    </div>
                  </div>
                  <div className="cm-card-right">
                    <span className="cm-uses">
                      <Star style={{ width: 9, height: 9, display: "inline", verticalAlign: "middle" }} /> {lesson.rating} · {lesson.uses} uses
                    </span>
                    <button
                      className={`cm-adapt${adapted === lesson.id ? " done" : ""}`}
                      onClick={() => handleAdapt(lesson)}
                      disabled={adapted === lesson.id}
                    >
                      {adapted === lesson.id ? "Opening…" : "Adapt →"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Share CTA */}
          <div className="cm-share-cta">
            <h2 className="cm-share-h">Share your lesson with the community</h2>
            <p className="cm-share-p">
              Every lesson you share helps another teacher bring AI literacy into their classroom.
              Build a lesson with Co-Pilot and share it in one click.
            </p>
            <div className="cm-share-btns">
              <Link href="/lesson/new" className="cm-share-btn pri">
                <Pencil style={{ width: 14, height: 14 }} /> Build a lesson
              </Link>
              <a
                href="mailto:?subject=Lesson+submission+for+Teacher+Co-Pilot+Community&body=Hi%2C+I'd+like+to+share+my+lesson+plan+with+the+Teacher+Co-Pilot+community."
                className="cm-share-btn"
              >
                Share via email
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
