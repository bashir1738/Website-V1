"use client";

import React from "react";
import { useTheme } from "../theme-provider";

const NOISE =
  "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjU2IDI1NicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC44NScgbnVtT2N0YXZlcz0nNCcgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNuKScvPjwvc3ZnPg==";

/**
 * The fixed atmosphere behind every page: a vertical wash, a lit horizon at
 * 62vh with a perspective floor grid running away from it, faint vertical
 * rules through the upper half, and a grain pass over the lot.
 */
export function SiteBackground() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const wash = dark
    ? "linear-gradient(180deg, #120a1d 0%, #0b0812 34%, #07070a 58%, #050508 100%)"
    : "linear-gradient(180deg, #f4effa 0%, #f6f5fa 34%, #f4f4f8 58%, #eeedf5 100%)";

  const dawn = dark
    ? "radial-gradient(ellipse 62% 100% at 50% 100%, rgba(191,100,231,0.2), rgba(78,46,245,0.08) 52%, transparent 78%)"
    : "radial-gradient(ellipse 62% 100% at 50% 100%, rgba(165,68,210,0.14), rgba(78,46,245,0.06) 52%, transparent 78%)";

  const horizon = dark
    ? "linear-gradient(90deg, transparent, rgba(191,100,231,0.7) 30%, rgba(214,150,255,0.9) 50%, rgba(191,100,231,0.7) 70%, transparent)"
    : "linear-gradient(90deg, transparent, rgba(165,68,210,0.5) 30%, rgba(140,60,200,0.7) 50%, rgba(165,68,210,0.5) 70%, transparent)";

  const gridLine = dark ? "rgba(191,100,231,0.28)" : "rgba(165,68,210,0.18)";
  const gridLineSoft = dark ? "rgba(191,100,231,0.22)" : "rgba(165,68,210,0.14)";
  const rule = dark ? "rgba(255,255,255,0.05)" : "rgba(13,13,24,0.045)";
  const settle = dark
    ? "linear-gradient(180deg, transparent 55%, rgba(5,5,8,0.9) 88%, #050508 100%)"
    : "linear-gradient(180deg, transparent 55%, rgba(238,237,245,0.9) 88%, #eeedf5 100%)";

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {/* Vertical wash */}
        <div className="absolute inset-0" style={{ background: wash }} />

        {/* Glow rising to the horizon */}
        <div
          className="absolute inset-x-0 top-0 h-[62vh]"
          style={{ background: dawn }}
        />

        {/* The lit horizon itself */}
        <div
          className="absolute inset-x-0 h-px"
          style={{
            top: "62vh",
            background: horizon,
            boxShadow: dark
              ? "0 0 26px rgba(191,100,231,0.55)"
              : "0 0 26px rgba(165,68,210,0.3)",
          }}
        />

        {/* Perspective floor running away from the horizon */}
        <div
          className="absolute h-[90vh]"
          style={{
            left: "-50%",
            right: "-50%",
            top: "62vh",
            transform: "perspective(340px) rotateX(62deg)",
            transformOrigin: "top center",
            backgroundImage: `linear-gradient(to right, ${gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${gridLineSoft} 1px, transparent 1px)`,
            backgroundSize: "74px 58px",
            maskImage: "linear-gradient(to bottom, #000 0%, transparent 62%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, transparent 62%)",
          }}
        />

        {/* Vertical rules through the upper half */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, ${rule} 1px, transparent 1px)`,
            backgroundSize: "12.5% 100%",
            maskImage: "linear-gradient(to bottom, #000 0%, transparent 55%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, transparent 55%)",
          }}
        />

        {/* Settle the bottom back into the page colour */}
        <div className="absolute inset-0" style={{ background: settle }} />
      </div>

      {/* Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          opacity: dark ? 0.035 : 0.02,
          backgroundImage: `url("${NOISE}")`,
          backgroundSize: "150px 150px",
        }}
      />
    </>
  );
}
