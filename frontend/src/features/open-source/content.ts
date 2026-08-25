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
