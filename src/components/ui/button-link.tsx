import React from "react";
import Link from "next/link";

function Arrow() {
  return <span aria-hidden="true" className="transition group-hover:translate-x-1">-&gt;</span>;
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

  const className = `button-shine group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 active:scale-95 ${
    variant === "primary"
      ? "bg-gradient-to-r from-brand-violet to-brand-indigo text-white shadow-2xl shadow-brand-indigo/25 hover:-translate-y-0.5"
      : "border border-[var(--line)] bg-[var(--card-strong)] text-[var(--page-fg)] hover:-translate-y-0.5 hover:border-brand-violet/60"
  }`;

  if (isExternal) {
    return (
      <a href={href} className={className} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {children}
        <Arrow />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      <Arrow />
    </Link>
  );
}
