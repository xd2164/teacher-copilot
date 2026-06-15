import Link from "next/link"
import { Pencil, Sparkles, ArrowRight, Plus, BookOpen, UserX, Download, X, Check } from "lucide-react"

export default function HomePage() {
  return (
    <>
      {/* ── Nav ── */}
      <nav className="lp-nav" aria-label="Main navigation">
        <Link href="/" className="lp-nav-logo">
          <div className="lp-logo-mark" aria-hidden="true">
            <Pencil className="w-4 h-4 text-white" />
          </div>
          Teacher Co-Pilot
        </Link>
        <div className="lp-nav-links">
          <Link href="/library" className="lp-nav-link lp-nav-ghost">Library</Link>
          <Link href="/lesson/new" className="lp-nav-link primary">
            Start planning <ArrowRight className="w-[14px] h-[14px]" aria-hidden="true" />
          </Link>
        </div>
      </nav>

      <main>
        {/* ── Hero ── */}
        <section className="lp-hero" aria-labelledby="hero-heading">
          <div className="lp-hero-pill" aria-hidden="true">
            <Sparkles aria-hidden="true" />
            Built for K–12 educators
          </div>
          <h1 className="lp-h1" id="hero-heading">
            Design, teach, and refine <em>AI literacy lessons</em> — across every subject
          </h1>
          <p className="lp-hero-p">
            A memory-enabled planning partner that remembers what worked in your classroom and builds on it every time.
          </p>
          <div className="lp-hero-actions">
            <Link href="/lesson/new" className="lp-btn primary">
              <Plus className="w-[14px] h-[14px]" aria-hidden="true" /> Start a new lesson
            </Link>
            <Link href="/library" className="lp-btn ghost">
              View lesson library
            </Link>
          </div>
          <div className="lp-chips" aria-label="Key features">
            <span className="lp-chip">
              <BookOpen aria-hidden="true" /> Works with any K–12 subject
            </span>
            <span className="lp-chip">
              <UserX aria-hidden="true" /> No student AI accounts needed
            </span>
            <span className="lp-chip">
              <Download aria-hidden="true" /> Export to Markdown in one click
            </span>
          </div>
        </section>

        <hr className="lp-divider" />

        {/* ── Design / Create / Reflect ── */}
        <section className="lp-section" aria-labelledby="phases-heading">
          <p className="lp-eyebrow" aria-hidden="true">How it works</p>
          <h2 className="lp-section-title" id="phases-heading">A workflow built around how you actually teach</h2>
          <p className="lp-section-sub">Not a one-shot generator — a three-phase partner for the full instructional cycle.</p>
          <div className="lp-phase-grid">
            <div className="lp-phase-card">
              <div className="lp-phase-accent" aria-hidden="true" />
              <span className="lp-phase-num">Phase 1</span>
              <h3>Design</h3>
              <p>Frame learning goals, surface student questions, connect to standards, and plan the full lesson flow before writing a single activity.</p>
            </div>
            <div className="lp-phase-card">
              <div className="lp-phase-accent" aria-hidden="true" />
              <span className="lp-phase-num">Phase 2</span>
              <h3>Create</h3>
              <p>Build activities, student steps, teacher moves, and discussion prompts — then revise through natural conversation until it&apos;s classroom-ready.</p>
            </div>
            <div className="lp-phase-card">
              <div className="lp-phase-accent" aria-hidden="true" />
              <span className="lp-phase-num">Phase 3</span>
              <h3>Reflect</h3>
              <p>Save post-lesson insights as reusable memory. Future lessons automatically improve from what you learn about your students.</p>
            </div>
          </div>
        </section>

        <hr className="lp-divider" />

        {/* ── Compare ── */}
        <section className="lp-section" aria-labelledby="compare-heading">
          <p className="lp-eyebrow" aria-hidden="true">What makes this different</p>
          <h2 className="lp-section-title" id="compare-heading">A planning partner, not a plan printer</h2>
          <p className="lp-section-sub">The difference shows up in every interaction.</p>
          <div className="lp-compare-grid">
            <div className="lp-compare-card bad">
              <h4>Other AI tools</h4>
              <ul>
                {[
                  "One-shot output, no revision",
                  "No memory of what worked",
                  "Ignores your curriculum context",
                  "Generic, not subject-aligned",
                ].map(item => (
                  <li key={item}><X aria-hidden="true" /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="lp-compare-card good">
              <h4>Teacher Co-Pilot</h4>
              <ul>
                {[
                  "Revise through natural conversation",
                  "Saves teaching insights as memory",
                  "Uses your curriculum and standards",
                  "AI literacy embedded in every subject",
                ].map(item => (
                  <li key={item}><Check aria-hidden="true" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <hr className="lp-divider" />

        {/* ── Steps ── */}
        <section className="lp-section" aria-labelledby="steps-heading">
          <p className="lp-eyebrow" aria-hidden="true">Get started</p>
          <h2 className="lp-section-title" id="steps-heading">From rough idea to classroom-ready lesson</h2>
          <p className="lp-section-sub">Three steps in a single conversation.</p>
          <ol className="lp-steps">
            <li className="lp-step">
              <div className="lp-step-num" aria-hidden="true">1</div>
              <div>
                <h3>Upload your curriculum or standards</h3>
                <p>Bring in unit goals, academic standards, school AI policy, or past lesson feedback. The co-pilot retrieves the right context automatically.</p>
              </div>
            </li>
            <li className="lp-step">
              <div className="lp-step-num" aria-hidden="true">2</div>
              <div>
                <h3>Tell the co-pilot what you&apos;re planning</h3>
                <p>Describe the grade level, topic, lesson goal, and student needs. The co-pilot asks only what it needs and generates a first draft.</p>
              </div>
            </li>
            <li className="lp-step">
              <div className="lp-step-num" aria-hidden="true">3</div>
              <div>
                <h3>Revise, teach, and reflect</h3>
                <p>Improve the lesson through conversation, export when ready, and save post-lesson insights as memory for next time.</p>
              </div>
            </li>
          </ol>
        </section>

        {/* ── CTA ── */}
        <div className="lp-cta-wrap">
          <div className="lp-cta-block">
            <h2>Ready to design your next AI literacy lesson?</h2>
            <p>
              Start with a standard, a classroom question, or a rough idea.<br />
              The co-pilot turns it into something thoughtful and age-appropriate.
            </p>
            <Link href="/lesson/new" className="lp-btn primary">
              <Pencil className="w-[14px] h-[14px]" aria-hidden="true" /> Start planning
            </Link>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <div className="lp-footer-row">
          <span>Teacher Co-Pilot · Design · Create · Reflect</span>
          <span>Built for K–12 educators</span>
        </div>
        <p className="lp-footer-cite">
          Lyublinskaya, I., &amp; Du, X. (2025). <em>Teaching AI literacy across the curriculum: A K–12 handbook.</em> Corwin.
        </p>
      </footer>
    </>
  )
}
