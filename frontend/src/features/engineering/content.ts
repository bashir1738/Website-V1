export interface ProductHighlight {
  name: string;
  tag: string;
  description: string;
  proof: string;
}

/** Real products and tools shipped and maintained by Blockfuse Labs engineers. */
export const productHighlights: ProductHighlight[] = [
  {
    name: "Contract Kit",
    tag: "Solidity",
    description:
      "Audited base contracts and test harnesses used across client and cohort projects alike.",
    proof: "412 stars · 87 forks",
  },
  {
    name: "Assess",
    tag: "TypeScript",
    description:
      "The assessment platform that produces every graduate's verified ability record.",
    proof: "187 stars · 29 forks",
  },
  {
    name: "Agent Lab",
    tag: "Python",
    description:
      "Evaluation harness for applied AI systems — agentic workflows, retrieval, and tool use.",
    proof: "233 stars · 41 forks",
  },
  {
    name: "Curriculum",
    tag: "MDX",
    description:
      "Every module we teach, maintained in the open — exercises, rubrics, and reading.",
    proof: "968 stars · 214 forks",
  },
  {
    name: "ProdFest Platform",
    tag: "Next.js",
    description:
      "The ProdFest event platform — submissions, judging, and the live stage board.",
    proof: "74 stars · 18 forks",
  },
  {
    name: "Jos Dev Map",
    tag: "TypeScript",
    description:
      "Community-maintained directory of developers and teams across Plateau State.",
    proof: "96 stars · 33 forks",
  },
];

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

export interface DeliveryPrinciple {
  eyebrow: string;
  title: string;
  copy: string;
  fine: string;
}

/** How an engagement is staffed, owned, and handed back. */
export const deliveryPrinciples: DeliveryPrinciple[] = [
  {
    eyebrow: "Senior accountability",
    title: "Senior-led with supervised residency",
    copy: "Every engagement is led by a senior engineer who owns the technical decisions, the quality, and your relationship with us. Residents from the Academy work underneath that leadership on real tasks, reviewed, supervised, and never billed as senior time.",
    fine: "It is how engineers here get genuinely good, and it is reflected in what we charge.",
  },
  {
    eyebrow: "IP & discretion",
    title: "Your IP remains strictly yours",
    copy: "Your code, your infrastructure, your IP, and your roadmap are yours. We ask before we put your name on anything, and a good deal of the work we do is never mentioned at all.",
    fine: "Delivered into your accounts with documentation written for clean handover.",
  },
  {
    eyebrow: "Focus & standards",
    title: "We take few of these",
    copy: "Every project needs the right senior lead, a clear problem, and a realistic path to delivery. We take on a small number of engagements and staff them properly rather than many and thinly. If the fit is wrong we will say so early.",
    fine: "If what you need is more engineers inside your own team, hiring from the network is the better route.",
  },
];

export interface HiringModel {
  title: string;
  copy: string;
  fine: string;
  ctaText: string;
  href: string;
}

/** The four ways an organisation engages Blockfuse Labs engineers. */
export const hiringModels: HiringModel[] = [
  {
    title: "Direct hiring",
    copy: "Tell us about the role, required skills, experience level, working arrangement, and hiring timeline. We shortlist suitable engineers, provide their verified profiles and portfolios, and support the interview process. You employ the successful candidate directly.",
    fine: "A placement fee applies only when you make a successful hire.",
    ctaText: "Hire an engineer",
    href: "/contact?intent=direct-hire",
  },
  {
    title: "Embedded engineers",
    copy: "Engage a Blockfuse Labs engineer on contract without immediately adding a permanent employee. The engineer joins your team, follows your technical direction, and works within your existing processes while Blockfuse Labs manages the engagement.",
    fine: "You manage the product. We support the engineer.",
    ctaText: "Discuss an embedded engagement",
    href: "/contact?intent=embedded",
  },
  {
    title: "Sponsored talent pipelines",
    copy: "Sponsor a cohort designed around the technologies and capabilities your company or ecosystem needs. Blockfuse Labs manages recruitment, selection, training, projects, assessment, and outcome reporting.",
    fine: "Your organisation receives early access to engineers who meet the standard.",
    ctaText: "Sponsor seats or a cohort",
    href: "/contact?intent=sponsor",
  },
  {
    title: "Team training",
    copy: "Develop the engineers you already have with custom programs built around your team's objectives, skill level, and stack.",
    fine: "AI-assisted development, reliable LLM applications, cloud and backend, smart contract security, modern testing.",
    ctaText: "Train your team",
    href: "/contact?intent=team-training",
  },
];

export interface EngineeringCapability {
  title: string;
  tagline: string;
  description: string;
  techs: string[];
}

export const engineeringCapabilities: EngineeringCapability[] = [
  {
    title: "Protocol & Smart Contract Development",
    tagline: "EVM & Solana / Security-First",
    description: "Design, build, and verify high-throughput smart contracts and decentralized protocols. Built with rigorous unit testing, formal verification patterns, and security audit readiness.",
    techs: ["Solidity", "Rust / Anchor", "Foundry", "Hardhat", "Viem / Ethers"],
  },
  {
    title: "Full-Stack Decentralized Applications",
    tagline: "Production dApps & Subgraphs",
    description: "End-to-end Web3 web applications built for speed, seamless wallet connections, real-time data indexing, and high-performance RPC interaction.",
    techs: ["Next.js", "TypeScript", "The Graph", "Subgraphs", "Wallet Standard"],
  },
  {
    title: "Applied AI & Web3 Autonomous Systems",
    tagline: "AI Agents & On-Chain Inference",
    description: "Architect autonomous AI agents, automated on-chain execution bots, intelligent copy-trading systems, and RAG pipelines integrated into Web3 products.",
    techs: ["Python", "LangChain", "LLMs", "Vector DBs", "Automated Agents"],
  },
  {
    title: "Infrastructure & DevOps",
    tagline: "Scalable Backend Systems",
    description: "Production infrastructure for Web3 systems including RPC nodes, indexers, monitoring stacks, and deployment pipelines optimized for high-throughput, low-latency systems.",
    techs: ["Kubernetes", "Docker", "AWS / GCP", "Monitoring", "CI/CD Pipelines"],
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processsteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Architecture",
    description: "Deep dive on your requirements, token economics, protocol design, and technical constraints.",
  },
  {
    step: "02",
    title: "Design & Scoping",
    description: "Comprehensive technical specification, system diagrams, and development roadmap with senior architect oversight.",
  },
  {
    step: "03",
    title: "Development & Testing",
    description: "Iterative development with daily standups, rigorous unit testing, integration tests, and staged audits.",
  },
  {
    step: "04",
    title: "Audit & Security Review",
    description: "Full formal verification patterns, security audits, and vulnerability assessments before production deployment.",
  },
  {
    step: "05",
    title: "Production Deployment",
    description: "Mainnet deployment, monitoring setup, incident response playbooks, and ongoing technical support.",
  },
];
