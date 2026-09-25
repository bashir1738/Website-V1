export interface MetricStat {
  value: string;
  label: string;
}

export const stats: MetricStat[] = [
  {
    value: "797+",
    label: "Developers trained",
  },
  {
    value: "5,500+",
    label: "Smart contracts deployed",
  },
  {
    value: "57+",
    label: "Projects and dApps built",
  },
  {
    value: "3,620+",
    label: "Hours of technical training delivered",
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
      "We select people with the ability, commitment, and readiness to learn in a demanding, collaborative environment.",
  },
  {
    number: "2",
    title: "We train hard",
    description:
      "Build real projects to real deadlines, with direct feedback from working engineers in software, AI, and blockchain.",
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
      "Qualified students progress into supervised residency, gaining production experience alongside experienced engineers.",
  },
  {
    number: "5",
    title: "We open doors",
    description:
      "We connect qualified graduates with hiring partners, mentors, and opportunities, including a stage for their own products at ProdFest.",
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
    title: "Protocol & Smart Contract Development",
    tagline: "EVM & Solana / Security-First",
    description:
      "Design, build, and verify high-throughput smart contracts and decentralized protocols. Built with rigorous unit testing, formal verification patterns, and security audit readiness.",
    audience:
      "For teams building on EVM or Solana who need production-grade contracts with audit-ready standards.",
    href: "/engineering",
  },
  {
    title: "Full-Stack Decentralized Applications",
    tagline: "Production dApps & Subgraphs",
    description:
      "End-to-end Web3 web applications built for speed, seamless wallet connections, real-time data indexing, and high-performance RPC interaction.",
    audience:
      "For protocols and startups that need complete dApp delivery from smart contracts to polished frontend.",
    href: "/engineering",
  },
  {
    title: "Applied AI & Web3 Autonomous Systems",
    tagline: "AI Agents & On-Chain Inference",
    description:
      "Architect autonomous AI agents, automated on-chain execution bots, intelligent copy-trading systems, and RAG pipelines integrated into Web3 products.",
    audience:
      "For teams looking to embed AI-driven automation and intelligent agents into their Web3 infrastructure.",
    href: "/engineering",
  },
  {
    title: "Dedicated Web3 Talent Pods",
    tagline: "Vetted Staff Augmentation",
    description:
      "Scale your engineering velocity with pre-vetted senior and mid-level Web3 engineers who integrate directly into your sprint cycles.",
    audience:
      "For companies that need proven Web3 and AI engineers embedded into their team without the hiring overhead.",
    href: "/hire-engineers",
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

export interface ClosingPath {
  kicker: string;
  title: string;
  description: string;
  cta: string;
  href?: string;
  modal?: "hire" | "sponsor";
}

export const closingPaths: ClosingPath[] = [
  {
    kicker: "For learners",
    title: "Become an engineer worth hiring.",
    description:
      "Train through real products, deadlines, and direct technical review.",
    cta: "Explore the Academy",
    href: "/training",
  },
  {
    kicker: "For companies",
    title: "Add proven engineers to your team.",
    description:
      "Meet vetted builders trained to contribute inside production teams.",
    cta: "Hire our engineers",
    modal: "hire",
  },
  {
    kicker: "For companies",
    title: "Turn an ambitious idea into a shipped product.",
    description:
      "Work with our senior-led engineering studio from scope to delivery.",
    cta: "Start a project",
    href: "/engineering",
  },
  {
    kicker: "For partners",
    title: "Create more opportunities for African engineers.",
    description:
      "Support cohorts, events, and pathways from potential to production.",
    cta: "Partner with us",
    modal: "sponsor",
  },
];

export const orgWorkWithUsPoints = [
  "Hire qualified Blockfuse Labs graduates",
  "Engage engineers for contract or embedded roles",
  "Sponsor a talent pipeline for specific skills",
  "Train and upskill existing engineering teams",
  "Support access to technology careers through sponsored cohorts",
];

export interface WhyBlockfusePoint {
  title: string;
  description: string;
  tag: string;
}

export const whyBlockfusePoints: WhyBlockfusePoint[] = [
  {
    title: "Vetted by Production, Not Certificates",
    description:
      "Every engineer in our network passes rigorous peer code reviews, live debugging assessments, and production deployment benchmarks before joining client projects.",
    tag: "VERIFIED QUALITY",
  },
  {
    title: "100% Sovereign Code & IP Control",
    description:
      "All intellectual property, repositories, smart contract keys, and cloud infrastructure stay under direct client ownership from day one.",
    tag: "IP OWNERSHIP",
  },
  {
    title: "Senior-Led Delivery & Accountability",
    description:
      "Engagements are architected and supervised directly by senior engineers accountable for milestone execution, system security, and technical quality.",
    tag: "SENIOR ARCHITECTS",
  },
  {
    title: "Internal Talent Engine Advantage",
    description:
      "Unlike traditional agencies, our internal Jos Production Space acts as a continuous talent engine, producing battle-tested engineers aligned with global tech stacks.",
    tag: "TALENT ENGINE",
  },
];

export interface ProofStat {
  value: string;
  label: string;
  tag: string;
}

export const proofStats: ProofStat[] = [
  {
    value: "797+",
    label: "Developers trained",
    tag: "ENGINEERS",
  },
  {
    value: "5,500+",
    label: "Smart contracts deployed",
    tag: "CONTRACTS",
  },
  {
    value: "57+",
    label: "Projects and dApps built",
    tag: "PROJECTS",
  },
  {
    value: "3,620+",
    label: "Hours of technical training delivered",
    tag: "TRAINING",
  },
];

export interface EngagementModel {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  href: string;
}

export const engagementModels: EngagementModel[] = [
  {
    number: "01",
    title: "Managed Engineering Delivery",
    subtitle: "Turnkey Web3 & AI Systems",
    description:
      "Hand off complete project requirements to our senior engineering team for end-to-end design, smart contract development, frontend integration, and production deployment.",
    features: [
      "Technical architecture & scoping",
      "Smart contract development & testing",
      "Full-stack dApp interface & subgraphs",
      "Audit readiness & deployment support",
    ],
    ctaText: "Start a Project",
    href: "/engineering",
  },
  {
    number: "02",
    title: "Embedded Talent Pods",
    subtitle: "Vetted Staff Augmentation",
    description:
      "Embed pre-screened, high-performing Web3 and AI engineers directly into your sprint teams to accelerate product timelines without hiring overhead.",
    features: [
      "Pre-vetted across coding & system design",
      "Timezone aligned with global teams",
      "Immediate onboarding to your workflow",
      "Flexible scaling by month or quarter",
    ],
    ctaText: "Hire Engineers",
    href: "/hire-engineers",
  },
  {
    number: "03",
    title: "Custom Protocol Pipelines",
    subtitle: "Sponsored Ecosystem Talent",
    description:
      "Partner with Blockfuse Labs to sponsor specialized training cohorts tailored specifically to your blockchain protocol, SDK, or enterprise tech stack.",
    features: [
      "Custom curriculum built for your stack",
      "Direct developer ecosystem growth",
      "Guaranteed pipeline of skilled builders",
      "ProdFest stage showcase for ecosystem dApps",
    ],
    ctaText: "Sponsor a Pipeline",
    href: "/contact",
  },
];
