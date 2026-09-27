import https from "node:https";
import { contentApiUrl } from "@/lib/content-api";

/** Blog-shaped record produced from an article returned by the articles API. */
export interface ArticleBlog {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  image_url: string | null;
  published_at: string | null;
  createdAt: string | null;
}

/**
 * Articles API: <BLOCKFUSE_API_BASE_URL>/articles (separate host from
 * NEXT_PUBLIC_API_URL). Server-only — the base lives in .env, never hardcoded.
 */
export const ARTICLES_API_URL = contentApiUrl("/articles");

interface RawArticle {
  id?: number;
  slug?: string;
  title?: string;
  content?: string;
  image?: string | null;
  author_name?: string | null;
  author?: string | { fullname?: string | null } | null;
  teamAuthor?: { fullname?: string | null } | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  is_published?: boolean;
}

/**
 * Server-side GET for the articles API.
 *
 * - family: 4 — this host's AAAA is a NAT64 prefix that Node cannot reach
 *   (Happy Eyeballs then sits on ETIMEDOUT).
 * - rejectUnauthorized: false — ZeroSSL cert on the articles API host expired
 *   2026-09-09. Remove this once the cert is renewed.
 */
function getJson(url: string, timeoutMs = 8000): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(
      {
        hostname: parsed.hostname,
        path: `${parsed.pathname}${parsed.search}`,
        method: "GET",
        family: 4,
        servername: parsed.hostname,
        rejectUnauthorized: false,
        headers: { Accept: "application/json" },
        timeout: timeoutMs,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`Articles API ${res.statusCode}`));
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
    req.on("timeout", () => req.destroy(new Error("Articles API timeout")));
    req.on("error", reject);
    req.end();
  });
}

function nameOf(author: RawArticle["author"]): string {
  if (typeof author === "string") return author.trim();
  return (author?.fullname ?? "").trim();
}

function toBlog(article: RawArticle): ArticleBlog | null {
  const slug = (article.slug ?? "").trim();
  const title = (article.title ?? "").trim();
  if (!slug || !title) return null;

  return {
    id: article.id ?? 0,
    title,
    slug,
    content: article.content ?? "",
    author:
      (article.author_name ?? "").trim() ||
      nameOf(article.author) ||
      (article.teamAuthor?.fullname ?? "").trim(),
    image_url: article.image || null,
    published_at: null,
    createdAt: article.createdAt || article.updatedAt || null,
  };
}

/** All articles, deduplicated by slug. Empty array when the API is unreachable. */
export async function loadArticles(): Promise<ArticleBlog[]> {
  if (!ARTICLES_API_URL) {
    console.error(
      "[blog] BLOCKFUSE_API_BASE_URL is not set — add it to frontend/.env (see .env.example).",
    );
    return [];
  }

  try {
    const json = (await getJson(ARTICLES_API_URL)) as {
      data?: { articles?: RawArticle[] };
    };
    const list = json?.data?.articles;
    if (!Array.isArray(list)) return [];

    const seen = new Set<string>();
    const articles: ArticleBlog[] = [];
    for (const raw of list) {
      const blog = toBlog(raw);
      if (!blog || seen.has(blog.slug)) continue;
      seen.add(blog.slug);
      articles.push(blog);
    }
    return articles;
  } catch {
    // API unreachable — callers keep whatever the primary source returned.
    return [];
  }
}

/** Single article by slug, or null when it does not exist. */
export async function loadArticle(slug: string): Promise<ArticleBlog | null> {
  if (!ARTICLES_API_URL || !slug) return null;

  try {
    const json = (await getJson(
      `${ARTICLES_API_URL.replace(/\/+$/, "")}/${encodeURIComponent(slug)}`,
    )) as { article?: RawArticle };
    return json?.article ? toBlog(json.article) : null;
  } catch {
    return null;
  }
}
