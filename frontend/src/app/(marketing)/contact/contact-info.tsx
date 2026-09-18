"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";

export function ContactInfo() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Location */}
      <ScrollReveal delay={1}>
        <TiltCard className="surface-card p-6 sm:p-8">
          <div className="flex gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--line-strong)] bg-[var(--card)]">
              <MapPin className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-base font-bold text-[var(--page-fg)] mb-2">
                Blockfuse Labs Headquarters
              </h3>
              <p className="text-sm text-[var(--muted)]">
                Jos Innovation Hub, Plateau State, Nigeria
              </p>
            </div>
          </div>
        </TiltCard>
      </ScrollReveal>

      {/* Phone */}
      <ScrollReveal delay={2}>
        <TiltCard className="surface-card p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--line-strong)] bg-[var(--card)]">
                <Phone className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="font-mono text-base font-bold text-[var(--page-fg)] mb-1">
                  (+234) 8167-863-568
                </h3>
                <p className="text-xs text-[var(--dim)]">
                  Available on WhatsApp
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy("+2348167863568", "phone")}
              className="shrink-0 text-[var(--dim)] transition-colors hover:text-[var(--page-fg)]"
              aria-label="Copy phone number"
            >
              {copiedField === "phone" ? (
                <Check className="h-5 w-5 text-emerald-400" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
        </TiltCard>
      </ScrollReveal>

      {/* Email */}
      <ScrollReveal delay={3}>
        <TiltCard className="surface-card p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--line-strong)] bg-[var(--card)]">
                <Mail className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="font-mono text-base font-bold text-[var(--page-fg)] break-all mb-1">
                  connect@blockfuselabs.com
                </h3>
                <p className="text-xs text-[var(--dim)]">
                  General inquiries
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy("connect@blockfuselabs.com", "email")}
              className="shrink-0 text-[var(--dim)] transition-colors hover:text-[var(--page-fg)]"
              aria-label="Copy email address"
            >
              {copiedField === "email" ? (
                <Check className="h-5 w-5 text-emerald-400" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
        </TiltCard>
      </ScrollReveal>
    </div>
  );
}
