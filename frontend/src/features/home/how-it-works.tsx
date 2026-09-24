"use client";

import React, { useState } from "react";
import type { HowItWorksStep } from "./content";

export function HowItWorksAccordion({ steps }: { steps: HowItWorksStep[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-10 border-t border-[var(--line-strong)]">
      {steps.map((step, i) => {
        const open = openIndex === i;
        const panelId = `how-blockfuse-panel-${step.number}`;

        return (
          <div key={step.number} className="group border-b border-[var(--line-strong)]">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full min-h-20 cursor-pointer list-none items-center gap-5 rounded-lg py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              <span className="w-8 shrink-0 font-mono text-sm text-[var(--accent)]">
                0{step.number}
              </span>
              <h3 className="flex-1 font-heading text-lg font-medium text-[var(--page-fg)] sm:text-xl">
                {step.title}
              </h3>
              <span
                aria-hidden="true"
                className={`text-xl text-[var(--muted)] ${open ? "hidden" : ""}`}
              >
                +
              </span>
              <span
                aria-hidden="true"
                className={`text-xl text-[var(--muted)] ${open ? "" : "hidden"}`}
              >
                −
              </span>
            </button>
            <div
              id={panelId}
              aria-hidden={!open}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-prose pb-7 pl-12 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
