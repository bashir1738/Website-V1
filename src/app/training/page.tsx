import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import {
  programPaths,
  howBlockfuseWorks,
  engineerBenefits,
} from "@/lib/content";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Academy & Training | Blockfuse Labs",
  description:
    "Demanding engineering training across AI-Native Software Engineering, Applied AI, and Blockchain in Jos, Nigeria.",
};

export default function TrainingPage() {
  return (
    <main className="pb-20 pt-32 sm:pt-40">
      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Blockfuse Academy"
          title="Train for the work. Prove you are ready."
          copy="The Academy turns potential into practical ability through selective admission, hard project work, professional code review, AI-native workflows, and production-readiness assessments."
        />

        {/* The Gap & 5 Step Process */}
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="glass rounded-[2rem] p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-violet">
                  The Standard
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
                  The gap is not talent. It is proof.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[var(--muted)]">
                  Thousands of people want careers in technology. Companies need capable engineers. But traditional courses rarely prove that someone can contribute to real software.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
                  Blockfuse closes that gap. We turn potential into practical ability, and practical ability into credible opportunities.
                </p>
              </div>

              <div className="grid gap-3">
                {howBlockfuseWorks.map((step) => (
                  <div
                    key={step.number}
                    className="flex items-start gap-4 rounded-2xl border border-[var(--line)] bg-[var(--card-strong)] p-4 sm:p-5"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-violet to-brand-indigo text-xs font-bold text-white">
                      {step.number}
                    </span>
                    <div>
                      <p className="font-semibold text-[var(--page-fg)]">
                        {step.title}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Programs */}
        <div className="mx-auto mt-20 max-w-7xl">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.24em] text-brand-violet">
            Our Programs
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {programPaths.map((program) => (
              <Card
                key={program.title}
                title={program.title}
                meta={program.tagline || program.audience}
                copy={program.description}
              />
            ))}
          </div>
        </div>

        {/* What You Get Section */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="glass rounded-[2rem] p-8 sm:p-10">
            <h3 className="font-serif text-2xl font-bold sm:text-3xl">
              Become an engineer your work can speak for.
            </h3>
            <p className="mt-3 text-sm text-[var(--muted)] sm:text-base">
              You do not need another course that leaves you with videos watched and nothing meaningful to show. At Blockfuse, you will:
            </p>
            <ul className="mt-6 space-y-3">
              {engineerBenefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm text-[var(--muted)] sm:text-base"
                >
                  <span className="text-brand-violet font-bold">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <ButtonLink href="/contact">Apply for training</ButtonLink>
        </div>
      </section>
    </main>
  );
}
