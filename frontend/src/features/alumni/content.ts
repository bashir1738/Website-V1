export interface Alumnus {
  id: string | number;
  name: string;
  cohort: string;
  track: string;
  now: string;
  /** Where they are based, when the profile supplied one. */
  location?: string;
  /** What the profile is open to (roles, mentoring, speaking…). */
  openTo?: string[];
  image?: string;
  imageFocus?: "center" | "right";
  /** Primary profile link. */
  social: {
    platform: "LinkedIn" | "X" | "Discord" | "GitHub";
    url: string;
  };
  /** Every public profile link, so cards can show all of them. */
  links?: {
    platform: "LinkedIn" | "X" | "Discord" | "GitHub";
    url: string;
  }[];
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