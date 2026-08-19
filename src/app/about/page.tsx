import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "About | Blockfuse Labs",
};

export default function AboutPage() {
  return (
    <main className="pb-20 pt-32 sm:pt-40">
      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Blockfuse"
          title="Potential deserves a path. Companies deserve proof."
          copy="We are a technology company based in Jos, Plateau State, Nigeria, working at the intersection of talent development and software delivery."
        />
        
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Blockfuse Labs runs on a simple belief: thousands of people
            want careers in technology, and companies need capable
            engineers, but traditional courses rarely prove that someone
            can contribute to real software. We built Blockfuse Training
            to close that gap, and Blockfuse Engineering to put the same
            standard to work on real problems.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.24em] text-brand-violet">What we hold to</p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="glass rounded-[1.6rem] p-6 md:p-8">
              <h3 className="text-xl font-semibold">Proof over promises</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                A certificate shows someone attended. We care about what a person can actually build and defend under review.
              </p>
            </div>
            <div className="glass rounded-[1.6rem] p-6 md:p-8">
              <h3 className="text-xl font-semibold">Standards, not shortcuts</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                The training is deliberately hard. We would rather graduate fewer engineers who are genuinely ready than many who are not.
              </p>
            </div>
            <div className="glass rounded-[1.6rem] p-6 md:p-8">
              <h3 className="text-xl font-semibold">One bar, two doors</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                The senior engineers who lead client work are the same people who set the standard our students train against.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 flex justify-center">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
        </div>
      </section>
    </main>
  );
}
