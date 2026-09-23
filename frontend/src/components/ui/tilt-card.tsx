"use client";

import React, { useRef, useState, ReactNode } from "react";

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dataCursorText?: string;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className = "",
  id,
  dataCursorText,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      id={id}
      data-cursor={dataCursorText}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      style={{
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s ease, border-color 0.35s ease",
      }}
      className={`group relative overflow-hidden rounded-2xl bg-(--card) backdrop-blur-[14px] border border-(--line) rounded-[20px] shadow-(--shadow-card) transition-all duration-300 hover:bg-(--card-hover) hover:border-(--accent-line) ${
        isHovered
          ? "shadow-[0_8px_20px_-8px_rgba(191,100,231,0.1)] border-(--line-strong) dark:border-(--accent)/30"
          : ""
      } ${className}`}
    >
      {/* 1. Subtle, Soft Cursor-Following Light Sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-500 ease-out"
        style={{
          background: `radial-gradient(450px circle at ${glarePos.x}% ${glarePos.y}%, rgba(191, 100, 231, 0.08), transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* 2. Perimeter Border Sheen */}
      <div
        className="pointer-events-none absolute -inset-px z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${glarePos.x}% ${glarePos.y}%, rgba(191, 100, 231, 0.28), transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* 3. Subtle Tech Corner Accents */}
      <div className="pointer-events-none absolute top-2.5 left-2.5 z-20 h-2 w-2 border-t border-l border-[var(--line-strong)] opacity-30 group-hover:opacity-80 group-hover:border-[var(--accent)]/70 transition-colors" />
      <div className="pointer-events-none absolute top-2.5 right-2.5 z-20 h-2 w-2 border-t border-r border-[var(--line-strong)] opacity-30 group-hover:opacity-80 group-hover:border-[var(--accent)]/70 transition-colors" />
      <div className="pointer-events-none absolute bottom-2.5 left-2.5 z-20 h-2 w-2 border-b border-l border-[var(--line-strong)] opacity-30 group-hover:opacity-80 group-hover:border-[var(--accent)]/70 transition-colors" />
      <div className="pointer-events-none absolute bottom-2.5 right-2.5 z-20 h-2 w-2 border-b border-r border-[var(--line-strong)] opacity-30 group-hover:opacity-80 group-hover:border-[var(--accent)]/70 transition-colors" />

      {/* 4. Card Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
