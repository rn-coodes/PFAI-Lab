import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AmbientBackground } from "@/components/ambient-background";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { SiteMotion } from "@/components/site-motion";
import "./globals.css";

const title = "Advanced Go Projects Showcase";
const description =
  "A modern SaaS-style portfolio hub for Rehan's advanced Golang projects: real-time chat, JWT REST API, and concurrent web crawler.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rehan-go-projects.vercel.app"),
  title: {
    default: title,
    template: `%s | ${title}`
  },
  description,
  keywords: [
    "Go",
    "Golang",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "WebSockets",
    "JWT",
    "Concurrency",
    "Portfolio",
    "National University of Technology"
  ],
  authors: [{ name: "Rehan" }],
  creator: "Rehan",
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://rehan-go-projects.vercel.app",
    siteName: title,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: title }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.svg"]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00ADD8"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AmbientBackground />
        <Navigation />
        <SiteMotion>
          {children}
          <Footer />
        </SiteMotion>
      </body>
    </html>
  );
}
