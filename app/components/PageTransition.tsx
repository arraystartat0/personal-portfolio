"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnimationEvent, CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  COVER_MS,
  HOLD_MS,
  MAX_WAIT_MS,
  MESSAGE_MS,
  REVEAL_MS,
  SPINNER_AFTER_MS,
  SPINNER_MIN_MS,
  destinationFor,
  siteOf,
} from "../lib/transition";
import { isMotionReduced } from "../lib/motion";
import styles from "../styles/transition.module.css";

/**
 * idle      nothing on screen
 * covering  the panel is wiping down over the page you are leaving
 * waiting   fully covered, route resolving, spinner if it drags on
 * revealing the panel is wiping off to the left onto the new page
 */
type Phase = "idle" | "covering" | "waiting" | "revealing";

/**
 * globals.css collapses both wipes to nothing under reduced motion, which would
 * leave the hold between them as a bare flash of black. The spinner path is
 * deliberately left alone: if a route really is slow, everyone still needs
 * telling, and the copy under it changes on a timer rather than by moving.
 *
 * Asked through the shared predicate rather than matchMedia directly, so the
 * page's own Reduce motion control collapses the wipe the same way the system
 * setting always has.
 */

/**
 * Every route change in the portfolio, from anywhere to anywhere.
 *
 * It listens for link clicks on the document rather than wrapping a Link of its
 * own, so the three sites keep using plain `next/link` and nothing has to
 * remember to opt in. Give an anchor `data-no-transition` to keep it out.
 *
 * The navigation itself is deliberately held until the panel has finished
 * closing: pushing on click would let the new page paint through the part of
 * the viewport the panel had not reached yet.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");
  const [destination, setDestination] = useState(() => destinationFor("/"));
  const [showSpinner, setShowSpinner] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  /** Where we are going, and the pathname that tells us we got there. */
  const hrefRef = useRef<string | null>(null);
  const targetPathRef = useRef<string | null>(null);
  const coveredAtRef = useRef(0);
  /** Read by the click handler, which needs the phase before the next render. */
  const phaseRef = useRef<Phase>("idle");
  /**
   * Where we were before the current route. Popstate fires before React has
   * re-rendered, so this still holds the old path when we need to work out
   * whether back or forward actually left the site.
   */
  const lastPathRef = useRef(pathname);

  useEffect(() => {
    lastPathRef.current = pathname;
  }, [pathname]);

  const enter = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const navigate = useCallback(
    (href: string, path: string) => {
      if (phaseRef.current !== "idle") return;
      hrefRef.current = href;
      targetPathRef.current = path;
      setDestination(destinationFor(path));
      setShowSpinner(false);
      setMessageIndex(0);
      enter("covering");
    },
    [enter],
  );

  /** Panel closed: now, and only now, ask the router for the next page. */
  const startNavigation = useCallback(() => {
    if (phaseRef.current !== "covering") return;
    coveredAtRef.current = Date.now();
    enter("waiting");
    if (hrefRef.current) router.push(hrefRef.current);
  }, [enter, router]);

  const finish = useCallback(() => {
    if (phaseRef.current !== "revealing") return;
    enter("idle");
    setShowSpinner(false);
    setMessageIndex(0);
    hrefRef.current = null;
    targetPathRef.current = null;
  }, [enter]);

  // --- link interception ---------------------------------------------------

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.dataset.noTransition !== undefined) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // mailto: and tel: land here with a null origin, so this covers them too.
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      /*
       * The panel marks leaving one site for another. Everything inside a single
       * site is ordinary movement: an `#id` on the same page scrolls, a later
       * sub-route just routes, and neither should be interrupted by a wipe. A
       * link that wants one anyway asks for it with data-transition.
       */
      const optedIn = anchor.dataset.transition !== undefined;
      if (!optedIn && siteOf(url.pathname) === siteOf(window.location.pathname)) return;

      event.preventDefault();
      navigate(`${url.pathname}${url.search}${url.hash}`, url.pathname);
    };

    /*
     * Capture, not bubble, and this is load-bearing. React delegates every
     * onClick to the root container and registers that listener at hydration,
     * long before this effect runs, so a bubble listener here would fire after
     * next/link had already prevented the event and pushed the route. Capturing
     * puts us first; Link then sees defaultPrevented and stands down.
     */
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  // Back and forward give no chance to cover first, so they get the second half
  // only: the panel starts closed and wipes off the page that just swapped in.
  useEffect(() => {
    const onPopState = () => {
      if (phaseRef.current !== "idle") return;
      // Back and forward within one site is not a departure either, and this is
      // what keeps stepping back through #ids on the design page silent.
      if (siteOf(window.location.pathname) === siteOf(lastPathRef.current)) return;
      hrefRef.current = null;
      targetPathRef.current = null;
      setDestination(destinationFor(window.location.pathname));
      enter("revealing");
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [enter]);

  // --- waiting -------------------------------------------------------------

  /** Arrived. Hold long enough that the panel was a gesture, then open it. */
  useEffect(() => {
    if (phase !== "waiting") return;
    if (targetPathRef.current !== null && pathname !== targetPathRef.current) return;

    const hold = isMotionReduced() ? 0 : HOLD_MS;
    const floor = showSpinner ? SPINNER_AFTER_MS + SPINNER_MIN_MS : hold;
    const remaining = Math.max(0, floor - (Date.now() - coveredAtRef.current));
    const timer = window.setTimeout(() => enter("revealing"), remaining);
    return () => window.clearTimeout(timer);
  }, [enter, pathname, phase, showSpinner]);

  useEffect(() => {
    if (phase !== "waiting") return;
    const timer = window.setTimeout(() => setShowSpinner(true), SPINNER_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (!showSpinner) return;
    const id = window.setInterval(() => setMessageIndex((i) => i + 1), MESSAGE_MS);
    return () => window.clearInterval(id);
  }, [showSpinner]);

  useEffect(() => {
    if (phase !== "waiting") return;
    const timer = window.setTimeout(() => {
      if (hrefRef.current) window.location.assign(hrefRef.current);
    }, MAX_WAIT_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // Belt and braces: if animationend never lands (a backgrounded tab, a browser
  // that drops the event) nobody should be stranded behind the panel.
  useEffect(() => {
    if (phase === "covering") {
      const timer = window.setTimeout(startNavigation, COVER_MS + 250);
      return () => window.clearTimeout(timer);
    }
    if (phase === "revealing") {
      const timer = window.setTimeout(finish, REVEAL_MS + 250);
      return () => window.clearTimeout(timer);
    }
  }, [finish, phase, startNavigation]);

  // The message fade and the spinner both bubble their own animationend up to
  // the panel, so only the panel's own wipes count.
  const onPanelAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (phaseRef.current === "covering") startNavigation();
    else if (phaseRef.current === "revealing") finish();
  };

  const message = destination.messages[messageIndex % destination.messages.length];
  const waiting = phase === "waiting" && showSpinner;

  return (
    <>
      <div
        className={styles.overlay}
        data-phase={phase}
        aria-hidden="true"
        style={
          {
            "--accent": destination.accentRgb,
            "--cover-ms": `${COVER_MS}ms`,
            "--reveal-ms": `${REVEAL_MS}ms`,
          } as CSSProperties
        }
      >
        <div className={styles.panel} onAnimationEnd={onPanelAnimationEnd}>
          <span className={`${styles.edge} ${styles.edgeDown}`} />
          <span className={`${styles.edge} ${styles.edgeLeft}`} />

          {waiting && (
            <div className={styles.status}>
              <span className={styles.ring} />
              <div className={styles.label}>{destination.label}</div>
              <p key={messageIndex} className={styles.message}>
                {message}
              </p>
            </div>
          )}
        </div>
      </div>

      <p className={styles.srOnly} role="status" aria-live="polite">
        {waiting ? `Loading ${destination.label}` : ""}
      </p>
    </>
  );
}
