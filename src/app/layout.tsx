import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import SmoothScroll from "@/components/ui/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "HELO — Design & Development",
  description:
    "Hector Lopez — designer and developer creating polished interfaces, visual systems, and digital experiences with purpose.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}
    >
      <body className="bg-[#0d0d0d] text-[#f5efe6] min-h-screen overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
