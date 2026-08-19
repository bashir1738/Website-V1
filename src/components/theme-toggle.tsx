"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("blockfuse-theme");
    const shouldUseDark = stored ? stored === "dark" : true;
    setDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("blockfuse-theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group inline-flex h-10 w-20 items-center rounded-full border border-white/15 bg-white/10 p-1 shadow-inner shadow-black/20 transition hover:border-brand-violet/60 dark:bg-black/25"
      aria-label="Toggle light and dark mode"
    >
      <span
        className={`grid h-8 w-8 place-items-center rounded-full bg-white text-xs font-semibold text-ink shadow-lg transition duration-300 ${
          dark ? "translate-x-10" : "translate-x-0"
        }`}
      >
        {dark ? "D" : "L"}
      </span>
    </button>
  );
}
