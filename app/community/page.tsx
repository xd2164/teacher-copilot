"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Pencil, BookOpen, Users, Plus, Send, Megaphone } from "lucide-react"
import { track } from "@/lib/analytics"

export default function CommunityPage() {
  const [name, setName]       = useState("")
  const [email, setEmail]     = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent]       = useState(false)

  const canSend = message.trim().length > 0

  const handleSend = () => {
    if (!canSend) return
    track("community_submission", { has_name: name.trim().length > 0 ? 1 : 0 })
    const subject = encodeURIComponent("Teacher Co-Pilot: Community Submission")
    const body = encodeURIComponent(
      `Name: ${name || "(not provided)"}\nEmail: ${email || "(not provided)"}\n\n${message}`
    )
    window.location.href = `mailto:xiaoxuedubamboo@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => { setSent(false); setName(""); setEmail(""); setMessage("") }, 4000)
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
          <Link href="/lesson/new" className="ws-btn cta"><Plus /> New lesson</Link>
        </div>
      </nav>

      <div className="cm-page">
        <div className="cm-hero">
          <p className="cm-hero-eye">Community</p>
          <h1 className="cm-hero-h">Share, connect, and grow together</h1>
          <p className="cm-hero-sub">
            Built a great AI literacy lesson? Have an announcement or feedback for the community?
            This is the place to share it.
          </p>
        </div>

        <div className="cm-body" style={{ maxWidth: 720 }}>

          {/* Share a lesson */}
          <div className="cm-share-cta" style={{ marginBottom: "1.5rem" }}>
            <h2 className="cm-share-h">Share your lesson</h2>
            <p className="cm-share-p">
              Build a lesson with Co-Pilot and share it — your classroom-tested work
              helps every teacher using this tool.
            </p>
            <div className="cm-share-btns">
              <Link href="/lesson/new" className="cm-share-btn pri">
                <Pencil style={{ width: 14, height: 14 }} /> Build a lesson
              </Link>
              <a
                href={`mailto:xiaoxuedubamboo@gmail.com?subject=${encodeURIComponent("Lesson share: Teacher Co-Pilot")}&body=${encodeURIComponent("Hi,\n\nI'd like to share this lesson with the Teacher Co-Pilot community:\n\n[Paste your lesson here or attach a file]\n\nGrade: \nSubject: \nAI concept covered: ")}`}
                className="cm-share-btn"
              >
                <Send style={{ width: 14, height: 14 }} /> Email a lesson
              </a>
            </div>
          </div>

          {/* Announcements / feedback form */}
          <div className="cm-announce-card">
            <div className="cm-announce-head">
              <Megaphone style={{ width: 16, height: 16 }} />
              Submit an announcement or feedback
            </div>
            <p className="cm-announce-sub">
              Curriculum news, event announcements, questions, or general feedback — send it here.
            </p>

            {sent ? (
              <div className="cm-announce-thanks">
                Your email client should have opened. Thanks for reaching out!
              </div>
            ) : (
              <div className="cm-announce-form">
                <div className="cm-form-row">
                  <input
                    className="cm-form-input"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <input
                    className="cm-form-input"
                    placeholder="Your email (optional)"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <textarea
                  className="cm-form-ta"
                  placeholder="Your announcement or feedback…"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="cm-form-send" onClick={handleSend} disabled={!canSend}>
                    <Send style={{ width: 13, height: 13 }} /> Send
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="cm-cite" style={{ marginTop: "2rem" }}>
            Lyublinskaya, I., &amp; Du, X. (2025). <em>Teaching AI literacy across the curriculum: A K–12 handbook.</em> Corwin.
          </p>
        </div>
      </div>
    </>
  )
}
