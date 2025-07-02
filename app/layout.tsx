import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Space Portfolio - Exploring the Digital Universe",
  description: "Welcome to my cosmic journey through web development. A portfolio showcasing stellar projects and out-of-this-world experiences.",
  keywords: ["portfolio", "web development", "frontend developer", "React", "Next.js", "space theme"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Space Portfolio - Digital Universe",
    description: "Exploring the cosmos of web development, one project at a time",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${beVietnamPro.variable} antialiased font-sans overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
