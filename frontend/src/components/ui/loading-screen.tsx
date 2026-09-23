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
    if (e.target === e.currentTarget) {
      setShouldRender(false);
      try {
        window.sessionStorage.setItem("bf-visited", "1");
      } catch {}
    }
  };

  if (isAdmin || !mounted || !shouldRender) return null;

  const text = "BLOCKFUSE LABS";
  const letters = text.split("");

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-(--page-bg) select-none animate-splash-exit will-change-transform"
    >
      {/* Background ambient glowing nebula */}
      <div className="pointer-events-none absolute h-[24rem] w-[24rem] rounded-full bg-(--accent)/15 blur-[100px]" />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        {/* Brand Icon */}
        <div className="relative flex items-center justify-center">
          <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-(--line-strong) bg-(--surface-2) shadow-lg">
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
          <span className="inline-block font-heading text-xl font-bold tracking-[0.2em] text-(--page-fg) sm:text-3xl">
            {letters.map((letter, i) => (
              <span
                key={i}
                className="inline-block opacity-0 blur-[4px] translate-y-4 animate-loading-letter"
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
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-(--line)">
            <div className="h-full bg-gradient-to-r from-(--accent) to-[#4e2ef5] shadow-[0_0_8px_var(--accent)] animate-splash-bar" />
          </div>
          <div className="flex w-full items-center justify-between font-mono text-[9px] uppercase tracking-widest text-(--muted)">
            <span>SYS_INIT</span>
            <span className="text-(--accent) font-semibold">100%</span>
          </div>
        </div>
      </div>

      {/* Noise Grain Overlay */}
      <div className="grain-overlay absolute inset-0 pointer-events-none opacity-[0.035] z-[2]" />
    </div>
  );
}
