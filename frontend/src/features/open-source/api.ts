import type { Repo } from "./content";

interface GitHubRepo {
  full_name?: string;
  html_url?: string;
  description?: string | null;
  language?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  license?: { spdx_id?: string | null } | null;
  topics?: string[];
  pushed_at?: string;
  archived?: boolean;
}

const REPOS_URL = (process.env.GITHUB_REPOS_URL ?? "").trim();
const GITHUB_TOKEN = (process.env.GITHUB_TOKEN ?? "").trim();

const FALLBACK_LANG = "Other";
const FALLBACK_DESCRIPTION = "No description yet — open the repo on GitHub to see what's inside.";

function timeAgo(iso: string): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "";
  const secs = Math.max(0, Math.floor((Date.now() - then) / 1000));
  const units: [number, string][] = [
    [31_536_000, "y"],
    [2_592_000, "mo"],
    [604_800, "w"],
    [86_400, "d"],
    [3_600, "h"],
    [60, "m"],
  ];
  for (const [size, label] of units) {
    if (secs >= size) return `${Math.floor(secs / size)}${label} ago`;
  }
  return "just now";
}

function licenseOf(repo: GitHubRepo): string {
  const id = repo.license?.spdx_id ?? "";
  return id && id !== "NOASSERTION" ? id : "";
}

function descriptionOf(repo: GitHubRepo): string {
  if (repo.description?.trim()) return repo.description.trim();
  const topics = (repo.topics ?? []).filter(Boolean);
  return topics.length ? topics.slice(0, 4).join(" · ") : FALLBACK_DESCRIPTION;
}

function toRepo(repo: GitHubRepo): Repo {
  const pushed = repo.pushed_at ?? "";
  return {
    name: repo.full_name ?? "",
    lang: repo.language?.trim() || FALLBACK_LANG,
    description: descriptionOf(repo),
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    updated: pushed ? timeAgo(pushed) : "",
    url: repo.html_url ?? "",
    license: licenseOf(repo),
    topics: (repo.topics ?? []).filter(Boolean),
  };
}

export async function loadRepos(): Promise<Repo[]> {
  if (!REPOS_URL) return [];

  try {
    const res = await fetch(REPOS_URL, {
      headers: {
        accept: "application/vnd.github+json",
        ...(GITHUB_TOKEN ? { authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) return [];

    const data: unknown = await res.json();
    if (!Array.isArray(data)) return [];

    return (data as GitHubRepo[])
      .filter((repo) => Boolean(repo?.full_name && repo?.html_url) && !repo.archived)
      .sort(
        (a, b) =>
          Date.parse(b.pushed_at ?? "") - Date.parse(a.pushed_at ?? ""),
      )
      .map(toRepo)
      .filter((repo) => Boolean(repo.name));
  } catch {
    return [];
  }
}
