import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/components/modals/modal-provider";
import { SiteBackground } from "@/components/ui/site-background";

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
          <ModalProvider>
            <SiteBackground />
            <LoadingScreen />
            <div className="relative isolate z-[2] flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
