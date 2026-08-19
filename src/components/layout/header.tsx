"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/content";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--page-bg)]/90 backdrop-blur-xl border-b border-[var(--line)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Blockfuse Labs home"
          >
            <Image
              src="/brand/LOGO_ICON.svg"
              alt="Blockfuse Labs Logo"
              width={28}
              height={28}
              className="h-7 w-7 transition-transform duration-300 group-hover:rotate-12"
            />
            <span className="font-heading text-base font-bold tracking-tight text-[var(--page-fg)]">
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
                  className={`link-hover relative px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--page-fg)]"
                      : "text-[var(--muted)] hover:text-[var(--page-fg)]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-[2px] bg-[var(--accent)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--page-fg)] transition-colors hover:bg-[var(--card-hover)] md:hidden focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--page-bg)] md:hidden">
          <div className="flex flex-col justify-center h-full px-8 pt-20">
            <div className="space-y-1">
              {navItems.map((item, i) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 font-heading text-2xl font-bold transition-colors ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--muted)] hover:text-[var(--page-fg)]"
                    }`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col gap-3">
              <Link
                href="/training"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary justify-center"
              >
                Apply to a program
                <svg
                  className="btn-arrow h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/talent"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-secondary justify-center"
              >
                Hire Blockfuse engineers
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
