/**
 * MED-4: No hardcoded fallback URL. If NEXT_PUBLIC_API_URL is missing the app
 * will fail at build/boot time with a clear error rather than silently hitting
 * a stale production URL.
 */
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not set. Add it to .env.local (development) or your hosting env vars (production)."
  );
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface Envelope {
  success?: boolean;
  data?: unknown;
  error?: string;
  message?: string;
}

function friendlyMessage(status: number, body: Envelope | null) {
  if (body?.error) return body.error;
  if (status === 429) return "Too many requests. Please wait a few minutes and try again.";
  if (status === 401) return "That session has expired. Please sign in again.";
  if (status === 404) return "We couldn't find that.";
  return "Something went wrong. Please try again.";
}

async function parse(res: Response) {
  let body: Envelope | null = null;
  try {
    body = await res.json();
  } catch {
    // Some responses (e.g. plain 429 from a proxy) may not be JSON.
  }

  if (!res.ok || body?.success === false) {
    throw new ApiError(friendlyMessage(res.status, body), res.status);
  }

  return body && "data" in body ? body.data : body;
}

/**
 * HIGH-3: All fetch calls include `credentials: 'include'` so the browser
 * automatically attaches the HttpOnly auth cookie. No manual token passing needed.
 */

/** POST a plain-JSON payload to a public or admin endpoint. */
export async function postJson(
  path: string,
  data: Record<string, unknown>,
) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parse(res);
}

/** PATCH a plain-JSON payload to an admin endpoint (e.g. status changes). */
export async function patchJson(
  path: string,
  data: Record<string, unknown>,
) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parse(res);
}

/** POST a multipart payload (file upload) to a public or admin endpoint. */
export async function postForm(path: string, data: FormData) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    credentials: "include",
    body: data,
  });
  return parse(res);
}

export async function getJson(path: string) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
  });
  return parse(res);
}

/** PUT a multipart payload (file upload) to an admin endpoint. */
export async function putForm(path: string, data: FormData) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    credentials: "include",
    body: data,
  });
  return parse(res);
}

/** DELETE from an admin endpoint. */
export async function deleteJson(path: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    credentials: "include",
  });
  return parse(res);
}
