import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PageTransition from "./components/PageTransition";
import { MOTION_BOOT_SCRIPT } from "./lib/motion";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maneet Bhatt",
    template: "%s · Maneet Bhatt",
  },
  description:
    "Three portfolios from one person: design, software engineering and embedded systems.",
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
