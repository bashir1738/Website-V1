import React from "react";

export function Card({
  title,
  meta,
  copy,
}: {
  title: string;
  meta?: string;
  copy: string;
}) {
  return (
    <article className="glass group rounded-[1.6rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-violet/45 hover:shadow-brand-indigo/10 md:p-7 h-full flex flex-col">
      {meta ? <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{meta}</p> : null}
      <h3 className="mt-3 text-xl font-semibold">{title}</h3>
      <p className="mt-3 flex-grow text-sm leading-7 text-[var(--muted)]">{copy}</p>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-brand-violet/70 via-brand-indigo/50 to-transparent" />
    </article>
  );
}
