/**
 * Admin auth helpers.
 *
 * HIGH-3: The JWT is now stored in an HttpOnly, Secure, SameSite cookie set
 * by the server at login. JavaScript can never read an HttpOnly cookie, which
 * eliminates the XSS token-theft vector that existed with localStorage.
 *
 * The only client-side state we keep is the admin's email (display only,
 * non-sensitive) so the UI can show "Welcome, admin@…" without an extra
 * round-trip.
 */

const EMAIL_KEY = "blockfuse_admin_email";

/** Returns the stored admin email, or null if not signed in. */
export function getAdminEmail(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(EMAIL_KEY);
}

/** Called after a successful /api/auth/login response. */
export function setAdminAuth(email: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(EMAIL_KEY, email);
}

/** Called on logout. Clears local display state. */
export function clearAdminAuth() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(EMAIL_KEY);
}