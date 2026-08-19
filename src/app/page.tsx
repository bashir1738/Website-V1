import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  engineeringServices,
  navItems,
  process,
  programs,
  stats,
} from "@/lib/content";

function Arrow() {
  return <span aria-hidden="true" className="transition group-hover:translate-x-1">-&gt;</span>;
}

function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      href={href}
      className={`button-shine group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 active:scale-95 ${
        variant === "primary"
          ? "bg-gradient-to-r from-brand-violet to-brand-indigo text-white shadow-2xl shadow-brand-indigo/25 hover:-translate-y-0.5"
          : "border border-[var(--line)] bg-[var(--card-strong)] text-[var(--page-fg)] hover:-translate-y-0.5 hover:border-brand-violet/60"
      }`}
    >
      {children}
      <Arrow />
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-violet">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl font-bold leading-tight md:text-6xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[var(--muted)] md:text-lg">{copy}</p>
    </div>
  );
}

function Card({
  title,
  meta,
  copy,
}: {
  title: string;
  meta?: string;
  copy: string;
}) {
  return (
    <article className="glass group rounded-[1.6rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-violet/45 hover:shadow-brand-indigo/10 md:p-7">
      {meta ? <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{meta}</p> : null}
      <h3 className="mt-3 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{copy}</p>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-brand-violet/70 via-brand-indigo/50 to-transparent" />
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <header className="fixed inset-x-0 top-0 z-50 px-3 py-3">
        <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-3 py-2">
          <a href="#" className="flex items-center gap-2" aria-label="Blockfuse Labs home">
            <Image src="/brand/LOGO_ICON.svg" alt="" width={34} height={34} className="h-9 w-9" />
            <span className="text-sm font-bold tracking-wide sm:text-base">Blockfuse</span>
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition hover:bg-white/10 hover:text-[var(--page-fg)]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden rounded-full bg-[var(--page-fg)] px-4 py-2 text-sm font-semibold text-[var(--page-bg)] transition hover:scale-105 sm:inline-flex"
            >
              Start
            </a>
          </div>
        </nav>
      </header>

      <section className="relative min-h-screen overflow-hidden px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-32 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full border border-brand-violet/20 md:h-[42rem] md:w-[42rem]">
          <div className="orbital absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-gold shadow-[0_0_34px_rgba(216,184,106,0.9)]" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="text-center lg:text-left">
            <p className="mx-auto inline-flex rounded-full border border-brand-violet/30 bg-brand-violet/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-violet lg:mx-0">
              Training talent. Building systems.
            </p>
            <h1 className="mt-6 font-serif text-5xl font-bold leading-[0.96] md:text-7xl xl:text-8xl">
              Blockfuse Labs for the <span className="gradient-text">AI-native</span> world.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg lg:mx-0">
              We develop production-ready engineers through demanding training, and our senior engineers build dependable AI, web, and blockchain products for organisations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <ButtonLink href="#training">Explore training</ButtonLink>
              <ButtonLink href="#engineering" variant="secondary">Build with us</ButtonLink>
            </div>
          </div>

          <div className="glass relative mx-auto aspect-[0.82] w-full max-w-md overflow-hidden rounded-[2rem] p-4 sm:aspect-square lg:max-w-none">
            <div className="absolute inset-0 bg-[url('/brand/background_dark.svg')] bg-cover opacity-35 dark:opacity-60" />
            <div className="relative flex h-full flex-col justify-between rounded-[1.5rem] border border-white/15 bg-black/35 p-5 text-white">
              <Image src="/brand/block_fuse_logo_white.png" alt="Blockfuse Labs" width={184} height={48} className="h-auto w-40" />
              <div className="grid gap-3">
                {["Academy", "Talent Network", "Engineering"].map((item, index) => (
                  <div key={item} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs text-white/55">0{index + 1}</p>
                    <p className="mt-1 text-lg font-semibold">{item}</p>
                  </div>
                ))}
              </div>
              <p className="max-w-xs text-sm leading-6 text-white/70">Built in Jos, Plateau State. Ready for global engineering standards.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat} className="glass rounded-3xl p-4 text-center text-sm font-semibold leading-6 md:p-6">
              {stat}
            </div>
          ))}
        </div>
      </section>

      <section id="training" className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Blockfuse Training"
          title="Train for the work. Prove you are ready."
          copy="The Academy turns potential into practical ability through selective admission, hard project work, code review, AI-native practice, and production-readiness assessment."
        />
        <div className="mx-auto mt-10 grid max-w-7xl gap-4 md:grid-cols-2">
          {programs.map((program) => (
            <Card key={program.title} title={program.title} meta={program.audience} copy={program.copy} />
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass mx-auto max-w-7xl rounded-[2rem] p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-violet">How it works</p>
              <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">The gap is not talent. It is proof.</h2>
              <p className="mt-5 leading-8 text-[var(--muted)]">We turn potential into practical ability, then into credible opportunities companies can evaluate.</p>
            </div>
            <div className="grid gap-3">
              {process.map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--card-strong)] p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-violet to-brand-indigo text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="engineering" className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Blockfuse Engineering"
          title="Senior engineering for products that need to work."
          copy="We help startups, companies, agencies, governments, and founders design and deliver dependable AI, web, blockchain, backend, and in-house products."
        />
        <div className="mx-auto mt-10 grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {engineeringServices.map((service) => (
            <Card key={service.title} title={service.title} meta={service.time} copy={service.copy} />
          ))}
        </div>
      </section>

      <section id="talent" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          <div className="glass rounded-[2rem] p-6 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-violet">Hire engineers</p>
            <h2 className="mt-3 font-serif text-4xl font-bold">Ability already tested.</h2>
            <p className="mt-4 leading-8 text-[var(--muted)]">Companies get focused shortlists of engineers with reviewed code, visible projects, communication checks, and a clear production-readiness standard.</p>
          </div>
          <div id="prodfest" className="glass rounded-[2rem] p-6 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-violet">ProdFest</p>
            <h2 className="mt-3 font-serif text-4xl font-bold">Where talent meets opportunity.</h2>
            <p className="mt-4 leading-8 text-[var(--muted)]">A platform for engineers to demonstrate what they can build in front of employers, founders, ecosystem partners, funders, and the wider technology community.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-br from-brand-violet to-brand-indigo p-px">
          <div className="rounded-[2rem] bg-[var(--page-bg)] p-6 text-center md:p-12">
            <h2 className="font-serif text-4xl font-bold md:text-6xl">Potential deserves a path. Companies deserve proof.</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[var(--muted)]">Become an engineer worth hiring, hire one, have a product built, or partner with Blockfuse to create more opportunity.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="mailto:hello@blockfuselabs.com">hello@blockfuselabs.com</ButtonLink>
              <ButtonLink href="https://blockfuselabs.com/" variant="secondary">Visit old site</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <div>
            <Image src="/brand/block_fuse_logo.png" alt="Blockfuse Labs" width={156} height={42} className="hidden h-auto w-36 dark:block" />
            <Image src="/brand/block_fuse_logo_white.png" alt="Blockfuse Labs" width={156} height={42} className="h-auto w-36 dark:hidden" />
            <p className="mt-3">Developing production-ready engineers for the AI-native world.</p>
          </div>
          <p>Jos, Plateau State, Nigeria</p>
        </div>
      </footer>
    </main>
  );
}
