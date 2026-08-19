"use client";

import React, { useState, useEffect } from "react";

export function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Only show on first visit per session
    if (typeof window !== "undefined") {
      const hasVisited = sessionStorage.getItem("bf-visited");
      if (!hasVisited) {
        setShow(true);
        sessionStorage.setItem("bf-visited", "1");

        // Begin exit after letters animate
        const exitTimer = setTimeout(() => {
          setExit(true);
        }, 2000);

        // Remove from DOM after slide-up
        const removeTimer = setTimeout(() => {
          setShow(false);
        }, 2800);

        return () => {
          clearTimeout(exitTimer);
          clearTimeout(removeTimer);
        };
      }
    }
  }, []);

  if (!show) return null;

  const text = "BLOCKFUSE LABS";
  const letters = text.split("");

  return (
    <div className={`loading-screen ${exit ? "loading-exit" : ""}`}>
      <span className="font-heading text-3xl font-bold tracking-[0.15em] text-[var(--page-fg)] sm:text-5xl">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="loading-letter"
            style={{
              animationDelay: `${i * 60 + 200}ms`,
              whiteSpace: letter === " " ? "pre" : "normal",
            }}
          >
            {letter}
          </span>
        ))}
      </span>
    </div>
  );
}
