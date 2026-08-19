"use client";

import React, { useRef, useState, ReactNode } from "react";

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
  maxTilt?: number; // max degrees of tilt
  glareOpacity?: number;
  dataCursorText?: string;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className = "",
  id,
  maxTilt = 7,
  glareOpacity = 0.18,
  dataCursorText,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: glareOpacity,
    });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      data-cursor={dataCursorText}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
          isHovered ? "scale3d(1.015, 1.015, 1.015)" : "scale3d(1, 1, 1)"
        }`,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden rounded-2xl surface-card transition-colors ${className}`}
    >
      {/* 1. Dynamic Cursor-Following Radial Glare & Spotlight Sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, rgba(191, 100, 231, ${glarePos.opacity}), transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* 2. Interactive Perimeter Border Glow */}
      <div
        className="pointer-events-none absolute -inset-px z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at ${glarePos.x}% ${glarePos.y}%, rgba(191, 100, 231, 0.45), transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* 3. Tech Corner Bracket Accents (Moto-card inspired) */}
      <div className="pointer-events-none absolute top-2.5 left-2.5 z-20 h-2 w-2 border-t border-l border-[var(--line-strong)] opacity-40 group-hover:opacity-100 group-hover:border-[var(--accent)] transition-colors" />
      <div className="pointer-events-none absolute top-2.5 right-2.5 z-20 h-2 w-2 border-t border-r border-[var(--line-strong)] opacity-40 group-hover:opacity-100 group-hover:border-[var(--accent)] transition-colors" />
      <div className="pointer-events-none absolute bottom-2.5 left-2.5 z-20 h-2 w-2 border-b border-l border-[var(--line-strong)] opacity-40 group-hover:opacity-100 group-hover:border-[var(--accent)] transition-colors" />
      <div className="pointer-events-none absolute bottom-2.5 right-2.5 z-20 h-2 w-2 border-b border-r border-[var(--line-strong)] opacity-40 group-hover:opacity-100 group-hover:border-[var(--accent)] transition-colors" />

      {/* 4. Card Content with 3D depth */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
