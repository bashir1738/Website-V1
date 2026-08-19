import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--page-bg)] px-5 py-16 sm:px-8 mt-auto">
      <div className="mx-auto max-w-7xl">
        {/* Top: Brand + Tagline */}
        <div className="mb-14">
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand/LOGO_ICON.svg"
              alt="Blockfuse Labs"
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="font-heading text-xl font-bold tracking-tight text-[var(--page-fg)]">
              Blockfuse Labs
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            Developing production-ready engineers for the AI-native world.
            Building dependable software from Jos, Nigeria.
          </p>
        </div>

        {/* Link Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Programs */}
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-[var(--page-fg)]">
              Programs
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-hover transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Organisations */}
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-[var(--page-fg)]">
              For Organisations
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
              {footerLinks.organizations.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-hover transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-[var(--page-fg)]">
              Blockfuse Labs
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-hover transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-[var(--page-fg)]">
              Get in Touch
            </h4>
            <div className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
              <p>Jos, Plateau State, Nigeria</p>
              <p>
                <a
                  href="mailto:hello@blockfuselabs.com"
                  className="text-[var(--accent)] transition-colors hover:text-[var(--accent)]"
                >
                  hello@blockfuselabs.com
                </a>
              </p>
              <p className="pt-2">
                <Link
                  href="/privacy"
                  className="link-hover text-xs text-[var(--muted)]"
                >
                  Privacy policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-8 text-xs text-[var(--muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} Blockfuse Labs. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Built in Jos, Nigeria
            </span>
            <span className="text-[var(--line-strong)]">·</span>
            <span>Global Standard</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
