export interface Alumnus {
  id: string | number;
  name: string;
  cohort: string;
  track: string;
  now: string;
  image?: string;
  imageFocus?: "center" | "right";
  social: {
    platform: "LinkedIn" | "X" | "Discord" | "GitHub";
    url: string;
  };
}

export const linkedinSearch = (name: string) =>
  `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(name)}`;

export const alumniFilters = [
  "All",
  "Cohort I",
  "Cohort II",
  "Cohort III",
  "Blockchain Engineering",
  "Applied AI Engineering",
  "AI-Native Software Engineering",
];