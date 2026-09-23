import Link from "next/link";
import { BTN_PRIMARY } from "@/lib/styles";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1240px] flex-col items-center justify-center px-5 py-24 text-center sm:px-7">
      <span className="font-mono text-[13px] tracking-[0.22em] text-[var(--accent)]">
        404
      </span>
      <h1 className="mt-4 font-heading text-3xl font-bold tracking-[-0.03em] text-[var(--page-fg)] sm:text-5xl">
        Page not found.
      </h1>
      <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-[var(--muted)]">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className={`${BTN_PRIMARY} mt-8`}>
        Back to home
      </Link>
    </div>
  );
}
