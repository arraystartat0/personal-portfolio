import { ImageResponse } from "next/og";
import {
  CardHeader,
  DarkCard,
  OG_CONTENT_TYPE,
  OG_FAINT,
  OG_MUTED,
  OG_SIZE,
  loadInter,
} from "./lib/og";
import { profile } from "./lib/profile";
import { sites } from "./lib/sites";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${profile.name} · three portfolios: design, software and embedded`;

/*
 * The hub's card, and by inheritance the card for any route that does not draw
 * its own. It is the cover: name, the claim, and the three disciplines as three
 * accents, which is the same thing the page says before you read a word of it.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <DarkCard accentRgb="140 140 160">
        <CardHeader name={profile.name} location={profile.location} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              letterSpacing: "-0.04em",
              lineHeight: 1.06,
              maxWidth: 1000,
            }}
          >
            {profile.headline.lead}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              letterSpacing: "-0.04em",
              lineHeight: 1.06,
              maxWidth: 1000,
              color: OG_MUTED,
            }}
          >
            {profile.headline.tail}
          </div>
        </div>

        {/* The three accents, in the order the hub lists them. */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {sites.map((site) => {
            const accent = `rgb(${site.accentRgb.trim().split(/\s+/).join(", ")})`;
            return (
              <div
                key={site.slug}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div style={{ display: "flex", width: 96, height: 5, backgroundColor: accent }} />
                <div style={{ display: "flex", fontSize: 26, letterSpacing: "-0.01em" }}>
                  {site.discipline}
                </div>
                <div style={{ display: "flex", fontSize: 18, color: OG_FAINT }}>
                  {site.statusLabel}
                </div>
              </div>
            );
          })}
        </div>
      </DarkCard>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: await loadInter(), style: "normal", weight: 700 }],
    },
  );
}
