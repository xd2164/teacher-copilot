export interface Standard {
  code: string
  description: string
  framework: "CCSS-Math" | "CCSS-ELA" | "NGSS" | "CSTA" | "C3" | "NCAS" | "NHES" | "SHAPE"
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

// ── C3 Framework (History / Social Studies) ───────────────────────────────────

const C3_INQUIRY: Standard[] = [
  { code: "D1.1.K-12", description: "Construct compelling questions that reflect an enduring issue in the discipline", framework: "C3" },
  { code: "D1.5.K-12", description: "Determine the kinds of sources that will be helpful in answering compelling and supporting questions", framework: "C3" },
  { code: "D3.1.K-12", description: "Gather relevant information from multiple sources; use the origin, authority, structure, context, and corroborative value to guide selection", framework: "C3" },
  { code: "D3.2.K-12", description: "Evaluate the credibility of a source by determining its relevance, intended use, and potential bias", framework: "C3" },
  { code: "D4.7.K-12", description: "Explain and/or document strategies for addressing local, regional, and global problems and evaluate the effectiveness of those strategies", framework: "C3" },
]

const C3_DCI_K5: Standard[] = [
  { code: "D2.His.1.K-2", description: "Create a chronological sequence of multiple events and explain the relationship among them", framework: "C3" },
  { code: "D2.His.2.3-5", description: "Compare life in specific historical time periods to life today", framework: "C3" },
  { code: "D2.Civ.8.3-5", description: "Identify core civic virtues and democratic principles that guide government, society, and communities", framework: "C3" },
  { code: "D2.Eco.1.3-5", description: "Compare the benefits and costs of individual choices", framework: "C3" },
]

const C3_DCI_6_8: Standard[] = [
  { code: "D2.His.1.6-8", description: "Analyze connections among events and developments in broader historical contexts", framework: "C3" },
  { code: "D2.His.5.6-8", description: "Explain how and why perspectives of people have changed over time", framework: "C3" },
  { code: "D2.Civ.13.6-8", description: "Evaluate public policies in terms of intended and unintended outcomes, and historical, social, and ethical considerations", framework: "C3" },
  { code: "D2.Eco.12.6-8", description: "Explain how economic decisions affect the well-being of individuals, businesses, and society", framework: "C3" },
  { code: "D2.Geo.4.6-8", description: "Explain how cultural patterns and economic decisions influence environments and the daily lives of people", framework: "C3" },
]

const C3_DCI_9_12: Standard[] = [
  { code: "D2.His.1.9-12", description: "Evaluate how historical events and developments were shaped by unique circumstances of time and place as well as broader historical contexts", framework: "C3" },
  { code: "D2.His.5.9-12", description: "Analyze how historical contexts shaped and continue to shape people's perspectives", framework: "C3" },
  { code: "D2.Civ.13.9-12", description: "Evaluate public policies in terms of intended and unintended outcomes, address trade-offs, and consider different affected groups", framework: "C3" },
  { code: "D2.Eco.13.9-12", description: "Explain why advancements in technology and investments in capital goods and human capital increase economic growth", framework: "C3" },
  { code: "D4.6.9-12", description: "Use disciplinary and interdisciplinary lenses to understand the characteristics and causes of local, regional, and global problems", framework: "C3" },
]

// ── National Core Arts Standards ──────────────────────────────────────────────

const NCAS_K5: Standard[] = [
  { code: "VA.Cr1.1.K-5", description: "Explore, conceptualize, and develop artistic ideas; make deliberate choices in creating artwork", framework: "NCAS" },
  { code: "VA.Re7.1.K-5", description: "Identify and describe how the elements of art and principles of design work together to communicate meaning", framework: "NCAS" },
  { code: "VA.Re9.1.K-5", description: "Apply simple criteria to discuss and evaluate personal artistic work and that of peers", framework: "NCAS" },
  { code: "VA.Cn10.1.K-5", description: "Identify how personal interests and curiosity influence the making of artwork", framework: "NCAS" },
  { code: "VA.Cn11.1.K-5", description: "Understand that people from different places and times have made art for a variety of reasons", framework: "NCAS" },
]

const NCAS_6_8: Standard[] = [
  { code: "VA.Cr1.1.6-8", description: "Document early stages of the creative process through written, visual, and/or verbal means", framework: "NCAS" },
  { code: "VA.Cr2.3.6-8", description: "Present work in public by using processes of critique and reflection to select, analyze, define, and solve problems", framework: "NCAS" },
  { code: "VA.Re7.1.6-8", description: "Perceive and analyze artistic work; compare uses of the elements of art and principles of design in artwork", framework: "NCAS" },
  { code: "VA.Re8.1.6-8", description: "Interpret how the meaning of a work of art changes based on audience, culture, and context", framework: "NCAS" },
  { code: "VA.Re9.1.6-8", description: "Create, justify, and refine criteria for evaluating a work of art or collection of artworks using specific historical, theoretical, and cultural contexts", framework: "NCAS" },
  { code: "VA.Cn11.1.6-8", description: "Distinguish different ways art is used to represent, establish, communicate, and maintain cultural identity", framework: "NCAS" },
]

const NCAS_9_12: Standard[] = [
  { code: "VA.Cr1.1.HS", description: "Use multiple approaches to begin creative endeavors; envision and analyze multiple solutions to a problem", framework: "NCAS" },
  { code: "VA.Re7.1.HS", description: "Perceive, analyze, and describe how visual and material culture defines, shapes, enhances, inhibits, and reflects the lives of its makers and consumers", framework: "NCAS" },
  { code: "VA.Re8.1.HS", description: "Interpret an artwork or collection of works by comparing across time and discussing the ideas, contexts, and interpretive claims", framework: "NCAS" },
  { code: "VA.Re9.1.HS", description: "Evaluate the aesthetic and cultural significance of artworks through a relevant set of criteria", framework: "NCAS" },
  { code: "VA.Cn11.1.HS", description: "Compare uses of art in a variety of societal, cultural, and historical contexts, and make connections to contemporary and emerging practices including digital and AI-assisted art", framework: "NCAS" },
]

// ── National Health Education Standards (NHES) ────────────────────────────────

const NHES_K5: Standard[] = [
  { code: "NHES.1.K-5", description: "Students comprehend concepts related to health promotion and disease prevention to enhance health", framework: "NHES" },
  { code: "NHES.2.K-5", description: "Students demonstrate the ability to access valid health information and health-promoting products and services", framework: "NHES" },
  { code: "NHES.5.K-5", description: "Students demonstrate the ability to use decision-making skills to enhance health", framework: "NHES" },
  { code: "NHES.7.K-5", description: "Students demonstrate the ability to practice health-enhancing behaviors and avoid or reduce risks", framework: "NHES" },
]

const NHES_6_8: Standard[] = [
  { code: "NHES.1.6-8", description: "Analyze the relationship between healthy behaviors, protective factors, and personal, family, and community health", framework: "NHES" },
  { code: "NHES.2.6-8", description: "Analyze the validity of health information, products, and services — including AI-powered health apps and wearables", framework: "NHES" },
  { code: "NHES.3.6-8", description: "Analyze the role of individual responsibility for enhancing health and the influence of peers, family, culture, media, and technology", framework: "NHES" },
  { code: "NHES.5.6-8", description: "Analyze various strategies for making decisions regarding health/wellness and evaluate the potential outcomes", framework: "NHES" },
  { code: "NHES.7.6-8", description: "Demonstrate the ability to influence and support others in making positive health choices", framework: "NHES" },
]

const NHES_9_12: Standard[] = [
  { code: "NHES.1.9-12", description: "Predict how healthy behaviors can affect health status throughout the life span", framework: "NHES" },
  { code: "NHES.2.9-12", description: "Evaluate the validity and accessibility of health information, products, and services — including AI diagnostic tools", framework: "NHES" },
  { code: "NHES.3.9-12", description: "Analyze the effect of technology and media on personal, family, and community health decisions and practices", framework: "NHES" },
  { code: "NHES.5.9-12", description: "Evaluate the health consequences of decisions and the use of health data/technology in decision-making", framework: "NHES" },
  { code: "NHES.8.9-12", description: "Demonstrate the ability to advocate for personal, family, and community health — including equitable access to health technology", framework: "NHES" },
]

// ── SHAPE America (Physical Education) ───────────────────────────────────────

const SHAPE_ALL: Standard[] = [
  { code: "SHAPE.S1", description: "The physically literate individual demonstrates competency in a variety of motor skills and movement patterns", framework: "SHAPE" },
  { code: "SHAPE.S2", description: "The physically literate individual applies knowledge of concepts, principles, strategies, and tactics to movement and performance", framework: "SHAPE" },
  { code: "SHAPE.S3", description: "The physically literate individual demonstrates the knowledge and skills to achieve and maintain a health-enhancing level of physical activity and fitness", framework: "SHAPE" },
  { code: "SHAPE.S4", description: "The physically literate individual exhibits responsible personal and social behavior that respects self and others", framework: "SHAPE" },
  { code: "SHAPE.S5", description: "The physically literate individual recognizes the value of physical activity for health, enjoyment, challenge, self-expression, and/or social interaction", framework: "SHAPE" },
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

  if (subject === "History/Social Studies") {
    const dci =
      band === "K-2" || band === "3-5" ? C3_DCI_K5 :
      band === "6-8" ? C3_DCI_6_8 :
      C3_DCI_9_12
    return [
      { label: "C3 Framework — Inquiry Arc (all grades)", standards: C3_INQUIRY },
      { label: "C3 Disciplinary Concepts", standards: dci },
    ]
  }

  if (subject === "Art") {
    const contentStandards =
      band === "K-2" || band === "3-5" ? NCAS_K5 :
      band === "6-8" ? NCAS_6_8 :
      NCAS_9_12
    return [{ label: "National Core Arts Standards (Visual Art)", standards: contentStandards }]
  }

  if (subject === "Health/PE") {
    const healthStandards =
      band === "K-2" || band === "3-5" ? NHES_K5 :
      band === "6-8" ? NHES_6_8 :
      NHES_9_12
    return [
      { label: "National Health Education Standards (NHES)", standards: healthStandards },
      { label: "SHAPE America — National PE Standards", standards: SHAPE_ALL },
    ]
  }

  if (subject === "Other") {
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
