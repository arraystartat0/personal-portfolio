import { resumeHref } from "./site";

export interface HeadlineSegment {
  text?: string;
  tone?: "accent" | "muted";
  break?: boolean;
}

export interface Tag {
  label: string;
  variant: "outline" | "fill";
}

export const hero = {
  kicker: "Portfolio 2026 · selected work",
  headline: [
    { text: "I build screens" },
    { break: true },
    { text: "people " },
    { text: "love", tone: "accent" },
    { text: " " },
    { text: "using.", tone: "muted" },
  ] as HeadlineSegment[],
  intro:
    "Small businesses get offered two bad options: a licence they can't afford, or a template that flattens them into everyone else. I design the brand and the interface around how a business actually works, then build the system underneath it, so it stays theirs to change.",
  currently: {
    label: "Currently",
    role: "Web Designer & Full Stack Developer",
    company: " @ Blitz Packaging Ltd.",
    href: "https://blitzpackaging.co.ug",
    hrefLabel: "blitzpackaging.co.ug ↗",
  },
  toolkit: {
    label: "Design toolkit",
    tags: [
      { label: "Figma", variant: "outline" },
      { label: "Illustrator", variant: "outline" },
      { label: "React", variant: "fill" },
      { label: "WCAG 2.1 AA", variant: "fill" },
    ] as Tag[],
  },
  actions: {
    primary: { href: "#work", label: "View studies ↓" },
    secondary: { href: "#contact", label: "Get in touch" },
    // Path lives in site.ts, next to the nav entry pointing at the same file.
    resume: { href: resumeHref, label: "View resume ↗" },
    scrollCue: "SCROLL ↓",
  },
};
