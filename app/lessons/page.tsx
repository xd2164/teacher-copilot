"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Pencil, BookOpen, Plus, Home, ArrowRight } from "lucide-react"

const LESSONS = [
  {
    grade: "Grade 6", subject: "Science",
    title: "Can Data Predict Tomorrow's Weather?",
    focus: "Data, prediction, uncertainty",
    design: "Students understand that data can support predictions, but predictions can still be uncertain and depend on the quality of training data.",
    create: "Students compare two weather forecasts and identify why they may differ — then connect this to how AI models can reach different conclusions from similar data.",
    reflect: "What evidence helped students explain uncertainty? Did students distinguish between 'prediction' and 'fact'?",
  },
  {
    grade: "Grade 8", subject: "Social Studies",
    title: "Bias in Facial Recognition",
    focus: "Bias, fairness, civic impact",
    design: "Students explore how AI systems can affect people differently depending on who the data represents — and why accuracy rates can vary across groups.",
    create: "Students analyze a classroom-friendly case study about facial recognition and fairness, then discuss the difference between technical accuracy and social impact.",
    reflect: "How did students distinguish technical accuracy from social impact? What questions did students raise about accountability?",
  },
  {
    grade: "Grade 7", subject: "Math",
    title: "Recommendation Systems",
    focus: "Ranking, algorithms, data patterns",
    design: "Students understand that recommendation systems use data patterns to rank options — and that the patterns in the data shape which options get recommended.",
    create: "Students build a simple paper-based recommendation algorithm, then test it to see what gets recommended and what gets left out.",
    reflect: "Where did students notice bias or missing information in the ranking? What would make the algorithm more fair?",
  },
]

export default function LessonsPage() {
  const [filter, setFilter] = useState("all")

  const filtered = LESSONS.filter(l => {
    if (filter === "all") return true
    return l.subject.toLowerCase() === filter
  })

  return (
    <div className="sl-page">
      <nav className="ws-nav" aria-label="Main navigation">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/" className="ws-logo">
            <div className="ws-logo-mark"><Pencil /></div>
            <span className="ws-logo-text">Teacher Co-Pilot</span>
          </Link>
        </div>
        <div className="ws-nav-links">
          <Link href="/" className="ws-btn"><Home /> Home</Link>
          <Link href="/library" className="ws-btn"><BookOpen /> Library</Link>
          <Link href="/lesson/new" className="ws-btn cta"><Plus /> New lesson</Link>
        </div>
      </nav>

      <div className="sl-hero">
        <p className="sl-hero-eye">Classroom-ready lessons</p>
        <h1 className="sl-hero-h">Sample AI Literacy Lessons</h1>
        <p className="sl-hero-sub">Classroom-tested lessons across K–12 subjects, each following the Design → Create → Reflect framework.</p>
      </div>

      <div className="sl-body">
        <div className="sl-fltrs" role="group" aria-label="Filter by subject">
          {[
            { id: "all",           label: "All subjects"  },
            { id: "science",       label: "Science"       },
            { id: "social studies",label: "Social Studies"},
            { id: "math",          label: "Math"          },
          ].map(f => (
            <button
              key={f.id}
              className={`sl-fb${filter === f.id ? " on" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="sl-grid">
          {filtered.map(({ grade, subject, title, focus, design, create, reflect }) => (
            <div key={title} className="sl-card">
              <div className="sl-card-head">
                <p className="sl-card-grade">{grade} · {subject} · {focus}</p>
                <p className="sl-card-title">{title}</p>
              </div>
              <div className="sl-card-body">
                <div className="sl-phase">
                  <span className="sl-phase-label design">Design goal</span>
                  <p>{design}</p>
                </div>
                <div className="sl-phase">
                  <span className="sl-phase-label create">Create activity</span>
                  <p>{create}</p>
                </div>
                <div className="sl-phase">
                  <span className="sl-phase-label reflect">Reflect prompt</span>
                  <p>{reflect}</p>
                </div>
              </div>
              <div className="sl-card-foot">
                <Link href="/lesson/new" className="sl-open-btn">
                  Open lesson <ArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
