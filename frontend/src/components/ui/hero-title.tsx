"use client";

import React, { useEffect, useRef } from "react";

interface HeroTitleProps {
  text: string;
  className?: string;
  startDelay?: number;
}

export function HeroTitle({
  text,
  className = "",
  startDelay = 300,
}: HeroTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll<HTMLSpanElement>(".word-inner");
    const timer = setTimeout(() => {
      words.forEach((word, i) => {
        setTimeout(() => {
          word.classList.add("revealed");
        }, i * 80);
      });
    }, startDelay);

    return () => clearTimeout(timer);
  }, [startDelay]);

  const words = text.split(" ");

  return (
    <h1 ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="word-clip">
            <span className="word-inner">{word}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}
