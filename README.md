# Design–Create–Reflect Teacher Co-Pilot

A chat-based, memory-enabled instructional design assistant that helps K–12 teachers co-create AI literacy lessons.

**The innovation is not that AI can produce a lesson plan. The innovation is that the assistant supports the teacher's full instructional design process: planning, creating, revising, teaching, reflecting, and reusing knowledge over time.**

---

## What it does

Teachers move through the full instructional design loop:

```
Planning → Drafting → Revising → Adapting → Teaching → Reflecting → Reusing
```

The co-pilot supports all of these stages through:

- **Chat-first design** — describe your lesson and the co-pilot asks only what it needs to know
- **Knowledge Library** — upload your curriculum map, school AI policy, prior feedback, and standards; the co-pilot retrieves the right context automatically
- **Live Lesson Draft** — a structured Design–Create–Reflect lesson updates in real time as you chat
- **Teacher Moves** — practical facilitation suggestions with when/what/why
- **Draft Timeline** — visible history of every revision with rationale and teacher decisions
- **Lesson Design Space** — surfaces assumptions, AI role, ethical focus, and open decisions
- **Quality Checker** — second Claude pass reviewing readiness before classroom use
- **Reflection Memory** — save post-lesson insights; future lesson generation improves from what you learned
- **Export** — Markdown and clipboard export

---

## Quick Start

### 1. Prerequisites

- Node.js 18+
- An Anthropic API key ([get one here](https://console.anthropic.com/))
- (Optional for full RAG) PostgreSQL with pgvector extension

### 2. Install

```bash
git clone https://github.com/xd2164/teacher-copilot.git
cd teacher-copilot
npm install
```

### 3. Configure

Add your API key to `.env.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_DEMO_MODE=true
```

Set `NEXT_PUBLIC_DEMO_MODE=true` to run with demo data (no database needed).

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## App Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/lesson/new` | Start a new lesson (3-column workspace) |
| `/library` | View knowledge library |

---

## Interface Layout

```
┌─────────────────┬──────────────────────┬──────────────────────┐
│ Knowledge       │ Chat Co-Pilot        │ Lesson Draft         │
│ Library         │                      │                      │
│─────────────────│──────────────────────│──────────────────────│
│ Curriculum Map  │ Teacher message      │ Lesson / Moves /     │
│ Past Feedback   │ Assistant response   │ Timeline /           │
│ Standards       │ Teacher message      │ Design Space /       │
│ AI Policy       │ Assistant response   │ Quality              │
│                 │                      │                      │
│ + Add Resource  │ [Input box]          │ Export               │
└─────────────────┴──────────────────────┴──────────────────────┘
```

---

## Demo Flow

The app ships with a complete demo — Ms. Rivera's 6th grade science lesson on weather prediction and AI:

1. Open `/lesson/new`
2. Read the pre-loaded conversation
3. Explore all 5 right-panel tabs (Lesson, Teacher Moves, History, Design Space, Quality)
4. Click **Show commands** to see natural-language commands
5. Type a revision request like *"Make it more hands-on"* or *"Add multilingual learner supports"*
6. Click **Export Markdown** to download the lesson

---

## Natural Language Commands

```
Create a new lesson
Revise this lesson
Make this more hands-on
Add AI literacy connections
Add ethical discussion questions
Use my curriculum map
Create student-facing materials
Create a teacher guide
Create an exit ticket
Shorten to 30 minutes
Add support for multilingual learners
Compare draft versions
Save this reflection
Export the lesson
Run a quality check
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| AI | Claude Sonnet 4.6 (chat) + Haiku 4.5 (quality/reflection) |
| ORM | Prisma |
| Database | PostgreSQL + pgvector (production) / in-memory (demo) |
| Icons | Lucide React |
| Markdown | react-markdown + remark-gfm |

---

## Production Setup (with database)

1. Set up PostgreSQL with pgvector:
   ```sql
   CREATE EXTENSION vector;
   ```

2. Update `.env.local`:
   ```
   DATABASE_URL="postgresql://..."
   NEXT_PUBLIC_DEMO_MODE=false
   ```

3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. Build:
   ```bash
   npm run build
   npm start
   ```

---

## Design Principles

### Visible co-creation (inspired by Mina Lee's work)
Every revision shows what changed, why it changed, and what teacher decisions remain. The Draft Timeline makes the human-AI co-creation process visible.

### AI literacy across the curriculum
Every lesson includes a subject-area goal, an AI literacy goal, ethical reflection, teacher facilitation moves, and differentiation supports.

### Teacher agency always
The Teacher Moves panel provides facilitation guidance. The assistant never replaces teacher judgment — it surfaces teacher decision points and explains its own assumptions.

### Design Space lens
The Lesson Design Space view shows Task Stage, Teacher Expertise, AI Role, Knowledge Sources, Student Mode, Ethical Focus, Output Types, and open Teacher Decisions for every lesson.

---

## Product Positioning

> "Let's design, improve, and reflect on this lesson together."

Not: *"Tell me what lesson plan to write."*
