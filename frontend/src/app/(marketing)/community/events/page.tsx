import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ModalButton } from "@/components/ui/modal-button";
import { API_URL } from "@/lib/api";
import { EYEBROW, BTN_SECONDARY, BF_ON_DARK_BTN } from "@/lib/styles";

const POSTER_TAG =
  "absolute z-[4] border border-[rgba(7,7,10,0.72)] px-[0.875rem] py-[0.625rem] font-mono text-[0.625rem] font-semibold uppercase tracking-[0.06em] shadow-[0.2rem_0.2rem_0_rgba(7,7,10,0.7)]";

const POSTER_BURST =
  "absolute z-[1] aspect-square border border-ink [clip-path:polygon(50%_0,59%_35%,85%_15%,66%_42%,100%_50%,65%_58%,85%_85%,58%_66%,50%_100%,42%_66%,15%_85%,35%_58%,0_50%,35%_42%,15%_15%,42%_35%)]";

const POSTER_PHOTO =
  "relative m-0 overflow-hidden rounded-xl border-2 border-ink bg-(--surface-2) shadow-[0.35rem_0.35rem_0_rgba(7,7,10,0.75)]";

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
      <section className="p-0 text-ink max-md:p-2" aria-labelledby="events-hero-title">
        <div className="relative isolate min-h-[49rem] overflow-hidden bg-(--accent-soft) max-md:min-h-[44rem]">
          <Image
            src="/brand/eventbg.JPG"
            alt=""
            fill
            priority
            sizes="100vw"
            className="z-0 object-cover object-[center_58%] saturate-[0.72] contrast-[1.05]"
          />
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-paper)_88%,transparent)_0%,color-mix(in_srgb,var(--accent-soft)_80%,transparent)_58%,color-mix(in_srgb,var(--accent)_54%,transparent)_100%)]"
            aria-hidden="true"
          />
          <span
            className={`${POSTER_TAG} bg-ink text-paper top-[2.25rem] left-[56%] rotate-[8deg] max-md:left-auto max-md:right-[8%]`}
          >
            Community events
          </span>
          <span
            className={`${POSTER_TAG} bg-paper text-ink top-[12.5rem] left-[7%] -rotate-[7deg] max-md:top-[15.5rem] max-md:-left-4`}
          >
            Jos, Nigeria
          </span>
          <span
            className={`${POSTER_TAG} bg-(--accent-dim) text-ink top-[11rem] right-[5%] rotate-[6deg] max-md:hidden`}
          >
            Workshops · demos · meetups
          </span>
          <span
            className={`${POSTER_BURST} bg-paper w-[7rem] top-[8rem] left-[2.5%] rotate-[12deg] max-md:top-[3rem] max-md:left-[4%] max-md:w-[5rem]`}
            aria-hidden="true"
          />
          <span
            className={`${POSTER_BURST} bottom-[14rem] right-[4%] w-[9rem] -rotate-[8deg] bg-transparent max-md:hidden`}
            aria-hidden="true"
          />

          <div className="relative z-[2] mx-auto max-w-[67rem] px-8 pt-28 text-center max-md:px-4 max-md:pt-[6.5rem]">
            <p className="mb-5 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em]">
              Blockfuse Labs presents
            </p>
            <h1
              id="events-hero-title"
              className="m-0 text-[clamp(4.5rem,10vw,8.75rem)] font-bold uppercase leading-[0.75] tracking-[-0.085em] text-ink max-md:text-[clamp(3.35rem,16vw,5rem)] max-md:leading-[0.82]"
            >
              COMMUNITY
              <br />
              EVENTS
              <br />
              <span>WORKSHOPS!</span>
            </h1>
            <p className="mx-auto mt-8 max-w-[45ch] text-[0.875rem] leading-[1.6] max-md:mt-6 max-md:max-w-[32ch]">
              We bring engineers together to build, learn, and showcase — through workshops, hackathons, and demo days that actually matter.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ModalButton modal="prodfest">See upcoming events</ModalButton>
              <Link href="/contact" className={`${BTN_SECONDARY} ${BF_ON_DARK_BTN}`}>
                Host an event
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div
            className="pointer-events-none absolute -bottom-12 -left-8 -right-8 z-[3] grid items-end gap-4 grid-cols-[1.05fr_1.25fr_0.85fr_1.05fr] max-md:-bottom-8 max-md:-left-16 max-md:-right-16 max-md:grid-cols-[1.2fr_0.9fr_1fr] max-md:gap-3"
            aria-label="Scenes from Blockfuse events"
          >
            <figure className={`${POSTER_PHOTO} h-[16rem] [transform:rotate(-5deg)_translateY(1.5rem)] max-md:h-[10rem]`}>
              <Image
                src="/brand/event1.JPG"
                alt="A team presenting a Web3 project at a Blockfuse event"
                fill
                priority
                sizes="(max-width: 767px) 62vw, 28vw"
                className="object-cover object-center"
              />
            </figure>
            <figure className={`${POSTER_PHOTO} h-[10rem] rotate-[3deg] max-md:h-[10rem]`}>
              <Image
                src="/brand/event2.jpeg"
                alt="A mentor supporting a builder during a Blockfuse workshop"
                fill
                priority
                sizes="(max-width: 767px) 46vw, 22vw"
                className="object-cover object-[68%_center]"
              />
            </figure>
            <figure className={`${POSTER_PHOTO} h-[15rem] [transform:rotate(-2deg)_translateY(2rem)]`}>
              <Image
                src="/brand/event3.JPG"
                alt="Builders collaborating during a Blockfuse community session"
                fill
                priority
                sizes="(max-width: 767px) 52vw, 24vw"
                className="object-cover object-[60%_center]"
              />
            </figure>
            <figure className={`${POSTER_PHOTO} h-[18rem] [transform:rotate(4deg)_translateY(1rem)] max-md:hidden`}>
              <Image
                src="/brand/event4.jpeg"
                alt="Two builders working together during a Blockfuse event"
                fill
                sizes="(max-width: 767px) 45vw, 23vw"
                className="object-cover object-center"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-310 px-5 py-12 sm:px-7 sm:py-16">
        <div className="grid gap-8 border-b border-(--line-strong) pb-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className={EYEBROW}>The next chapter</span>
            <h2 className="mt-3 text-3xl font-bold">ProdFest 2026</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-(--muted)">Our flagship demo festival returns. Register your interest to hear about the next edition. Date and venue to be announced.</p>
          </div>
          <ModalButton modal="prodfest">Register interest</ModalButton>
        </div>

        <div id="events" className="scroll-mt-28 pt-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><span className={EYEBROW}>The community in action</span><h2 id="past-events" className="mt-3 scroll-mt-28 text-3xl font-bold">Past events</h2></div>
            <p className="text-sm text-(--muted)">Festivals. Workshops. A shared love of building.</p>
          </div>
          <div className="grid gap-7 md:grid-cols-2">
            {eventDetails.map((event) => (
              <Link key={event.slug} href={`/community/events/${event.slug}`} className="group overflow-hidden rounded-2xl border border-(--line) bg-(--surface) focus-visible:outline-offset-4 focus-visible:outline-(--accent)">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={event.image} alt="" fill sizes="(min-width: 1280px) 580px, (min-width: 768px) 50vw, 100vw" className="object-cover motion-safe:transition-transform motion-safe:duration-300 md:motion-safe:group-hover:scale-105" />
                  <span className="absolute bottom-4 left-4 rounded-lg bg-(--surface) px-4 py-3 font-mono text-sm font-semibold">{event.date}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-ink/85 px-3 py-2 text-xs text-paper">{event.upcoming ? "Upcoming" : "Past event"}</span>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-(--accent)">{event.kind}</p>
                  <h3 className="mt-3 text-2xl font-bold md:group-hover:text-(--accent)">{event.title}</h3>
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
