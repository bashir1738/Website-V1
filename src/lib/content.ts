export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Academy", href: "/training" },
  { label: "Hire Engineers", href: "/talent" },
  { label: "Engineering", href: "/engineering" },
  { label: "ProdFest", href: "/prodfest" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export interface MetricStat {
  value: string;
  label: string;
}

export const stats: MetricStat[] = [
  {
    value: "115",
    label: "engineers graduated from Cohort II",
  },
  {
    value: "500+",
    label: "smart contracts built by students",
  },
  {
    value: "12",
    label: "dApps shipped through cohort projects",
  },
  {
    value: "2 years",
    label: "developing technology talent in Jos",
  },
];

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  subDescription?: string;
}

export const howBlockfuseWorks: HowItWorksStep[] = [
  {
    number: "1",
    title: "We select",
    description:
      "Admission is based on demonstrated ability, commitment, and readiness to learn. We take fewer people than apply, because the room only works if everyone in it is carrying their own weight.",
  },
  {
    number: "2",
    title: "We train hard",
    description:
      "Our programs are shaped by the skills technology teams need now. Students learn by building, to real deadlines, in software engineering, applied AI, and blockchain. Work is reviewed the way it is reviewed on a professional team: directly, and without flattery.",
  },
  {
    number: "3",
    title: "We verify ability",
    description:
      "Every student is assessed across coding, AI-assisted development, testing, system design, problem-solving, and communication.",
    subDescription:
      "A certificate shows that someone attended. Our assessment shows what they can do.",
  },
  {
    number: "4",
    title: "We build production experience",
    description:
      "Students who meet our standards can progress into supervised residency, where they work within professional engineering practices and receive feedback from experienced engineers.",
  },
  {
    number: "5",
    title: "We open doors",
    description:
      "We introduce qualified graduates to companies, ecosystem partners, and opportunities that match their capabilities. For the ones building something of their own, what we have is the network: partners, mentors, ecosystems, and a stage at ProdFest.",
  },
];

export interface ProgramPath {
  title: string;
  tagline?: string;
  description: string;
  audience: string;
  href: string;
}

export const programPaths: ProgramPath[] = [
  {
    title: "AI-Native Software Engineering",
    tagline: "Foundations & AI-Assisted Workflows",
    description:
      "Build strong software engineering foundations while learning to use modern AI tools throughout the development process.",
    audience:
      "For aspiring engineers who want to become capable, adaptable, and ready for modern software teams.",
    href: "/training",
  },
  {
    title: "Applied AI Engineering",
    tagline: "Model Integration & Production AI",
    description:
      "Learn to design, build, evaluate, and deploy AI-powered products and features that solve practical problems.",
    audience:
      "For developers ready to move from using AI tools to engineering reliable AI systems.",
    href: "/training",
  },
  {
    title: "Blockchain Engineering",
    tagline: "Smart Contracts & Protocol Systems",
    description:
      "Develop the technical foundations required to build smart contracts, decentralised applications, and blockchain infrastructure.",
    audience:
      "For engineers pursuing opportunities within blockchain ecosystems and protocol teams.",
    href: "/training",
  },
  {
    title: "Team Training",
    tagline: "Private & Enterprise Programs",
    description:
      "Practical training designed around the tools, workflows, and technical capabilities your organisation needs.",
    audience:
      "For companies that want their existing engineering teams to become more effective with AI and emerging technologies.",
    href: "/training",
  },
];

export const engineerBenefits = [
  "Build projects that demonstrate real ability",
  "Receive direct feedback from working engineers",
  "Learn to use AI without becoming dependent on it",
  "Work alongside people who take engineering seriously",
  "Understand where your skills are strong, and where they are not ready yet",
  "Gain access to employers, partners, and technical communities",
];

export const orgWorkWithUsPoints = [
  "Hire qualified Blockfuse graduates",
  "Engage engineers for contract or embedded roles",
  "Sponsor a talent pipeline for specific skills",
  "Train and upskill existing engineering teams",
  "Support access to technology careers through sponsored cohorts",
];

export const footerLinks = {
  programs: [
    { label: "AI-Native Software Engineering", href: "/training" },
    { label: "Applied AI Engineering", href: "/training" },
    { label: "Blockchain Engineering", href: "/training" },
    { label: "Team Training", href: "/training" },
  ],
  organizations: [
    { label: "Hire Blockfuse engineers", href: "/talent" },
    { label: "Engage embedded engineers", href: "/talent" },
    { label: "Sponsor a cohort", href: "/talent" },
    { label: "Train your team", href: "/training" },
    { label: "Become a partner", href: "/contact" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Our story", href: "/about" },
    { label: "Team", href: "/about" },
    { label: "Impact", href: "/about" },
    { label: "Events", href: "/prodfest" },
    { label: "ProdFest", href: "/prodfest" },
    { label: "Contact", href: "/contact" },
  ],
};

export const engineeringServices = [
  {
    title: "Technical advisory",
    time: "Days or weeks",
    copy: "Architecture reviews, stack decisions, AI adoption plans, technical due diligence, and engineering team shaping.",
  },
  {
    title: "Discovery sprint",
    time: "2-4 weeks",
    copy: "Turn a business problem into requirements, architecture, a working prototype, budget, and delivery plan.",
  },
  {
    title: "Build and delivery",
    time: "2-6 months",
    copy: "Senior-led delivery for AI features, web and mobile products, smart contracts, APIs, and infrastructure.",
  },
  {
    title: "Ongoing engineering",
    time: "Monthly",
    copy: "A named team, agreed monthly capacity, maintenance, improvements, and reporting you can actually read.",
  },
];

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

export interface EmployerTestimonial {
  quote: string;
  author: string;
  role: string;
}

export const employerTestimonials: EmployerTestimonial[] = [
  {
    quote:
      "We interviewed two people from the shortlist and hired both. What stood out was that they could explain their own code and say honestly what they did not know. That is rarer than it should be.",
    author: "Tunde Alabi",
    role: "Head of Engineering at Northgate Systems",
  },
  {
    quote:
      "The engineer we embedded shipped in her second week. Blockfuse stayed in touch through the whole engagement, which we did not expect and came to rely on.",
    author: "Sarah Mensah",
    role: "CTO at Kestrel Labs",
  },
];

export interface TalentCategory {
  title: string;
  description: string;
}

export const talentCategories: TalentCategory[] = [
  {
    title: "AI-Native Software Engineering",
    description:
      "Software engineers with strong development fundamentals who can use AI effectively across research, implementation, testing, debugging, and documentation.",
  },
  {
    title: "Applied AI Engineering",
    description:
      "Engineers who can build, evaluate, deploy, and maintain AI-powered applications, retrieval systems, agents, and production LLM features.",
  },
  {
    title: "Blockchain Engineering",
    description:
      "Engineers experienced in smart contract development, protocol integration, decentralised applications, testing, and blockchain security practices.",
  },
];

export interface HiringProcessStep {
  number: string;
  title: string;
  description: string;
  subDescription?: string;
}

export const hiringProcessSteps: HiringProcessStep[] = [
  {
    number: "1",
    title: "Tell us what you need",
    description:
      "We learn about the role, responsibilities, required skills, seniority, working hours, budget, and the problems the engineer will be expected to solve.",
  },
  {
    number: "2",
    title: "Receive a focused shortlist",
    description:
      "We match your requirements against engineers in the Blockfuse Talent Network. You receive a small, relevant shortlist, not a database of CVs to search through.",
  },
  {
    number: "3",
    title: "Review the evidence",
    description:
      "You can review each engineer's verified skills, portfolio, assessment results, and relevant project experience before deciding whom to interview.",
  },
  {
    number: "4",
    title: "Interview and select",
    description:
      "You retain control of your interview process and final hiring decision. We coordinate the process and provide any additional information you need.",
  },
  {
    number: "5",
    title: "Hire directly or engage under contract",
    description:
      "Choose the arrangement that works for your team. Blockfuse supports direct employment, contract engagements, and sponsored talent pipelines.",
  },
  {
    number: "6",
    title: "Receive continued support",
    description:
      "Our involvement does not disappear when an engineer starts. We maintain regular check-ins, support the engineer's continued development, collect feedback from your team, and respond quickly when something is not working.",
  },
];

export const verifiedEngineerCriteria = [
  "Completed the relevant Blockfuse program or demonstrated equivalent ability",
  "Passed our production-readiness assessment",
  "Built working software that our reviewers can examine",
  "Demonstrated effective use of AI-assisted development",
  "Been assessed on testing, debugging, and system design",
  "Demonstrated written communication and collaborative development skills",
  "Met the professional standard required for employer introductions",
];

export const ecosystemPartnerServices = [
  "Candidate recruitment and selection",
  "Curriculum development",
  "Instructor-led technical training",
  "Practical projects built on your technology",
  "Technical assessment",
  "Developer and project outcome reporting",
  "Talent introductions",
  "Product demonstrations through ProdFest",
];



