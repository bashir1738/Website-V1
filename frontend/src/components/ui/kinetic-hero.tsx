import React from "react";

// Static hero title: prefix, a highlighted closing phrase, then the rest of the suffix.
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
  const highlightPhrase = cycleWords[0];
  const suffixWords = suffix.split(" ").filter(Boolean);

  return (
    <h1
      className={`font-heading tracking-tight leading-[1.08] text-(--page-fg) ${className}`}
    >
      {prefix}{" "}
      <span className="text-(--accent)">{highlightPhrase}</span>
      {suffixWords.length > 0 && (
        <>
          {" "}
          {suffixWords.map((word, i) => {
            const isHighlight =
              word.toLowerCase().includes("dependable") ||
              word.toLowerCase().includes("software");
            return (
              <span
                key={i}
                className={isHighlight ? "text-(--accent)" : undefined}
              >
                {word}{" "}
              </span>
            );
          })}
        </>
      )}
    </h1>
  );
}
