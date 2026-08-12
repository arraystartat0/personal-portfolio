import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";
import type { SiteEntry } from "./sites";

/*
 * Shared scaffolding for the generated link cards.
 *
 * These are the images a recruiter sees before the site: pasted into Slack, a
 * LinkedIn post or an email, the card is the first thing rendered and the page
 * is the second. So they follow the same rule the sites do, and the hub's card
 * looks nothing like the design site's. What is shared here is the plumbing
 * (size, fonts, the dark skeleton the hub and its two placeholders share),
 * never a treatment that crosses into /design.
 */

/** The size every scraper crops against. Facebook, LinkedIn and X all want 1.91:1. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/*
 * Fonts are vendored under assets/ and read from disk rather than fetched.
 *
 * next/font hands its downloads to the browser, not to satori, so the OG
 * renderer cannot reach the Inter and Archivo the sites are actually set in;
 * a card is the one place on this project that has to load the file itself.
 * Vendored rather than fetched from Google at build time, because a network
 * blip would not fail the build, it would silently ship cards in a fallback
 * face, which is the kind of breakage nobody notices for a month.
 *
 * One weight each. These are read at thumbnail size in a feed, where hierarchy
 * has to come from size and colour anyway, and a second weight is a third of a
 * megabyte in the repo to soften type that should not be soft.
 */
async function loadFont(file: string) {
  return readFile(join(process.cwd(), "assets", file));
}

export const loadInter = () => loadFont("Inter-Bold.ttf");
export const loadArchivo = () => loadFont("Archivo-ExtraBold.ttf");

/* The hub's palette, restated as literals: satori resolves no custom properties,
   so hub.module.css cannot be the source here however much it should be. */
const INK = "#0a0a0c";
const TEXT = "#edebe6";
const MUTED = "rgba(237, 235, 230, 0.62)";
const FAINT = "rgba(237, 235, 230, 0.42)";
const HAIR = "rgba(237, 235, 230, 0.14)";

/*
 * `accentRgb` is stored space-separated so CSS can slice it with a slash, which
 * is the whole reason the token works on the hub. satori parses a narrower
 * colour grammar than a browser, so the channels are rejoined with commas here
 * rather than the storage format being changed to suit the renderer.
 */
const channels = (accentRgb: string) => accentRgb.trim().split(/\s+/).join(", ");

/**
 * The dark skeleton: mark, wordmark, location, and a footer rule.
 *
 * `accentRgb` drives the one wash, exactly as the token does on the hub, which
 * is what keeps a discipline's card and its page the same colour without either
 * one naming a hex.
 */
export function DarkCard({
  accentRgb,
  children,
}: {
  accentRgb: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px 72px",
        backgroundColor: INK,
        /* Stands in for the page's blurred glows. satori has no filter: blur,
           and a radial gradient was what the blur was approximating anyway. */
        backgroundImage: `radial-gradient(1100px 620px at 84% -12%, rgba(${channels(accentRgb)}, 0.30), transparent 62%), radial-gradient(900px 520px at 4% 108%, rgba(${channels(accentRgb)}, 0.13), transparent 60%)`,
        color: TEXT,
        fontFamily: "Inter",
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ name, location }: { name: string; location: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 20,
        letterSpacing: "0.18em",
        color: MUTED,
      }}
    >
      <div style={{ display: "flex" }}>{name.toUpperCase()}</div>
      <div style={{ display: "flex" }}>{location.toUpperCase()}</div>
    </div>
  );
}

/** A status dot, the same shape the hub uses in its rows. */
function Dot({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 13,
        height: 13,
        borderRadius: 99,
        backgroundColor: color,
        display: "flex",
      }}
    />
  );
}

/**
 * The card for a site that is not built yet.
 *
 * Both placeholders render this, tinted by their own accent, because
 * construction.module.css is already the hub's language tinted per discipline
 * and the card has no reason to diverge from the page it points at.
 */
export function PlaceholderCard({
  site,
  name,
  location,
}: {
  site: SiteEntry;
  name: string;
  location: string;
}) {
  const accent = `rgb(${channels(site.accentRgb)})`;

  return (
    <DarkCard accentRgb={site.accentRgb}>
      <CardHeader name={name} location={location} />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: "0.2em",
            color: accent,
          }}
        >
          <Dot color={accent} />
          <div style={{ display: "flex" }}>{site.statusLabel.toUpperCase()}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 128,
            letterSpacing: "-0.045em",
            lineHeight: 1,
            marginTop: 18,
          }}
        >
          {site.discipline}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            letterSpacing: "-0.02em",
            lineHeight: 1.28,
            color: MUTED,
            marginTop: 22,
            maxWidth: 900,
          }}
        >
          {site.headline}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", height: 1, backgroundColor: HAIR, marginBottom: 26 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {site.tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 19,
                letterSpacing: "0.05em",
                color: FAINT,
                border: `1px solid ${HAIR}`,
                padding: "9px 16px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </DarkCard>
  );
}

export { MUTED as OG_MUTED, FAINT as OG_FAINT, HAIR as OG_HAIR, TEXT as OG_TEXT };
