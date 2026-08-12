import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, PlaceholderCard, loadInter } from "../../lib/og";
import { profile } from "../../lib/profile";
import { getSite } from "../../lib/sites";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const site = getSite("embedded");

export const alt = `${profile.name} · ${site.discipline}, ${site.statusLabel.toLowerCase()}`;

/* See the note on the swe card: the status belongs in the preview. */
export default async function Image() {
  return new ImageResponse(
    <PlaceholderCard site={site} name={profile.name} location={profile.location} />,
    {
      ...size,
      fonts: [{ name: "Inter", data: await loadInter(), style: "normal", weight: 700 }],
    },
  );
}
