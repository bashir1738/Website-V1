export interface Alumnus {
  name: string;
  cohort: string;
  track: string;
  now: string;
  image?: string;
  imageFocus?: "center" | "right";
  social: {
    platform: "LinkedIn" | "X" | "Discord";
    url: string;
  };
}

const linkedinSearch = (name: string) =>
  `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(name)}`;

export const alumni: Alumnus[] = [
  {
    name: "Amina Bello",
    cohort: "Cohort II",
    track: "Blockchain Engineering",
    now: "Smart contract engineer, remote protocol team",
    image: "/brand/IMG_1599.JPG",
    social: { platform: "LinkedIn", url: linkedinSearch("Amina Bello") },
  },
  {
    name: "Tunde Adeyemi",
    cohort: "Cohort II",
    track: "Applied AI Engineering",
    now: "ML engineer at a Lagos fintech",
    image: "/brand/IMG_1600.JPG",
    social: { platform: "LinkedIn", url: linkedinSearch("Tunde Adeyemi") },
  },
  {
    name: "Grace Iorliam",
    cohort: "Cohort I",
    track: "AI-Native Software Engineering",
    now: "Frontend engineer, Blockfuse residency",
    image: "/brand/IMG_1604.JPG",
    social: { platform: "LinkedIn", url: linkedinSearch("Grace Iorliam") },
  },
  {
    name: "Samuel Okoro",
    cohort: "Cohort I",
    track: "Blockchain Engineering",
    now: "Founder, on-chain payments startup",
    image: "/brand/IMG_1607.JPG",
    social: { platform: "LinkedIn", url: linkedinSearch("Samuel Okoro") },
  },
  {
    name: "Halima Yusuf",
    cohort: "Cohort II",
    track: "AI-Native Software Engineering",
    now: "Product engineer at a health-tech team",
    image: "/brand/IMG_1608.JPG",
    social: { platform: "LinkedIn", url: linkedinSearch("Halima Yusuf") },
  },
  {
    name: "Peter Danjuma",
    cohort: "Cohort II",
    track: "Applied AI Engineering",
    now: "Building an agriculture forecasting tool",
    image: "/brand/IMG_1611.JPG",
    social: { platform: "LinkedIn", url: linkedinSearch("Peter Danjuma") },
  },
  {
    name: "Zainab Musa",
    cohort: "Cohort I",
    track: "Applied AI Engineering",
    now: "Data engineer, telecoms",
    image: "/brand/DSC02305.jpg",
    imageFocus: "right",
    social: { platform: "LinkedIn", url: linkedinSearch("Zainab Musa") },
  },
  {
    name: "Emeka Nwosu",
    cohort: "Cohort II",
    track: "Blockchain Engineering",
    now: "Protocol contributor, ecosystem grant",
    image: "/brand/DSC02308.jpg",
    social: { platform: "LinkedIn", url: linkedinSearch("Emeka Nwosu") },
  },
  {
    name: "Ruth Pam",
    cohort: "Cohort I",
    track: "AI-Native Software Engineering",
    now: "Backend engineer, logistics platform",
    image: "/brand/DSC09798.jpg",
    social: { platform: "LinkedIn", url: linkedinSearch("Ruth Pam") },
  },
  {
    name: "Daniel Gyang",
    cohort: "Cohort II",
    track: "AI-Native Software Engineering",
    now: "Blockfuse teaching assistant",
    image: "/brand/DSC09850.jpg",
    social: { platform: "LinkedIn", url: linkedinSearch("Daniel Gyang") },
  },
  {
    name: "Fatima Sani",
    cohort: "Cohort II",
    track: "Applied AI Engineering",
    now: "Applied AI resident",
    image: "/brand/DSC09854.jpg",
    social: { platform: "LinkedIn", url: linkedinSearch("Fatima Sani") },
  },
  {
    name: "Joshua Ayuba",
    cohort: "Cohort I",
    track: "Blockchain Engineering",
    now: "Security reviewer, audit collective",
    image: "/brand/DSC09885.jpg",
    social: { platform: "LinkedIn", url: linkedinSearch("Joshua Ayuba") },
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
