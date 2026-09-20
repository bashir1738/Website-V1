import { useCallback, useEffect, useState } from "react";
import { getJson } from "@/lib/api";
import { getAdminToken } from "@/lib/admin/auth";

export function useCollection<T extends Record<string, unknown>>(path: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let active = true;
    const token = getAdminToken() ?? undefined;

    getJson(`/${path}`, token)
      .then((res) => {
        if (!active) return;
        const body = res as { data?: T[] };
        setData(body.data ?? []);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [path, revision]);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    setRevision((value) => value + 1);
  }, []);

  return { data, loading, error, reload };
}