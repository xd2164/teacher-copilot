import { LessonDraft, ConversationStage } from "./types"
import { DEMO_LESSON } from "./demo-data"

interface DemoResponse {
  message: string
  stage: ConversationStage
  retrievalSummary?: string[]
  updatedDraft?: LessonDraft
}

export function getDemoResponse(userInput: string, currentDraft: LessonDraft): DemoResponse {
  const input = userInput.toLowerCase()

  // Revision: more hands-on
  if (input.includes("hands-on") || input.includes("hands on") || input.includes("interactive") || input.includes("activity")) {
    return {
      stage: "revise",
      message: `I revised the lesson to make it more hands-on in two ways:

**What changed:**
1. Expanded the card sort so students physically arrange 12 weather data cards rather than reading from a table — adds a tactile sorting step before they write their forecast rule.
2. Added a peer-testing round where groups swap their rules and test them against two mystery data cards.

**Why:** Physical manipulation of data cards reduces reading load and makes the pattern-finding concrete. The peer-testing step adds a productive failure moment — most rules break on at least one mystery card, which is exactly the misconception to surface.

**Tradeoff:** The card sort adds about 5 minutes of setup and requires printing. I've updated the materials list. You may want to laminate the card sets for reuse.

**Teacher decision needed:** How would you like to group students — pairs, groups of 3, or groups of 4? This affects how many card sets to print.`,
      retrievalSummary: [
        "Curriculum map: kinesthetic learning noted in grade 6 science approach",
        "Prior feedback: students more engaged in hands-on sorting activities",
      ],
      updatedDraft: {
        ...currentDraft,
        versionNumber: currentDraft.versionNumber + 1,
        changeRationale: "Revised to add physical card sort and peer-testing round for more hands-on learning.",
        createPhase: {
          ...currentDraft.createPhase,
          activityOverview: "Weather Data Card Sort + Peer Test: Students physically sort 12 weather data cards, write a forecast rule, then swap with another group to test their rule against mystery cards.",
          studentSteps: [
            "Receive a set of 12 weather data cards (temperature, humidity, wind, cloud cover)",
            "Sort the cards to find patterns that predict rain vs. no rain",
            "Write your group's forecast rule as an if-then statement on the recording sheet",
            "Swap your rule card with another group — test their rule against your mystery data cards",
            "Discuss: Which rules held up? Which broke? Why?",
          ],
        },
      },
    }
  }

  // Multilingual learner support
  if (input.includes("multilingual") || input.includes("ell") || input.includes("english learner") || input.includes("language")) {
    return {
      stage: "revise",
      message: `I added multilingual learner supports throughout the lesson.

**What changed:**
1. **Sentence frames** added for every major speaking/writing moment:
   - *"I notice a pattern that..."*
   - *"My forecast rule is: If ___, then ___."*
   - *"This could be wrong if..."*
   - *"This is similar to AI because..."*
2. **Vocabulary pre-teaching** list added (5 terms): forecast, prediction, evidence, pattern, uncertainty — with visual icons recommended.
3. **Bilingual pair option** added to the Create Phase: students can discuss in their home language during the card sort before sharing in English.
4. **Simplified card labels** recommended — add visual weather icons alongside numbers.

**Why:** Your prior reflection didn't flag language as an issue, but the ethical discussion involves abstract concepts like *uncertainty* and *equity* that benefit from explicit language scaffolding for all learners.

**Tradeoff:** Pre-teaching vocabulary adds 3–4 minutes at the start. Consider whether this replaces the opening hook or precedes it.

**Teacher decision needed:** Do you want the sentence frames printed on the recording sheet, or posted as a visible anchor chart?`,
      updatedDraft: {
        ...currentDraft,
        versionNumber: currentDraft.versionNumber + 1,
        changeRationale: "Added sentence frames, vocabulary scaffolding, and bilingual discussion option for multilingual learners.",
        differentiation: {
          ...currentDraft.differentiation,
          multilingualLearners: [
            "Sentence frame for sorting: 'I notice a pattern that...'",
            "Sentence frame for forecast rule: 'If ___, then ___.'",
            "Sentence frame for uncertainty: 'This could be wrong if...'",
            "Pre-teach: forecast, prediction, evidence, pattern, uncertainty — with visual icons",
            "Allow bilingual pair discussion before English whole-group share",
            "Provide weather data cards with visual icons alongside numbers",
          ],
        },
      },
    }
  }

  // Ethical discussion
  if (input.includes("ethical") || input.includes("ethics") || input.includes("equity") || input.includes("bias") || input.includes("fair")) {
    return {
      stage: "revise",
      message: `I strengthened the ethical discussion into a dedicated closing sequence.

**What changed:**
Added a structured 5-minute ethical closing after the card sort debrief:

**Discussion sequence:**
1. *"We just made forecast rules from data. What data did we use?"*
2. *"What neighborhoods in our city might have fewer weather sensors than others?"*
3. *"What could happen if an AI weather app had less data from those neighborhoods?"*
4. *"Who gets a worse forecast? Does that matter?"*
5. Exit prompt: *"Name one question you'd ask before trusting an AI weather forecast."*

**Why:** The original lesson had the ethical reflection embedded in the exit ticket, which can get skipped under time pressure. Making it a named sequence signals to students that this matters — it's not an add-on.

**Tradeoff:** This adds 5 minutes. You may need to trim the card sort debrief slightly, or extend the lesson to 50 minutes.

**Teacher decision needed:** Do you want to show a real neighborhood weather sensor map during this discussion? It makes the equity point more concrete, but requires tech access.`,
      updatedDraft: {
        ...currentDraft,
        versionNumber: currentDraft.versionNumber + 1,
        changeRationale: "Strengthened ethical discussion into structured 5-step closing sequence.",
        reflectPhase: {
          ...currentDraft.reflectPhase,
          discussionPrompts: [
            "We just made forecast rules from data. What data did we use?",
            "What neighborhoods might have fewer weather sensors than others?",
            "What could happen if an AI weather app had less data from those neighborhoods?",
            "Who gets a worse forecast? Does that matter?",
            "What question would you ask before trusting an AI weather app?",
          ],
          ethicalReflection: "Structured 5-step equity discussion: connecting data gaps in our card sort to real-world AI weather systems and who gets worse forecasts.",
        },
      },
    }
  }

  // AI literacy connections
  if (input.includes("ai literacy") || input.includes("ai connection") || input.includes("artificial intelligence")) {
    return {
      stage: "revise",
      message: `I strengthened the AI literacy connections across all three phases.

**What changed:**

**Design Phase** — Added an opening provocation: *"Show students a weather app forecast and ask: how does this app 'know' what tomorrow will be like? Is it guessing?"* This activates prior knowledge about AI before the card sort.

**Create Phase** — Added an explicit AI analogy during the debrief: after students share their forecast rules, teacher asks: *"You just did what a machine learning model does. What do you think happens when the model sees data it's never seen before?"*

**Reflect Phase** — Added a concept check: students label their forecast rule as **training data → model → prediction** using those exact terms, then explain what "uncertainty" means in their rule.

**Why:** The original lesson connected to AI through discussion only. Making the analogy structural — running through all three phases — helps students build a mental model rather than just hearing about it.

**Teacher decision needed:** Do you want students to know upfront that they're simulating AI training, or discover it through the debrief? The discovery approach is more engaging but requires tighter timing.`,
      updatedDraft: {
        ...currentDraft,
        versionNumber: currentDraft.versionNumber + 1,
        changeRationale: "Strengthened AI literacy connections across all three phases with structural analogies.",
        aiLiteracyGoals: [
          "Understand that AI systems use data patterns to make predictions (pattern recognition = training)",
          "Recognize that predictions can be uncertain or wrong — and explain why",
          "Use the terms: training data, model, prediction, uncertainty",
          "Discuss what happens when training data is incomplete or unequally distributed",
        ],
      },
    }
  }

  // Shorten lesson
  if (input.includes("shorten") || input.includes("30 min") || input.includes("shorter") || input.includes("less time")) {
    return {
      stage: "revise",
      message: `I shortened the lesson to 30 minutes by trimming two sections.

**What changed:**
1. Reduced the card sort from 12 cards to 6 cards per group — enough to find a pattern but much faster.
2. Replaced the peer-testing round with a single whole-class debrief question.
3. Condensed the ethical discussion to 1 question (exit ticket only): *"What question would you ask before trusting an AI forecast?"*

**Why:** The core learning — pattern recognition as an analog to AI training — survives in 30 minutes. The peer-testing and extended ethical discussion are the highest-value additions, so I'd recommend restoring the lesson to 45 minutes if you can.

**Tradeoff:** The ethical discussion loses depth. Students get the concept but not the equity discussion about unequal data access. If this lesson is part of a unit, consider returning to that question in a future class.

**Teacher decision needed:** Which matters more for this class — the peer-testing step (stronger science reasoning) or the extended ethical discussion (stronger AI literacy)? I can preserve one if you need to cut one.`,
      updatedDraft: {
        ...currentDraft,
        versionNumber: currentDraft.versionNumber + 1,
        duration: "30 minutes",
        changeRationale: "Shortened to 30 minutes by reducing card set and condensing ethical discussion to one exit prompt.",
      },
    }
  }

  // Export / download
  if (input.includes("export") || input.includes("download") || input.includes("pdf") || input.includes("markdown")) {
    return {
      stage: "understand",
      message: `To export this lesson, use the **Export Markdown** button at the bottom of the Lesson Draft panel on the right.

This downloads a complete Markdown file with:
- All three DCR phases
- Teacher moves
- Student steps
- Discussion prompts
- Exit ticket
- Differentiation supports
- Rationale and teacher decision points
- Sources used

You can also click **Copy to Clipboard** to paste directly into Google Docs, Notion, or any writing tool.

**Teacher decision needed:** Would you like me to generate a student-facing version of the activity (without teacher notes), or a slide outline for the lesson?`,
    }
  }

  // Student worksheet or materials
  if (input.includes("student") || input.includes("worksheet") || input.includes("materials") || input.includes("handout")) {
    return {
      stage: "generate",
      message: `Here's a student-facing recording sheet for the Weather Data Card Sort:

---

**Name: ___________________  Date: _____________  Group: _______________**

## Weather Data Card Sort

**Step 1: Sort your cards**
Arrange your 12 weather data cards. Look for patterns that predict: **Rain** or **No Rain**.

**Step 2: Write your forecast rule**
> If _____________________________, then the forecast is ________________.
> Evidence: _____________________________________________________________

**Step 3: Test your rule**
Use the mystery cards. Does your rule work? Circle one: **Yes / No / Partially**

If it didn't work perfectly: What would you change? ____________________________

---

**Reflection**
1. What pattern helped you the most? ______________________________________

2. Finish this sentence: *"My forecast could be wrong if..."*
   ___________________________________________________________________

3. How is making a forecast rule similar to how AI learns from data?
   ___________________________________________________________________

**Exit Ticket:** Name one question you'd ask before trusting an AI weather forecast.
   ___________________________________________________________________

---

Would you like me to also create a **teacher facilitation guide** for this lesson?`,
    }
  }

  // Reflection
  if (input.includes("reflection") || input.includes("reflect") || input.includes("after teaching") || input.includes("taught")) {
    return {
      stage: "reflect",
      message: `I'd love to help you capture a reflection. Tell me:

1. **What worked well** in the lesson?
2. **What confused students** or didn't land?
3. **Any equity or access issues** you noticed?
4. **What would you change** next time?

You can write it conversationally — I'll summarize it into reusable insights and suggest what to save for future lesson planning.

For example: *"Students liked the card sort but the ethical discussion felt rushed. Two students without strong English were quiet during the debrief."*`,
    }
  }

  // Quality check
  if (input.includes("quality") || input.includes("ready") || input.includes("check")) {
    return {
      stage: "understand",
      message: `I've run a quality check on this lesson. See the **Quality** tab in the Lesson Draft panel →

**Summary:**
- **Readiness: Ready** ✓
- 5 strengths identified (age-appropriate, strong AI connection, ethical reflection included)
- 1 required action: create the mystery data cards before class
- 2 teacher decisions flagged

The quality review is an AI assessment — the final classroom readiness decision is yours. The Teacher Decisions section in the Quality tab shows specifically what to verify before teaching.`,
    }
  }

  // New lesson
  if (input.includes("new lesson") || input.includes("different lesson") || input.includes("another lesson")) {
    return {
      stage: "understand",
      message: `I can help you design a new lesson. Tell me:

1. **What topic** are you planning?
2. **What grade level** and **subject**?

Once I know those, I'll ask just a couple more things (duration, device access) and pull relevant context from your uploaded curriculum map and past feedback.

*Example: "I need a 7th grade math lesson on statistics and bias in data."*`,
    }
  }

  // Teacher guide
  if (input.includes("teacher guide") || input.includes("facilitation guide") || input.includes("guide for me")) {
    return {
      stage: "generate",
      message: `Here's a teacher facilitation guide for **Can Data Predict Tomorrow's Weather?**

---

## Teacher Facilitation Guide

**Before class:**
- [ ] Print card sets (1 per group of 3–4, 12 cards each)
- [ ] Print recording sheets (1 per student)
- [ ] Prepare 2 mystery data cards per group (keep face-down until Step 4)
- [ ] Review the forecast rule examples so you can guide stuck groups

**Timing:**
| Phase | Time | What you're doing |
|-------|------|-------------------|
| Opening + vocabulary | 5 min | Pre-teach: forecast, prediction, evidence, uncertainty |
| Card sort (Design + Create) | 20 min | Circulate, ask guiding questions |
| Group share-out | 8 min | 2–3 groups share rules; class finds edge cases |
| Ethical discussion | 7 min | 3 structured questions |
| Exit ticket | 5 min | Individual written response |

**Key teacher moves during the card sort:**
- "Which cards feel most important? Why?"
- "What would make your forecast rule wrong?"
- "What evidence do you have for that?"

**Common misconceptions to watch for:**
- Students may think a perfect rule = a certainty (not a probability)
- Students may ignore cards that contradict their rule (cherry-picking)

**If a group finishes early:** Ask them to write a second rule using different evidence, then compare the two rules.

**Teacher decision:** Decide before class whether the ethical discussion is embedded in the debrief or a standalone closing.`,
    }
  }

  // Default / unknown
  return {
    stage: "understand",
    message: `Got it. To help you with that, I may need a bit more context.

This is a **demo version** of the Design–Create–Reflect Co-Pilot. The full version connects to Claude AI and can respond to any lesson design request with retrieved context from your uploaded materials.

In this demo, try any of these commands:
- *"Make this more hands-on"*
- *"Add support for multilingual learners"*
- *"Add ethical discussion questions"*
- *"Shorten to 30 minutes"*
- *"Strengthen AI literacy connections"*
- *"Create a student worksheet"*
- *"Create a teacher guide"*
- *"Export this lesson"*
- *"Save a reflection"*

Or explore the **5 tabs** in the Lesson Draft panel on the right →`,
  }
}
