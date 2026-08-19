import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { engineeringServices } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Engineering Services | Blockfuse Labs",
  description:
    "Senior engineering advisory, discovery sprints, and production build & delivery for AI, web, and blockchain systems.",
};

export default function EngineeringPage() {
  return (
    <main className="pb-20 pt-32 sm:pt-40">
      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Blockfuse Engineering"
          title="Or have us build it."
          copy="Some organisations do not need engineers to hire. They need the work done. Our senior engineers deliver dependable AI, web, and blockchain systems."
        />

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="glass rounded-[2rem] p-8 sm:p-12">
            <h2 className="font-serif text-2xl font-bold md:text-3xl text-[var(--page-fg)]">
              Senior engineering for products that need to work.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-[var(--muted)]">
              <p>
                Our senior engineers take on a limited number of engagements each year: technical advisory when a decision is expensive, discovery when the shape of the solution is unclear, and senior-led delivery of AI, web, blockchain, and backend systems.
              </p>
              <p>
                Your code, infrastructure, and intellectual property stay yours. Every engagement is led by a senior engineer who is accountable for the outcome.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-7xl">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.24em] text-brand-violet">
            Services & Engagements
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {engineeringServices.map((service) => (
              <Card
                key={service.title}
                title={service.title}
                meta={service.time}
                copy={service.copy}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.24em] text-brand-violet">
            How we work
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="glass rounded-[1.6rem] p-6 md:p-8">
              <h3 className="text-xl font-semibold">Senior Led</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Every engagement is led by a senior engineer who owns the technical decisions, the quality, and your relationship with us.
              </p>
            </div>
            <div className="glass rounded-[1.6rem] p-6 md:p-8">
              <h3 className="text-xl font-semibold">What stays yours</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Your code, your infrastructure, your IP, and your roadmap are yours. A good deal of the work we do is never mentioned at all.
              </p>
            </div>
            <div className="glass rounded-[1.6rem] p-6 md:p-8">
              <h3 className="text-xl font-semibold">We take few of these</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Every project needs the right senior lead, a clear problem, and a realistic path to delivery. If the fit is wrong we will say so early.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <ButtonLink href="/contact">Build with us</ButtonLink>
        </div>
      </section>
    </main>
  );
}

