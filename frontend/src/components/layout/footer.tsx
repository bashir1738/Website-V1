"use client";

import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useModal } from "@/components/modals/modal-provider";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  { title: "Programs", links: footerLinks.programs },
  { title: "For Organisations", links: footerLinks.organizations },
  { title: "Community", links: footerLinks.community },
  { title: "Blockfuse Labs", links: footerLinks.company },
];

export function Footer() {
  const { openModal } = useModal();

  return (
    <footer className="relative z-[2] mt-auto border-t border-[var(--line)] bg-[var(--page-bg)]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-10 px-5 pb-10 pt-14 sm:px-7">
        {/* Brand block */}
        <div className="max-w-[34ch]">
          <div className="mb-3.5 flex items-center gap-2.5">
            <Image
              src="/brand/LOGO_ICON.svg"
              alt={siteConfig.name}
              width={26}
              height={26}
              className="h-[26px] w-[26px]"
            />
            <span className="font-heading text-[14.5px] font-bold text-[var(--page-fg)]">
              {siteConfig.name}
            </span>
          </div>
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--dim)]">
            {siteConfig.tagline}
          </p>
          <button
            type="button"
            onClick={() => openModal("newsletter")}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--card)] px-[18px] text-[12.5px] font-semibold text-[var(--page-fg)] transition-colors hover:bg-[var(--card-hover)]"
          >
            Join the dispatch
            <span aria-hidden="true" className="text-[var(--accent)]">
              →
            </span>
          </button>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-9 sm:grid-cols-3 lg:flex lg:flex-wrap lg:gap-x-14">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mb-4 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--dim)]">
                {col.title}
              </div>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <Link
                    key={`${col.title}-${link.label}`}
                    href={link.href}
                    className="text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--page-fg)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Contact */}
          <div>
            <div className="mb-4 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--dim)]">
              Get in Touch
            </div>
            <div className="flex flex-col gap-2.5 text-[13px] text-[var(--muted)]">
              <p>{siteConfig.location}</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[var(--accent)] transition-colors hover:text-[var(--accent-soft)]"
              >
                {siteConfig.email}
              </a>
              <Link
                href="/privacy"
                className="text-[12px] text-[var(--dim)] transition-colors hover:text-[var(--page-fg)]"
              >
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-3 px-5 pb-10 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--dim)] sm:flex-row sm:items-center sm:px-7">
        <p>
          © {new Date().getFullYear()} Blockfuse Labs — Jos, Nigeria. All rights
          reserved.
        </p>
        <p className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
            Built in Jos, Nigeria
          </span>
          <span className="text-[var(--line-strong)]">·</span>
          <span>Global Standard</span>
        </p>
      </div>
    </footer>
  );
}
