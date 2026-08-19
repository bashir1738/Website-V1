import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--page-bg)] px-4 py-16 sm:px-6 lg:px-8 mt-auto relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Programs */}
          <div>
            <h4 className="font-semibold text-sm tracking-wide text-[var(--page-fg)]">
              Programs
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition hover:text-brand-violet"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For organisations */}
          <div>
            <h4 className="font-semibold text-sm tracking-wide text-[var(--page-fg)]">
              For organisations
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
              {footerLinks.organizations.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition hover:text-brand-violet"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blockfuse Labs */}
          <div>
            <h4 className="font-semibold text-sm tracking-wide text-[var(--page-fg)]">
              Blockfuse Labs
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition hover:text-brand-violet"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand & Address */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Image
                src="/brand/block_fuse_logo.png"
                alt="Blockfuse Labs"
                width={156}
                height={42}
                className="hidden h-auto w-36 dark:block"
              />
              <Image
                src="/brand/block_fuse_logo_white.png"
                alt="Blockfuse Labs"
                width={156}
                height={42}
                className="h-auto w-36 dark:hidden"
              />
            </div>
            <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed max-w-sm">
              Developing production-ready engineers for the AI-native world.
            </p>
            <div className="mt-4 space-y-1 text-sm text-[var(--muted)]">
              <p>Jos, Plateau State, Nigeria</p>
              <p>
                <a
                  href="mailto:hello@blockfuselabs.com"
                  className="text-brand-violet hover:underline"
                >
                  hello@blockfuselabs.com
                </a>
              </p>
              <p className="pt-2">
                <Link
                  href="/privacy"
                  className="hover:text-[var(--page-fg)] transition text-xs"
                >
                  Privacy policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--line)] pt-8 flex flex-col items-center justify-between gap-4 text-xs text-[var(--muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} Blockfuse Labs. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Built in Jos, Nigeria</span>
            <span>•</span>
            <span>Global Standard</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

