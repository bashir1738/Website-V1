"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-6">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Blockfuse Labs home"
        >
          <Image
            src="/brand/LOGO_ICON.svg"
            alt="Blockfuse Labs Logo"
            width={32}
            height={32}
            className="h-8 w-8 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-serif text-base font-bold tracking-tight text-[var(--page-fg)] sm:text-lg">
            Blockfuse Labs
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 lg:text-sm ${
                  isActive
                    ? "font-semibold text-[var(--page-fg)]"
                    : "text-[var(--muted)] hover:text-[var(--page-fg)] hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-brand-violet to-brand-indigo" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/training"
            className="button-shine hidden rounded-full bg-gradient-to-r from-brand-violet to-brand-indigo px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-brand-indigo/20 transition hover:-translate-y-0.5 sm:inline-flex"
          >
            Apply Now
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] p-2 text-[var(--page-fg)] md:hidden focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="glass mx-auto mt-2 max-w-md rounded-2xl p-4 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-violet/15 font-semibold text-brand-violet"
                      : "text-[var(--muted)] hover:bg-black/5 hover:text-[var(--page-fg)] dark:hover:bg-white/10"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-brand-violet" />}
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-[var(--line)] flex flex-col gap-2">
              <Link
                href="/training"
                onClick={() => setMobileMenuOpen(false)}
                className="button-shine flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-brand-violet to-brand-indigo text-sm font-semibold text-white"
              >
                Apply to a program
              </Link>
              <Link
                href="/talent"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--card)] text-sm font-semibold text-[var(--page-fg)]"
              >
                Hire Blockfuse engineers
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

