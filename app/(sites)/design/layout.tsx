import type { Metadata } from "next";
import { Archivo, Poppins } from "next/font/google";
import SkipLink from "../../components/SkipLink";
import DesignFooter from "./components/DesignFooter";
import DesignNav from "./components/DesignNav";
import MobilePreview from "./components/MobilePreview";
import { MAIN_ID } from "./lib/anchors";
import ds from "./styles/design.module.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-archivo",
  display: "swap",
});

/** Only the two Blitz browser mockups use this: it is the client's typeface. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

/* Names the lane, because this string is the search result someone reads
   before they decide whether to open the page at all. See site.ts. Running
   prose, so "and" rather than the nav's ampersand. Hoisted to a constant only
   so the card and the search result cannot drift apart. */
const description =
  "Designer and developer in Vancouver. Selected work by Maneet Bhatt: brand, interface and the systems underneath them.";

export const metadata: Metadata = {
  title: "Design",
  description,
  alternates: { canonical: "/design" },
  openGraph: {
    type: "website",
    url: "/design",
    /* Spelled out rather than left to the template: og:title has no template to
       inherit, and a card reading just "Design" names nobody. */
    title: "Design · Maneet Bhatt",
    description,
  },
};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${archivo.variable} ${poppins.variable} ${ds.root}`}>
      {/*
        Before the nav, because that is the only position that does anything:
        the whole point is to be the first thing Tab reaches. This site is one
        very long page under a sticky bar, so without it every keyboard arrival
        pays for the bar's links, the switcher and the menu button before it can
        reach a word of the work.
      */}
      <SkipLink targetId={MAIN_ID} className={ds.skipLink} />
      <DesignNav />
      <main id={MAIN_ID} className={ds.main} tabIndex={-1}>
        {children}
      </main>
      <DesignFooter />
      {/*
        Inside .root, not beside it, so the dialog inherits the site's tokens.
        The button is position: fixed and .root is overflow-x: clip, which looks
        like a trap and is not: clip only clips descendants it is a containing
        block for, and a fixed element's containing block is the viewport.
      */}
      <MobilePreview />
    </div>
  );
}
