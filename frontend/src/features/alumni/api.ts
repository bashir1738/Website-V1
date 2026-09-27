import { API_URL } from "@/lib/api";
import { linkedinSearch, type Alumnus } from "./content";

export interface ApprovedAlumnus {
  id: number;
  name: string;
  cohort: string;
  track: string;
  current_status: string;
  location: string | null;
  open_to: string[] | null;
  github: string | null;
  linkedin: string | null;
  photo_url: string | null;
}

/** Maps one public API profile onto every field the site renders. */
export function toAlumnus(profile: ApprovedAlumnus): Alumnus {
  const links: NonNullable<Alumnus["links"]> = [];
  if (profile.linkedin) links.push({ platform: "LinkedIn", url: profile.linkedin });
  if (profile.github) links.push({ platform: "GitHub", url: profile.github });
  if (links.length === 0) {
    links.push({ platform: "LinkedIn", url: linkedinSearch(profile.name) });
  }

  return {
    id: profile.id,
    name: profile.name,
    cohort: profile.cohort,
    track: profile.track,
    now: profile.current_status,
    location: profile.location || undefined,
    openTo: profile.open_to ?? undefined,
    image: profile.photo_url || undefined,
    social: links[0],
    links,
  };
}

/**
 * Roster behind the rotating showcase (home page).
 *
 * Revalidated every 5 minutes so the route stays prerendered instead of
 * blocking on the backend per request. An unreachable backend yields [] and
 * the showcase hides itself — never a hardcoded roster.
 */
export async function loadApprovedAlumni(): Promise<Alumnus[]> {
  try {
    const res = await fetch(`${API_URL}/alumni-submissions/public`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    const json = (await res.json()) as {
      success: boolean;
      data: ApprovedAlumnus[];
    };
    if (json.success && Array.isArray(json.data)) {
      return json.data.map(toAlumnus);
    }
  } catch {
    // Backend unreachable — the caller renders without the showcase.
  }
  return [];
}
