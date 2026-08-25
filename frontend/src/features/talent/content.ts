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
