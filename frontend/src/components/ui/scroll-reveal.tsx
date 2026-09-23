"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
  threshold?: number;
}

const SCROLL_REVEAL_TIMING = {
  rootMargin: "0px 0px -48px 0px",
} as const;

const DELAY_CLASS: Record<number, string> = {
  1: "reveal-d1",
  2: "reveal-d2",
  3: "reveal-d3",
  4: "reveal-d4",
  5: "reveal-d5",
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  blur = false,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    if (!("IntersectionObserver" in window)) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: SCROLL_REVEAL_TIMING.rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, visible]);

  const baseClass = blur ? "reveal-blur" : "reveal";
  const delayClass = delay > 0 ? DELAY_CLASS[delay] ?? "" : "";

  return (
    <div
      ref={ref}
      data-visible={visible || undefined}
      className={`${baseClass} ${visible ? "reveal-visible" : ""} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
