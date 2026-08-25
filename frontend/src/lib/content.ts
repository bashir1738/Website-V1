export interface NavChild {
  label: string;
  href: string;
  desc: string;
  flag?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Academy", href: "/training" },
  { label: "Hire Engineers", href: "/talent" },
  { label: "Engineering", href: "/engineering" },
  {
    label: "Events",
    href: "/events",
    children: [
      {
        label: "ProdFest",
        href: "/prodfest",
        flag: true,
        desc: "Annual demo festival — the flagship.",
      },
      {
        label: "Hackathons",
        href: "/events#hackathons",
        desc: "48-hour builds with ecosystem partners.",
      },
      {
        label: "Meetups",
        href: "/events#meetups",
        desc: "Monthly community nights in Jos.",
      },
      {
        label: "Workshops",
        href: "/events#workshops",
        desc: "Short, hands-on technical sessions.",
      },
      {
        label: "Demo days",
        href: "/events#demo-days",
        desc: "End-of-cohort project reviews.",
      },
      {
        label: "Past events",
        href: "/events#past-events",
        desc: "The archive, 2024 onward.",
      },
    ],
  },
  {
    label: "Community",
    href: "/team",
    children: [
      { label: "Team", href: "/team", desc: "The people who review the work." },
      {
        label: "Alumni",
        href: "/alumni",
        desc: "Graduates from Cohorts I and II.",
      },
      {
        label: "Open Source",
        href: "/open-source",
        desc: "Repos maintained by our students.",
      },
    ],
  },
  { label: "Blog", href: "/blog" },
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
  community: [
    { label: "Events", href: "/events" },
    { label: "ProdFest", href: "/prodfest" },
    { label: "Team", href: "/team" },
    { label: "Alumni", href: "/alumni" },
    { label: "Open Source", href: "/open-source" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Our story", href: "/about" },
    { label: "Impact", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export const engineeringServices = [
  {
    title: "Technical advisory",
    time: "Usually days or weeks, not months",
    copy: "An experienced engineer in the room when the decision is expensive. Architecture reviews, choosing a stack, planning an AI adoption that survives contact with production, technical due diligence, and shaping the engineering team you are about to hire.",
  },
  {
    title: "Discovery sprint",
    time: "Typically two to four weeks",
    copy: "You know the business problem but not the shape of the solution. We turn it into requirements, an architecture, a working prototype, a budget, and a delivery plan you can hand to any team, ours or your own.",
  },
  {
    title: "Build and delivery",
    time: "Typically two to six months",
    copy: "A senior-led team designs and ships it: AI features, web and mobile products, smart contracts and integrations, APIs and infrastructure. You get working software, the code and infrastructure in your own accounts, documentation, and a handover written on the assumption that we are leaving.",
  },
  {
    title: "Ongoing engineering",
    time: "Monthly, minimum three months",
    copy: "Something is live and nobody is looking after it properly. A named team, an agreed monthly capacity, maintenance and improvement, and reporting you can actually read.",
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

export interface AboutBelief {
  title: string;
  description: string;
}

export const aboutBeliefs: AboutBelief[] = [
  {
    title: "Proof matters more than credentials",
    description:
      "A certificate shows that someone completed a program. Working software and sound technical judgment show what they can actually do.",
  },
  {
    title: "Hard is the point",
    description:
      "We select carefully, push hard, and tell people plainly where they stand. Nobody is served by a program that is easy to finish.",
  },
  {
    title: "AI should strengthen engineers, not replace judgment",
    description:
      "We train students to use AI well while remaining responsible for correctness, security, maintainability, and the final result.",
  },
  {
    title: "Access must be sustainable",
    description:
      "Serious programs need instructors, infrastructure, time, and support. Our cohorts are funded through tuition, company partnerships, ecosystem sponsorship, and scholarships.",
  },
  {
    title: "Clients keep control",
    description:
      "Client products, code, infrastructure, data, roadmaps, and intellectual property belong to the client.",
  },
  {
    title: "Honest standards create real opportunity",
    description:
      "We do not describe people as more experienced than they are. Clear standards protect engineers, employers, partners, and the Blockfuse name.",
  },
  {
    title: "Community compounds",
    description:
      "The strongest technical communities are built when learners become engineers, engineers become mentors, and experienced builders create opportunities for the people coming up behind them.",
  },
];

export interface AboutPartner {
  name: string;
  description: string;
}

export const aboutPartners: AboutPartner[] = [
  {
    name: "Meridian Protocol Foundation",
    description:
      "Sponsored 20 funded places in blockchain engineering, 2025 and 2026",
  },
  {
    name: "Northgate Systems",
    description: "Hired three graduates and sponsored ProdFest 2026",
  },
  {
    name: "Plateau Digital Initiative",
    description:
      "Scholarship fund for students without prior access to technical training, 2026",
  },
  {
    name: "Kestrel Labs",
    description:
      "Engineering engagement and guest instruction on applied AI, 2026",
  },
  {
    name: "Sabre Chain",
    description: "Ecosystem partner for Build Week 2026",
  },
];





/* ─────────────────────────────────────────────────────────────
   Events
   ───────────────────────────────────────────────────────────── */

export interface Fact {
  value: string;
  label: string;
}

export const prodfestFacts: Fact[] = [
  { value: "12", label: "products on stage" },
  { value: "400+", label: "attendees in 2025" },
  { value: "18", label: "partner organisations" },
];

export interface EventKind {
  id: string;
  cadence: string;
  title: string;
  description: string;
}

export const eventKinds: EventKind[] = [
  {
    id: "hackathons",
    cadence: "Quarterly",
    title: "Hackathons",
    description:
      "48-hour builds run with ecosystem partners, judged by working engineers.",
  },
  {
    id: "meetups",
    cadence: "Monthly",
    title: "Community meetups",
    description:
      "Open nights in Jos — talks, demos, and the room that keeps this going.",
  },
  {
    id: "workshops",
    cadence: "Fortnightly",
    title: "Workshops",
    description:
      "Short, hands-on sessions on one specific technique or tool.",
  },
  {
    id: "demo-days",
    cadence: "Per cohort",
    title: "Demo days",
    description:
      "Internal project reviews where teams defend their work before ProdFest.",
  },
  {
    id: "past-events",
    cadence: "Archive",
    title: "Past events",
    description:
      "Everything we've run since 2024, with recordings and project links.",
  },
];

export interface PastEvent {
  date: string;
  title: string;
  meta: string;
  kind: string;
}

export const pastEvents: PastEvent[] = [
  {
    date: "NOV 2025",
    title: "ProdFest 2025",
    meta: "12 teams · 400+ attendees",
    kind: "Flagship",
  },
  {
    date: "SEP 2025",
    title: "Base Builder Hackathon",
    meta: "9 teams · 48 hours",
    kind: "Hackathon",
  },
  {
    date: "JUL 2025",
    title: "Cohort II Demo Day",
    meta: "115 graduates assessed",
    kind: "Demo day",
  },
  {
    date: "MAY 2025",
    title: "Applied AI Workshop Series",
    meta: "6 sessions · 210 seats",
    kind: "Workshop",
  },
  {
    date: "FEB 2025",
    title: "Jos Tech Meetup #14",
    meta: "Open night · 120 attendees",
    kind: "Meetup",
  },
];

/* ─────────────────────────────────────────────────────────────
   Team
   ───────────────────────────────────────────────────────────── */

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Sarah Bulus",
    role: "Founder & Programme Director",
    bio: "Runs admissions and sets the assessment standard every cohort is measured against.",
  },
  {
    name: "Ibrahim Lawal",
    role: "Head of Engineering",
    bio: "Leads the residency programme and reviews production work coming out of it.",
  },
  {
    name: "Chidi Okeke",
    role: "Lead Instructor, Blockchain",
    bio: "Smart contracts and protocol systems. Ten years shipping on-chain.",
  },
  {
    name: "Mariam Adamu",
    role: "Lead Instructor, Applied AI",
    bio: "Takes students from using AI tools to engineering reliable AI systems.",
  },
  {
    name: "David Terver",
    role: "Engineering Manager, Residency",
    bio: "Supervises resident engineers on client and open source work.",
  },
  {
    name: "Nneka Eze",
    role: "Head of Talent",
    bio: "Places assessed graduates with hiring partners across Africa and remote teams.",
  },
  {
    name: "Yakubu Musa",
    role: "Community Lead",
    bio: "Runs meetups, hackathons, and everything that happens around ProdFest.",
  },
  {
    name: "Esther Dung",
    role: "Operations Lead",
    bio: "Keeps cohorts, venues, and the assessment calendar running to schedule.",
  },
];

/* ─────────────────────────────────────────────────────────────
   Alumni
   ───────────────────────────────────────────────────────────── */

export interface Alumnus {
  name: string;
  cohort: string;
  track: string;
  now: string;
}

export const alumni: Alumnus[] = [
  {
    name: "Amina Bello",
    cohort: "Cohort II",
    track: "Blockchain Engineering",
    now: "Smart contract engineer, remote protocol team",
  },
  {
    name: "Tunde Adeyemi",
    cohort: "Cohort II",
    track: "Applied AI Engineering",
    now: "ML engineer at a Lagos fintech",
  },
  {
    name: "Grace Iorliam",
    cohort: "Cohort I",
    track: "AI-Native Software Engineering",
    now: "Frontend engineer, Blockfuse residency",
  },
  {
    name: "Samuel Okoro",
    cohort: "Cohort I",
    track: "Blockchain Engineering",
    now: "Founder, on-chain payments startup",
  },
  {
    name: "Halima Yusuf",
    cohort: "Cohort II",
    track: "AI-Native Software Engineering",
    now: "Product engineer at a health-tech team",
  },
  {
    name: "Peter Danjuma",
    cohort: "Cohort II",
    track: "Applied AI Engineering",
    now: "Building an agriculture forecasting tool",
  },
  {
    name: "Zainab Musa",
    cohort: "Cohort I",
    track: "Applied AI Engineering",
    now: "Data engineer, telecoms",
  },
  {
    name: "Emeka Nwosu",
    cohort: "Cohort II",
    track: "Blockchain Engineering",
    now: "Protocol contributor, ecosystem grant",
  },
  {
    name: "Ruth Pam",
    cohort: "Cohort I",
    track: "AI-Native Software Engineering",
    now: "Backend engineer, logistics platform",
  },
  {
    name: "Daniel Gyang",
    cohort: "Cohort II",
    track: "AI-Native Software Engineering",
    now: "Blockfuse teaching assistant",
  },
  {
    name: "Fatima Sani",
    cohort: "Cohort II",
    track: "Applied AI Engineering",
    now: "Applied AI resident",
  },
  {
    name: "Joshua Ayuba",
    cohort: "Cohort I",
    track: "Blockchain Engineering",
    now: "Security reviewer, audit collective",
  },
];

export const alumniFilters = [
  "All",
  "Cohort I",
  "Cohort II",
  "Blockchain Engineering",
  "Applied AI Engineering",
  "AI-Native Software Engineering",
];

/* ─────────────────────────────────────────────────────────────
   Blog
   ───────────────────────────────────────────────────────────── */

export interface Post {
  meta: string;
  title: string;
  excerpt: string;
}

export const featuredPost: Post = {
  meta: "Engineering · 12 min read",
  title: "What we mean when we say an engineer is assessed",
  excerpt:
    "Certificates record attendance. We spent two cohorts building a rubric that records ability instead — across coding, AI-assisted development, testing, system design, problem-solving, and communication. Here is how it works, and what it costs to run honestly.",
};

export const sidePosts: Post[] = [
  {
    meta: "Cohort notes · 6 min",
    title: "Cohort II in numbers",
    excerpt:
      "115 graduates, 500+ contracts, and the parts of the curriculum we cut.",
  },
  {
    meta: "Applied AI · 9 min",
    title: "Teaching AI-assisted development without teaching shortcuts",
    excerpt:
      "Students ship faster with AI. Getting them to still understand the code is the work.",
  },
  {
    meta: "Community · 4 min",
    title: "Why ProdFest happens in Jos",
    excerpt: "Talent is not the constraint here. Proximity to opportunity is.",
  },
];

export const morePosts: Post[] = [
  {
    meta: "Blockchain · 11 min",
    title: "A review checklist for first smart contracts",
    excerpt:
      "The eight mistakes that appear in nearly every student's first contract.",
  },
  {
    meta: "Careers · 7 min",
    title: "What hiring partners actually ask us",
    excerpt:
      "Two years of questions from companies, and what they reveal about the market.",
  },
  {
    meta: "Open source · 5 min",
    title: "Running an open source programme with students",
    excerpt:
      "Maintainer load, review standards, and how we onboard contributors in batches.",
  },
];

/* ─────────────────────────────────────────────────────────────
   Open source
   ───────────────────────────────────────────────────────────── */

export interface Repo {
  name: string;
  lang: string;
  description: string;
  stars: number;
  forks: number;
  updated: string;
  activity: number[];
}

export const repos: Repo[] = [
  {
    name: "blockfuse/contract-kit",
    lang: "Solidity",
    description:
      "Audited base contracts and test harnesses used across cohort projects.",
    stars: 412,
    forks: 87,
    updated: "2d ago",
    activity: [4, 9, 6, 12, 8, 14, 7, 11, 16, 9, 13, 18],
  },
  {
    name: "blockfuse/curriculum",
    lang: "MDX",
    description:
      "Every module we teach, in the open — exercises, rubrics, and reading.",
    stars: 968,
    forks: 214,
    updated: "5h ago",
    activity: [8, 6, 11, 7, 13, 9, 15, 12, 8, 17, 11, 14],
  },
  {
    name: "blockfuse/agent-lab",
    lang: "Python",
    description:
      "Evaluation harness for the applied AI track's agent assignments.",
    stars: 233,
    forks: 41,
    updated: "1w ago",
    activity: [3, 7, 5, 9, 12, 6, 10, 8, 14, 7, 9, 11],
  },
  {
    name: "blockfuse/assess",
    lang: "TypeScript",
    description:
      "The assessment platform that produces graduate ability records.",
    stars: 187,
    forks: 29,
    updated: "3d ago",
    activity: [6, 10, 8, 5, 11, 14, 9, 7, 12, 15, 10, 13],
  },
  {
    name: "blockfuse/jos-dev-map",
    lang: "TypeScript",
    description:
      "Community-maintained directory of developers and teams in Plateau State.",
    stars: 96,
    forks: 33,
    updated: "2w ago",
    activity: [2, 5, 3, 8, 4, 7, 9, 5, 6, 10, 4, 8],
  },
  {
    name: "blockfuse/prodfest-site",
    lang: "Next.js",
    description:
      "The ProdFest event platform — submissions, judging, and the live stage board.",
    stars: 74,
    forks: 18,
    updated: "4d ago",
    activity: [5, 3, 9, 6, 11, 8, 4, 10, 7, 12, 6, 9],
  },
];

export interface ContribStep {
  n: string;
  title: string;
  body: string;
}

export const contribSteps: ContribStep[] = [
  {
    n: "01",
    title: "Pick a good first issue",
    body: "Every repo keeps a labelled queue sized for a first contribution.",
  },
  {
    n: "02",
    title: "Get a maintainer",
    body: "You're assigned a resident engineer who reviews your branch.",
  },
  {
    n: "03",
    title: "Ship to review standard",
    body: "Tests, a clear description, and no unexplained magic. Same bar as client work.",
  },
  {
    n: "04",
    title: "Get it on your record",
    body: "Merged work counts toward your assessment and shows on your profile.",
  },
];

export function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}
