import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ModalButton } from "@/components/ui/modal-button";
import { API_URL } from "@/lib/api";

export const metadata: Metadata = {
  title: "Events | Blockfuse Labs",
  description: "Meet the builders. Explore Blockfuse festivals, hackathons, workshops, and community events.",
};

interface BackendEvent {
  slug: string;
  title: string;
  description: string;
  date: string | null;
  location: string | null;
  image_url: string | null;
  link: string | null;
  createdAt: string;
}

export default async function EventsPage() {
  let backendEvents: BackendEvent[] = [];
  try {
    // Fetch-only: content comes from the backend, never a static fallback.
    const res = await fetch(`${API_URL}/events`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const json = await res.json() as { success: boolean; data: BackendEvent[] };
    if (json.success && Array.isArray(json.data)) {
      backendEvents = json.data;
    }
  } catch {
    // Backend unreachable — the archive renders the empty state.
  }

  const eventDetails = backendEvents.map((event) => ({
    slug: event.slug,
    title: event.title,
    description: event.description,
    date: new Date(event.date || event.createdAt).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric"
    }).toUpperCase(),
    meta: event.location || "Online",
    kind: "Event",
    image: event.image_url || "/brand/eventbg.JPG",
    upcoming: new Date(event.date || event.createdAt) > new Date(),
  }));

  return (
    <main>
      <section className="events-poster-hero" aria-labelledby="events-hero-title">
        <div className="events-poster-inner">
          <Image
            src="/brand/eventbg.JPG"
            alt=""
            fill
            priority
            sizes="100vw"
            className="events-poster-background"
          />
          <div className="events-poster-background-veil" aria-hidden="true" />
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
                src="/brand/event1.JPG"
                alt="A team presenting a Web3 project at a Blockfuse event"
                fill
                priority
                sizes="(max-width: 767px) 62vw, 28vw"
              />
            </figure>
            <figure className="events-poster-photo events-poster-photo-two">
              <Image
                src="/brand/event2.jpeg"
                alt="A mentor supporting a builder during a Blockfuse workshop"
                fill
                priority
                sizes="(max-width: 767px) 46vw, 22vw"
              />
            </figure>
            <figure className="events-poster-photo events-poster-photo-three">
              <Image
                src="/brand/event3.JPG"
                alt="Builders collaborating during a Blockfuse community session"
                fill
                priority
                sizes="(max-width: 767px) 52vw, 24vw"
              />
            </figure>
            <figure className="events-poster-photo events-poster-photo-four">
              <Image
                src="/brand/event4.jpeg"
                alt="Two builders working together during a Blockfuse event"
                fill
                sizes="(max-width: 767px) 45vw, 23vw"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-310 px-5 py-12 sm:px-7 sm:py-16">
        <div className="grid gap-8 border-b border-(--line-strong) pb-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className="eyebrow">The next chapter</span>
            <h2 className="mt-3 text-3xl font-bold">ProdFest 2026</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-(--muted)">Our flagship demo festival returns. Register your interest to hear about the next edition. Date and venue to be announced.</p>
          </div>
          <ModalButton modal="prodfest">Register interest</ModalButton>
        </div>

        <div id="events" className="scroll-mt-28 pt-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><span className="eyebrow">The community in action</span><h2 id="past-events" className="mt-3 scroll-mt-28 text-3xl font-bold">Past events</h2></div>
            <p className="text-sm text-(--muted)">Festivals. Workshops. A shared love of building.</p>
          </div>
          <div className="grid gap-7 md:grid-cols-2">
            {eventDetails.map((event) => (
              <Link key={event.slug} href={`/events/${event.slug}`} className="group overflow-hidden rounded-2xl border border-(--line) bg-(--surface) focus-visible:outline-offset-4 focus-visible:outline-(--accent)">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={event.image} alt="" fill sizes="(min-width: 1280px) 580px, (min-width: 768px) 50vw, 100vw" className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105" />
                  <span className="absolute bottom-4 left-4 rounded-lg bg-(--surface) px-4 py-3 font-mono text-sm font-semibold">{event.date}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-ink/85 px-3 py-2 text-xs text-paper">{event.upcoming ? "Upcoming" : "Past event"}</span>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-(--accent)">{event.kind}</p>
                  <h3 className="mt-3 text-2xl font-bold group-hover:text-(--accent)">{event.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-(--muted)">{event.description}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-(--line) pt-5 text-sm"><span className="text-(--muted)">{event.meta}</span><span className="font-semibold">Explore event <span aria-hidden="true">↗</span></span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-(--surface-2) p-8">
          <div><h2 className="text-2xl font-bold">Bring something to the room.</h2><p className="mt-2 text-sm text-(--muted)">Partner with us on a workshop, a build, or the next big gathering.</p></div>
          <ModalButton modal="sponsor" variant="secondary">Partner with us</ModalButton>
        </div>
      </section>
    </main>
  );
}
