import portrait from "@/public/profile.jpg";

export interface Fact {
  label: string;
  lines: string[];
}

export const about = {
  kicker: "About",
  headline: "I'd rather fix the form\nthan redraw the logo.",
  paragraphs: [
    "I'm a computer engineering student at UBC, graduating 2029. For the last two years I've been the only designer at a manufacturing company in Uganda: researcher, illustrator, full-stack dev, and the person who trains the marketing team on Monday morning.",
    "That mix is the whole point. I design as the customer first (I want to know why someone bounced before I want to know what typeface we're using) and then as the stakeholder who has to live with the maintenance bill. What I care about most is giving a business room to be itself: real customisation, on architecture that won't trap them in two years.",
  ],
  facts: [
    {
      label: "EDUCATION",
      lines: [
        "BASc Computer Engineering",
        "University of British Columbia",
        "Vancouver · 2029",
      ],
    },
    { label: "CERTIFIED", lines: ["HarvardX CS50W", "DELF B1 & B2"] },
    { label: "LANGUAGES", lines: ["English · French · Hindi"] },
  ] as Fact[],
  /* Imported rather than referenced by path, so the URL is content-hashed. */
  portrait: {
    src: portrait,
    alt: "Maneet Bhatt",
  },
};
