export interface AcademyPillar {
  title: string;
  copy: string;
  subCopy?: string;
}

export const academyPillars: AcademyPillar[] = [
  {
    title: "Learn from engineers who build",
    copy: "Your instructors and reviewers are working engineers. The same senior engineers lead our client engagements, so what you are taught reflects what is actually being built and shipped.",
    subCopy: "They review your work the way it gets reviewed on a professional team: directly, and without flattery.",
  },
  {
    title: "Build real, working projects",
    copy: "You will not spend the entire program following tutorials. You will design, build, test, deploy, and explain software that other people can use.",
    subCopy: "Blockfuse students have already written more than 500 smart contracts and shipped 12 dApps through cohort projects.",
  },
  {
    title: "Receive honest, useful feedback",
    copy: "You will always know where you stand. We identify weaknesses early, help you address them, and show you what the next level requires. If you are behind, you will hear it while there is still time to fix it.",
  },
  {
    title: "Develop AI-native engineering skills",
    copy: "You will learn to use AI to research, build, test, debug, and document software more effectively, without becoming dependent on it or surrendering your engineering judgment.",
  },
  {
    title: "Graduate with evidence",
    copy: "Your portfolio, technical projects, code reviews, and production-readiness assessment provide evidence that employers can evaluate.",
  },
  {
    title: "Access meaningful opportunities",
    copy: "Graduates who meet the standard may receive introductions to employers, ecosystem partners, mentors, and technical communities within the Blockfuse network.",
    subCopy: "Placement is not automatic, but helping capable graduates become visible to the right organisations is an important part of our work. For those building something of their own, what we have is the network: partners, mentors, ecosystems, and a stage at ProdFest.",
  },
  {
    title: "Join a community that continues after graduation",
    copy: "Blockfuse alumni return as mentors, collaborators, referral partners, founders, and instructors. Graduation does not end your relationship with the community.",
  },
];

export interface DetailedProgram {
  id: string;
  title: string;
  target: string;
  description: string;
  topics: string[];
  outcome: string;
  note?: string;
  ctaText: string;
}

export const detailedPrograms: DetailedProgram[] = [
  {
    id: "ai-native",
    title: "AI-Native Software Engineering",
    target: "For beginners and early-career developers",
    description:
      "A practical path into modern software engineering, with AI integrated into the development process from the beginning.",
    topics: [
      "Programming and software engineering fundamentals",
      "Frontend and backend development",
      "Databases and API design",
      "Testing and debugging",
      "Git and collaborative development",
      "Cloud deployment",
      "AI-assisted software development",
      "Building AI-enabled applications",
      "Product thinking and teamwork",
    ],
    outcome:
      "By the end of the program, you should be able to take a software idea, break it into manageable problems, build a working solution, and explain the decisions behind it.",
    ctaText: "Learn about AI-Native Software Engineering",
  },
  {
    id: "applied-ai",
    title: "Applied AI Engineering",
    target: "For software engineers who can already build and ship",
    description:
      "Learn to design, evaluate, and deploy dependable AI-powered systems, not just prototypes that work during a demonstration.",
    topics: [
      "LLM application development",
      "Retrieval and knowledge systems",
      "Tool calling and agentic workflows",
      "Model selection and evaluation",
      "AI security and guardrails",
      "Structured outputs and reliability",
      "Observability, latency, and cost management",
      "Deploying and maintaining AI systems",
    ],
    outcome:
      "The program is designed for engineers who want to move from using AI tools to engineering reliable AI products.",
    ctaText: "Learn about Applied AI Engineering",
  },
  {
    id: "blockchain",
    title: "Blockchain Engineering",
    target: "For developers entering blockchain and protocol development",
    description:
      "This is the program Blockfuse became known for, now delivered through paid or ecosystem-sponsored cohorts.",
    topics: [
      "Blockchain and distributed-systems fundamentals",
      "Smart contract development",
      "Testing and security practices",
      "Protocol and wallet integration",
      "Decentralised application development",
      "Deployment and monitoring",
      "Building projects that can survive technical review",
    ],
    outcome:
      "Funded places and sponsorship arrangements are announced when applications open.",
    note: "Funded places and sponsorship arrangements are announced when applications open.",
    ctaText: "Learn about Blockchain Engineering",
  },
  {
    id: "team-training",
    title: "Team Training",
    target: "For companies and technology organisations",
    description:
      "We design private training programs around the technologies, tools, and engineering capabilities your organisation needs.",
    topics: [
      "Customised tech stacks & tooling",
      "Modern AI engineering workflows",
      "Production code quality & security",
      "Hands-on architectural sprints",
    ],
    outcome:
      "Programs can be delivered at Blockfuse in Jos, at your organisation's offices, or remotely.",
    note: "Programs can be delivered at Blockfuse in Jos, at your organisation’s offices, or remotely.",
    ctaText: "Discuss a team training program",
  },
];

export interface PathStage {
  stage: string;
  description: string;
}

export const academyPathStages: PathStage[] = [
  {
    stage: "Academy Learner",
    description: "Actively participating in a Blockfuse training program.",
  },
  {
    stage: "Academy Graduate",
    description:
      "Completed the program requirements and submitted the required projects.",
  },
  {
    stage: "Blockfuse Verified Engineer",
    description: "Passed the Blockfuse production-readiness assessment.",
  },
  {
    stage: "Engineering Resident",
    description:
      "Gaining supervised, practical engineering experience under the review of our senior engineers.",
  },
  {
    stage: "Blockfuse Talent Network",
    description:
      "Approved for introductions to suitable employers, contract opportunities, and ecosystem partners.",
  },
];

export interface AssessmentMatrixItem {
  area: string;
  whatWeAssess: string;
}

export const assessmentMatrix: AssessmentMatrixItem[] = [
  {
    area: "Coding fundamentals",
    whatWeAssess:
      "Correctness, readability, maintainability, and understanding of the language",
  },
  {
    area: "AI-assisted development",
    whatWeAssess:
      "Using AI productively while recognising and correcting unreliable output",
  },
  {
    area: "Problem-solving",
    whatWeAssess:
      "Breaking down unfamiliar problems and making progress independently",
  },
  {
    area: "Testing and debugging",
    whatWeAssess: "Proving that software works and diagnosing why it does not",
  },
  {
    area: "Git and collaboration",
    whatWeAssess: "Contributing safely and effectively to a shared codebase",
  },
  {
    area: "System design",
    whatWeAssess:
      "Designing software that remains maintainable as requirements change",
  },
  {
    area: "Communication",
    whatWeAssess:
      "Writing clear updates, documenting decisions, and asking useful questions",
  },
  {
    area: "Product judgment",
    whatWeAssess:
      "Understanding the user, the problem, and the purpose of the software",
  },
];

export const academyExpectations = [
  "Attend and participate consistently",
  "Complete work on time",
  "Ask for help before you become stuck",
  "Accept technical feedback professionally",
  "Support other members of your cohort",
  "Take responsibility for the quality of your work",
  "Keep improving after the program ends",
];

export const fundingChannels = [
  "Individual tuition",
  "Company-sponsored training",
  "Ecosystem-sponsored cohorts",
  "Partner-funded scholarships",
];

export interface GraduateTestimonial {
  quote: string;
  author: string;
  role: string;
  cohort: string;
}

export const graduateTestimonials: GraduateTestimonial[] = [
  {
    quote:
      "I had done three online courses before this and thought I could code. The first review here took my project apart in about four minutes. It was the most useful four minutes of my career.",
    author: "Chidi Nwosu",
    role: "Backend Engineer at Northgate Systems",
    cohort: "Cohort II, 2025",
  },
  {
    quote:
      "Nobody told me it would be easy, and it was not. What I did not expect was that they would tell me exactly where I was falling short while there was still time to do something about it.",
    author: "Halima Yakubu",
    role: "Smart Contract Engineer, contracting independently",
    cohort: "Cohort II, 2025",
  },
  {
    quote:
      "I came in wanting a job and left starting a company. The thing Blockfuse actually gave me was the confidence that I could build something and it would hold.",
    author: "Emeka Obi",
    role: "Co-founder at a logistics startup in Abuja",
    cohort: "Cohort I, 2025",
  },
];

export interface AcademyStat {
  value: string;
  label: string;
}

/** Proof strip under the Academy hero — the numbers behind the programs. */
export const academyStats: AcademyStat[] = [
  { value: "115+", label: "engineers graduated" },
  { value: "500+", label: "smart contracts written" },
  { value: "12", label: "dApps shipped in cohort projects" },
  { value: "2 years", label: "developing talent in Jos" },
];
