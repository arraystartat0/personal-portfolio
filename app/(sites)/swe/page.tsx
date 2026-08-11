import type { Metadata } from "next";
import UnderConstruction from "../../components/UnderConstruction";
import { getSite } from "../../lib/sites";

const site = getSite("swe");

export const metadata: Metadata = {
  title: site.discipline,
  description: site.blurb,
};

export default function SwePage() {
  return <UnderConstruction slug={site.slug} />;
}
