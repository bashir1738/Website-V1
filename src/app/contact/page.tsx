import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Contact | Blockfuse Labs",
  description:
    "Get in touch with Blockfuse Labs for training admission, hiring verified engineers, engineering project delivery, and partnerships.",
};

export default function ContactPage() {
  return (
    <main className="pb-20 pt-32 sm:pt-40">
      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get in touch"
          title="Potential deserves a path. Companies deserve proof."
          copy="Whether you want to become an engineer worth hiring, hire one, have a product built, or partner with us, Blockfuse is where that starts."
        />

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Academy & Students */}
            <div className="glass rounded-[1.8rem] p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-violet">
                  For Aspiring Engineers
                </span>
                <h3 className="mt-2 text-2xl font-bold">Training & Cohorts</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  Ready to train hard, write production software under review, and prove your engineering readiness?
                </p>
              </div>
              <div className="mt-6">
                <ButtonLink href="mailto:hello@blockfuselabs.com?subject=Academy%20Application">
                  Apply via Email
                </ButtonLink>
              </div>
            </div>

            {/* Organizations & Hiring */}
            <div className="glass rounded-[1.8rem] p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-violet">
                  For Organizations
                </span>
                <h3 className="mt-2 text-2xl font-bold">Hire or Partner</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  Access verified software engineers, sponsor talent cohorts, or discuss dedicated team training.
                </p>
              </div>
              <div className="mt-6">
                <ButtonLink href="mailto:hello@blockfuselabs.com?subject=Hire%20Engineers%20or%20Partner">
                  Discuss Hiring
                </ButtonLink>
              </div>
            </div>

            {/* Engineering Studio */}
            <div className="glass rounded-[1.8rem] p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-violet">
                  For Product Leaders
                </span>
                <h3 className="mt-2 text-2xl font-bold">Engineering Services</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  Need AI, web, or blockchain products built? Senior-led discovery sprints and software delivery.
                </p>
              </div>
              <div className="mt-6">
                <ButtonLink href="mailto:hello@blockfuselabs.com?subject=Engineering%20Project">
                  Start an Engineering Project
                </ButtonLink>
              </div>
            </div>

            {/* General Inquiries */}
            <div className="glass rounded-[1.8rem] p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-violet">
                  General & ProdFest
                </span>
                <h3 className="mt-2 text-2xl font-bold">General Inquiries</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  Jos, Plateau State, Nigeria • We welcome inquiries from ecosystem builders and sponsors.
                </p>
              </div>
              <div className="mt-6">
                <ButtonLink href="mailto:hello@blockfuselabs.com" variant="secondary">
                  hello@blockfuselabs.com
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

