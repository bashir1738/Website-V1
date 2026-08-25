"use client";
import { useTheme } from "@/components/shared/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card)] border border-[var(--line)] hover:bg-[var(--card-hover)] transition-all duration-300"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      {/* Sun icon for light mode */}
      <svg
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === "dark" ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"
        }`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 21v-2.25m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      {/* Moon icon for dark mode */}
      <svg
        className={`absolute h-4 w-4 transition-all duration-300 ${
          theme === "dark" ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"
        }`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>
    </button>
  );
}
