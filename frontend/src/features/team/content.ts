export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string | null;
  slug?: string;
  social?: {
    twitter?: string | null;
    github?: string | null;
    linkedin?: string | null;
    warpcast?: string | null;
  };
}

/** Public team directory (separate host from NEXT_PUBLIC_API_URL). */
export const TEAM_API_URL = "https://api.blockfuselabs.com/api/team";

interface BackendTeam {
  id: number;
  fullname: string;
  position: string;
  about: string | null;
  image: string | null;
  slug: string;
  twitter: string | null;
  github: string | null;
  linkedin: string | null;
  warpcast: string | null;
}

function toMember(member: BackendTeam): TeamMember {
  return {
    name: (member.fullname || "").trim(),
    role: (member.position || "").trim(),
    bio: (member.about || "").trim(),
    image: member.image,
    slug: member.slug,
    social: {
      twitter: member.twitter || null,
      github: member.github || null,
      linkedin: member.linkedin || null,
      warpcast: member.warpcast || null,
    },
  };
}

/** Fetch-only: roster comes from the team API, never a static fallback. */
export async function loadTeam(): Promise<TeamMember[]> {
  try {
    const res = await fetch(TEAM_API_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const json = (await res.json()) as {
      message?: string;
      teams?: BackendTeam[];
    };
    if (Array.isArray(json.teams)) {
      return json.teams.map(toMember).filter((m) => m.name);
    }
  } catch {
    // API unreachable or TLS handshake failed — the page renders the empty state.
  }
  return [];
}

/** Used by static marketing blocks when live data is not available. */
export const teamMembers: TeamMember[] = [];
