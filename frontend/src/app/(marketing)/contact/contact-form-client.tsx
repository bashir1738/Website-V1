"use client";

import React, { useState } from "react";
import { contact } from "@/lib/contact";

export function ContactFormClient() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await contact.submit(form);
      setStatus("success");
      setForm({ name: "", email: "", topic: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Message failed to send");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="mb-4 text-4xl">✓</div>
        <h3 className="font-heading text-xl font-bold text-[var(--page-fg)] mb-2">
          Message Sent!
        </h3>
        <p className="text-sm text-[var(--muted)] mb-6">
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", topic: "", message: "" });
          }}
          className="btn-primary"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="field-label">
            Name <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label">
            Email <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            className="field-input"
          />
        </div>
      </div>

      <div>
        <label className="field-label">
          Topic <span className="text-[var(--accent)]">*</span>
        </label>
        <input
          type="text"
          required
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          placeholder="What is this about?"
          className="field-input"
        />
      </div>

      <div>
        <label className="field-label">
          Message <span className="text-[var(--accent)]">*</span>
        </label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Your message..."
          className="field-textarea"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-[var(--accent-dim)] bg-[var(--accent-dim)] px-4 py-3 text-sm text-[var(--page-fg)]">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
