export type SiteStatus = "live" | "in-progress";

export interface SiteEntry {
  slug: string;
  href: string;
  discipline: string;
  headline: string;
  blurb: string;
  status: SiteStatus;
  statusLabel: string;
  /**
   * Space-separated RGB channels so the hub can derive both the solid accent
   * and its translucent washes from one token: `rgb(var(--accent) / 0.12)`.
   */
  accentRgb: string;
  /** What the site actually contains, shown as chips on the hub. */
  tags: string[];
}

/** The three portfolios the hub switches between. */
export const sites: SiteEntry[] = [
  {
    slug: "design",
    href: "/design",
    discipline: "Design",
    headline: "Brand, interface and the systems underneath them",
    blurb:
      "Three case studies on designing for businesses that are offered a licence they can't afford or a template that flattens them.",
    status: "live",
    statusLabel: "Open",
    accentRgb: "224 162 51",
    /* One build tag among the design ones, because the work behind this link is
       a designer who ships it. "Design" is the discipline; the lane is narrower. */
    tags: ["Brand systems", "Figma", "React", "WCAG 2.1 AA"],
  },
  {
    slug: "swe",
    href: "/swe",
    discipline: "Software",
    headline: "Web platforms, internal tools and the APIs behind them",
    blurb:
      "Full-stack work: component systems, document intake pipelines and the services that keep them honest.",
    status: "in-progress",
    statusLabel: "In progress",
    accentRgb: "96 140 255",
    tags: ["React / Next.js", "Python", "Postgres", "REST APIs"],
  },
  {
    slug: "embedded",
    href: "/embedded",
    discipline: "Embedded",
    headline: "Firmware and control software close to the metal",
    blurb:
      "Vehicle controls, digital filtering and real-time systems on ARM Cortex-M hardware.",
    status: "in-progress",
    statusLabel: "In progress",
    accentRgb: "63 201 138",
    tags: ["C / C++", "ARM Cortex-M", "RTOS", "DSP"],
  },
];

export function getSite(slug: string): SiteEntry {
  const site = sites.find((entry) => entry.slug === slug);
  if (!site) throw new Error(`Unknown site: ${slug}`);
  return site;
}

export function otherSites(slug: string): SiteEntry[] {
  return sites.filter((entry) => entry.slug !== slug);
}
