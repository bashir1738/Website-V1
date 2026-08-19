"use client";

import React, { useState, useEffect, useRef } from "react";

// Interactive Kinetic Letter with spring hover effect (Maria João Abrantes inspired)
export function KineticChar({ char, className = "" }: { char: string; className?: string }) {
  const [hovered, setHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0, rotate: 0 });

  const handleMouseEnter = () => {
    setHovered(true);
    // Random playful spring deflection
    const rx = (Math.random() - 0.5) * 16;
    const ry = (Math.random() - 0.7) * 14;
    const rdeg = (Math.random() - 0.5) * 22;
    setOffset({ x: rx, y: ry, rotate: rdeg });

    setTimeout(() => {
      setOffset({ x: 0, y: 0, rotate: 0 });
      setHovered(false);
    }, 450);
  };

  if (char === " ") {
    return <span>&nbsp;</span>;
  }

  return (
    <span
      onMouseEnter={handleMouseEnter}
      style={{
        display: "inline-block",
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${offset.rotate}deg)`,
        transition: hovered
          ? "transform 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          : "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      className={`cursor-default transition-colors select-none ${className} ${
        hovered ? "text-[var(--accent)]" : ""
      }`}
    >
      {char}
    </span>
  );
}

// Kinetic Interactive Word composed of bouncy letters
export function KineticWord({
  word,
  className = "",
  highlight = false,
}: {
  word: string;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <span
      className={`inline-block whitespace-nowrap ${
        highlight
          ? "relative rounded-lg bg-[var(--accent)]/10 px-2 py-0.5 text-[var(--accent)] border border-[var(--accent)]/20 shadow-sm"
          : ""
      }`}
    >
      {word.split("").map((c, i) => (
        <KineticChar
          key={i}
          char={c}
          className={`${className} ${highlight ? "text-[var(--accent)]" : ""}`}
        />
      ))}
    </span>
  );
}

// Dynamic Interactive Keyword Cycler ("AI-native", "Production-Ready", "Decentralized", "High-Stakes")
export function WordCycler({
  words = ["AI-native", "Production-Grade", "High-Stakes", "Real-World"],
  interval = 3200,
}: {
  words?: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setAnimating(false);
      }, 400);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  const currentWord = words[index];

  return (
    <span className="relative inline-flex items-center align-baseline overflow-hidden px-1 py-0.5">
      <span
        style={{
          display: "inline-block",
          transform: animating
            ? "translateY(110%) rotate(4deg) scale(0.95)"
            : "translateY(0) rotate(0deg) scale(1)",
          opacity: animating ? 0 : 1,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
        }}
        className="gradient-text font-bold decoration-clone drop-shadow-sm cursor-pointer"
        onClick={() => setIndex((prev) => (prev + 1) % words.length)}
        title="Click to cycle word"
      >
        {currentWord}
      </span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-2 w-2 rounded-full bg-[var(--accent)] animate-ping opacity-60 align-middle"
      />
    </span>
  );
}

// Full Fun Kinetic Hero Title (combining split-words, kinetic character hover, word cycler)
export function KineticHeroTitle({
  prefix = "Training engineers for the",
  cycleWords = ["AI-native", "Production-Ready", "Decentralized", "High-Stakes"],
  suffix = "world. Building dependable software.",
  className = "",
}: {
  prefix?: string;
  cycleWords?: string[];
  suffix?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const prefixWords = prefix.split(" ");
  const suffixWords = suffix.split(" ");

  return (
    <h1
      ref={containerRef}
      className={`font-heading tracking-tight leading-[1.08] select-none text-[var(--page-fg)] ${className}`}
    >
      {/* Prefix kinetic words */}
      <span className="inline">
        {prefixWords.map((word, i) => (
          <span key={`p-${i}`} className="inline-block mr-[0.28em]">
            <KineticWord word={word} />
          </span>
        ))}
      </span>

      {/* Playful Word Cycler in the center */}
      <span className="inline-block mr-[0.28em] align-baseline">
        <WordCycler words={cycleWords} />
      </span>

      {/* Suffix kinetic words */}
      <span className="inline">
        {suffixWords.map((word, i) => {
          const isHighlight =
            word.toLowerCase().includes("dependable") ||
            word.toLowerCase().includes("software");
          return (
            <span key={`s-${i}`} className="inline-block mr-[0.28em]">
              <KineticWord word={word} highlight={isHighlight} />
            </span>
          );
        })}
      </span>
    </h1>
  );
}
