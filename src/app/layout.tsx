import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Lora, Hanken_Grotesk } from "next/font/google";
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

// Hanken Grotesk — self-hosted substitute for Cabinet Grotesk (which was never
// bundled; it only rendered for visitors who had it installed locally). A neutral
// grotesk with a full weight range that reads well at both body and display sizes.
// Powers --font-cabinet site-wide via globals.css. display:swap for fast first paint.
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
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

// Canonical production origin — inferred from the contact address (hello@imhelo.com).
// Change here if the site ships on a different domain; sitemap/robots/OG all read it.
const SITE_URL = "https://imhelo.com";
const DESCRIPTION =
  "Hector Lopez (HELO) — designer and developer creating polished interfaces, visual systems, and digital experiences with purpose.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HELO — Hector Lopez · Design & Development",
    template: "%s · HELO",
  },
  description: DESCRIPTION,
  applicationName: "HELO",
  authors: [{ name: "Hector Lopez", url: SITE_URL }],
  creator: "Hector Lopez",
  keywords: [
    "Hector Lopez", "HELO", "designer", "developer", "frontend developer",
    "graphic design", "brand design", "UI", "UX", "portfolio", "San Diego", "Next.js",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "HELO",
    title: "HELO — Hector Lopez · Design & Development",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HELO — Hector Lopez · Design & Development",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${lora.variable} ${singaporeSling.variable} ${hankenGrotesk.variable} antialiased`}
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
