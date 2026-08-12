import type { Metadata } from "next";
import UnderConstruction from "../../components/UnderConstruction";
import { getSite } from "../../lib/sites";

const site = getSite("embedded");

export const metadata: Metadata = {
  title: site.discipline,
  description: site.blurb,
  alternates: { canonical: site.href },
  openGraph: {
    type: "website",
    url: site.href,
    title: `${site.discipline} · Maneet Bhatt`,
    description: site.blurb,
  },
};

export default function EmbeddedPage() {
  return <UnderConstruction slug={site.slug} />;
}
