export interface Channel {
  label: string;
  href: string;
  external?: boolean;
}

/** Identity for the hub. Each site restates this in its own voice. */
export const profile = {
  name: "Maneet Bhatt",
  monogram: "MB",
  location: "Vancouver, BC",
  availability: "Open to work",
  kicker: "Portfolio index · 2026",
  headline: {
    lead: "Three disciplines,",
    tail: "three separate portfolios.",
  },
  intro:
    "I design, I ship full-stack, and I write firmware. Those three audiences are looking for different things, so each one gets a site built in its own language, rather than one page that compromises for all of them. Pick the one you came for.",
  channels: [
    { label: "maneet@mbhatt.com", href: "mailto:maneet@mbhatt.com" },
    {
      label: "LinkedIn ↗",
      href: "https://linkedin.com/in/maneetbhatt/",
      external: true,
    },
    {
      label: "GitHub ↗",
      href: "https://github.com/arraystartat0",
      external: true,
    },
  ] as Channel[],
};
