export interface DataColumn<T> {
  key: string;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
}

export function formatValue(value: unknown): React.ReactNode {
  if (value === null || value === undefined || value === "") {
    return <span className="text-(--dim)">—</span>;
  }
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "—";
  }
  if (typeof value === "string" && /^https?:\/\//.test(value)) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="max-w-[260px] truncate text-(--accent) underline underline-offset-4"
      >
        {value.replace(/^https?:\/\//, "")}
      </a>
    );
  }
  return String(value);
}

export function formatDate(value: unknown): string {
  if (!value) return "—";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  emptyLabel = "Nothing here yet.",
}: {
  columns: DataColumn<T>[];
  rows: T[];
  emptyLabel?: string;
}) {
  return (
    <div className="custom-scroll overflow-x-auto rounded-xl border border-(--line)">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-(--line-strong) bg-(--surface-2) text-[11px] uppercase tracking-wider text-(--dim)">
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-semibold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-sm text-(--muted)"
              >
                {emptyLabel}
              </td>
            </tr>
          )}
          {rows.map((row, index) => (
            <tr
              key={row.id as string | number | undefined ?? index}
              className="border-b border-(--line) bg-(--card) transition-colors last:border-b-0 hover:bg-(--card-hover)"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 align-middle">
                  {column.render
                    ? column.render(row)
                    : formatValue(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}