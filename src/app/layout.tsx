import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundPatterns } from "@/components/ui/background-patterns";

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
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <BackgroundPatterns />
          <LoadingScreen />
          <Header />
          <div className="relative z-10 flex-1">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
