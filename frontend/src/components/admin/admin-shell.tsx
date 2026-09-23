"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Newspaper,
  CalendarDays,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { clearAdminAuth, getAdminEmail } from "@/lib/admin/auth";
import { ACTION_COLOR } from "@/lib/styles";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/inbox", label: "Inbox", icon: Inbox },
  { href: "/admin/blogs", label: "Blog posts", icon: Newspaper },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
];

function navClass(active: boolean) {
  return `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors duration-150 ${
    active
      ? "bg-(--accent-dim) text-(--page-fg)"
      : "text-(--muted) hover:bg-(--surface-2) hover:text-(--page-fg)"
  }`;
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const email = getAdminEmail() ?? "admin";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const handleLogout = () => {
    clearAdminAuth();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-(--page-bg) text-(--page-fg)">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-(--line) bg-(--card-strong) p-4 md:flex">
        <Link href="/admin" className="flex items-center gap-2.5 px-2 py-2">
          <span className={`${ACTION_COLOR} grid h-9 w-9 place-items-center rounded-xl font-heading text-sm font-bold text-white`}>
            BF
          </span>
          <span className="font-heading text-sm font-bold text-(--page-fg)">
            Blockfuse Admin
          </span>
        </Link>

        <nav className="mt-8 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={navClass(isActive(href))}
              aria-current={isActive(href) ? "page" : undefined}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-1">
          <a href="/" target="_blank" rel="noreferrer" className={navClass(false)}>
            <ExternalLink className="h-4 w-4" />
            View site
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className={`${navClass(false)} w-full`}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
          <p className="truncate px-2 pt-2 text-xs text-(--dim)">{email}</p>
        </div>
      </aside>

      {/* Mobile bar */}
      <div className="sticky top-0 z-50 border-b border-(--line) bg-(--card-strong)/90 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <Link href="/admin" className="font-heading text-sm font-bold text-(--page-fg)">
            Blockfuse Admin
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--line-strong) bg-(--surface-2) text-(--page-fg) transition-colors hover:bg-(--surface-3)"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute inset-x-0 top-17.25 h-[calc(100vh-69px)] overflow-y-auto border-t border-(--line) bg-(--card-strong) px-4 pb-6 pt-4 shadow-md animate-in fade-in slide-in-from-top-4">
            <nav className="flex flex-col gap-2">
              {NAV.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive(href)
                      ? "bg-(--accent-dim) text-(--page-fg)"
                      : "text-(--muted) hover:bg-(--surface-2) hover:text-(--page-fg)"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 space-y-2 border-t border-(--line) pt-4">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-(--muted) transition-colors hover:bg-(--surface-2) hover:text-(--page-fg)"
              >
                <ExternalLink className="h-4 w-4" />
                View site
              </a>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#f87171] transition-colors hover:bg-[rgba(248,113,113,0.1)]"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
              <p className="px-4 pt-2 text-xs text-(--dim)">{email}</p>
            </div>
          </div>
        )}
      </div>

      <main className="md:pl-60">{children}</main>
    </div>
  );
}