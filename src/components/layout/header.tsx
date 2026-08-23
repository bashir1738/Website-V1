"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, type NavItem } from "@/lib/content";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useModal } from "@/components/modals/modal-provider";

/**
 * Applying starts at a path chooser, not straight in the form. The Academy has
 * its own, so stay on the page when there is one here.
 */
function applyHrefFor(pathname: string): string {
  return pathname === "/training" || pathname === "/academy"
    ? "#programs"
    : "/#choose-your-path";
}

function isItemActive(item: NavItem, pathname: string): boolean {
  const matches = (href: string) => {
    const base = href.split("#")[0];
    return base === "/" ? pathname === "/" : pathname.startsWith(base);
  };
  return matches(item.href) || (item.children ?? []).some((c) => matches(c.href));
}

export function Header() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const applyHref = applyHrefFor(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close everything when the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Keep the page behind the full-screen mobile nav from scrolling.
  useEffect(() => {
    if (mobileOpen) {
      document.body.dataset.modalOpen = "true";
    } else {
      delete document.body.dataset.modalOpen;
    }
    return () => {
      delete document.body.dataset.modalOpen;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // A short grace period so the pointer can travel into the panel.
  const enterItem = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const leaveItem = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--page-bg)]/70 backdrop-blur-[18px]">
        <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-7">
          {/* Brand */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Blockfuse Labs home"
          >
            <Image
              src="/brand/LOGO_ICON.svg"
              alt="Blockfuse Labs"
              width={30}
              height={30}
              className="h-[30px] w-[30px] transition-transform duration-300 group-hover:rotate-12"
            />
            <span className="font-heading text-[15.5px] font-bold tracking-tight text-[var(--page-fg)]">
              Blockfuse Labs
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => {
              const active = isItemActive(item, pathname);
              const open = openMenu === item.label && !!item.children;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => enterItem(item.label)}
                  onMouseLeave={leaveItem}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-[13px] font-medium tracking-[0.01em] transition-colors duration-200 hover:bg-[var(--card)] ${
                      active
                        ? "text-[var(--page-fg)]"
                        : "text-[var(--muted)] hover:text-[var(--page-fg)]"
                    }`}
                    aria-expanded={item.children ? open : undefined}
                    onFocus={() => item.children && enterItem(item.label)}
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <span aria-hidden="true" className="text-[9px] opacity-70">
                        ▾
                      </span>
                    )}
                    {active && (
                      <span className="absolute inset-x-3 bottom-px h-0.5 rounded-sm bg-[var(--accent)]" />
                    )}
                  </Link>

                  {open && item.children && (
                    <div className="absolute left-0 top-full w-[268px] pt-2.5">
                      <div className="anim-pop rounded-2xl border border-[var(--line-strong)] bg-[var(--card-strong)] p-2 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-[var(--accent-dim)]"
                          >
                            <span className="flex-1">
                              <span className="flex items-center gap-2">
                                <span className="text-[13.5px] font-semibold text-[var(--page-fg)]">
                                  {child.label}
                                </span>
                                {child.flag && (
                                  <span className="mono-tag mono-tag-accent !text-[8.5px]">
                                    Flagship
                                  </span>
                                )}
                              </span>
                              <span className="mt-1 block text-[11.5px] leading-snug text-[var(--dim)]">
                                {child.desc}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2.5">
            <ThemeToggle />

            <Link
              href={applyHref}
              className="hidden h-10 items-center gap-2 whitespace-nowrap rounded-full bg-[var(--accent)] px-5 text-[13px] font-semibold text-white shadow-[0_6px_20px_-6px_rgba(191,100,231,0.7)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--accent-soft)] sm:inline-flex"
            >
              Apply
              <span aria-hidden="true" className="text-sm">
                →
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--page-fg)] transition-colors hover:bg-[var(--card-hover)] xl:hidden"
            >
              {mobileOpen ? (
                <span className="text-[15px] leading-none">✕</span>
              ) : (
                <span className="flex flex-col gap-1">
                  <span className="block h-[1.5px] w-[17px] rounded-sm bg-current" />
                  <span className="block h-[1.5px] w-[17px] rounded-sm bg-current" />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile nav */}
      {mobileOpen && (
        <div className="custom-scroll anim-fade fixed inset-x-0 bottom-0 top-[68px] z-[39] overflow-y-auto bg-[var(--page-bg)]/97 backdrop-blur-[20px] xl:hidden">
          <div className="mx-auto flex max-w-[640px] flex-col gap-7 px-7 pb-16 pt-9">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-[26px] font-bold tracking-[-0.03em] text-[var(--page-fg)] transition-colors hover:text-[var(--accent)]"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mt-3.5 flex flex-col gap-3 border-l border-[var(--line-strong)] pl-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="pl-4 text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--page-fg)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-3">
              <Link
                href={applyHref}
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
              >
                Apply to a program
                <span aria-hidden="true">→</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openModal("hire");
                }}
                className="btn-secondary"
              >
                Hire Blockfuse engineers
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
