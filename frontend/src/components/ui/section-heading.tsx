import React from "react";

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-violet">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl font-bold leading-tight md:text-6xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[var(--muted)] md:text-lg">{copy}</p>
    </div>
  );
}
