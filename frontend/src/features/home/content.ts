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
      "We connect qualified graduates with hiring partners, mentors, and opportunities—including a stage for their own products at ProdFest.",
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
  "Hire qualified Blockfuse graduates",
  "Engage engineers for contract or embedded roles",
  "Sponsor a talent pipeline for specific skills",
  "Train and upskill existing engineering teams",
  "Support access to technology careers through sponsored cohorts",
];
