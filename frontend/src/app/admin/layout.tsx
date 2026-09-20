"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminToken } from "@/lib/admin/auth";

function isLoginPage(pathname: string) {
  return pathname.startsWith("/admin/login");
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const loginPage = isLoginPage(pathname);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!mounted || loginPage) return;
    if (!getAdminToken()) {
      router.replace("/admin/login");
    }
  }, [mounted, loginPage, router]);

  // The login page is intentionally rendered on the server too (no browser
  // API access on this branch), so server and client HTML always match.
  if (loginPage) {
    return <>{children}</>;
  }

  // Before mount there is no way to know whether a token exists, so both the
  // server and the first client render agree on a spinner. Without this the
  // client would immediately render the shell and React would flag a
  // hydration mismatch.
  if (!mounted || !getAdminToken()) {
    return (
      <div className="grid min-h-screen place-items-center bg-(--page-bg)">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-(--accent) border-t-transparent" />
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}