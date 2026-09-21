"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { getJson } from "@/lib/api";
import { clearAdminAuth } from "@/lib/admin/auth";

function isLoginPage(pathname: string) {
  return pathname.startsWith("/admin/login");
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const loginPage = isLoginPage(pathname);

  const [mounted, setMounted] = useState(false);
  /**
   * HIGH-3: Session validity is now determined by the server (via the HttpOnly
   * cookie), not by reading localStorage. We ping /auth/me on mount; if the
   * cookie is missing or expired the server returns 401 and we redirect.
   */
  const [sessionValid, setSessionValid] = useState<boolean | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!mounted || loginPage) return;

    getJson("/auth/me")
      .then(() => setSessionValid(true))
      .catch(() => {
        clearAdminAuth();
        setSessionValid(false);
        router.replace("/admin/login");
      });
  }, [mounted, loginPage, router]);

  // The login page has no auth requirement.
  if (loginPage) {
    return <>{children}</>;
  }

  // Waiting for the server session check — show a spinner.
  if (!mounted || sessionValid === null) {
    return (
      <div className="grid min-h-screen place-items-center bg-(--page-bg)">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-(--accent) border-t-transparent" />
      </div>
    );
  }

  // Session confirmed as invalid — redirect is already queued.
  if (!sessionValid) {
    return null;
  }

  return <AdminShell>{children}</AdminShell>;
}