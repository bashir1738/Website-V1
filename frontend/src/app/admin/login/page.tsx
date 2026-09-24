"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { postJson, ApiError } from "@/lib/api";
import { setAdminAuth } from "@/lib/admin/auth";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteConfig } from "@/config/site";
import { FIELD_LABEL, FIELD_INPUT, BTN_PRIMARY } from "@/lib/styles";

interface LoginResponse {
  admin: { id: number; email: string };
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = (await postJson("/auth/login", { email, password })) as LoginResponse;
      // HIGH-3: The JWT is now in an HttpOnly cookie set by the server.
      // We only store the display email locally.
      setAdminAuth(res.admin.email);
      toast.success("Signed in. Welcome back, Admin.");
      router.replace("/admin");
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : "Couldn't reach the server. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-(--page-bg) text-(--page-fg)">
      {/* Left side: Branding (hidden on mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden px-12 py-12 lg:flex">
        <div className="grain-overlay" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -z-1 h-72 w-72 rounded-full bg-(--accent-dim) blur-[2px] right-[-8rem] top-[6%] opacity-55"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -z-1 h-36 w-36 rounded-full bg-(--accent-dim) blur-[2px] left-[42%] bottom-[3%] opacity-35"
          aria-hidden="true"
        />
        {/* Soft accent band bleeding off the bottom edge */}
        <div
          className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-152 rounded-full bg-(--accent-dim) blur-[110px]"
          aria-hidden="true"
        />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <Image
            src="/brand/block_fuse_logo.png"
            alt={siteConfig.name}
            width={2840}
            height={3274}
            priority
            sizes="40px"
            className="h-10 w-auto"
          />
          <span className="font-heading text-lg font-bold tracking-tight text-(--page-fg)">
            {siteConfig.name}
          </span>
        </div>

        {/* Headline block */}
        <div className="relative z-10 mb-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 text-(--bright) font-mono text-[0.75rem] font-semibold uppercase tracking-[0.11em]">
              <span className="inline-flex items-center gap-[2px]" aria-hidden="true">
                <span className="h-[0.7rem] w-[0.7rem] rounded-full bg-(--accent)" />
                <span className="h-[0.7rem] w-[0.3rem] rounded-full bg-(--page-fg)" />
              </span>
              ADMIN ACCESS
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <h2 className="mt-7 max-w-[20ch] font-heading text-[clamp(2.25rem,3.6vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.04em] text-(--page-fg)">
              One command center for{" "}
              <span className="bg-linear-to-r from-(--accent-soft) to-(--accent) bg-clip-text text-transparent">
                every Blockfuse Labs signal.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <p className="mt-7 max-w-md text-base leading-[1.75] text-(--muted)">
              Publish blogs and events, review applications and submissions, and
              stay on top of everything coming through the site — all from one
              secure, private place.
            </p>
          </ScrollReveal>
        </div>

        {/* Status strip */}
        <ScrollReveal delay={3}>
          <div className="relative z-10">
            <div className="section-divider mb-6" />
            <div className="flex items-center gap-2.5">
              <span className="inline-block whitespace-nowrap rounded-full border border-(--line-strong) px-[0.65rem] py-[0.2rem] font-mono text-[0.6rem] tracking-[0.06em] text-(--dim)">PRIVATE CONSOLE</span>
              <span className="inline-block whitespace-nowrap rounded-full border border-(--line-strong) px-[0.65rem] py-[0.2rem] font-mono text-[0.6rem] tracking-[0.06em] text-(--dim)">JWT · TLS</span>
              <span className="inline-block whitespace-nowrap rounded-full border border-(--line-strong) px-[0.65rem] py-[0.2rem] font-mono text-[0.6rem] tracking-[0.06em] text-(--dim)">ROLE-BASED ACCESS</span>
            </div>
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-(--dim)">
              {siteConfig.name} — admin.control
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Right side: Login */}
      <div className="relative flex w-full flex-col items-center justify-center p-5 lg:w-1/2">
        <div
          className="pointer-events-none absolute bottom-[8%] right-[6%] z-0 h-72 w-72 rounded-full bg-(--accent-dim) opacity-50 blur-[100px]"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-110 animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
          <div className="relative overflow-hidden rounded-3xl border border-(--line-strong) bg-(--card) p-8 backdrop-blur-2xl shadow-(--shadow-card) sm:p-12">
            {/* Top glare */}
            <div className="absolute inset-x-0 top-0 h-px w-full bg-linear-to-r from-transparent via-(--accent-soft) to-transparent opacity-40" />

            {/* Card header */}
            <div className="mb-9 text-center">
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-(--action-bg) to-(--accent) shadow-md lg:hidden">
                <ShieldCheck className="h-8 w-8 text-white" strokeWidth={1.5} />
              </div>
              <div className="mb-3 flex items-center justify-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-(--dim)">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-(--accent)" aria-hidden="true" />
                Secure sign in
              </div>
              <h1 className="font-heading text-3xl font-bold tracking-[-0.03em] text-(--page-fg)">
                Welcome back, Admin
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-(--muted)">
                Sign in to manage content, inboxes, and platform settings.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className={FIELD_LABEL}>
                  Email Address <span className="text-(--accent)">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={FIELD_INPUT}
                  placeholder="admin@blockfuselabs.xyz"
                />
              </div>

              <div>
                <label htmlFor="password" className={FIELD_LABEL}>
                  Password <span className="text-(--accent)">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={FIELD_INPUT}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className={`${BTN_PRIMARY} group w-full`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Sign in to Dashboard
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="section-divider my-8" />
            <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.14em] text-(--dim)">
              Protected by Blockfuse Labs access controls
            </p>
          </div>

          <Link
            href="/"
            className="group mt-8 flex w-full items-center justify-center gap-2 text-sm font-medium text-(--muted) transition-colors hover:text-(--page-fg)"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Return to website
          </Link>
        </div>
      </div>
    </div>
  );
}