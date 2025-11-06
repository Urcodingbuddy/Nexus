import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibm_plex = IBM_Plex_Mono({
  variable: "--font-ibm_plex_mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Nexus - Detect Ransomware",
  description: "Crafter for Cybersecurity professional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibm_plex.className} antialiased`}>{children}</body>
    </html>
  );
}
