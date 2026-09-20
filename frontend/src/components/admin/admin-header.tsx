export function AdminHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-(--line) px-5 pb-6 pt-8 sm:px-8">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-2 font-heading text-2xl font-bold tracking-[-0.03em] text-(--page-fg) sm:text-3xl">
          {title}
        </h1>
      </div>
      {children}
    </header>
  );
}