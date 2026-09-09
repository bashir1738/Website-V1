const DEFAULT_API_URL = "https://website-v1-vrl5.onrender.com/api";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || DEFAULT_API_URL;

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

/** POST a plain-JSON payload to a public or admin endpoint. */
export async function postJson(
  path: string,
  data: Record<string, unknown>,
  token?: string,
) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  return parse(res);
}

/** POST a multipart payload (file upload) to a public or admin endpoint. */
export async function postForm(path: string, data: FormData, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: data,
  });
  return parse(res);
}

export async function getJson(path: string, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return parse(res);
}
