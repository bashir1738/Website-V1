import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModalButton } from "@/components/ui/modal-button";
import { eventDetails } from "@/features/events/content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return eventDetails.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = eventDetails.find((item) => item.slug === slug);
  return { title: event ? `${event.title} | Blockfuse Labs` : "Event not found", description: event?.description };
}
export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = eventDetails.find((item) => item.slug === slug);
  if (!event) notFound();
  return (
    <main>
      <header className="bg-[var(--color-surface-2)] px-5 py-12 text-[var(--color-paper)] sm:px-7 sm:py-16">
        <div className="mx-auto max-w-[1120px]">
          <Link href="/events" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">← All events</Link>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">{event.kind} / {event.date}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{event.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-muted-light)]">{event.description}</p>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-12 sm:px-7 sm:py-16 lg:grid-cols-[280px_1fr]">
        <aside className="self-start rounded-2xl border border-[var(--line-strong)] p-6 lg:sticky lg:top-28">
          <span className="eyebrow">Event information</span>
          <h2 className="mt-4 text-xl font-bold">This event has ended</h2>
          <dl className="mt-6 space-y-5 text-sm">
            <div><dt className="text-[var(--muted)]">When</dt><dd className="mt-1 font-semibold">{event.date}</dd></div>
            <div><dt className="text-[var(--muted)]">Format</dt><dd className="mt-1 font-semibold">{event.kind}</dd></div>
            <div><dt className="text-[var(--muted)]">At a glance</dt><dd className="mt-1 font-semibold">{event.meta}</dd></div>
          </dl>
          <p className="mt-6 border-t border-[var(--line)] pt-5 text-sm leading-relaxed text-[var(--muted)]">Interested in joining a future event?</p>
          <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">Get in touch →</Link>
        </aside>
        <article>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--surface-2)]"><Image src={event.image} alt="" fill preload sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" /></div>
          <p className="mt-3 text-xs text-[var(--muted)]">From the Blockfuse community photo collection.</p>
          <h2 className="mt-9 text-3xl font-bold">About the gathering</h2>
          <p className="mt-5 text-base leading-loose text-[var(--muted)]">{event.description}</p>
          <p className="mt-5 text-base leading-loose text-[var(--muted)]">{event.meta}. This edition is part of our event archive. For more information about this gathering or opportunities to participate in a future edition, contact the Blockfuse team.</p>
          <div className="mt-9 border-t border-[var(--line)] pt-8"><h2 className="text-2xl font-bold">Help shape the next edition.</h2><p className="mb-5 mt-3 text-sm leading-relaxed text-[var(--muted)]">Connect with us about supporting a future community event.</p><ModalButton modal="sponsor" variant="secondary">Become a partner</ModalButton></div>
        </article>
      </div>
    </main>
  );
}
