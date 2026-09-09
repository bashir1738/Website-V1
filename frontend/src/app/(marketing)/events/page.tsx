import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ModalButton } from "@/components/ui/modal-button";
import { eventDetails } from "@/features/events/content";

export const metadata: Metadata = {
  title: "Events | Blockfuse Labs",
  description: "Meet the builders. Explore Blockfuse festivals, hackathons, workshops, and community events.",
};

export default function EventsPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[var(--color-surface-2)] px-5 py-16 text-[var(--color-paper)] sm:px-7 sm:py-20">
        <Image src="/brand/heropic.jpg" alt="" fill preload sizes="100vw" className="-z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[var(--color-ink)]/80" />
        <div className="mx-auto max-w-[1240px]">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">Blockfuse / Community events</p>
          <h1 className="mt-5 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Good things happen<br />when builders meet.</h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--color-muted-light)]">From first demos to late-night builds. Find your people, share your work, and be part of what happens next.</p>
          <a href="#events" className="mt-8 inline-flex min-h-11 items-center gap-6 rounded-full action-color px-6 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Explore events <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-7 sm:py-16">
        <div className="grid gap-8 border-b border-[var(--line-strong)] pb-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className="eyebrow">The next chapter</span>
            <h2 className="mt-3 text-3xl font-bold">ProdFest 2026</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">Our flagship demo festival returns. Register your interest to hear about the next edition. Date and venue to be announced.</p>
          </div>
          <ModalButton modal="prodfest">Register interest</ModalButton>
        </div>

        <div id="events" className="scroll-mt-28 pt-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><span className="eyebrow">The community in action</span><h2 id="past-events" className="mt-3 scroll-mt-28 text-3xl font-bold">Past events</h2></div>
            <p className="text-sm text-[var(--muted)]">Festivals. Workshops. A shared love of building.</p>
          </div>
          <div className="grid gap-7 md:grid-cols-2">
            {eventDetails.map((event) => (
              <Link key={event.slug} href={`/events/${event.slug}`} className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={event.image} alt="" fill sizes="(min-width: 1280px) 580px, (min-width: 768px) 50vw, 100vw" className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105" />
                  <span className="absolute bottom-4 left-4 rounded-lg bg-[var(--surface)] px-4 py-3 font-mono text-sm font-semibold">{event.date}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-[var(--color-ink)]/85 px-3 py-2 text-xs text-[var(--color-paper)]">Past event</span>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">{event.kind}</p>
                  <h3 className="mt-3 text-2xl font-bold group-hover:text-[var(--accent)]">{event.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{event.description}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-5 text-sm"><span className="text-[var(--muted)]">{event.meta}</span><span className="font-semibold">Explore event <span aria-hidden="true">↗</span></span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-[var(--surface-2)] p-8">
          <div><h2 className="text-2xl font-bold">Bring something to the room.</h2><p className="mt-2 text-sm text-[var(--muted)]">Partner with us on a workshop, a build, or the next big gathering.</p></div>
          <ModalButton modal="sponsor" variant="secondary">Partner with us</ModalButton>
        </div>
      </section>
    </main>
  );
}
