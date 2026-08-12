export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export const contact = {
  // Same two words as the nav discipline and the hero's Currently. See site.ts.
  kicker: "Available for design engineer roles · Vancouver & remote",
  headline: { lead: "Got a mess?\nLet's give it ", accent: "a shape." },
  channels: [
    {
      label: "EMAIL",
      value: "maneet@mbhatt.com",
      href: "mailto:maneet@mbhatt.com",
    },
    { label: "PHONE", value: "+1 (236) 996-9215", href: "tel:+12369969215" },
    {
      label: "LINKEDIN",
      value: "/in/maneetbhatt ↗",
      href: "https://linkedin.com/in/maneetbhatt/",
      external: true,
    },
    {
      label: "GITHUB",
      value: "arraystartat0 ↗",
      href: "https://github.com/arraystartat0",
      external: true,
    },
  ] as ContactChannel[],
};
