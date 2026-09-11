export interface Alumnus {
  name: string;
  cohort: string;
  track: string;
  now: string;
  image?: string;
  imageFocus?: "center" | "right";
}

export const alumni: Alumnus[] = [
  {
    name: "Amina Bello",
    cohort: "Cohort II",
    track: "Blockchain Engineering",
    now: "Smart contract engineer, remote protocol team",
    image: "/brand/IMG_1599.JPG",
  },
  {
    name: "Tunde Adeyemi",
    cohort: "Cohort II",
    track: "Applied AI Engineering",
    now: "ML engineer at a Lagos fintech",
    image: "/brand/IMG_1600.JPG",
  },
  {
    name: "Grace Iorliam",
    cohort: "Cohort I",
    track: "AI-Native Software Engineering",
    now: "Frontend engineer, Blockfuse residency",
    image: "/brand/IMG_1604.JPG",
  },
  {
    name: "Samuel Okoro",
    cohort: "Cohort I",
    track: "Blockchain Engineering",
    now: "Founder, on-chain payments startup",
    image: "/brand/IMG_1607.JPG",
  },
  {
    name: "Halima Yusuf",
    cohort: "Cohort II",
    track: "AI-Native Software Engineering",
    now: "Product engineer at a health-tech team",
    image: "/brand/IMG_1608.JPG",
  },
  {
    name: "Peter Danjuma",
    cohort: "Cohort II",
    track: "Applied AI Engineering",
    now: "Building an agriculture forecasting tool",
    image: "/brand/IMG_1611.JPG",
  },
  {
    name: "Zainab Musa",
    cohort: "Cohort I",
    track: "Applied AI Engineering",
    now: "Data engineer, telecoms",
    image: "/brand/DSC02305.jpg",
    imageFocus: "right",
  },
  {
    name: "Emeka Nwosu",
    cohort: "Cohort II",
    track: "Blockchain Engineering",
    now: "Protocol contributor, ecosystem grant",
    image: "/brand/DSC02308.jpg",
  },
  {
    name: "Ruth Pam",
    cohort: "Cohort I",
    track: "AI-Native Software Engineering",
    now: "Backend engineer, logistics platform",
    image: "/brand/DSC09798.jpg",
  },
  {
    name: "Daniel Gyang",
    cohort: "Cohort II",
    track: "AI-Native Software Engineering",
    now: "Blockfuse teaching assistant",
    image: "/brand/DSC09850.jpg",
  },
  {
    name: "Fatima Sani",
    cohort: "Cohort II",
    track: "Applied AI Engineering",
    now: "Applied AI resident",
    image: "/brand/DSC09854.jpg",
  },
  {
    name: "Joshua Ayuba",
    cohort: "Cohort I",
    track: "Blockchain Engineering",
    now: "Security reviewer, audit collective",
    image: "/brand/DSC09885.jpg",
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
