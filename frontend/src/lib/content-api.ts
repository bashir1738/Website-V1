/**
 * Shared base URL for the content APIs (team directory, articles).
 *
 * Server-only: set BLOCKFUSE_API_BASE_URL in .env / hosting env — the host is
 * never hardcoded here. Each feature appends its own suffix:
 *   /about/team     -> /team
 *   /community/blog -> /articles (+ /articles/:slug)
 */
export const CONTENT_API_BASE = (process.env.BLOCKFUSE_API_BASE_URL ?? "")
  .trim()
  .replace(/\/+$/, "");

/** Full URL for a content API path, or "" when the base is not configured. */
export function contentApiUrl(suffix: string): string {
  if (!CONTENT_API_BASE) return "";
  const path = suffix.startsWith("/") ? suffix : `/${suffix}`;
  return `${CONTENT_API_BASE}${path}`;
}
