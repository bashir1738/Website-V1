import https from "node:https";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string | null;
  slug: string;
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

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toMember(member: BackendTeam): TeamMember {
  const name = (member.fullname || "").trim();
  return {
    name,
    role: (member.position || "").trim(),
    bio: (member.about || "").trim(),
    image: member.image,
    slug: (member.slug || "").trim() || slugify(name),
    social: {
      twitter: member.twitter || null,
      github: member.github || null,
      linkedin: member.linkedin || null,
      warpcast: member.warpcast || null,
    },
  };
}

/**
 * Server-side GET for the team API.
 *
 * - family: 4 — this host's AAAA is a NAT64 prefix that Node cannot reach
 *   (Happy Eyeballs then sits on ETIMEDOUT).
 * - rejectUnauthorized: false — ZeroSSL cert on api.blockfuselabs.com expired
 *   2026-09-09. Remove this once the cert is renewed.
 */
function getTeamJson(timeoutMs = 12000): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const url = new URL(TEAM_API_URL);
    const req = https.request(
      {
        hostname: url.hostname,
        path: `${url.pathname}${url.search}`,
        method: "GET",
        family: 4,
        servername: url.hostname,
        rejectUnauthorized: false,
        headers: { Accept: "application/json" },
        timeout: timeoutMs,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`Team API ${res.statusCode}`));
            return;
          }
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
          } catch (err) {
            reject(err);
          }
        });
      },
    );
    req.on("timeout", () => req.destroy(new Error("Team API timeout")));
    req.on("error", reject);
    req.end();
  });
}

/** Fetch-only: roster comes from the team API, never a static fallback. */
export async function loadTeam(): Promise<TeamMember[]> {
  try {
    const json = (await getTeamJson()) as {
      message?: string;
      teams?: BackendTeam[];
    };
    if (Array.isArray(json.teams)) {
      return json.teams.map(toMember).filter((m) => m.name);
    }
  } catch {
    // API unreachable — the page renders the empty state.
  }
  return [];
}

/** Single member by API slug (or name slug fallback). */
export async function loadTeamMember(slug: string): Promise<TeamMember | null> {
  const team = await loadTeam();
  const wanted = slug.toLowerCase();
  return team.find((m) => m.slug.toLowerCase() === wanted) ?? null;
}

/** Used by static marketing blocks when live data is not available. */
export const teamMembers: TeamMember[] = [];
