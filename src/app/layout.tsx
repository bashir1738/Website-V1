import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blockfuse Labs | Training and Engineering",
  description:
    "Blockfuse Labs trains production-ready engineers and builds dependable AI, web, and blockchain systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
