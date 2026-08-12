import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PageTransition from "./components/PageTransition";
import { MOTION_BOOT_SCRIPT } from "./lib/motion";
import { SITE_URL } from "./lib/site-url";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Three portfolios from one person: design, software engineering and embedded systems.";

export const metadata: Metadata = {
  /*
   * Every relative URL below, and every generated card, resolves against this.
   * Without it Next warns at build and emits bare paths, which scrapers cannot
   * fetch: a card is only ever requested by a machine that is not on this site.
   */
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Maneet Bhatt",
    template: "%s · Maneet Bhatt",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Maneet Bhatt",
    locale: "en_CA",
    title: "Maneet Bhatt",
    description,
  },
  /* summary_large_image is the 1.91:1 card the OG images are drawn for. The
     small variant would crop them to a square thumbnail. No `images` here:
     Next fills both og:image and twitter:image from the opengraph-image file
     of whichever segment is rendering. */
  twitter: { card: "summary_large_image" },
  /*
   * No `alternates` at this level, deliberately. Metadata is inherited, so a
   * canonical of "/" written here would be handed to /design and the two
   * placeholders as well, quietly telling a crawler that all four pages are the
   * hub. Each page declares its own.
   */
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* The boot script writes an attribute here before React sees the element. */
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/*
          First thing in the body, and blocking, so a remembered "reduce motion"
          is on <html> before anything that animates has been parsed. Deferred,
          it would let a reader who already asked for stillness watch a frame of
          the marquee on every page load.
        */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT_SCRIPT }} />
        {children}
        {/* Outside {children} so the panel survives the route swap it is covering. */}
        <PageTransition />
      </body>
    </html>
  );
}
