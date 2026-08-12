import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, loadArchivo } from "../../lib/og";
import { profile } from "../../lib/profile";
import { getSite } from "../../lib/sites";
import { brand } from "./data/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const site = getSite("design");

export const alt = `${profile.name} · ${site.headline}`;

/*
 * The design site's card, and the one place the modernist language has to
 * survive being a 1200x630 PNG in someone's Slack.
 *
 * It shares no treatment with the hub's card on purpose: this is the book, that
 * is the cover. The 2px ink frame is doing its usual job of saying "one discrete
 * artifact", which is the correct thing for a card to say, and the palette is
 * flat fields only. Note the ochre is a block and never a word: it is 2.29:1 on
 * this paper, and the rule that it may not be text on it holds in a PNG too.
 */
const PAPER = "#f5f2ea";
const INK = "#1a1814";
const BLUE = "#1f3ec2";
const OCHRE = "#d99414";
const INK_MUTED = "rgba(26, 24, 20, 0.64)";

export default async function Image() {
  const archivo = await loadArchivo();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 40,
          backgroundColor: PAPER,
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            border: `2px solid ${INK}`,
          }}
        >
          {/* frameHeader: the label strip that names the artifact below it. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `2px solid ${INK}`,
              padding: "0 28px",
              height: 74,
              fontSize: 21,
              letterSpacing: "0.16em",
              color: INK,
            }}
          >
            <div style={{ display: "flex" }}>{brand.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex" }}>{site.discipline.toUpperCase()}</div>
              <div style={{ display: "flex", width: 22, height: 22, backgroundColor: OCHRE }} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 44px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 78,
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
                color: INK,
                maxWidth: 940,
              }}
            >
              {site.headline}
            </div>
          </div>

          <div style={{ display: "flex", borderTop: `2px solid ${INK}`, height: 92 }}>
            {/* Blue field, paper text: the contact panel's treatment, which is
                where this site puts its terminal statement. */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 34px",
                backgroundColor: BLUE,
                color: PAPER,
                fontSize: 30,
                letterSpacing: "-0.015em",
              }}
            >
              {brand.discipline}
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "0 34px",
                fontSize: 21,
                letterSpacing: "0.16em",
                color: INK_MUTED,
              }}
            >
              {profile.location.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Archivo", data: archivo, style: "normal", weight: 800 }],
    },
  );
}
