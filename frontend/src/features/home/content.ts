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
