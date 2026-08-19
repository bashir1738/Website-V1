import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "ProdFest | Blockfuse Labs",
  description:
    "ProdFest is Blockfuse's platform for engineers to demonstrate what they can build, bringing together developers, employers, and partners.",
};

export default function ProdFestPage() {
  return (
    <main className="pb-20 pt-32 sm:pt-40">
      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ProdFest Platform"
          title="ProdFest: where talent meets opportunity."
          copy="ProdFest is Blockfuse's platform for engineers to demonstrate what they can build."
        />

        <div className="mx-auto mt-16 max-w-4xl text-center">
          <p className="text-base leading-relaxed text-[var(--muted)] md:text-lg">
            It brings together developers, employers, founders, ecosystem partners, and members of the technology community to discover talent, exchange knowledge, and celebrate products that actually got built.
          </p>
          <p className="mt-6 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Plenty of events celebrate ideas. ProdFest is for execution. ProdFest is where the Blockfuse community becomes visible to the people who can hire, fund, and partner with it. Engineers show real projects. Companies meet talent without a recruitment process. Ecosystems reach developers who are already building.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="glass rounded-[1.6rem] p-6 md:p-8 text-center sm:text-left">
              <h3 className="text-xl font-semibold">Attend</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Registration for the next edition opens ahead of the event. Connect with leading engineering talent.
              </p>
            </div>
            <div className="glass rounded-[1.6rem] p-6 md:p-8 text-center sm:text-left">
              <h3 className="text-xl font-semibold">Speak or demo</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                If you have shipped something worth showing, we want it on the schedule.
              </p>
            </div>
            <div className="glass rounded-[1.6rem] p-6 md:p-8 text-center sm:text-left">
              <h3 className="text-xl font-semibold">Sponsor</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Reach a room of engineers who build. Sponsorship packages available on request.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <ButtonLink href="/contact">Contact about ProdFest</ButtonLink>
        </div>
      </section>
    </main>
  );
}

