import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/layout/site-chrome";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { ModalProvider } from "@/components/modals/modal-provider";
import { ToasterProvider } from "@/components/ui/toaster";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "Blockfuse Labs",
    "engineering training",
    "AI training Nigeria",
    "software engineering bootcamp",
    "blockchain development",
    "Jos Nigeria tech",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <ModalProvider>
            <LoadingScreen />
            <SiteChrome>{children}</SiteChrome>
          </ModalProvider>
          <ToasterProvider />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
