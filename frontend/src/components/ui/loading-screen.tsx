"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function LoadingScreen() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const visited = window.sessionStorage.getItem("bf-visited");
        if (!visited) {
          setShouldRender(true);
        }
      } catch {
        // In case storage is disabled
      }
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const isAdmin = pathname.startsWith("/admin");

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    // When root container completes its exit animation
    if (e.target === e.currentTarget) {
      setShouldRender(false);
      try {
        window.sessionStorage.setItem("bf-visited", "1");
      } catch {}
    }
  };

  // Don't render during SSR, on admin pages, or if already visited
  if (isAdmin || !mounted || !shouldRender) return null;

  const text = "BLOCKFUSE LABS";
  const letters = text.split("");

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className="splash-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[var(--page-bg)] select-none"
    >
      {/* Background ambient glowing nebula */}
      <div className="pointer-events-none absolute h-[24rem] w-[24rem] rounded-full bg-[var(--accent)]/15 blur-[100px]" />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        {/* Brand Icon */}
        <div className="relative flex items-center justify-center">
          <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-[var(--line-strong)] bg-[var(--surface-2)] shadow-2xl">
            <Image
              src="/brand/LOGO_ICON.svg"
              alt="Blockfuse Labs Logo"
              width={28}
              height={28}
              priority
              className="h-7 w-7"
            />
          </div>
        </div>

        {/* Animated Lettering */}
        <div className="overflow-hidden">
          <span className="inline-block font-heading text-xl font-bold tracking-[0.2em] text-[var(--page-fg)] sm:text-3xl">
            {letters.map((letter, i) => (
              <span
                key={i}
                className="loading-letter inline-block"
                style={{
                  animationDelay: `${i * 25}ms`,
                  whiteSpace: letter === " " ? "pre" : "normal",
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        </div>

        {/* Minimal Progress Line */}
        <div className="mt-1 flex w-40 flex-col items-center gap-1.5 sm:w-48">
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-[var(--line)]">
            <div className="splash-progress-bar h-full bg-gradient-to-r from-[var(--accent)] to-[#4e2ef5] shadow-[0_0_8px_var(--accent)]" />
          </div>
          <div className="flex w-full items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">
            <span>SYS_INIT</span>
            <span className="text-[var(--accent)] font-semibold">100%</span>
          </div>
        </div>
      </div>

      {/* Noise Grain Overlay */}
      <div className="grain-overlay" />
    </div>
  );
}
