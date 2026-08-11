export interface NavLink {
  href: string;
  label: string;
  accent?: boolean;
}

export const brand = {
  name: "MANEET BHATT",
  discipline: "Web designer",
};

export const navLinks: NavLink[] = [
  { href: "#work", label: "Work" },
  { href: "#side", label: "Side" },
  { href: "#about", label: "About" },
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

export const marqueeItems = [
  "FIGMA",
  "ILLUSTRATOR",
  "HTML/CSS/JS",
  "REACT",
  "NEXT.JS",
  "BOOTSTRAP",
  "WORDPRESS",
  "PHP",
  "MYSQL",
  "PYTHON",
  "SUPABASE",
  "DJANGO",
  "CLAUDE API",
  "SEO",
  "WCAG 2.1 AA",
  "GIT",
];
