import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { orgWorkWithUsPoints } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hire Talent & Engineers | Blockfuse Labs",
  description:
    "Hire vetted, production-ready software engineers tested under real workloads and reviewed by senior engineers.",
};

export default function TalentPage() {
  return (
    <main className="pb-20 pt-32 sm:pt-40">
      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Hire Engineers"
          title="Hire engineers who have already been tested."
          copy="Finding applicants is easy. Identifying engineers who can actually contribute is harder. Blockfuse gives companies access to tested talent."
        />

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="glass rounded-[2rem] p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="font-serif text-3xl font-bold md:text-4xl">
                  Applications are abundant. Evidence is scarce.
                </h2>
                <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                  A CV can describe experience. A certificate can confirm attendance. Neither proves that someone can understand an unfamiliar codebase, solve a difficult problem, collaborate with a team, or take responsibility for production software.
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  Blockfuse gives you more useful evidence. Before we recommend an engineer, we have reviewed their code, assessed their technical judgment, evaluated how they work with others, and seen what they can build.
                </p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-[var(--page-fg)]">
                    Organisations can work with us to:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                    {orgWorkWithUsPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span className="text-brand-violet font-bold">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--card-strong)] p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold">
                    What Blockfuse Verified Engineer means
                  </h3>
                  <ul className="mt-5 space-y-4 text-sm text-[var(--muted)]">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-violet font-bold">✓</span> Passed our production-readiness assessment
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-violet font-bold">✓</span> Built working software that our reviewers can examine
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-violet font-bold">✓</span> Demonstrated effective use of AI-assisted development
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-violet font-bold">✓</span> Assessed on testing, debugging, and system design
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--line)]">
                  <p className="text-xs text-[var(--muted)]">
                    Tell us the capabilities your team needs. We will help you find, or develop, the right people.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.24em] text-brand-violet">
            The Hiring Process
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tell us what you need",
                desc: "We learn about the role, responsibilities, required skills, and the problems the engineer will be expected to solve.",
              },
              {
                step: "02",
                title: "Receive a shortlist",
                desc: "You receive a small, relevant shortlist of verified engineers, not a database of CVs to search through.",
              },
              {
                step: "03",
                title: "Review the evidence",
                desc: "You can review each engineer’s verified skills, portfolio, assessment results, and relevant project experience.",
              },
              {
                step: "04",
                title: "Interview and select",
                desc: "You retain control of your interview process and final hiring decision. We coordinate the process.",
              },
              {
                step: "05",
                title: "Hire directly or contract",
                desc: "Blockfuse supports direct employment, contract engagements, and sponsored talent pipelines.",
              },
              {
                step: "06",
                title: "Receive continued support",
                desc: "We maintain regular check-ins, support the engineer’s continued development, and collect feedback.",
              },
            ].map((s) => (
              <div key={s.step} className="glass rounded-[1.6rem] p-6">
                <span className="text-xs font-bold text-gold">{s.step}</span>
                <h3 className="mt-2 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <ButtonLink href="/contact">Hire Blockfuse engineers</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Discuss a talent partnership
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}

