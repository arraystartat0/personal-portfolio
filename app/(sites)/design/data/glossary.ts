import type { Glossary } from "../components/Term";

/**
 * Jargon a reader should not have to already know. Hiring managers read this
 * site, and so do the people they pass it to; a term defined once here stays
 * consistent everywhere it appears.
 *
 * Reference one from any copy string with its key in double brackets, e.g.
 * "built with [[seo]] in mind". GlossaryText does the substitution.
 */
export const glossary = {
  seo: {
    term: "SEO",
    definition:
      "Search engine optimisation: shaping a site so it turns up when someone searches for the thing it sells, rather than only for the company name.",
  },
  cms: {
    term: "CMS",
    definition:
      "Content management system: the interface a team publishes through, so changing the site means filling in a form rather than editing code or waiting on a developer.",
  },
  wcag: {
    term: "WCAG",
    definition:
      "Web Content Accessibility Guidelines: the standard for whether a site can actually be used with a keyboard, a screen reader, or low vision.",
  },
  ia: {
    term: "IA",
    definition:
      "Information architecture: how a site's content is grouped, ordered and named. It decides what a reader can find, and it is invisible until it is wrong.",
  },
  "card-sort": {
    term: "card sort",
    definition:
      "A research method: people group the site's content into piles that make sense to them, so the structure comes from how readers think rather than from how the organisation is arranged.",
  },
  "live-region": {
    term: "live region",
    definition:
      "A part of a page marked so a screen reader announces it when it changes. Without one, an update that is only visible is simply missed.",
  },
  erp: {
    term: "ERP",
    definition:
      "Enterprise resource planning: the one system a company runs its orders, stock, invoicing and reporting through, instead of a spreadsheet per department and a filing cabinet for the rest.",
  },
  "optimistic-ui": {
    term: "optimistic UI",
    definition:
      "The interface shows the result the instant you act and settles up with the server afterwards. On a slow or missing connection the work carries on rather than waiting on a round trip that may never come back.",
  },
  "offline-first": {
    term: "offline-first",
    definition:
      "Designing on the assumption the network will be gone at some point, so a device keeps working on its own and syncs when the connection returns. The drop is a normal condition, not an error state.",
  },
  "human-in-the-loop": {
    term: "human in the loop",
    definition:
      "The machine proposes and a person approves. Nothing a model produced reaches the record until somebody has read it and signed it off.",
  },
  "design-tokens": {
    term: "design tokens",
    definition:
      "The named values a design is built from: this grey, that radius, this step in the type scale. Because every screen refers to the name rather than the value, a look can be regenerated or restyled without anything drifting out of step.",
  },
  preattentive: {
    term: "preattentive",
    definition:
      "The visual work the eye does before you decide to look at anything. Length, position and colour register in a fraction of a second; the same fact written into a sentence has to be read.",
  },
} satisfies Record<string, Glossary>;

export type GlossaryKey = keyof typeof glossary;
