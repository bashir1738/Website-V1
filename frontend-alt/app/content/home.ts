export interface MetricStat {
  value: string;
  label: string;
  tag: string;
}

export const stats: MetricStat[] = [
  {
    value: "115+",
    label: "Vetted Web3 & AI engineers ready for deployment",
    tag: "ENGINEERS",
  },
  {
    value: "500+",
    label: "Smart contracts engineered and security-tested",
    tag: "CONTRACTS",
  },
  {
    value: "12+",
    label: "Production-grade dApps shipped for ecosystems",
    tag: "APPLICATIONS",
  },
  {
    value: "2 Years",
    label: "Operating our physical production workspace in Jos",
    tag: "PHYSICAL LAB",
  },
];

export interface EngineeringCapability {
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  href: string;
}

export const engineeringCapabilities: EngineeringCapability[] = [
  {
    title: "Protocol & Smart Contract Development",
    tagline: "EVM & Solana / Security-First",
    description:
      "Design, build, and verify high-throughput smart contracts and decentralized protocols. Built with rigorous unit testing, formal verification patterns, and security audit readiness.",
    techStack: ["Solidity", "Rust / Anchor", "Foundry", "Hardhat", "Viem / Ethers"],
    href: "/engineering",
  },
  {
    title: "Full-Stack Decentralized Applications",
    tagline: "Production dApps & Subgraphs",
    description:
      "End-to-end Web3 web applications built for speed, seamless wallet connections, real-time data indexing, and high-performance RPC interaction.",
    techStack: ["Next.js", "TypeScript", "The Graph", "Subgraphs", "Wallet Standard"],
    href: "/engineering",
  },
  {
    title: "Applied AI & Web3 Autonomous Systems",
    tagline: "AI Agents & On-Chain Inference",
    description:
      "Architect autonomous AI agents, automated on-chain execution bots, intelligent copy-trading systems, and RAG pipelines integrated into Web3 products.",
    techStack: ["Python", "LangChain", "LLMs", "Vector DBs", "Automated Agents"],
    href: "/engineering",
  },
  {
    title: "Dedicated Web3 Talent Pods",
    tagline: "Vetted Staff Augmentation",
    description:
      "Scale your engineering velocity with pre-vetted senior and mid-level Web3 engineers who integrate directly into your sprint cycles.",
    techStack: ["Full-Stack", "Backend", "Smart Contracts", "AI Integration"],
    href: "/talent",
  },
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
    href: "/talent",
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
