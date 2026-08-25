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
