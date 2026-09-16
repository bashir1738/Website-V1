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
      <section className="events-poster-hero" aria-labelledby="events-hero-title">
        <div className="events-poster-inner">
          <span className="events-poster-tag events-poster-tag-top">
            Community events
          </span>
          <span className="events-poster-tag events-poster-tag-place">
            Jos, Nigeria
          </span>
          <span className="events-poster-tag events-poster-tag-format">
            Workshops · demos · meetups
          </span>
          <span
            className="events-poster-burst events-poster-burst-left"
            aria-hidden="true"
          />
          <span
            className="events-poster-burst events-poster-burst-right"
            aria-hidden="true"
          />

          <div className="events-poster-heading">
            <p>Blockfuse Labs presents</p>
            <h1 id="events-hero-title">
              COMMUNITY
              <br />
              EVENTS
              <br />
              <span className="text-text-secondary">WORKSHOPS!</span>
            </h1>
            <p className="events-poster-intro">
              We bring engineers together to build, learn, and showcase — through workshops, hackathons, and demo days that actually matter.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ModalButton modal="prodfest">See upcoming events</ModalButton>
              <Link href="/contact" className="btn-secondary bf-on-dark-btn inline-flex items-center gap-2">
                Host an event
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div
            className="events-poster-collage"
            aria-label="Scenes from Blockfuse events"
          >
            <figure className="events-poster-photo events-poster-photo-one">
              <Image
                src="/brand/DSC00191.jpg"
                alt="A speaker addressing builders at a Blockfuse event"
                fill
                priority
                sizes="(max-width: 767px) 62vw, 28vw"
              />
            </figure>
            <figure className="events-poster-photo events-poster-photo-two">
              <Image
                src="/brand/DSC09993.jpg"
                alt="An audience listening during a Blockfuse community session"
                fill
                priority
                sizes="(max-width: 767px) 46vw, 22vw"
              />
            </figure>
            <figure className="events-poster-photo events-poster-photo-three">
              <Image
                src="/brand/DSC02430.jpg"
                alt="Builders gathered around laptops during an event"
                fill
                priority
                sizes="(max-width: 767px) 52vw, 24vw"
              />
            </figure>
            <figure className="events-poster-photo events-poster-photo-four">
              <Image
                src="/brand/DSC09999.jpg"
                alt="A workshop in progress at Blockfuse Labs"
                fill
                sizes="(max-width: 767px) 45vw, 23vw"
              />
            </figure>
          </div>
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
