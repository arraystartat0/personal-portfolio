import { sites } from "./sites";

/**
 * Timings for the page transition, in milliseconds. JS owns them and hands the
 * two animation durations to the stylesheet as custom properties, so the state
 * machine and the keyframes can never drift apart.
 */
export const COVER_MS = 420;
export const REVEAL_MS = 520;
/** Shortest time the panel stays fully closed, so a fast route never flickers. */
export const HOLD_MS = 140;
/** How long we wait, fully covered, before admitting that this is taking a while. */
export const SPINNER_AFTER_MS = 320;
/** Once the spinner is up it stays up this long, so it reads rather than blinks. */
export const SPINNER_MIN_MS = 720;
export const MESSAGE_MS = 1500;
/**
 * If the client router has not landed by now something is wrong, and a black
 * panel with no way out is the worst thing this component could leave behind.
 * At this point we stop being clever and do a real page load.
 */
export const MAX_WAIT_MS = 8000;

export interface Destination {
  /** Named on the panel while waiting, so the wait has a subject. */
  label: string;
  accentRgb: string;
  /** Cycled under the spinner. Something to read beats a dead screen. */
  messages: string[];
}

/**
 * The hub has no single accent (it carries all three), so the panel borrows its
 * off-white instead and reads as neutral chrome on the way back out.
 */
const hub: Destination = {
  label: "Portfolios",
  accentRgb: "237 235 230",
  messages: [
    "Three portfolios, one person",
    "Design, software and embedded",
    "Pick whichever you came for",
  ],
};

const messagesBySlug: Record<string, string[]> = {
  design: [
    "Brand, interface and the systems underneath",
    "Three case studies, first sketch to shipped",
    "The research comes before the pixels",
  ],
  swe: [
    "Web platforms and the APIs behind them",
    "Component systems and document intake",
    "Services that keep the data honest",
  ],
  embedded: [
    "Firmware and control software close to the metal",
    "Vehicle controls and real-time systems",
    "C, ARM Cortex-M and interrupt timing",
  ],
};

const entryFor = (pathname: string) =>
  sites.find((entry) => pathname === entry.href || pathname.startsWith(`${entry.href}/`));

/**
 * Which of the four sites a path belongs to, the hub being "/". The panel is for
 * crossing between them. Moving around inside one, whether that is an `#id` on
 * the same page or some later sub-route, is not a departure and gets nothing.
 */
export function siteOf(pathname: string): string {
  return entryFor(pathname)?.href ?? "/";
}

/** What the panel should say and which accent it should carry, per route. */
export function destinationFor(pathname: string): Destination {
  const site = entryFor(pathname);
  if (!site) return hub;

  return {
    label: site.discipline,
    accentRgb: site.accentRgb,
    messages: messagesBySlug[site.slug] ?? hub.messages,
  };
}
