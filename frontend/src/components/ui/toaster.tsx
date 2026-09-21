"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      toastOptions={{
        style: {
          background: "var(--card-strong)",
          color: "var(--page-fg)",
          border: "1px solid var(--line-strong)",
          fontSize: "14px",
          borderRadius: "12px",
          boxShadow: "0 12px 40px -12px rgba(0,0,0,0.45)",
          backdropFilter: "blur(14px)",
          maxWidth: "420px",
          padding: "12px 16px",
        },
        success: {
          iconTheme: { primary: "var(--accent)", secondary: "#fff" },
          duration: 5000,
        },
        error: {
          iconTheme: { primary: "#f87171", secondary: "#fff" },
          duration: 6000,
        },
        loading: {
          iconTheme: { primary: "var(--accent)", secondary: "#fff" },
          duration: 30000,
        },
      }}
    />
  );
}