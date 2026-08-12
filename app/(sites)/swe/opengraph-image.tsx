import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, PlaceholderCard, loadInter } from "../../lib/og";
import { profile } from "../../lib/profile";
import { getSite } from "../../lib/sites";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const site = getSite("swe");

export const alt = `${profile.name} · ${site.discipline}, ${site.statusLabel.toLowerCase()}`;

/*
 * Its own card rather than inheriting the hub's, so a link to this page says
 * "in progress" in the preview instead of promising three portfolios and
 * landing on a placeholder.
 */
export default async function Image() {
  return new ImageResponse(
    <PlaceholderCard site={site} name={profile.name} location={profile.location} />,
    {
      ...size,
      fonts: [{ name: "Inter", data: await loadInter(), style: "normal", weight: 700 }],
    },
  );
}
