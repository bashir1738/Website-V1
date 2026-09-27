import { API_URL } from "@/lib/api";
import type { Alumnus } from "./content";

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
  /** Compulsory on submission; '' for profiles published before it was collected. */
  x_account: string | null;
  photo_url: string | null;
}

/** Maps one public API profile onto every field the site renders. */
export function toAlumnus(profile: ApprovedAlumnus): Alumnus {
  // Only links the alumnus actually published. A blank or absent account is
  // omitted rather than replaced with a search URL, so a card never presents
  // "find this person" as if it were their own profile.
  const links: NonNullable<Alumnus["links"]> = [];
  if (profile.linkedin?.trim()) {
    links.push({ platform: "LinkedIn", url: profile.linkedin.trim() });
  }
  if (profile.github?.trim()) {
    links.push({ platform: "GitHub", url: profile.github.trim() });
  }
  if (profile.x_account?.trim()) {
    links.push({ platform: "X", url: profile.x_account.trim() });
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
