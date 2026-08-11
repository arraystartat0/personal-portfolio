export interface Principle {
  number: string;
  text: string;
}

/** The six cards that scatter and snap back together in the "How I work" panel. */
export interface ScatterCard {
  label: string;
  variant: "paper" | "ink" | "blue";
  /** Bar widths, in percent, for the stand-in lines of content. */
  lines?: number[];
  /** Four cells where one is highlighted, used by the holidays card. */
  calendar?: { highlightIndex: number };
  stat?: { value: string; caption: string };
}

export const approach = {
  kicker: "How I work",
  headlines: ["Most businesses run\non a pile of paper.", "I turn it into a system."],
  body: "Most small businesses end up renting software somebody else designed, where anything flexible costs more than a salary. I build the opposite: shaped around the work they already do, for the buyer and the staff at once.",
  /** The three numbered lines land as a non sequitur without something naming them. */
  principlesLabel: "The rules I design by",
  principles: [
    { number: "01", text: "Every business has a story. A template will flatten it." },
    { number: "02", text: "Customisation isn’t an upsell. It’s the reason to build at all." },
    {
      number: "03",
      text: "Modern architecture, so it stays theirs to change, not mine to maintain.",
    },
  ] as Principle[],
  /*
   * Order is layout: the grid is 3 across, 2 down, so index 1 is top-middle and
   * index 5 is bottom-right. The one ink card and the one blue card sit on a
   * diagonal so neither row nor column carries both dark blocks.
   */
  scatterCards: [
    { label: "ORDERS", variant: "paper", lines: [100, 70, 45] },
    { label: "PURCHASE ORDERS", variant: "ink", lines: [100, 55] },
    { label: "HOLIDAYS", variant: "paper", calendar: { highlightIndex: 1 } },
    { label: "PAYROLL", variant: "paper", lines: [100, 75, 35] },
    { label: "ACCOUNTING", variant: "paper", lines: [100, 60, 80] },
    {
      label: "DISPATCH",
      variant: "blue",
      stat: { value: "14", caption: "deadlines this week" },
    },
  ] as ScatterCard[],
  /** Names the block once the six cards have fused into it. */
  systemLabel: "ONE SYSTEM",
};
