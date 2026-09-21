import { useCallback, useEffect, useState } from "react";
import { getJson } from "@/lib/api";


// Simple in-memory cache so switching tabs doesn't cause a refetch
const cache: Record<string, unknown[]> = {};

export function useCollection<T extends Record<string, unknown>>(path: string) {
  const [data, setData] = useState<T[]>(cache[path] as T[] || []);
  // Only loading if not in cache
  const [loading, setLoading] = useState(!cache[path]);
  const [error, setError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let active = true;
    
    // If we have cache and haven't manually refreshed, don't show loading state
    // but we can still silently refresh the data. Actually, the request was 
    // "data should only reload if I click refresh". 
    if (cache[path] && revision === 0) {
      return;
    }

    // `loading` already starts true whenever the path isn't cached
    // (useState(!cache[path])), so no synchronous setState is needed here.
    getJson(`/${path}`)
      .then((res) => {
        if (!active) return;
        const fetchedData = (res as T[]) ?? [];
        cache[path] = fetchedData;
        setData(fetchedData);
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