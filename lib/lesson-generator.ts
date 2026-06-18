import { LessonDraft } from "./types"

export interface LessonIntake {
  gradeLevel: string   // e.g. "Grade 6"
  subject: string      // e.g. "Science"
  topic: string        // e.g. "Data and prediction"
  duration: string     // e.g. "45 minutes"
  aiConcept: string    // "patterns" | "decisions" | "fairness" | "creativity" | "society"
  standards?: string
  priorFeedback?: string
}

function getBigAiIdea(subject: string, aiConcept: string): string {
  const key = `${subject}+${aiConcept}`
  const map: Record<string, string> = {
    "Science+patterns":
      "AI systems learn from patterns in data — just like scientists use observations to build models and make predictions.",
    "Science+fairness":
      "AI systems trained on incomplete or unrepresentative data can make unfair predictions — even in science and medicine.",
    "Math+patterns":
      "AI systems use mathematical patterns and optimization to recognize, predict, and classify — connecting algebra, statistics, and logic.",
    "Math+decisions":
      "AI systems make decisions by optimizing mathematical objectives — the same way we solve for unknowns in equations.",
    "English/ELA+creativity":
      "AI systems generate language by learning patterns from millions of texts — raising questions about authorship, voice, and what writing means.",
    "English/ELA+fairness":
      "AI systems trained on historical texts inherit historical biases — which shapes whose voices get amplified and whose get erased.",
    "History/Social Studies+society":
      "AI systems reflect the values of the societies that build them — understanding that history helps us ask better questions about today's technology.",
    "History/Social Studies+fairness":
      "AI systems can reinforce historical inequalities when trained on biased data — making historical thinking essential for AI literacy.",
    "Art+creativity":
      "AI systems can generate images, music, and text by learning patterns — raising deep questions about creativity, originality, and what makes art human.",
    "Computer Science+decisions":
      "AI systems make decisions through algorithms trained on data — understanding those algorithms is the foundation of responsible computing.",
    "Health/PE+society":
      "AI systems are increasingly used in health, fitness, and sport — raising important questions about privacy, equity, and what data means about our bodies.",
  }
  return (
    map[key] ||
    "AI systems learn patterns from data to make predictions and decisions — a skill that connects to every subject and every career."
  )
}

function getAiLiteracyGoals(subject: string, aiConcept: string): string[] {
  const goals: Record<string, string[]> = {
    patterns: [
      "Understand that AI systems identify and learn from patterns in large datasets",
      "Recognize that the quality of patterns in data affects the reliability of AI predictions",
      "Explain how pattern recognition in AI is similar to and different from human pattern recognition",
    ],
    decisions: [
      "Understand that AI systems make decisions by optimizing for goals defined by their designers",
      "Recognize that AI decision-making reflects the values and assumptions built into the system",
      "Evaluate when AI decision-making is appropriate and when human judgment is essential",
    ],
    fairness: [
      "Understand that AI systems can produce unfair outcomes when trained on biased or unrepresentative data",
      "Identify groups that may be harmed by biased AI systems in real-world contexts",
      "Discuss what fairness means in an AI system and why it is difficult to achieve",
    ],
    creativity: [
      "Understand that AI systems generate creative outputs by learning patterns from human-created works",
      "Raise questions about authorship, originality, and ownership when AI is used to create",
      "Discuss what creativity means for humans and what it means — or doesn't mean — for AI systems",
    ],
    society: [
      "Understand that AI systems are designed by people and reflect societal values and power structures",
      "Identify real-world examples of AI shaping social outcomes in their subject area",
      "Discuss who benefits and who may be harmed when AI is deployed in society",
    ],
  }
  return (
    goals[aiConcept] || [
      "Understand how AI systems use data to make predictions and decisions",
      "Recognize that AI systems have limitations and can produce errors or biased results",
      "Discuss the social and ethical implications of AI in everyday life",
    ]
  )
}

function getAiConceptVerb(aiConcept: string): string {
  const verbs: Record<string, string> = {
    patterns: "learn patterns from data",
    decisions: "make decisions",
    fairness: "can produce fair or unfair outcomes",
    creativity: "generate creative work",
    society: "shape and are shaped by society",
  }
  return verbs[aiConcept] || "learn and make predictions"
}

function getActivityVerb(subject: string): string {
  const verbs: Record<string, string> = {
    Science: "explore",
    Math: "analyze",
    "English/ELA": "discuss",
    "History/Social Studies": "analyze",
    Art: "create",
    "Computer Science": "build",
    "Health/PE": "investigate",
    Other: "explore",
  }
  return verbs[subject] || "explore"
}

function getStudentSteps(subject: string, topic: string, aiConcept: string): string[] {
  const verb = getActivityVerb(subject)
  return [
    `Individually, ${verb} the ${topic} scenario and write down what patterns or decisions you notice`,
    `In small groups, share your observations and create a collaborative explanation of how the process works`,
    `Compare your group's explanation to how an AI system approaches the same challenge — what is similar? What is different?`,
    `Identify at least one way your approach could be wrong or incomplete — then discuss what that means for an AI system`,
    `As a class, discuss: who should be responsible for making sure AI systems handle ${topic} fairly and accurately?`,
  ]
}

function getTeacherMoves(topic: string, aiConcept: string): string[] {
  return [
    `Circulate and ask: "What evidence are you using to support your explanation?"`,
    `When groups get stuck: "What would you need to know to be more confident about this?"`,
    `Before the connection step: "In what ways does your process look like how an AI system might approach this?"`,
    `Connection question: "What could go wrong if an AI system tried to do what you just did — and what data might it be missing?"`,
  ]
}

function getMaterials(subject: string, topic: string): string[] {
  const base = [
    `${topic} activity sheets (1 per student)`,
    "Large paper or whiteboard for group work",
    "Markers",
    "Recording sheet for observations and conclusions",
  ]
  if (subject === "Science") base.push("Data cards or sample datasets related to the topic")
  if (subject === "Math") base.push("Graph paper or graphing tools")
  if (subject === "English/ELA") base.push("Sample text excerpts for analysis")
  if (subject === "Art") base.push("Example artworks for comparison and analysis")
  if (subject === "Computer Science") base.push("Pseudocode or flowchart template")
  return base
}

function getDiscussionPrompts(topic: string, aiConcept: string, subject: string): string[] {
  const prompts = [
    `What patterns or rules did you find while working with ${topic}? How confident are you in them?`,
    `Where could your reasoning break down — and what does that tell us about AI systems that try to do the same thing?`,
    `How is the way you approached ${topic} similar to how an AI system would approach it? How is it different?`,
    `Who might be left out or harmed if an AI system trained on limited or biased data made decisions about ${topic}?`,
  ]
  return prompts
}

function getExitTicket(topic: string, aiConcept: string): string {
  return `Name one way AI systems connect to ${topic}. Name one reason an AI system might get it wrong. Write one question you still have about how AI handles ${topic}.`
}

function getSuccessCriteria(topic: string, aiConcept: string): string[] {
  return [
    `Can explain a connection between ${topic} and how AI systems work`,
    `Can identify at least one limitation or risk in an AI system applied to ${topic}`,
    `Engages with the ethical question about fairness and data`,
    `Uses evidence to support their reasoning`,
  ]
}

function getRubric(aiConcept: string): Array<{ criterion: string; levels: string[] }> {
  return [
    {
      criterion: "Subject understanding",
      levels: [
        "No understanding demonstrated",
        "Basic understanding with limited explanation",
        "Clear understanding with evidence",
        "Deep understanding with multiple examples and nuance",
      ],
    },
    {
      criterion: "AI literacy connection",
      levels: [
        "No connection made",
        "Surface connection identified",
        "Connection explained with reasoning",
        "Connection explained with examples, limitations, and implications",
      ],
    },
    {
      criterion: "Ethical thinking",
      levels: [
        "Not engaged with ethical dimension",
        "Identifies an ethical issue",
        "Explains impact of the issue",
        "Connects to real equity implications with examples",
      ],
    },
  ]
}

function getDifferentiation(topic: string): {
  multilingualLearners: string[]
  studentsNeedingSupport: string[]
  extension: string[]
} {
  return {
    multilingualLearners: [
      `Provide sentence frames: "I notice that… / The AI system would… / This could be wrong if…"`,
      "Pre-teach key vocabulary before the activity",
      "Allow bilingual pair discussions before whole-group sharing",
      "Provide visual supports and icons alongside text-heavy materials",
    ],
    studentsNeedingSupport: [
      "Reduce the number of examples or data points to work with",
      "Provide a partially completed recording sheet as a scaffold",
      "Partner with a peer who can explain their thinking aloud",
    ],
    extension: [
      `Research a real AI system that works with ${topic} — who built it, what data does it use, and who does it affect?`,
      "Find a news article about an AI system in this area and evaluate the claims made",
      "Design a data collection protocol that would make an AI system in this area more fair and accurate",
    ],
  }
}

function getRationale(topic: string, aiConcept: string, subject: string): {
  whyThisActivity: string
  whyThisAiConnection: string
  whyThisAssessment: string
} {
  return {
    whyThisActivity: `The activity makes abstract AI concepts concrete by grounding them in ${topic} — a domain students already have some understanding of. Collaborative group work surfaces diverse perspectives and misconceptions before the class discussion.`,
    whyThisAiConnection: `${topic} is a natural, accessible analog to how AI systems work with ${aiConcept}. This avoids abstract AI talk and connects the concept to something students encounter in ${subject}.`,
    whyThisAssessment: `The exit ticket checks three distinct things: subject understanding, AI literacy connection, and epistemic humility. The rubric lets you see where students are across these dimensions without a long test.`,
  }
}

function getMisconceptions(topic: string, aiConcept: string): string[] {
  const base = [
    `AI systems "understand" ${topic} the way humans do — in reality, they detect statistical patterns`,
    "More data always means a better AI system — but data quality and representation matter more than quantity",
  ]
  if (aiConcept === "fairness") {
    base.push("If an AI system uses math, it must be objective and neutral — but math reflects the choices of its designers")
  } else if (aiConcept === "decisions") {
    base.push("AI decisions are always optimal — but AI optimizes for a specific goal, which may not align with human values")
  } else if (aiConcept === "creativity") {
    base.push("AI can be truly creative — but it generates outputs by recombining patterns, not through experience or intention")
  } else {
    base.push("AI systems can solve problems on their own without human oversight — but they require careful design and monitoring")
  }
  return base
}

function getTeacherDecisionPoints(topic: string, aiConcept: string, subject: string): string[] {
  return [
    `Review the activity materials before class to ensure the ${topic} examples are appropriate for your students' prior knowledge`,
    `Decide how much time to spend on the AI connection vs. the ${subject} content — both matter, but pacing will depend on your class`,
    `Consider whether the ethics discussion should happen during the activity or as a separate closing — it can go deep and deserves time`,
    `Think about grouping strategy — heterogeneous groups by content knowledge work well for this type of collaborative task`,
  ]
}

function buildSourceUseSummary(intake: LessonIntake): string[] {
  const summary: string[] = [
    `Generated for ${intake.gradeLevel} ${intake.subject} — topic: ${intake.topic}`,
    `AI literacy focus: ${intake.aiConcept} — connected to Day of AI and ISTE AI literacy frameworks`,
  ]
  if (intake.standards) {
    summary.push(`Standards provided by teacher: ${intake.standards.trim()}`)
  }
  if (intake.priorFeedback) {
    summary.push(`Teacher prior feedback noted: ${intake.priorFeedback.trim().slice(0, 120)}${intake.priorFeedback.length > 120 ? "…" : ""}`)
  }
  return summary
}

export function generateLesson(intake: LessonIntake): LessonDraft {
  const { gradeLevel, subject, topic, duration, aiConcept, standards, priorFeedback } = intake
  const verb = getAiConceptVerb(aiConcept)
  const activityVerb = getActivityVerb(subject)

  return {
    id: `lesson-${Date.now()}`,
    versionNumber: 1,
    lessonTitle: `${topic} — AI Literacy Lesson`,
    gradeLevel,
    subject,
    duration,
    topic,
    subjectLearningGoals: [
      `Explain key concepts and patterns in ${topic} using evidence and reasoning`,
      `Apply understanding of ${topic} to evaluate real-world examples and scenarios`,
    ],
    aiLiteracyGoals: getAiLiteracyGoals(subject, aiConcept),
    bigAiIdea: getBigAiIdea(subject, aiConcept),
    designPhase: {
      teacherGoal: `Help students connect ${topic} to how AI systems ${verb}.`,
      studentQuestion: `How does ${topic} connect to the way AI systems work — and what does that mean for how we use and trust AI?`,
      priorKnowledge: `Students have some familiarity with ${topic} from prior lessons. They can engage in evidence-based discussion and work collaboratively in groups.`,
      activity: `Students ${activityVerb} ${topic} and then make connections to how AI systems approach the same challenge.`,
      misconceptionsToSurface: getMisconceptions(topic, aiConcept),
    },
    createPhase: {
      activityOverview: `${topic}-based activity where students work in groups to ${activityVerb} and connect their findings to AI system behavior.`,
      studentSteps: getStudentSteps(subject, topic, aiConcept),
      teacherMoves: getTeacherMoves(topic, aiConcept),
      materials: getMaterials(subject, topic),
    },
    reflectPhase: {
      discussionPrompts: getDiscussionPrompts(topic, aiConcept, subject),
      ethicalReflection: `Who might be harmed if an AI system trained on limited data made decisions about ${topic}? What responsibility do the people who build and use these systems have?`,
      exitTicket: getExitTicket(topic, aiConcept),
    },
    assessment: {
      successCriteria: getSuccessCriteria(topic, aiConcept),
      rubric: getRubric(aiConcept),
    },
    differentiation: getDifferentiation(topic),
    rationale: getRationale(topic, aiConcept, subject),
    teacherDecisionPoints: getTeacherDecisionPoints(topic, aiConcept, subject),
    sourceUseSummary: buildSourceUseSummary(intake),
    revisionSuggestions: [
      "Ask the co-pilot to make this lesson more hands-on or project-based",
      "Ask to add or deepen the ethics and equity discussion",
      "Ask for multilingual learner supports or differentiated materials",
      "Ask to shorten the lesson or adapt it for a different time block",
    ],
    createdAt: new Date(),
  }
}
