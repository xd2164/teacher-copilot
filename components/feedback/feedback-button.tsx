"use client"
import React, { useState } from "react"
import { MessageSquare, X, Send } from "lucide-react"
import { track } from "@/lib/analytics"

export function FeedbackButton() {
  const [open, setOpen]           = useState(false)
  const [rating, setRating]       = useState(0)
  const [comment, setComment]     = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending]     = useState(false)

  const canSubmit = rating > 0 || comment.trim().length > 0

  const handleSubmit = async () => {
    if (!canSubmit || sending) return
    setSending(true)
    const stars = rating > 0 ? `${"★".repeat(rating)}${"☆".repeat(5 - rating)}` : ""
    try {
      await fetch("https://formsubmit.co/ajax/xiaoxuedubamboo@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: "Teacher Co-Pilot Feedback",
          rating: stars || "not rated",
          comment: comment || "(none)",
          page: window.location.href,
        }),
      })
    } catch { /* fail silently */ }
    track("feedback_submitted", { rating, has_comment: comment.trim().length > 0 ? 1 : 0 })
    setSending(false)
    setSubmitted(true)
    setTimeout(() => { setOpen(false); setSubmitted(false); setRating(0); setComment("") }, 2500)
  }

  const close = () => { setOpen(false); setRating(0); setComment(""); setSubmitted(false) }

  return (
    <>
      <button className="ws-fb-btn" onClick={() => setOpen(true)} aria-label="Give feedback">
        <MessageSquare style={{ width: 13, height: 13 }} />
        Feedback
      </button>

      {open && (
        <div className="ws-modal-overlay" role="dialog" aria-modal="true"
          onClick={e => e.target === e.currentTarget && close()}>
          <div className="ws-modal">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div style={{ fontSize: 36, marginBottom: ".625rem" }}>🎉</div>
                <p className="ws-modal-title">Thank you!</p>
                <p className="ws-modal-sub">Your feedback helps improve Teacher Co-Pilot for every teacher.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.125rem" }}>
                  <div>
                    <p className="ws-modal-title">Share your feedback</p>
                    <p className="ws-modal-sub">Help us improve Teacher Co-Pilot</p>
                  </div>
                  <button className="ws-modal-x" onClick={close} aria-label="Close">
                    <X style={{ width: 15, height: 15 }} />
                  </button>
                </div>

                <label className="ws-modal-label">How useful is this tool?</label>
                <div className="ws-stars" role="group" aria-label="Star rating">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} className={`ws-star${n <= rating ? " on" : ""}`}
                      onClick={() => setRating(p => p === n ? 0 : n)}
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}>
                      {n <= rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>

                <label className="ws-modal-label" htmlFor="fb-comment">
                  What worked well or needs fixing?
                </label>
                <textarea id="fb-comment" className="ws-modal-ta"
                  placeholder="Tell us what you think…"
                  value={comment} onChange={e => setComment(e.target.value)} />

                <div className="ws-modal-actions">
                  <button className="ws-modal-cancel" onClick={close}>Cancel</button>
                  <button className="ws-modal-ok" onClick={handleSubmit} disabled={!canSubmit || sending}>
                    {sending ? "Sending…" : <><Send style={{ width: 12, height: 12 }} /> Send feedback</>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
