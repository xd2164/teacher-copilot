export interface Standard {
  code: string
  description: string
  framework: "CCSS-Math" | "CCSS-ELA" | "NGSS" | "CSTA"
}

export interface StandardGroup {
  label: string
  standards: Standard[]
}

function gradeBand(grade: string): "K-2" | "3-5" | "6-8" | "9-12" {
  if (grade === "K" || grade === "Grade 1" || grade === "Grade 2") return "K-2"
  if (["Grade 3","Grade 4","Grade 5"].includes(grade)) return "3-5"
  if (["Grade 6","Grade 7","Grade 8"].includes(grade)) return "6-8"
  return "9-12"
}

// ── NGSS ──────────────────────────────────────────────────────────────────────

const NGSS_SEP: Standard[] = [
  { code: "SEP-1", description: "Asking Questions and Defining Problems", framework: "NGSS" },
  { code: "SEP-4", description: "Analyzing and Interpreting Data", framework: "NGSS" },
  { code: "SEP-6", description: "Constructing Explanations and Designing Solutions", framework: "NGSS" },
  { code: "SEP-7", description: "Engaging in Argument from Evidence", framework: "NGSS" },
  { code: "SEP-8", description: "Obtaining, Evaluating, and Communicating Information", framework: "NGSS" },
]

const NGSS_CCC: Standard[] = [
  { code: "CCC-1", description: "Patterns — observed patterns in nature guide organization and classification", framework: "NGSS" },
  { code: "CCC-2", description: "Cause and Effect: Mechanism and Explanation", framework: "NGSS" },
  { code: "CCC-4", description: "Systems and System Models", framework: "NGSS" },
  { code: "CCC-7", description: "Stability and Change", framework: "NGSS" },
]

const NGSS_DCI_K5: Standard[] = [
  { code: "3-5-ETS1-1", description: "Define a simple design problem reflecting a need or want that includes several criteria for success and one or more constraints", framework: "NGSS" },
  { code: "3-5-ETS1-3", description: "Plan and carry out fair tests in which variables are controlled to identify failure points and suggest improvements", framework: "NGSS" },
]

const NGSS_DCI_MS: Standard[] = [
  { code: "MS-ETS1-1", description: "Define the criteria and constraints of a design problem with sufficient precision", framework: "NGSS" },
  { code: "MS-ETS1-3", description: "Analyze data from tests to determine similarities and differences among several design solutions", framework: "NGSS" },
  { code: "MS-PS3-5", description: "Construct, use, and present arguments to support the claim that when the kinetic energy of an object changes, energy is transferred to or from the object", framework: "NGSS" },
]

const NGSS_DCI_HS: Standard[] = [
  { code: "HS-ETS1-1", description: "Analyze a major global challenge to specify qualitative and quantitative criteria and constraints for solutions", framework: "NGSS" },
  { code: "HS-ETS1-3", description: "Evaluate a solution to a complex real-world problem based on prioritized criteria and tradeoffs", framework: "NGSS" },
]

// ── CCSS Math ─────────────────────────────────────────────────────────────────

const CC_MATH_PRACTICES: Standard[] = [
  { code: "MP.1", description: "Make sense of problems and persevere in solving them", framework: "CCSS-Math" },
  { code: "MP.4", description: "Model with mathematics", framework: "CCSS-Math" },
  { code: "MP.7", description: "Look for and make use of structure", framework: "CCSS-Math" },
  { code: "MP.8", description: "Look for and express regularity in repeated reasoning", framework: "CCSS-Math" },
]

const CC_MATH_3_5: Standard[] = [
  { code: "CCSS.MATH.3.MD.B.3", description: "Draw a scaled picture graph and bar graph to represent a data set with several categories", framework: "CCSS-Math" },
  { code: "CCSS.MATH.4.MD.B.4", description: "Make a line plot to display a data set of measurements in fractions of a unit", framework: "CCSS-Math" },
  { code: "CCSS.MATH.5.MD.B.2", description: "Represent and interpret data in a line plot; solve problems involving fractional data", framework: "CCSS-Math" },
]

const CC_MATH_6_8: Standard[] = [
  { code: "CCSS.MATH.6.SP.A.1", description: "Recognize a statistical question as one that anticipates variability in the data", framework: "CCSS-Math" },
  { code: "CCSS.MATH.6.SP.A.2", description: "Understand that a set of data collected has a distribution which can be described by its center, spread, and overall shape", framework: "CCSS-Math" },
  { code: "CCSS.MATH.6.SP.B.4", description: "Display numerical data in plots on a number line, including dot plots, histograms, and box plots", framework: "CCSS-Math" },
  { code: "CCSS.MATH.6.SP.B.5", description: "Summarize numerical data sets in relation to their context (median, mean, IQR, MAD)", framework: "CCSS-Math" },
  { code: "CCSS.MATH.7.SP.A.1", description: "Understand that statistics can be used to gain information about a population by examining a sample", framework: "CCSS-Math" },
  { code: "CCSS.MATH.7.SP.B.3", description: "Informally assess the degree of visual overlap of two numerical data distributions", framework: "CCSS-Math" },
  { code: "CCSS.MATH.8.SP.A.1", description: "Construct and interpret scatter plots for bivariate measurement data", framework: "CCSS-Math" },
  { code: "CCSS.MATH.8.SP.A.2", description: "Know that straight lines are widely used to model relationships between two quantitative variables", framework: "CCSS-Math" },
  { code: "CCSS.MATH.8.F.A.1", description: "Understand that a function is a rule that assigns each input exactly one output", framework: "CCSS-Math" },
]

const CC_MATH_HS: Standard[] = [
  { code: "CCSS.MATH.HSS.ID.A.1", description: "Represent data with plots on the real number line (dot plots, histograms, box plots)", framework: "CCSS-Math" },
  { code: "CCSS.MATH.HSS.ID.B.6", description: "Represent data on a scatter plot; describe how variables are related; fit functions to data", framework: "CCSS-Math" },
  { code: "CCSS.MATH.HSS.ID.C.9", description: "Distinguish between correlation and causation", framework: "CCSS-Math" },
  { code: "CCSS.MATH.HSS.IC.A.1", description: "Understand statistics as a process for making inferences about population parameters based on a random sample", framework: "CCSS-Math" },
  { code: "CCSS.MATH.HSS.IC.B.3", description: "Recognize the purposes of and differences among sample surveys, experiments, and observational studies", framework: "CCSS-Math" },
  { code: "CCSS.MATH.HSF.IF.A.1", description: "Understand that a function assigns to each element of the domain exactly one element of the range", framework: "CCSS-Math" },
]

// ── CCSS ELA ──────────────────────────────────────────────────────────────────

const CC_ELA_6_8: Standard[] = [
  { code: "CCSS.ELA.RI.6.8", description: "Trace and evaluate the argument and specific claims in a text, distinguishing claims supported by reasons and evidence from claims that are not", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.RI.7.8", description: "Trace and evaluate the argument and specific claims, assessing whether the reasoning is sound and evidence is relevant and sufficient", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.RI.8.8", description: "Delineate and evaluate the argument and specific claims in a text, assessing whether the reasoning is sound and evidence is sufficient", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.W.6.1", description: "Write arguments to support claims with clear reasons and relevant evidence", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.W.8.1", description: "Write arguments to support claims with clear reasons and relevant evidence, using credible sources", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.SL.6.1", description: "Engage effectively in a range of collaborative discussions; come prepared, build on others' talk, pose questions", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.SL.7.1", description: "Engage effectively in a range of collaborative discussions; follow rules, pose and respond to specific questions", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.SL.8.1", description: "Engage effectively in a range of collaborative discussions; acknowledge new information and qualify views when warranted", framework: "CCSS-ELA" },
]

const CC_ELA_K5: Standard[] = [
  { code: "CCSS.ELA.RI.3.3", description: "Describe the relationship between a series of historical events, scientific ideas, or technical procedures using language that pertains to time, sequence, and cause/effect", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.RI.4.8", description: "Explain how an author uses reasons and evidence to support particular points in a text", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.RI.5.8", description: "Explain how an author uses reasons and evidence to support particular points in a text, identifying which reasons and evidence support which points", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.W.4.1", description: "Write opinion pieces on topics or texts, supporting a point of view with reasons and information", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.SL.4.1", description: "Engage effectively in a range of collaborative discussions; build on others' ideas and express one's own clearly", framework: "CCSS-ELA" },
]

const CC_ELA_HS: Standard[] = [
  { code: "CCSS.ELA.RI.9-10.6", description: "Determine an author's point of view or purpose and analyze how the author uses rhetoric to advance that point of view", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.RI.9-10.8", description: "Delineate and evaluate the argument and specific claims in a text, assessing whether the reasoning is valid and evidence is relevant and sufficient", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.RI.11-12.8", description: "Delineate and evaluate the reasoning in seminal U.S. texts, including the application of constitutional principles and use of legal reasoning", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.W.9-10.1", description: "Write arguments to support claims in an analysis of substantive topics, using valid reasoning and relevant and sufficient evidence", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.W.11-12.1", description: "Write arguments to support claims in an analysis of substantive topics, introducing precise claims and establishing their significance", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.SL.9-10.1", description: "Initiate and participate effectively in a range of collaborative discussions; propel conversations by posing questions that probe reasoning and evidence", framework: "CCSS-ELA" },
  { code: "CCSS.ELA.SL.11-12.1", description: "Initiate and participate effectively in collaborative discussions; evaluate a speaker's point of view, reasoning, and use of evidence", framework: "CCSS-ELA" },
]

// ── CSTA (Computer Science) ───────────────────────────────────────────────────

const CSTA_K8: Standard[] = [
  { code: "CSTA.1B-AP-11", description: "(Grades 3-5) Decompose problems into smaller, manageable subproblems to facilitate the program development process", framework: "CSTA" },
  { code: "CSTA.2-DA-07", description: "(Grades 6-8) Represent data using multiple encoding schemes and analyze the tradeoffs", framework: "CSTA" },
  { code: "CSTA.2-DA-08", description: "(Grades 6-8) Collect data using computational tools and transform the data to make it more useful", framework: "CSTA" },
  { code: "CSTA.2-IC-21", description: "(Grades 6-8) Discuss issues of bias and accessibility in the design of existing technologies", framework: "CSTA" },
  { code: "CSTA.2-IC-22", description: "(Grades 6-8) Collaborate with others to consider alternative solutions for a problem and discuss the tradeoffs", framework: "CSTA" },
]

const CSTA_HS: Standard[] = [
  { code: "CSTA.3A-DA-09", description: "(Grades 9-10) Translate between different bit representations of real-world phenomena, such as characters, images, and sounds", framework: "CSTA" },
  { code: "CSTA.3A-IC-24", description: "(Grades 9-10) Evaluate the ways computing impacts personal, ethical, social, economic, and cultural practices", framework: "CSTA" },
  { code: "CSTA.3A-IC-25", description: "(Grades 9-10) Test and refine computational artifacts to reduce bias and equity deficits", framework: "CSTA" },
  { code: "CSTA.3B-AP-08", description: "(Grades 11-12) Describe how artificial intelligence drives many software and physical systems", framework: "CSTA" },
  { code: "CSTA.3B-IC-25", description: "(Grades 11-12) Evaluate computational artifacts to maximize their beneficial effects and minimize harmful effects on society", framework: "CSTA" },
  { code: "CSTA.3B-IC-27", description: "(Grades 11-12) Predict how computational innovations that have revolutionized aspects of our culture might evolve", framework: "CSTA" },
]

// ── Public API ─────────────────────────────────────────────────────────────────

export function getRelevantStandards(grade: string, subject: string): StandardGroup[] {
  if (!grade || !subject) return []
  const band = gradeBand(grade)

  if (subject === "Science") {
    return [
      { label: "NGSS Science & Engineering Practices", standards: NGSS_SEP },
      { label: "NGSS Crosscutting Concepts", standards: NGSS_CCC },
      {
        label: "NGSS Disciplinary Core Ideas",
        standards: band === "K-2" ? [] : band === "3-5" ? NGSS_DCI_K5 : band === "6-8" ? NGSS_DCI_MS : NGSS_DCI_HS,
      },
    ].filter(g => g.standards.length > 0)
  }

  if (subject === "Math") {
    const contentStandards =
      band === "K-2" ? [] :
      band === "3-5" ? CC_MATH_3_5 :
      band === "6-8" ? CC_MATH_6_8 :
      CC_MATH_HS
    return [
      { label: "Standards for Mathematical Practice (all grades)", standards: CC_MATH_PRACTICES },
      ...(contentStandards.length ? [{ label: "CCSS Math Content Standards", standards: contentStandards }] : []),
    ]
  }

  if (subject === "English/ELA") {
    const contentStandards =
      band === "K-2" || band === "3-5" ? CC_ELA_K5 :
      band === "6-8" ? CC_ELA_6_8 :
      CC_ELA_HS
    return [{ label: "CCSS English Language Arts Standards", standards: contentStandards }]
  }

  if (subject === "Computer Science") {
    const contentStandards = band === "9-12" ? CSTA_HS : CSTA_K8
    return [{ label: "CSTA Computer Science Standards", standards: contentStandards }]
  }

  if (subject === "History/Social Studies" || subject === "Art" || subject === "Health/PE" || subject === "Other") {
    const elaStandards =
      band === "K-2" || band === "3-5" ? CC_ELA_K5 :
      band === "6-8" ? CC_ELA_6_8 :
      CC_ELA_HS
    return [
      { label: "CCSS ELA — Argumentation & Evidence (cross-curricular)", standards: elaStandards.slice(0, 4) },
    ]
  }

  return []
}

// Combines standards from multiple subjects (for interdisciplinary lessons)
export function getRelevantStandardsForSubjects(grade: string, subjects: string[]): StandardGroup[] {
  if (!grade || subjects.length === 0) return []
  const seen = new Set<string>()
  const combined: StandardGroup[] = []
  for (const subject of subjects) {
    for (const group of getRelevantStandards(grade, subject)) {
      if (!seen.has(group.label)) {
        seen.add(group.label)
        combined.push(group)
      }
    }
  }
  return combined
}

// ── Five Big Ideas of AI (AI4K12) ─────────────────────────────────────────────

export const AI_BIG_IDEAS = [
  {
    value: "perception",
    label: "1. Perception",
    description: "Computers perceive the world using sensors and data",
  },
  {
    value: "representation",
    label: "2. Representation & Reasoning",
    description: "AI agents represent and reason about knowledge",
  },
  {
    value: "learning",
    label: "3. Learning",
    description: "Computers can learn patterns from data",
  },
  {
    value: "natural-interaction",
    label: "4. Natural Interaction",
    description: "AI understands and generates language, images, and speech",
  },
  {
    value: "societal-impact",
    label: "5. Societal Impact",
    description: "AI affects society, equity, and human values",
  },
]
