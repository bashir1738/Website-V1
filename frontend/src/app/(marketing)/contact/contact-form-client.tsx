"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { contact } from "@/lib/contact";
import {
  BTN_PRIMARY,
  FIELD_ERROR,
  FIELD_INPUT,
  FIELD_LABEL,
  FIELD_TEXTAREA,
} from "@/lib/styles";

type FormState = { name: string; email: string; topic: string; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (form.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.topic.trim()) {
    errors.topic = "Please tell us what this is about.";
  }
  if (form.message.trim().length < 10) {
    errors.message = "Please add at least 10 characters of detail.";
  }
  return errors;
}

export function ContactFormClient({ initialTopic = "" }: { initialTopic?: string }) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    topic: initialTopic,
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setFieldErrors({});
    setStatus("loading");
    try {
      await contact.submit(form);
      setStatus("success");
      setForm({ name: "", email: "", topic: "", message: "" });
      toast.success("Message sent. We'll get back to you shortly.");
    } catch (err) {
      setStatus("idle");
      toast.error(err instanceof Error ? err.message : "Message failed to send");
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
          className={BTN_PRIMARY}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={FIELD_LABEL}>
            Name <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            className={FIELD_INPUT}
            data-invalid={fieldErrors.name ? "true" : undefined}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          />
          {fieldErrors.name && (
            <p id="contact-name-error" className={FIELD_ERROR}>
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className={FIELD_LABEL}>
            Email <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="your@email.com"
            className={FIELD_INPUT}
            data-invalid={fieldErrors.email ? "true" : undefined}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          />
          {fieldErrors.email && (
            <p id="contact-email-error" className={FIELD_ERROR}>
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-topic" className={FIELD_LABEL}>
          Topic <span className="text-[var(--accent)]">*</span>
        </label>
        <input
          id="contact-topic"
          type="text"
          value={form.topic}
          onChange={(e) => update("topic", e.target.value)}
          placeholder="What is this about?"
          className={FIELD_INPUT}
          data-invalid={fieldErrors.topic ? "true" : undefined}
          aria-invalid={Boolean(fieldErrors.topic)}
          aria-describedby={fieldErrors.topic ? "contact-topic-error" : undefined}
        />
        {fieldErrors.topic && (
          <p id="contact-topic-error" className={FIELD_ERROR}>
            {fieldErrors.topic}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className={FIELD_LABEL}>
          Message <span className="text-[var(--accent)]">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Your message..."
          className={FIELD_TEXTAREA}
          data-invalid={fieldErrors.message ? "true" : undefined}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className={FIELD_ERROR}>
            {fieldErrors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={`${BTN_PRIMARY} w-full`}
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}