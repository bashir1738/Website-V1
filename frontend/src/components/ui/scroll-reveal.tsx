"use client";

import React, { useRef, useEffect, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
  threshold?: number;
}

/*
 * Scroll reveal storyboard
 *   0ms  section enters viewport → content is readable immediately
 * 100ms  optional first sibling settles
 * 200ms  optional second sibling settles
 * 400ms  sequence complete
 */
const SCROLL_REVEAL_TIMING = {
  rootMargin: "0px 0px -48px 0px",
} as const;

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  blur = false,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      el.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: SCROLL_REVEAL_TIMING.rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const baseClass = blur ? "reveal-blur" : "reveal";
  const delayClass = delay > 0 ? `reveal-d${delay}` : "";

  return (
    <div ref={ref} className={`${baseClass} ${delayClass} ${className}`}>
      {children}
    </div>
  );
}
