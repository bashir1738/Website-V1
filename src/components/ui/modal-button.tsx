"use client";

import React from "react";
import { useModal, type Prefill } from "@/components/modals/modal-provider";
import type { FormKey } from "@/lib/forms";

function ArrowIcon() {
  return (
    <svg
      className="btn-arrow h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}

type Variant = "primary" | "secondary" | "contrast" | "ghost" | "link";

const CLASS: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  contrast: "btn-contrast",
  ghost: "btn-ghost",
  link: "link-action",
};

/**
 * A CTA that opens one of the site's application forms instead of navigating.
 */
export function ModalButton({
  modal,
  children,
  variant = "primary",
  className = "",
  arrow = true,
  prefill,
}: {
  modal: FormKey;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  /** Answers already chosen upstream, keyed by field label. */
  prefill?: Prefill;
}) {
  const { openModal } = useModal();

  return (
    <button
      type="button"
      onClick={() => openModal(modal, prefill)}
      className={`group ${CLASS[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow &&
        (variant === "link" ? (
          <span aria-hidden="true" className="arrow">
            →
          </span>
        ) : (
          <ArrowIcon />
        ))}
    </button>
  );
}
