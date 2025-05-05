import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import siteConfig from "@/config/site.json";
import ClientClassManager from "../components/layout/ClientClassManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  keywords: siteConfig.metadata.keywords,
  authors: siteConfig.metadata.authors,
  openGraph: {
    type: "website",
    title: siteConfig.metadata.ogTitle,
    description: siteConfig.metadata.ogDescription,
    siteName: siteConfig.metadata.ogSiteName,
  },
  themeColor: siteConfig.metadata.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning>
        <ClientClassManager 
          fontClasses={[geistSans.variable, geistMono.variable]} 
        />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
