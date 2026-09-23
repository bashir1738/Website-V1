"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "blockfuse_cookie_consent";

type Consent = "accepted" | "declined";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        setVisible(!window.localStorage.getItem(STORAGE_KEY));
      } catch {
        setVisible(true);
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const decide = (value: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage unavailable — hide anyway for this session.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-modal="false"
      className="fixed bottom-5 right-5 z-[60] w-[min(92vw,20.5rem)] animate-bf-up"
    >
      <div className="rounded-2xl border border-[var(--line-strong)] bg-[var(--card-strong)]/95 p-5 shadow-[0_-10px_32px_-18px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-(--accent-line) bg-(--accent-dim) text-(--accent)">
            <Cookie className="h-4.5 w-4.5" />
          </span>
          <div>
            <h3 className="font-heading text-sm font-bold text-(--page-fg)">
              Cookies &amp; privacy
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-(--muted)">
              We use a few cookies to keep the site working and understand how
              it&apos;s used. No ads, no tracking you didn&apos;t ask for.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02] active:scale-95"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => decide("declined")}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-full border border-[var(--line-strong)] px-4 text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--page-fg)]"
          >
            Decline
          </button>
        </div>

        <Link
          href="/privacy"
          className="mt-4 block text-center text-xs font-medium text-[var(--dim)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:text-[var(--page-fg)]"
        >
          Read our privacy policy
        </Link>
      </div>
    </div>
  );
}