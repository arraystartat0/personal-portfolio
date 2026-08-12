export interface NavLink {
  href: string;
  label: string;
  accent?: boolean;
  /** Leaves the page, so both nav renderings give it its own tab. */
  external?: boolean;
}

/*
 * "Design engineer" rather than "Web designer", and the same two words in the
 * hero's Currently line and the contact kicker. Three strings used to name the
 * job three ways, which left a reader to guess which one was the offer; the
 * evidence on this page is a designer who ships the thing, so that is the lane
 * it claims. Change one of the three and change all three.
 */
export const brand = {
  name: "MANEET BHATT",
  discipline: "Design engineer",
};

/*
 * The one place this site's resume path is written. The hero button and both
 * nav renderings read it from here.
 *
 * Folder per discipline, file named the same in each: three résumés go out to
 * three audiences, and `public/design/resume.pdf` says which one this is in a
 * way `resume-design.pdf` in a flat folder does not. The folder names are the
 * site slugs, so the URL matches the site the file belongs to. Nothing routes
 * at these paths, so the static file is what answers.
 */
export const resumeHref = "/design/resume.pdf";

/*
 * Resume sits before Contact rather than after it: Contact is the terminal ask
 * and the only accented item in the row, and it stops reading as the end of the
 * list if something follows it.
 */
export const navLinks: NavLink[] = [
  { href: "#work", label: "Work" },
  { href: "#side", label: "Side" },
  { href: "#about", label: "About" },
  { href: resumeHref, label: "Resume ↗", external: true },
  { href: "#contact", label: "Contact", accent: true },
];

/*
 * The credit is split around its heart, because that one is a drawn glyph and
 * cannot sit inside a string. The copyright mark is just a character, so it
 * stays in the sentence where it belongs. The year is not here at all: it is
 * read off the clock at build.
 */
export const footer = {
  creditLead: "Designed with",
  creditTail: "by Bhatt Studios",
  copyright: "© Bhatt Studios",
  /*
   * Scoped to this site on purpose. It says "this site", and the design
   * portfolio is the one that has been tested; the hub and the two placeholders
   * have not had their contrast checked yet, so the line does not appear there
   * and must not be lifted over until they have.
   */
  accessibility:
    "Designed for everyone in mind: this site meets WCAG 2.1 Level AA accessibility standards.",
};

/**
 * The desktop-only control that puts this page into phone width. The size is
 * said out loud in two places, because the point of the thing is that it is a
 * real viewport rather than a picture of one.
 */
export const mobilePreview = {
  open: "Mobile view",
  openLabel: "See this page at phone width",
  title: "MOBILE VIEW",
  device: "iPhone 16 Pro · 402 × 874",
  width: "402 PX",
  frameTitle: "Mobile preview of this page",
  close: "Exit",
};

/*
 * Bootstrap, WordPress, PHP and MySQL came out; TypeScript went in, which this
 * site is written in. The four that left are real and they are the HR portal's
 * stack, which still names them on its own card, but a list long enough to hold
 * every tool ever opened stops reading as a toolkit and starts reading as a
 * résumé keyword field.
 *
 * SEO and Claude API stay, though they look like the odd ones here. Both are
 * load-bearing evidence: one is what the Blitz study measures, the other is
 * what the intake feature in the sales study is built on.
 */
export const marqueeItems = [
  "FIGMA",
  "ILLUSTRATOR",
  "HTML/CSS/JS",
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "PYTHON",
  "SUPABASE",
  "DJANGO",
  "CLAUDE API",
  "SEO",
  "WCAG 2.1 AA",
  "GIT",
];
