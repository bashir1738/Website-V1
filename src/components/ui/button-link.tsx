"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

function ArrowIcon() {
  return (
    <svg
      className="btn-arrow h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  dataCursor,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  dataCursor?: string;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const baseClass = variant === "primary" ? "btn-primary" : "btn-secondary";

  // Magnetic proximity pull
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = btnRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    setOffset({ x: x * 0.22, y: y * 0.22 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const combinedClass = `group relative inline-flex items-center justify-center gap-2 select-none ${baseClass} ${className}`;
  const style = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: offset.x === 0 && offset.y === 0 ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
  };

  if (isExternal) {
    return (
      <a
        ref={btnRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        data-cursor={dataCursor || (variant === "primary" ? "GO" : undefined)}
        className={combinedClass}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        <span>{children}</span>
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      data-cursor={dataCursor || (variant === "primary" ? "GO" : undefined)}
      className={combinedClass}
    >
      <span>{children}</span>
      <ArrowIcon />
    </Link>
  );
}
