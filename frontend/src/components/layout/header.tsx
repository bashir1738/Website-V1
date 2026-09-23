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
  const [prevPathname, setPrevPathname] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const desktopNavItems = navItems.filter((item) =>
    ["Home", "Academy", "Engineering", "Community", "About", "Contact"].includes(item.label),
  );

  // Close everything when the route changes.
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
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
            <span className="font-heading text-base font-bold tracking-[-0.025em] text-(--page-fg)">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {desktopNavItems.map((item) => {
              const active = isItemActive(item, pathname);
              const open = openMenu === item.label && !!item.children;

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
                      className={`relative flex min-h-10 items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium tracking-[0.01em] transition-colors duration-100 hover:bg-(--card) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) ${
                        active
                          ? "text-(--page-fg)"
                          : "text-(--muted) hover:text-(--page-fg)"
                      }`}
                      aria-haspopup="menu"
                      aria-expanded={open}
                      onClick={() => setOpenMenu(open ? null : item.label)}
                      onFocus={() => enterItem(item.label)}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="text-[9px] opacity-70">
                        ▾
                      </span>
                      {active && (
                        <span className="absolute inset-x-3 bottom-px h-0.5 rounded-sm bg-(--accent)" />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`relative flex min-h-10 items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium tracking-[0.01em] transition-colors duration-100 hover:bg-(--card) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) ${
                      active
                        ? "text-(--page-fg)"
                        : "text-(--muted) hover:text-(--page-fg)"
                    }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span className="absolute inset-x-3 bottom-px h-0.5 rounded-sm bg-(--accent)" />
                      )}
                    </Link>
                  )}

                  {open && item.children && (
                    <div className="absolute left-0 top-full w-[268px] pt-2.5">
                      <div className="animate-bf-pop rounded-2xl border border-(--line-strong) bg-(--card-strong) p-2 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex min-h-11 items-start gap-2.5 rounded-xl px-3 py-2.5 transition-colors duration-100 hover:bg-(--accent-dim) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
                          >
                            <span className="flex-1">
                              <span className="flex items-center gap-2">
                                <span className="text-[13.5px] font-semibold text-(--page-fg)">
                                  {child.label}
                                </span>
                                {child.flag && (
                                  <span className="inline-flex items-center font-mono text-[0.594rem] font-medium uppercase tracking-[0.14em] border border-(--accent-line) rounded-full px-[0.625rem] py-1 text-(--accent) !text-[8.5px]">
                                    Flagship
                                  </span>
                                )}
                              </span>
                              <span className="mt-1 block text-[11.5px] leading-snug text-(--dim)">
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
              className={`hidden h-10 items-center gap-2 whitespace-nowrap rounded-full ${ACTION_COLOR} px-5 text-[13px] font-semibold text-white shadow-[0_4px_12px_-6px_rgba(191,100,231,0.4)] transition-[transform,background-color] duration-100 ease-out hover:-translate-y-px  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--page-bg) sm:inline-flex`}
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
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <span className="font-heading text-[26px] font-bold tracking-[-0.03em] text-(--page-fg)">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-[26px] font-bold tracking-[-0.03em] text-(--page-fg) transition-colors hover:text-(--accent)"
                  >
                    {item.label}
                  </Link>
                )}
                {item.children && (
                  <div className="mt-3.5 flex flex-col gap-3 border-l border-(--line-strong) pl-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="pl-4 text-[15px] text-(--muted) transition-colors hover:text-(--page-fg)"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-3 border-t border-(--line) pt-3">
              <Link
                href={applyHref}
                onClick={() => setMobileOpen(false)}
                className={BTN_PRIMARY}
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
                className={BTN_SECONDARY}
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
