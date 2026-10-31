import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aperture Studio — Cinematic 35mm Photography & Optical Viewfinder",
  description: "Bespoke 35mm monochrome photography portfolio and interactive optical camera viewfinder. Curated silver gelatin prints and editorial commissions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-background text-text-primary antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
