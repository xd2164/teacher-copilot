import { LessonDraft } from "./types"
import { Standard } from "./standards-data"

export interface LessonIntake {
  gradeLevel: string
  subjects: string[]   // one or more; first entry is the primary subject
  topic: string
  duration: string
  aiConcept: string    // "perception" | "representation" | "learning" | "natural-interaction" | "societal-impact"
  selectedStandards?: Standard[]
  priorFeedback?: string
}

// ── Grade band helper ──────────────────────────────────────────────────────────

function gradeBand(grade: string): "K-2" | "3-5" | "6-8" | "9-12" {
  if (grade === "K" || grade === "Grade 1" || grade === "Grade 2") return "K-2"
  if (["Grade 3","Grade 4","Grade 5"].includes(grade)) return "3-5"
  if (["Grade 6","Grade 7","Grade 8"].includes(grade)) return "6-8"
  return "9-12"
}

// ── Big Idea connection statement ──────────────────────────────────────────────

function getBigAiIdea(subject: string, aiConcept: string): string {
  const key = `${subject}+${aiConcept}`
  const map: Record<string, string> = {
    "Science+perception":
      "AI systems perceive the natural world through sensors and data — just like scientists use instruments to measure and observe. What an AI can 'see' depends entirely on the sensors and encoding choices its designers made.",
    "Science+representation":
      "AI systems represent scientific phenomena as mathematical structures. The model's accuracy depends on which features are included, which are simplified, and which are left out entirely.",
    "Science+learning":
      "AI systems learn from patterns in scientific data — mirroring the scientific method of observation, hypothesis, and testing. But unlike scientists, AI cannot question the quality or context of its training data.",
    "Science+natural-interaction":
      "AI systems generate scientific text, images, and explanations by learning patterns from published research — raising questions about accuracy, attribution, and who gets to define scientific knowledge.",
    "Science+societal-impact":
      "AI is transforming scientific research and environmental monitoring — but its accuracy and equity depend on who collects the data, whose environments are measured, and whose problems get prioritized.",
    "Math+perception":
      "AI systems perceive and interpret numerical and visual data through mathematical transformations — grounding abstract operations in a real application that processes billions of data points daily.",
    "Math+representation":
      "AI systems represent knowledge as mathematical structures: matrices, functions, probability distributions. The choice of representation determines what relationships the AI can find — and what it will always miss.",
    "Math+learning":
      "AI systems learn by finding mathematical patterns that minimize error across millions of examples — applying the same principles as statistics and function-fitting, at a scale impossible for humans alone.",
    "Math+societal-impact":
      "When AI systems use mathematical models to make decisions about people, those models embed the values of their designers. Math can make bias look objective, which makes critical analysis more important than ever.",
    "English/ELA+natural-interaction":
      "AI systems generate language by learning statistical patterns from vast amounts of text — raising urgent questions about authorship, voice, originality, and what it means to express an idea.",
    "English/ELA+societal-impact":
      "AI systems trained on historical texts inherit historical biases — amplifying some voices and silencing others. Critical reading of AI-generated content is a new essential literacy skill.",
    "English/ELA+representation":
      "AI systems represent meaning as numbers. This encoding process makes some meanings easy to express and others nearly impossible — a fundamental constraint on what AI can understand about literature and human experience.",
    "History/Social Studies+societal-impact":
      "AI systems reflect the values, power structures, and biases of the societies that built them. Historical thinking — asking who benefits, who decides, and whose story is told — is essential for AI literacy.",
    "History/Social Studies+representation":
      "AI systems represent history as patterns in data. But data about the past was collected by people with agendas, and what gets quantified shapes what AI can 'know' about history.",
    "Art+natural-interaction":
      "AI systems generate images, music, and text by learning patterns from human-created works — raising deep questions about creativity, originality, cultural ownership, and what makes art meaningful.",
    "Art+perception":
      "AI systems perceive visual information through pixel values and mathematical transformations — fundamentally differently from human vision. Exploring this difference reveals what it means to truly 'see' and interpret art.",
    "Computer Science+learning":
      "AI systems learn through algorithms that iteratively adjust mathematical models to reduce prediction error. Understanding how these algorithms work — and can fail — is core to responsible computing.",
    "Computer Science+representation":
      "AI systems represent knowledge through data structures, feature vectors, and mathematical models. Every design decision about representation shapes what the system can learn and what biases it will inherit.",
    "Computer Science+societal-impact":
      "AI systems amplify both the capabilities and the biases of the software engineers and data scientists who build them. Understanding this connection is essential for responsible computer science practice.",
    "Health/PE+societal-impact":
      "AI systems are increasingly used in health, fitness, and sport — making decisions about diagnoses, athletic performance, and wellness. The equity implications of who gets accurate predictions and who doesn't are profound.",
    "Health/PE+perception":
      "AI systems use sensors and biometric data to perceive health and movement — raising questions about what this data captures, what it misses, and who owns the information our bodies generate.",
  }
  return (
    map[key] ||
    "AI systems learn patterns from data to make predictions and decisions — a skill that connects to every subject and every career. Understanding how AI works — and fails — is essential for everyone."
  )
}

// ── AI literacy goals (aligned to Five Big Ideas) ─────────────────────────────

function getAiLiteracyGoals(subject: string, aiConcept: string, grade: string): string[] {
  const band = gradeBand(grade)

  const goalsByIdea: Record<string, Record<string, string[]>> = {
    perception: {
      "K-2": [
        "Understand that computers use sensors (cameras, microphones, touchscreens) to learn about the world",
        "Recognize that computers cannot feel, smell, or experience — they only process the data sensors give them",
        "Identify one sensor a computer uses and one thing that sensor cannot detect",
      ],
      "3-5": [
        "Explain that AI systems perceive the world through sensors and encoded data, not through human senses",
        "Describe how the same real-world event can look very different to different sensors",
        "Identify at least one important thing that AI sensors miss about a real-world situation",
      ],
      "6-8": [
        "Understand that AI systems perceive the world through sensors and digital data, not through experience or intuition",
        "Analyze how the choice of sensors and data encoding shapes what an AI system can and cannot detect",
        "Evaluate how 'blind spots' in AI perception can lead to harmful or inaccurate outcomes",
      ],
      "9-12": [
        "Analyze the relationship between real-world phenomena, sensor data, and AI system inputs — and the information lost at each step",
        "Evaluate how design decisions about sensors and encoding embed assumptions about what matters",
        "Assess the equity implications of AI systems that perceive some populations' data accurately and others' poorly",
      ],
    },
    representation: {
      "K-2": [
        "Understand that computers store information as numbers and symbols",
        "Recognize that computers can only work with information that has been turned into data",
        "Give an example of something that is hard to turn into a number",
      ],
      "3-5": [
        "Explain that AI systems represent knowledge as structured data that can be processed mathematically",
        "Identify what information gets included and excluded when something is turned into data",
        "Discuss why two people representing the same thing as data might make different choices",
      ],
      "6-8": [
        "Understand that AI systems represent and reason about the world through mathematical structures (features, models, classifications)",
        "Analyze how the choice of representation shapes what an AI system can reason about",
        "Evaluate trade-offs when simplifying complex real-world situations into data structures",
      ],
      "9-12": [
        "Analyze how feature selection, model architecture, and encoding schemes determine an AI system's capabilities and limitations",
        "Evaluate how representation choices can embed assumptions, power structures, and biases",
        "Assess the gap between what AI models represent and the full complexity of the real world",
      ],
    },
    learning: {
      "K-2": [
        "Understand that computers can learn to recognize things by looking at many examples",
        "Recognize that the examples a computer learns from affect what it gets right and wrong",
        "Give an example of something a computer might learn incorrectly from bad examples",
      ],
      "3-5": [
        "Explain that AI systems identify patterns in training data and use those patterns to make predictions",
        "Recognize that the quality and diversity of training data directly affects an AI system's accuracy",
        "Discuss how machine learning is similar to and different from how people learn",
      ],
      "6-8": [
        "Understand that machine learning algorithms find mathematical patterns that minimize prediction error across training examples",
        "Analyze how training data quality, quantity, and diversity affect model performance on real-world inputs",
        "Explain why an AI system that performs well on training data can still fail on real-world data",
      ],
      "9-12": [
        "Analyze the machine learning pipeline: data collection → feature engineering → model training → evaluation → deployment",
        "Evaluate how choices at each stage of the pipeline can introduce or amplify bias",
        "Assess the difference between training accuracy and real-world performance, and the equity implications of that gap",
      ],
    },
    "natural-interaction": {
      "K-2": [
        "Understand that computers can talk and listen using AI, but do not understand meaning the way people do",
        "Recognize that AI assistants sometimes get things wrong because they match patterns, not meaning",
        "Identify one thing an AI assistant does well and one thing it does poorly",
      ],
      "3-5": [
        "Explain that AI systems generate language and images by learning patterns from millions of human-created examples",
        "Recognize that AI-generated content reflects the patterns in training data, not original understanding",
        "Identify clues in AI-generated text or images that reveal it was made by a pattern-matching system",
      ],
      "6-8": [
        "Understand that large language models generate text by predicting likely next words based on patterns in training data — not through comprehension",
        "Analyze the difference between AI-generated text that sounds authoritative and text that is actually accurate",
        "Raise critical questions about authorship, accuracy, and trust when using AI-generated content",
      ],
      "9-12": [
        "Analyze how large language and image models generate outputs, and why they can produce plausible-sounding falsehoods",
        "Evaluate the ethical and social implications of AI-generated content for authorship, attribution, and epistemic trust",
        "Assess when AI-generated content is a useful tool, when it is misleading, and when it is harmful",
      ],
    },
    "societal-impact": {
      "K-2": [
        "Understand that people make AI systems and those systems can make mistakes",
        "Recognize that AI can be helpful and can also cause harm",
        "Give one example of how AI might treat different people differently",
      ],
      "3-5": [
        "Understand that AI systems are designed by people and can reflect the biases and values of their designers",
        "Identify one real example of an AI system having a positive impact and one with a negative impact",
        "Discuss who should be responsible when an AI system makes a mistake that harms someone",
      ],
      "6-8": [
        "Understand that AI systems embed the values, assumptions, and biases of their designers and training data",
        "Identify real-world cases where AI systems have produced unfair or harmful outcomes for specific groups",
        "Analyze who benefits and who may be harmed when AI is deployed in a given context — and what power people have to challenge those outcomes",
      ],
      "9-12": [
        "Analyze how AI systems can amplify existing social inequalities through biased training data, discriminatory design, and unequal deployment",
        "Evaluate case studies of AI causing harm across domains (criminal justice, healthcare, hiring, education)",
        "Assess who has the power to shape, challenge, or resist AI systems — and what responsibilities that creates for technologists, policymakers, and the public",
      ],
    },
  }

  const ideas = goalsByIdea[aiConcept]
  if (ideas) {
    return ideas[band] || ideas["6-8"]
  }
  return [
    "Understand how AI systems use data to make predictions and decisions",
    "Recognize that AI systems have limitations and can produce errors or biased results",
    "Discuss the social and ethical implications of AI in everyday life",
  ]
}

// ── Subject activity verb ──────────────────────────────────────────────────────

function getActivityVerb(subject: string): string {
  const verbs: Record<string, string> = {
    Science: "investigate",
    Math: "analyze",
    "English/ELA": "examine",
    "History/Social Studies": "analyze",
    Art: "create and critique",
    "Computer Science": "design and test",
    "Health/PE": "investigate",
    Other: "explore",
  }
  return verbs[subject] || "explore"
}

// ── Student steps: subject + big idea + grade-band aware ──────────────────────

function getStudentSteps(subject: string, topic: string, aiConcept: string, grade: string): string[] {
  const band = gradeBand(grade)

  if (subject === "Science") {
    if (aiConcept === "learning") return [
      `Examine the ${topic} dataset on your table. Circle 3–5 patterns you notice. Write one prediction based on each pattern.`,
      `Share predictions with your group. Where do you agree? Where do your predictions differ, and why?`,
      `An AI trained on this data finds patterns by assigning weights to features. Draw arrows on the dataset showing which patterns you think the AI would weight most — and justify your choice.`,
      `Identify one important scenario where your AI's predictions could be seriously wrong. What training data is missing?`,
      `Class discussion: A meteorologist uses similar pattern-finding. How is an AI system similar to this process? What can the meteorologist do that the AI cannot?`,
    ]
    if (aiConcept === "perception") return [
      `Examine the ${topic} data collected by three different measurement tools. What does each one "see" — and what does each miss?`,
      `Create a diagram: What real-world information gets captured when we turn ${topic} into digital data? What gets lost?`,
      `Compare diagrams with a partner. Identify two shared "blind spots" — things no sensor captures about ${topic}.`,
      `Scenario: Design your ideal sensor for this topic. What would it measure? What would still be invisible to it?`,
      `Discussion: If an AI makes decisions about ${topic} using only sensor data, what could go wrong for specific communities?`,
    ]
    if (aiConcept === "societal-impact") return [
      `Read the two case studies: one showing AI improving ${topic} outcomes, one showing AI causing harm in a ${topic} context. Annotate each one.`,
      `Make a T-chart: Who benefits from this AI system? Who may be at risk of harm? Who was not considered in the design?`,
      `Investigate: Where does the training data come from? Who collected it and why? Who is well-represented vs. underrepresented?`,
      `Propose one concrete change to the design or deployment of this AI system that would reduce harm. Be specific about who it would help.`,
      `Debate: Should AI be used to make decisions about ${topic}? Each group takes a position and presents with evidence.`,
    ]
  }

  if (subject === "Math") {
    if (aiConcept === "learning") return [
      `Plot the ${topic} dataset. Sketch a line or curve that you think best fits the trend. Label your reasoning.`,
      `Exchange papers with another group. Measure whose line fits better by calculating the residuals for 3 data points. Who wins?`,
      `A machine learning algorithm iterates to find the line minimizing total squared error. Try to beat it: iterate your line 3 times. Can you match it?`,
      `Change two data points to outliers. How must your line shift? Why does one outlier force the model to "relearn"?`,
      `Write: What mathematical goal is an ML model optimizing? Connect to vocabulary from your statistics or algebra unit.`,
    ]
    if (aiConcept === "representation") return [
      `Sort the ${topic} examples using your own criteria. Write the rule behind each group clearly enough that a classmate could follow it.`,
      `Convert your sorting rule into a decision tree: a flowchart of yes/no questions with at least 3 decision nodes.`,
      `Exchange trees with another group. Test their tree on 5 examples — how many does it correctly classify?`,
      `Find two ${topic} examples that break each group's decision tree. Why do they break? What rule would fix it?`,
      `Discuss: Every AI model makes trade-offs in how it represents data. Name one trade-off your decision tree makes and why it matters in the real world.`,
    ]
    if (aiConcept === "societal-impact") return [
      `Read the scenario: An AI system uses ${topic} data to make decisions (college admissions / loan approvals / hiring scores). Who provides the data? Who is affected by the decision?`,
      `Calculate: The algorithm scores Group A at X and Group B at Y. Is this gap explained by the data? Is it fair? What would "fair" mean here?`,
      `Identify which mathematical choices in the algorithm could produce different outcomes for different groups.`,
      `Redesign: Change one feature of the algorithm to reduce the disparity. Show your work. What trade-off did you make?`,
      `Discussion: Is a mathematically "optimized" outcome automatically a fair outcome? Use your calculation as evidence.`,
    ]
  }

  if (subject === "English/ELA") {
    if (aiConcept === "natural-interaction") {
      if (band === "K-2" || band === "3-5") return [
        `Read two short paragraphs about ${topic}: one written by a student, one written by an AI. Circle words or phrases that feel different in each.`,
        `Discuss: How did the two paragraphs feel different to read? What specific words or sentences gave you clues?`,
        `AI writing tools learn from millions of texts. Which texts do you think this AI learned from? What kinds of writing are missing?`,
        `Rewrite one sentence from the AI paragraph so it sounds more like you. What did you change and why?`,
        `Share: What's one thing AI writing does well? One thing a human writer does that AI cannot?`,
      ]
      return [
        `Read two short passages about ${topic}: one by a student, one generated by an AI. Annotate both for voice, argument, evidence, and what feels "off."`,
        `Discuss: Can you identify which is which? What specific textual evidence did you use? Which features were most telling?`,
        `A language model generates text by predicting the next word based on patterns in training data. Rewrite one AI paragraph: where would a human writer make fundamentally different choices?`,
        `Investigate the source: What texts was this AI trained on? Who authored those texts? Whose writing defines what "good writing" looks like to this AI?`,
        `Write a 3-sentence argument: Should students use AI writing tools? Use specific textual evidence from today's passages.`,
      ]
    }
    if (aiConcept === "societal-impact") return [
      `Read the article about AI tools used in ${topic}. As you read, annotate: Who is affected? What power do they have to challenge the AI's decision?`,
      `Identify the evidence the author uses to support the main claim. Rate each piece: strong / weak / unclear, with written justification.`,
      `Find one counter-argument the author does not address. Write a paragraph making that counter-argument as strong as possible.`,
      `Compare your counter-argument with a partner's. Together, draft the rebuttal the original author should have included.`,
      `Discussion: When AI makes a consequential decision about a person, who should be accountable — the algorithm's designers, the deploying organization, or both?`,
    ]
  }

  if (subject === "Computer Science") {
    if (aiConcept === "learning") return [
      `Split the ${topic} dataset into training data and testing data. Write down your rule for splitting — why this ratio?`,
      `Train your "human classifier" on the training set by writing rules that classify every item correctly. Document your rules.`,
      `Apply your rules to the test set. Calculate accuracy. How does your model do on data it has never seen?`,
      `Identify two cases where your classifier fails on the test set. What training examples would have prevented each failure?`,
      `Discuss: What is the difference between memorizing training data and actually learning? Why does this matter for real AI systems?`,
    ]
    if (aiConcept === "societal-impact") return [
      `Audit the ${topic} AI system using the provided rubric: What data does it use? Who built it? What is it optimized for?`,
      `Document bias: Find at least two ways this system could produce different outcomes for different groups. Show evidence.`,
      `Research: Have researchers or affected communities documented harms from this type of system? Summarize your findings.`,
      `Propose one technical fix and one policy fix for the harms you identified. Explain what trade-off each fix creates.`,
      `Debate: Is it possible to build a fair AI system in this domain? What would it require? Argue for a specific position using evidence.`,
    ]
  }

  // Generic fallback
  const verb = getActivityVerb(subject)
  return [
    `Individually, ${verb} the ${topic} scenario. Write down: What patterns or decisions do you notice? What information is being used?`,
    `In small groups, share your observations and build a collaborative explanation of how the process works.`,
    `Compare your explanation to how an AI system approaches the same challenge — what is similar? What is fundamentally different?`,
    `Identify at least one scenario where your approach (or an AI's) could be badly wrong. What information is missing?`,
    `Class discussion: Who should be responsible for making sure AI systems handle ${topic} accurately and fairly?`,
  ]
}

// ── Teacher moves ──────────────────────────────────────────────────────────────

function getTeacherMoves(topic: string, aiConcept: string, subject: string, grade: string): string[] {
  const band = gradeBand(grade)
  const isYoung = band === "K-2" || band === "3-5"

  return [
    `Opening: Before students start, ask: "What do you already know about how ${topic} works? What's still mysterious to you?" (90-second pair-share, no hands.)`,
    `Mid-activity probe: When groups are building their explanation: "You said [restate what you heard]. Where exactly in the data does that come from? Point to it."`,
    `Misconception surface: "Some people think AI systems understand ${topic} the way you do. What's one piece of evidence that challenges that idea?"`,
    isYoung
      ? `AI connection: "You just did something amazing — you found a pattern. AI tries to do that too, but only using numbers. What did you notice that AI couldn't put into a number?"`
      : `AI connection: "Your group just built a model. AI systems do the same thing mathematically. What assumptions did your model make? An AI would make those same assumptions — plus ones none of us would think to question."`,
    `Closing: Final 3 minutes — one sentence each: "What did you learn about ${topic}? What did you learn about how AI works? What question are you leaving with?"`,
  ]
}

// ── Materials ──────────────────────────────────────────────────────────────────

function getMaterials(subject: string, topic: string, duration: string): string[] {
  const base = [
    `${topic} activity handout (1 per student, printed or digital)`,
    "Large chart paper or whiteboard space for group work",
    "Markers",
    "Recording sheet: Observations → Patterns → AI Connection",
  ]
  if (subject === "Science") {
    base.push(`${topic} data cards or printed dataset (1 set per group)`)
    base.push("Sticky notes for hypothesis tracking")
  }
  if (subject === "Math") {
    base.push("Graph paper or digital graphing tool (e.g. Desmos)")
    base.push(`${topic} dataset (printed or spreadsheet)`)
  }
  if (subject === "English/ELA") {
    base.push("Two short passages: one human-authored, one AI-generated (teacher pre-selects)")
    base.push("Annotation legend card (claim, evidence, tone, language patterns)")
  }
  if (subject === "Art") {
    base.push("Printed examples: human-created artwork vs. AI-generated artwork on the same theme")
    base.push("Critique protocol card (describe → analyze → interpret → evaluate)")
  }
  if (subject === "Computer Science") {
    base.push("Pseudocode or flowchart template")
    base.push("Training/test dataset cards (1 set per group)")
  }
  if (subject === "History/Social Studies") {
    base.push("Primary source document set (2-3 documents, curated by teacher)")
    base.push("Historical context one-pager")
  }
  if (duration === "90 minutes") {
    base.push("Extension materials for students who finish early (research article or case study)")
  }
  return base
}

// ── Discussion prompts ─────────────────────────────────────────────────────────

function getDiscussionPrompts(topic: string, aiConcept: string, subject: string, grade: string): string[] {
  const band = gradeBand(grade)
  const isYoung = band === "K-2" || band === "3-5"

  const ideaSpecific: Record<string, string[]> = {
    perception: [
      `What does an AI system "see" when it looks at ${topic} data? What is completely invisible to it?`,
      isYoung
        ? "What would you tell a computer about this that it could never figure out from numbers alone?"
        : `Where does the gap between sensor data and reality create a risk of harm in ${topic} contexts?`,
      `If an AI system was trained only on data from one type of place or community, what would it fail at when deployed somewhere else?`,
    ],
    representation: [
      `When we turn ${topic} into data, what gets captured? What gets lost? Does anything important get distorted?`,
      `Two people represent the same ${topic} situation as data — differently. Whose representation is "right"? Who decides?`,
      isYoung
        ? "Name something about yourself or your community that would be hard to put into a number."
        : `How do representation choices in AI models reflect the values and assumptions of whoever built them?`,
    ],
    learning: [
      `Your group found a pattern in ${topic}. How confident are you in it? What would it take to change your mind?`,
      `Where could a pattern-learning AI get this dangerously wrong? What training data would it need to avoid that?`,
      `How is the way you learned from this data similar to how a machine learning model works? How is it fundamentally different?`,
    ],
    "natural-interaction": [
      `If an AI generated a paragraph about ${topic} and it sounded authoritative — how would you check if it was accurate?`,
      `What texts do you think AI language models learned most from? Whose voices and perspectives are likely over- or under-represented?`,
      isYoung
        ? "What can you say or write that an AI probably couldn't? Why?"
        : `What are the implications for authorship, credit, and trust when AI-generated content is indistinguishable from human-created content?`,
    ],
    "societal-impact": [
      `Who benefits when AI is used in ${topic}? Who might be harmed? Does everyone have equal power to push back?`,
      `What responsibility do the designers of this AI system have for its impacts? What about the organizations that deploy it?`,
      isYoung
        ? "If an AI made a mistake that hurt someone, who should say sorry and fix it?"
        : `What would need to change — in the technology, the law, or society — to make AI in ${topic} more fair?`,
    ],
  }

  return ideaSpecific[aiConcept] || [
    `What patterns or rules did you find while working with ${topic}? How confident are you in them?`,
    `Where could your reasoning — or an AI's reasoning — break down in this context?`,
    `Who might be left out or harmed if an AI trained on limited data made decisions about ${topic}?`,
  ]
}

// ── Exit ticket ────────────────────────────────────────────────────────────────

function getExitTicket(topic: string, aiConcept: string, grade: string): string {
  const band = gradeBand(grade)
  const isYoung = band === "K-2" || band === "3-5"
  if (isYoung) {
    return `Draw or write: (1) How does AI connect to ${topic}? (2) One thing that could go wrong. (3) One question you still have.`
  }
  return `In 3 sentences: (1) Explain one specific connection between ${topic} and how AI systems work. (2) Identify one limitation or risk. (3) Write one question you're leaving with about AI and ${topic}.`
}

// ── Success criteria ───────────────────────────────────────────────────────────

function getSuccessCriteria(topic: string, aiConcept: string, grade: string): string[] {
  const band = gradeBand(grade)
  const ideaLabel: Record<string, string> = {
    perception: "how AI perceives through data",
    representation: "how AI represents knowledge",
    learning: "how AI learns from data",
    "natural-interaction": "how AI generates language and images",
    "societal-impact": "how AI shapes and is shaped by society",
  }
  const label = ideaLabel[aiConcept] || "how AI works"

  if (band === "K-2" || band === "3-5") return [
    `Can explain a connection between ${topic} and ${label}`,
    `Can name one thing an AI system cannot do that a human can do in this context`,
    `Participates in the ethics discussion with a relevant observation or question`,
    `Shows their thinking in writing, drawing, or discussion`,
  ]
  return [
    `Can explain a specific, accurate connection between ${topic} and ${label}`,
    `Can identify at least one limitation or risk in an AI system applied to ${topic}`,
    `Engages with the equity question — who benefits, who might be harmed`,
    `Uses evidence from the activity to support all reasoning (not just assertions)`,
  ]
}

// ── Rubric ─────────────────────────────────────────────────────────────────────

function getRubric(aiConcept: string, grade: string): Array<{ criterion: string; levels: string[] }> {
  const band = gradeBand(grade)
  return [
    {
      criterion: "Subject understanding",
      levels: [
        "No understanding demonstrated",
        "Basic understanding with limited explanation",
        "Clear understanding with evidence from the activity",
        "Deep understanding with multiple examples, nuance, and connections to prior learning",
      ],
    },
    {
      criterion: `AI literacy connection (${aiConcept.replace("-", " ")})`,
      levels: [
        "No connection made",
        "Surface connection identified but not explained",
        "Connection explained with reasoning and at least one specific example",
        "Connection explained with examples, identified limitations, and real-world implications",
      ],
    },
    {
      criterion: "Critical and ethical thinking",
      levels: [
        band === "K-2" || band === "3-5"
          ? "Not engaged with the 'what could go wrong' question"
          : "Not engaged with equity or ethics dimension",
        band === "K-2" || band === "3-5"
          ? "Identifies something that could go wrong"
          : "Identifies an ethical issue",
        band === "K-2" || band === "3-5"
          ? "Explains who might be affected if something goes wrong"
          : "Explains impact of the issue with reference to specific groups",
        band === "K-2" || band === "3-5"
          ? "Connects to fairness with a concrete example"
          : "Connects to real equity implications with evidence and proposes a response",
      ],
    },
  ]
}

// ── Differentiation ────────────────────────────────────────────────────────────

function getDifferentiation(topic: string, grade: string): {
  multilingualLearners: string[]
  studentsNeedingSupport: string[]
  extension: string[]
} {
  const band = gradeBand(grade)
  return {
    multilingualLearners: [
      `Provide sentence frames: "${band === "K-2" || band === "3-5" ? "I see… / The AI would… / This could be a problem if…" : "I notice that… / The AI system would… / This could cause harm if… / One question I have is…"}"`,
      "Pre-teach key vocabulary with visual supports before the main activity",
      "Allow bilingual pair discussions before whole-group sharing",
      "Offer visuals and icons alongside text-heavy materials",
    ],
    studentsNeedingSupport: [
      "Reduce the number of examples or data points to work with",
      "Provide a partially completed recording sheet as a scaffold",
      "Pair with a peer who can explain their thinking aloud",
      band === "K-2" || band === "3-5"
        ? "Allow drawing or labeling instead of writing to demonstrate understanding"
        : "Provide a graphic organizer connecting the subject concept to the AI concept step by step",
    ],
    extension: [
      `Research a real AI system that works with ${topic} — who built it, what data does it use, who does it affect, and what has the public response been?`,
      "Find a peer-reviewed article or investigative journalism piece about AI in this domain. Evaluate the quality of the evidence.",
      `Design a data collection protocol or AI audit framework that would make an AI system in ${topic} more fair and accurate.`,
    ],
  }
}

// ── Rationale ─────────────────────────────────────────────────────────────────

function getRationale(topic: string, aiConcept: string, subject: string, grade: string): {
  whyThisActivity: string
  whyThisAiConnection: string
  whyThisAssessment: string
} {
  const band = gradeBand(grade)
  return {
    whyThisActivity: `The activity makes abstract AI concepts concrete by grounding them in ${topic} — a domain ${band === "K-2" || band === "3-5" ? "students encounter in their everyday world" : "students have subject-matter knowledge about"}. Collaborative group work surfaces diverse perspectives and misconceptions before the whole-class discussion, reducing the risk that only high-confidence students shape the shared understanding.`,
    whyThisAiConnection: `${topic} provides an accessible, non-technical entry point for the AI4K12 Big Idea of "${aiConcept.replace("-", " ")}." By working with the subject-domain version first, students build an intuition they can then transfer to the AI context — avoiding the common mistake of teaching AI in isolation.`,
    whyThisAssessment: `The three-part exit ticket checks subject understanding, AI literacy connection, and epistemic humility independently. The rubric makes all three dimensions visible, allowing you to see where individual students need support without requiring a long test. The ethical thinking criterion is included in every lesson because AI literacy without equity analysis is incomplete.`,
  }
}

// ── Common misconceptions ──────────────────────────────────────────────────────

function getMisconceptions(topic: string, aiConcept: string): string[] {
  const base = [
    `AI systems "understand" ${topic} the way humans do — in reality, they detect statistical patterns in data, without comprehension or judgment`,
    `AI systems are objective because they use math — but every design choice (what data to collect, what to optimize for, how to define success) reflects human values and can embed bias`,
  ]
  const ideaMisconceptions: Record<string, string> = {
    perception: `AI sensors capture the full picture of ${topic} — in reality, every sensor has blind spots, and what gets left out often corresponds to what is hardest or least profitable to measure`,
    representation: `Once data is collected, the representation is fixed and neutral — in reality, the same phenomena can be represented in many ways, each with different consequences`,
    learning: `An AI that performs well on training data will perform well in the real world — in reality, models can overfit to training patterns and fail badly on real-world distributions, especially for underrepresented groups`,
    "natural-interaction": `AI-generated text and images are always clearly distinguishable from human-created content — in reality, the outputs are often indistinguishable, which creates serious challenges for trust and attribution`,
    "societal-impact": `Harmful AI outcomes are rare accidents — in reality, researchers have documented systematic harms across many domains, often concentrated on already-marginalized groups`,
  }
  if (ideaMisconceptions[aiConcept]) {
    base.push(ideaMisconceptions[aiConcept])
  }
  return base
}

// ── Teacher decision points ────────────────────────────────────────────────────

function getTeacherDecisionPoints(topic: string, aiConcept: string, subject: string, grade: string): string[] {
  const band = gradeBand(grade)
  return [
    `Pacing: The ethics discussion can easily expand to fill all available time — decide in advance how many minutes you'll protect for it, and write that on the board so students know too.`,
    `Grouping: Heterogeneous groups by content knowledge work well here. Consider intentional grouping if you have students with strong CS or data backgrounds who might dominate.`,
    `Prior knowledge check: Review the activity materials for ${topic} before class. If students lack the necessary background, add a 5-minute context-setting at the start rather than assuming they'll catch up during the activity.`,
    band === "K-2" || band === "3-5"
      ? `Concreteness: Abstract AI concepts need concrete anchors for this age group. Have a physical object (a camera, a microphone, a sensor) ready to show and explain.`
      : `AI connection depth: You can spend 5 minutes on the AI connection or 20. Decide which is more valuable for your students — deepening the ${subject} content understanding or deepening the AI literacy understanding — and plan accordingly.`,
    `Equity discussion: If the discussion surfaces student experiences with AI-related harm or bias (facial recognition failures, predictive policing, etc.), be prepared to validate those experiences and connect them to the lesson rather than redirecting.`,
  ]
}

// ── Source use summary ─────────────────────────────────────────────────────────

function buildSourceUseSummary(intake: LessonIntake): string[] {
  const { gradeLevel, subjects, topic, aiConcept, selectedStandards, priorFeedback } = intake
  const summary: string[] = [
    `Generated for ${gradeLevel} ${subjects.join(" / ")} — topic: "${topic}"`,
    `AI literacy focus: AI4K12 Big Idea — ${aiConcept.replace("-", " ")} (ai4k12.org/five-big-ideas)`,
    `Framework: Design–Create–Reflect (DCR) pedagogical structure`,
  ]
  if (selectedStandards && selectedStandards.length > 0) {
    const byFramework = selectedStandards.reduce<Record<string, string[]>>((acc, s) => {
      acc[s.framework] = [...(acc[s.framework] || []), s.code]
      return acc
    }, {})
    for (const [fw, codes] of Object.entries(byFramework)) {
      summary.push(`${fw} standards addressed: ${codes.join(", ")}`)
    }
  }
  if (priorFeedback) {
    summary.push(`Teacher context: ${priorFeedback.trim().slice(0, 160)}${priorFeedback.length > 160 ? "…" : ""}`)
  }
  return summary
}

// ── Main export ────────────────────────────────────────────────────────────────

export function generateLesson(intake: LessonIntake): LessonDraft {
  const { gradeLevel, subjects, topic, duration, aiConcept } = intake
  const subject = subjects[0] || "Other"           // primary subject drives content
  const subjectDisplay = subjects.join(" / ")
  const isInterdisciplinary = subjects.length > 1
  const activityVerb = getActivityVerb(subject)

  return {
    id: `lesson-${Date.now()}`,
    versionNumber: 1,
    lessonTitle: isInterdisciplinary
      ? `${topic}: Interdisciplinary AI Literacy (${gradeLevel})`
      : `${topic} & AI Literacy (${gradeLevel} ${subject})`,
    gradeLevel,
    subject: subjectDisplay,
    duration,
    topic,
    subjectLearningGoals: isInterdisciplinary
      ? [
          `Connect ${topic} across ${subjectDisplay} by identifying how each discipline asks different questions about the same phenomenon`,
          `Use disciplinary thinking from ${subjects[0]} and ${subjects.slice(1).join(" and ")} together to analyze real-world evidence`,
          `Explain how an AI system trained on ${topic} data would approach the problem differently than a practitioner from any single discipline`,
        ]
      : [
          `Explain key concepts and evidence in ${topic} using disciplinary vocabulary and reasoning`,
          `Apply understanding of ${topic} to evaluate real-world examples, scenarios, and claims`,
        ],
    aiLiteracyGoals: getAiLiteracyGoals(subject, aiConcept, gradeLevel),
    bigAiIdea: getBigAiIdea(subject, aiConcept),
    designPhase: {
      teacherGoal: `Help students build a concrete, evidence-grounded connection between ${topic} and the AI4K12 Big Idea: "${aiConcept.replace("-", " ")}."`,
      studentQuestion: `How does ${topic} connect to the way AI systems work — and what does that mean for how we use, trust, and question AI in the real world?`,
      priorKnowledge: `Students have some foundational knowledge of ${topic} from prior units. They can engage in evidence-based collaborative discussion and have been introduced to the idea that technology reflects human choices and values.`,
      activity: `Students ${activityVerb} ${topic} through a structured group activity, then make explicit connections to how AI systems approach the same challenge — surfacing similarities, differences, and limitations.`,
      misconceptionsToSurface: getMisconceptions(topic, aiConcept),
    },
    createPhase: {
      activityOverview: `Students work in groups to ${activityVerb} ${topic}. They build an explanation, test it against evidence, then connect their process to how an AI system would approach the same challenge — and where that AI would succeed, fail, or cause harm.`,
      studentSteps: getStudentSteps(subject, topic, aiConcept, gradeLevel),
      teacherMoves: getTeacherMoves(topic, aiConcept, subject, gradeLevel),
      materials: getMaterials(subject, topic, duration),
    },
    reflectPhase: {
      discussionPrompts: getDiscussionPrompts(topic, aiConcept, subject, gradeLevel),
      ethicalReflection: `Who might be harmed if an AI system trained on limited or biased data made consequential decisions about ${topic}? What responsibility do the people who build, deploy, and use these systems have — and what responsibility do we have as informed citizens?`,
      exitTicket: getExitTicket(topic, aiConcept, gradeLevel),
    },
    assessment: {
      successCriteria: getSuccessCriteria(topic, aiConcept, gradeLevel),
      rubric: getRubric(aiConcept, gradeLevel),
    },
    differentiation: getDifferentiation(topic, gradeLevel),
    rationale: getRationale(topic, aiConcept, subject, gradeLevel),
    teacherDecisionPoints: getTeacherDecisionPoints(topic, aiConcept, subject, gradeLevel),
    sourceUseSummary: buildSourceUseSummary(intake),
    revisionSuggestions: [
      "Ask the co-pilot to make this lesson more hands-on or project-based",
      "Ask to deepen the equity and ethics discussion with a specific case study",
      "Ask for multilingual learner supports or differentiated activity versions",
      "Ask to shorten or adapt for a different time block",
      "Ask to add specific connections to the standards you selected",
    ],
    createdAt: new Date(),
  }
}
