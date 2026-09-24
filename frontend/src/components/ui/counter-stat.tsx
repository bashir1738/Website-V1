"use client";

import React, { useEffect, useRef, useState } from "react";

export function CounterStat({
  value,
  duration = 1800,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState<string>(() => {
    const initialMatch = value.match(/([\d,]+)/);
    return initialMatch ? "0" : value;
  });
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Parse numeric part and prefix/suffix
    const match = value.match(/([\d,]+)(.*)/);
    if (!match) return;

    const targetNum = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2] || "";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * targetNum);

            setDisplayValue(`${current.toLocaleString("en-US")}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={containerRef} className={className}>
      {hasAnimated || !/\d/.test(value) ? displayValue : "0"}
    </span>
  );
}
