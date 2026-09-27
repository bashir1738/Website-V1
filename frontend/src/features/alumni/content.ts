export type AlumnusPlatform = "LinkedIn" | "X" | "Discord" | "GitHub";

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
  /** Only the profiles the alumnus actually supplied — never a guessed or
   *  searched-for URL, so an empty list means "not published", not "missing". */
  links?: {
    platform: AlumnusPlatform;
    url: string;
  }[];
}

/** Roman numerals sort alphabetically as I, II, III, VIII — order them properly. */
const COHORT_ORDER = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
];

const byCohort = (a: string, b: string) => {
  const rank = (value: string) => {
    const numeral = value.split(" ").pop()?.toUpperCase() ?? "";
    const index = COHORT_ORDER.indexOf(numeral);
    return index === -1 ? COHORT_ORDER.length : index;
  };
  return rank(a) - rank(b) || a.localeCompare(b);
};

const unique = (values: (string | undefined)[]) => [
  ...new Set(values.map((v) => v?.trim()).filter((v): v is string => Boolean(v))),
];

/**
 * Filter pills built from the roster itself rather than a hand-kept list — a
 * track or cohort the backend actually holds can never become unfilterable.
 * "All" leads; cohorts and tracks are returned as separate groups so the UI
 * can tell them apart.
 */
export function alumniFiltersFor(alumni: Alumnus[]) {
  const cohorts = unique(alumni.map((a) => a.cohort)).sort(byCohort);
  // A cohort and a track sharing a name would render as two identical pills and
  // only the first would be reachable, so the track duplicate is dropped.
  const tracks = unique(alumni.map((a) => a.track))
    .filter((track) => !cohorts.includes(track))
    .sort((a, b) => a.localeCompare(b));

  return { all: alumni.length, cohorts, tracks };
}
