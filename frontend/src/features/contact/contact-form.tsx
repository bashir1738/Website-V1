"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { postJson, ApiError } from "@/lib/api";

const topicOptions = [
  "Hiring engineers",
  "Embedded engineers",
  "Sponsoring a cohort",
  "Corporate training",
  "Engineering services",
  "Joining a program",
  "ProdFest",
  "Something else",
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Hiring engineers");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const intent = searchParams.get("intent") || "";
    const program = searchParams.get("program") || "";
    const service = searchParams.get("service") || "";

    if (intent.includes("hire") || intent === "direct-hire") {
      setTopic("Hiring engineers");
    } else if (intent === "embedded") {
      setTopic("Embedded engineers");
    } else if (intent === "sponsor") {
      setTopic("Sponsoring a cohort");
    } else if (intent === "team-training") {
      setTopic("Corporate training");
    } else if (intent === "engineering" || service) {
      setTopic("Engineering services");
      if (service) {
        setMessage(`Inquiry regarding: ${service}`);
      }
    } else if (intent === "academy" || program) {
      setTopic("Joining a program");
      if (program) {
        setMessage(`Inquiry regarding track: ${program}`);
      }
    } else if (intent.includes("prodfest")) {
      setTopic("ProdFest");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    try {
      await postJson("/contact", { name, email, topic, message });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "We couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.1)] px-6 py-8 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-[rgba(52,211,153,0.4)] bg-[rgba(52,211,153,0.16)] text-xl text-[#34d399]">
          ✓
        </div>
        <p className="font-heading text-lg font-bold text-[var(--page-fg)]">
          Message sent
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          We&apos;ll get back to you at {email}, usually within a couple of
          working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-semibold uppercase tracking-wider text-[var(--page-fg)]"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex Johnson"
          className="mt-1.5 w-full rounded-xl border border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-2.5 text-sm text-[var(--page-fg)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold uppercase tracking-wider text-[var(--page-fg)]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="alex@company.com"
          className="mt-1.5 w-full rounded-xl border border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-2.5 text-sm text-[var(--page-fg)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition"
        />
      </div>

      {/* Topic */}
      <div>
        <label
          htmlFor="topic"
          className="block text-xs font-semibold uppercase tracking-wider text-[var(--page-fg)]"
        >
          What is this about?
        </label>
        <select
          id="topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-2.5 text-sm text-[var(--page-fg)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition"
        >
          {topicOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-[var(--surface-2)] text-[var(--page-fg)]">
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Details */}
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-semibold uppercase tracking-wider text-[var(--page-fg)]"
        >
          Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          minLength={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A sentence or two about what you need, your team size, or your timeline..."
          className="mt-1.5 w-full rounded-xl border border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-2.5 text-sm text-[var(--page-fg)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.1)] px-4 py-3 text-sm leading-relaxed text-[#fca5a5]"
        >
          {error}
        </p>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          data-cursor="SEND"
          disabled={submitting}
          aria-busy={submitting}
          className="w-full rounded-xl action-color px-6 py-3 font-heading text-sm font-bold text-white shadow-lg shadow-[var(--accent)]/20 transition duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {submitting ? "Sending…" : "Send Enquiry →"}
        </button>
      </div>
    </form>
  );
}
