import { profile } from "./profile";
import { SITE_URL } from "./site-url";

/*
 * One Person record, emitted on the hub only.
 *
 * Its whole job is name search. Someone reads the name off a resume and types
 * it into Google, where this site competes with a LinkedIn profile and a GitHub
 * account for the same three words. `sameAs` is what tells a search engine those
 * three are one person rather than three, so the site rides along with the two
 * profiles that already rank instead of being sorted against them.
 *
 * Deliberately no `jobTitle`. The role string is already written in four places
 * that have to agree (see design/data/site.ts), and a fifth copy living out here
 * in structured data, where nobody reads it and everybody's crawler does, is
 * exactly the copy that would drift. It is also the field that would want the
 * reserved word: see the note about "engineer" in the same file. Omitted, the
 * question does not arise.
 */
export function personJsonLd() {
  const email = profile.channels
    .find((channel) => channel.href.startsWith("mailto:"))
    ?.href.replace("mailto:", "");

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    ...(email ? { email } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vancouver",
      addressRegion: "BC",
      addressCountry: "CA",
    },
    /* Derived rather than listed again: the external channels in the footer are
       the same two profiles this needs to point at. Add a third to the hub and
       it joins the graph with no edit here. */
    sameAs: profile.channels
      .filter((channel) => channel.external)
      .map((channel) => channel.href),
  };
}
