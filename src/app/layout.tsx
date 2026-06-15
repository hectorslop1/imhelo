import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Lora } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import SideBadge from "@/components/ui/SideBadge";
import BackToTop from "@/components/ui/BackToTop";
import { I18nProvider } from "@/lib/i18n";
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

// Lora — editorial serif, used very sparingly for typographic contrast moments.
// Not for body text. Only for curated italic accents (section break, pull quotes).
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

// Singapore Sling — custom display font used only for the HELO wordmark
// and select brand moments. Not for body text or paragraphs.
const singaporeSling = localFont({
  src: "../../public/fonts/singapore_sling/singaporesling.ttf",
  variable: "--font-singapore-sling",
  display: "block",   // block render until loaded — prevents wordmark FOUT
  preload: true,
  weight: "400",
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
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${lora.variable} ${singaporeSling.variable} antialiased`}
    >
      <body className="bg-[#e9e7e1] text-[#16150f] min-h-screen overflow-x-hidden">
        <I18nProvider>
          <CustomCursor />
          <SideBadge />
          <BackToTop />
          <SmoothScroll>{children}</SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}
