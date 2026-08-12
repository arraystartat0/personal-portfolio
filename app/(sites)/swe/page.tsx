import type { Metadata } from "next";
import UnderConstruction from "../../components/UnderConstruction";
import { getSite } from "../../lib/sites";

const site = getSite("swe");

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

export default function SwePage() {
  return <UnderConstruction slug={site.slug} />;
}
