"use client";

import React from "react";
import Link from "next/link";
import { BTN_PRIMARY, BTN_SECONDARY } from "@/lib/styles";

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-[250ms] ease group-hover:translate-x-[3px]"
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
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  dataCursor?: string;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const baseClass = variant === "primary" ? BTN_PRIMARY : BTN_SECONDARY;
  const combinedClass = `group ${baseClass} ${className}`;

  if (isExternal) {
    return (
      <a
        href={href}
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
    <Link href={href} className={combinedClass}>
      <span>{children}</span>
      <ArrowIcon />
    </Link>
  );
}
