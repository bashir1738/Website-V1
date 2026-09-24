"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, type NavItem } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useModal } from "@/components/modals/modal-provider";
import {
  ACTION_COLOR,
  BTN_PRIMARY,
  BTN_SECONDARY,
  CUSTOM_SCROLL,
} from "@/lib/styles";

function pathBase(href: string): string {
  return href.split("#")[0];
}

/** Exact path, or a child route (`/about` matches `/about/team`). */
function hrefMatches(href: string, pathname: string): boolean {
  const base = pathBase(href);
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

function isItemActive(item: NavItem, pathname: string): boolean {
  if (hrefMatches(item.href, pathname)) return true;
  return (item.children ?? []).some((c) => hrefMatches(c.href, pathname));
}

/** Longest matching child wins so `/about/team` highlights Team, not About. */
function activeChildHref(item: NavItem, pathname: string): string | null {
  let best: string | null = null;
  let bestLen = -1;
  for (const child of item.children ?? []) {
    if (!hrefMatches(child.href, pathname)) continue;
    const len = pathBase(child.href).length;
    if (len > bestLen) {
      best = child.href;
      bestLen = len;
    }
  }
  return best;
}

const TRIGGER_BASE =
  "relative flex min-h-10 items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium tracking-[0.01em] transition-colors duration-100 hover:bg-(--card) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)";
const TRIGGER_ACTIVE = "text-(--page-fg)";
const TRIGGER_IDLE = "text-(--muted) hover:text-(--page-fg)";

const ACTIVE_BAR =
  "absolute inset-x-3 bottom-px h-0.5 rounded-sm bg-(--accent)";

const CHILD_IDLE =
  "relative flex min-h-12 items-start gap-3 rounded-xl pl-3.5 pr-3 py-2.5 transition-colors duration-100 hover:bg-(--accent-dim) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)";
const CHILD_ACTIVE =
  "bg-(--accent-dim) hover:bg-(--accent-dim)";

export function Header() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const desktopNavItems = navItems.filter((item) =>
    ["Home", "Academy", "Engineering", "Community", "About", "Contact"].includes(item.label),
  );

  // Close everything when the route changes.
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileSection(null);
  }

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
      setMobileSection(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close when clicking outside the nav (menus also close on item click via navigation).
  useEffect(() => {
    if (!openMenu) return;
    const onPointer = (e: PointerEvent) => {
      const nav = navRef.current;
      if (nav && e.target instanceof Node && !nav.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [openMenu]);

  // Grace period so the pointer can travel into the panel without a flicker.
  const enterItem = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const leaveItem = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const hamburgerOpen = (v: boolean) => {
    setMobileOpen(v);
    if (!v) setMobileSection(null);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-(--line) bg-(--page-bg)/82 backdrop-blur-[18px]">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-7">
          {/* Brand */}
          <Link
            href="/"
            className="group flex min-h-10 shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--page-bg)"
            aria-label="Blockfuse Labs home"
          >
            <Image
              src="/brand/block_fuse_logo.png"
              alt={siteConfig.name}
              width={2840}
              height={3274}
              priority
              sizes="36px"
              className="h-9 w-auto transition-transform duration-150 ease-out group-hover:scale-105"
            />

          </Link>

          {/* Desktop nav */}
          <nav
            ref={navRef}
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary navigation"
          >
            {desktopNavItems.map((item) => {
              const active = isItemActive(item, pathname);
              const open = openMenu === item.label && !!item.children;
              const activeChild = item.children
                ? activeChildHref(item, pathname)
                : null;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => enterItem(item.label)}
                  onMouseLeave={leaveItem}
                >
                  {item.children ? (
                    <button
                      type="button"
                      className={`${TRIGGER_BASE} ${active ? TRIGGER_ACTIVE : TRIGGER_IDLE}`}
                      aria-haspopup="menu"
                      aria-expanded={open}
                      onClick={() => setOpenMenu(open ? null : item.label)}
                      onFocus={() => enterItem(item.label)}
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className={`text-[9px] opacity-70 transition-transform duration-150 ${
                          open ? "rotate-180" : ""
                        }`}
                      >
                        ▾
                      </span>
                      {active && <span className={ACTIVE_BAR} aria-hidden="true" />}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={pathname === pathBase(item.href) ? "page" : undefined}
                      className={`${TRIGGER_BASE} ${active ? TRIGGER_ACTIVE : TRIGGER_IDLE}`}
                    >
                      <span>{item.label}</span>
                      {active && <span className={ACTIVE_BAR} aria-hidden="true" />}
                    </Link>
                  )}

                  {open && item.children && (
                    <div className="absolute left-0 top-full w-[286px] pt-3">
                      <div
                        role="menu"
                        aria-label={`${item.label} pages`}
                        className="animate-bf-pop overflow-hidden rounded-2xl border border-(--line-strong) bg-(--card-strong) p-1.5 shadow-[0_8px_20px_-14px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
                      >
                        {item.children.map((child) => {
                          const childActive = activeChild === child.href;
                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              role="menuitem"
                              aria-current={childActive ? "page" : undefined}
                              onClick={() => setOpenMenu(null)}
                              className={`${CHILD_IDLE} ${childActive ? CHILD_ACTIVE : ""}`}
                            >
                              <span
                                aria-hidden="true"
                                className={`mt-1.5 h-4 w-0.5 shrink-0 rounded-full transition-colors ${
                                  childActive ? "bg-(--accent)" : "bg-transparent"
                                }`}
                              />
                              <span className="min-w-0 flex-1">
                                <span className="flex flex-wrap items-center gap-2">
                                  <span
                                    className={`text-[13.5px] font-semibold ${
                                      childActive ? "text-(--accent)" : "text-(--page-fg)"
                                    }`}
                                  >
                                    {child.label}
                                  </span>
                                  {child.flag && (
                                    <span className="inline-flex items-center border border-(--accent-line) rounded-full px-[0.625rem] py-1 font-mono text-[8.5px] font-medium uppercase tracking-[0.14em] text-(--accent)">
                                      Flagship
                                    </span>
                                  )}
                                </span>
                                <span className="mt-1 block text-[11.5px] leading-snug text-(--dim)">
                                  {child.desc}
                                </span>
                              </span>
                              {childActive && (
                                <span
                                  aria-hidden="true"
                                  className="mt-1.5 text-[11px] font-semibold text-(--accent)"
                                >
                                  ·
                                </span>
                              )}
                            </Link>
                          );
                        })}
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

            <button
              type="button"
              onClick={() => openModal("program")}
              className={`hidden h-10 items-center gap-2 whitespace-nowrap rounded-full ${ACTION_COLOR} px-5 text-[13px] font-semibold text-white shadow-[0_4px_12px_-6px_rgba(191,100,231,0.4)] transition-[transform,background-color] duration-[100ms] ease-out hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--page-bg) sm:inline-flex`}
            >
              Apply
              <span aria-hidden="true" className="text-sm">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={() => hamburgerOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-(--line-strong) text-(--page-fg) transition-colors duration-100 hover:bg-(--card-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) lg:hidden"
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
        <div className={`${CUSTOM_SCROLL} animate-bf-fade fixed inset-x-0 bottom-0 top-[76px] z-[39] overflow-y-auto bg-(--page-bg)/97 backdrop-blur-[20px] lg:hidden`}>
          <div className="mx-auto flex max-w-[640px] flex-col gap-7 px-7 pb-16 pt-9">
            {navItems.map((item) => {
              const sectionActive = isItemActive(item, pathname);
              const activeChild = item.children
                ? activeChildHref(item, pathname)
                : null;
              const sectionOpen = mobileSection === item.label;

              return (
                <div key={item.label}>
                  {item.children ? (
                    <button
                      type="button"
                      aria-expanded={sectionOpen}
                      onClick={() =>
                        setMobileSection(sectionOpen ? null : item.label)
                      }
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-1 py-1.5 text-left font-heading text-[26px] font-bold tracking-[-0.03em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) ${
                        sectionActive
                          ? "text-(--accent)"
                          : "text-(--page-fg) hover:text-(--accent)"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className={`text-[14px] font-medium opacity-60 transition-transform duration-200 ${
                          sectionOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▾
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => hamburgerOpen(false)}
                      aria-current={hrefMatches(item.href, pathname) ? "page" : undefined}
                      className={`block rounded-xl px-1 py-1.5 font-heading text-[26px] font-bold tracking-[-0.03em] transition-colors hover:text-(--accent) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) ${
                        hrefMatches(item.href, pathname) ? "text-(--accent)" : "text-(--page-fg)"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.children && sectionOpen && (
                    <div className="mt-3.5 flex flex-col gap-1 border-l border-(--line-strong) pl-0.5">
                      {item.children.map((child) => {
                        const childActive = activeChild === child.href;
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => hamburgerOpen(false)}
                            aria-current={childActive ? "page" : undefined}
                            className={`relative rounded-r-lg py-2 pl-4 pr-2 text-[15px] transition-colors ${
                              childActive
                                ? "bg-(--accent-dim) font-semibold text-(--accent)"
                                : "text-(--muted) hover:text-(--page-fg)"
                            }`}
                          >
                            {childActive && (
                              <span
                                aria-hidden="true"
                                className="absolute -left-[1px] top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-(--accent)"
                              />
                            )}
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex flex-col gap-3 border-t border-(--line) pt-3">
              <button
                type="button"
                onClick={() => {
                  hamburgerOpen(false);
                  openModal("program");
                }}
                className={BTN_PRIMARY}
              >
                Apply to a program
                <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  hamburgerOpen(false);
                  openModal("hire");
                }}
                className={BTN_SECONDARY}
              >
                Hire Blockfuse Labs engineers
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
