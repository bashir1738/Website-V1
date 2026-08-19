import React from "react";
import Link from "next/link";

function ArrowIcon() {
  return (
    <svg
      className="btn-arrow h-4 w-4"
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
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const className = variant === "primary" ? "btn-primary" : "btn-secondary";

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      <ArrowIcon />
    </Link>
  );
}
