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
