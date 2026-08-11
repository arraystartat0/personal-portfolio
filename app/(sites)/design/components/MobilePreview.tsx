"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { mobilePreview } from "../data/site";
import { OUTRO_ID } from "../lib/anchors";
import styles from "./MobilePreview.module.css";

/** iPhone 16 Pro logical viewport. */
const PHONE_W = 402;
const PHONE_H = 874;

/** The header strip, the measure rule, and the air around them. */
const CHROME = 136;

/** Faded out below this, and no longer worth leaving in reach of a cursor. */
const GONE = 0.98;

/*
 * Whether this document is the top one, read through useSyncExternalStore
 * because that is what it is: a value owned by the browser rather than by React.
 * The server snapshot is false, so the control renders nothing until hydration
 * confirms otherwise, and the two passes never disagree.
 *
 * All three are module-level so their identity is stable across renders.
 */
const neverChanges = () => () => {};
const isTopWindow = () => window.self === window.top;
const isTopOnServer = () => false;

/**
 * Puts this page into a real 402 x 874 viewport, in place.
 *
 * An iframe rather than a narrowed wrapper, and that is the whole design. The
 * site has thirty viewport media queries and a hundred and fifty vw units in it;
 * squeezing a container to phone width would leave every one of them at its
 * desktop value, so the nav would never collapse, the calendars would keep their
 * pills and the gutter would still resolve to 54px. You would be looking at the
 * desktop layout crushed into a narrow column, which is worse than showing
 * nothing. Only a real viewport reflows a page written against the viewport.
 *
 * It reads as the page changing rather than as a dialog arriving: same paper
 * ground edge to edge, no scrim, and a measure rule across the top of the frame
 * saying how wide the thing being previewed actually is.
 *
 * <dialog> underneath all of that, though, and not for the look. It buys the top
 * layer, so this escapes .root's overflow-x: clip and every stacking context on
 * the page; a real focus trap; Escape; focus restored to the button on exit; and
 * inert on the rest of the document. Hand-rolling five of those to avoid an
 * element whose appearance is entirely ours to set would be the wrong trade.
 */
export default function MobilePreview() {
  const standalone = useSyncExternalStore(neverChanges, isTopWindow, isTopOnServer);

  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const pathname = usePathname();

  const close = useCallback(() => dialogRef.current?.close(), []);

  /*
   * The button gets out of the way as the marquee and the contact panel arrive.
   * Past that point a reader is leaving rather than auditing the layout, and a
   * control that has stopped being useful should stop being visible.
   *
   * Measured off the rect rather than through an IntersectionObserver, and the
   * reason is the region's height. The observer reports intersectionRatio, which
   * is a share of the observed element; the outro is taller than the viewport,
   * so its ratio tops out well under 1 and the button would go faint and stay
   * there. Reading the rect gives a progress that can actually finish.
   *
   * The shared observer in useReveal is wrong here for a different reason: it
   * fires once and unsubscribes, which is right for a reveal and useless for
   * something that has to track a position and come back when you scroll up.
   *
   * One rect read per frame at most, and the opacity written straight to the
   * node. A re-render per frame on a page carrying two calendars and three
   * charts, to change one number, would be the expensive way to do this.
   *
   * `standalone` is in the dependencies because the button does not exist on the
   * first commit. useSyncExternalStore hands back the server snapshot until
   * hydration has run, so this component returns null once before it returns
   * anything, and an effect keyed on [] would look for the button during that
   * pass, find nothing, and never be asked again.
   */
  useEffect(() => {
    const fab = fabRef.current;
    const outro = document.getElementById(OUTRO_ID);
    if (!fab || !outro) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      const rect = outro.getBoundingClientRect();
      const view = window.innerHeight;

      /*
       * How much of the outro is on screen, over the most that could be at once.
       * Capping the denominator at the viewport is what lets a region taller
       * than the screen still reach 1: the button is gone once the outro fills
       * the view, rather than waiting for a bottom that scrolls past instead.
       */
      const shown = Math.min(view - rect.top, rect.height);
      const span = Math.min(rect.height, view);
      const progress = Math.min(Math.max(shown / span, 0), 1);

      fab.style.setProperty("--fab-opacity", String(1 - progress));
      /* Nothing invisible should still be catching a click. */
      fab.style.pointerEvents = progress > GONE ? "none" : "";
    };

    /* Coalesced to one measure per frame, however often either event fires. */
    const schedule = () => {
      frame ||= requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [standalone]);

  useEffect(() => {
    if (!open) return;

    /*
     * The frame is drawn smaller rather than made smaller. Shrinking it would
     * change the viewport being previewed, so a short laptop would be shown a
     * 320px layout while the rule above it promised 402, and the whole control
     * would stop telling the truth. CSS cannot express this: it has no way to
     * divide one length by another and get a number out.
     */
    const fit = () => setScale(Math.min(1, (window.innerHeight - CHROME) / PHONE_H));

    fit();
    window.addEventListener("resize", fit);
    /* <dialog> does not lock the page behind it. */
    document.documentElement.classList.add(styles.lock);

    return () => {
      window.removeEventListener("resize", fit);
      document.documentElement.classList.remove(styles.lock);
    };
  }, [open]);

  /*
   * The only way to change route with this open is browser back or forward,
   * since the preview holds no links of its own. Worth guarding anyway: a
   * PageTransition panel wiping underneath a top-layer element is the ugliest
   * thing this component could leave on screen.
   */
  useEffect(() => {
    close();
  }, [pathname, close]);

  if (!standalone) return null;

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        className={styles.fab}
        aria-label={mobilePreview.openLabel}
        onClick={() => {
          setOpen(true);
          /* The iframe unmounts on exit, so every open is a fresh load. */
          setLoaded(false);
          dialogRef.current?.showModal();
        }}
      >
        <svg
          className={styles.glyph}
          viewBox="0 0 16 22"
          width="14"
          height="19"
          aria-hidden="true"
          focusable="false"
        >
          {/* Hard edges and square ends, like everything else on this sheet. */}
          <rect x="2" y="1" width="12" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M6 4.5h4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        {mobilePreview.open}
      </button>

      <dialog ref={dialogRef} className={styles.stage} aria-labelledby={titleId} onClose={() => setOpen(false)}>
        <div className={styles.bar}>
          <span className={styles.mode} id={titleId}>
            {mobilePreview.title}
          </span>
          <span className={styles.device}>{mobilePreview.device}</span>
          <button type="button" className={styles.close} onClick={close}>
            {mobilePreview.close}
          </button>
        </div>

        <div className={styles.body}>
          {/*
            The measure rule. Two end ticks, a hairline between them and the
            figure sitting on it: the drawing convention for "this is how wide
            that is", which is the one piece of information the frame underneath
            cannot state about itself.
          */}
          <div className={styles.measure} style={{ width: PHONE_W * scale }}>
            <span className={styles.measureLabel}>{mobilePreview.width}</span>
          </div>

          <div
            className={styles.viewport}
            style={{ width: PHONE_W * scale, height: PHONE_H * scale }}
            aria-busy={open && !loaded}
          >
            {/*
              A wireframe of the page that is coming, not a spinner. This frame
              is a second full copy of a page carrying three Chart.js instances
              and two calendars, so the wait is real and long enough that an
              empty box reads as a broken preview. Shaped like the mobile layout
              it is about to be replaced by: the bar with its toggler, then the
              kicker, the headline and the first block under it.

              aria-hidden, because the frame around it already reports the wait
              through aria-busy and a screen reader has no use for the bones.
            */}
            <div
              className={`${styles.skeleton} ${loaded ? styles.skeletonDone : ""}`}
              aria-hidden="true"
            >
              <div className={styles.skelBar}>
                <span className={`${styles.bone} ${styles.skelBrand}`} />
                <span className={`${styles.bone} ${styles.skelBurger}`} />
              </div>

              <span className={`${styles.bone} ${styles.skelKicker}`} />
              <span className={`${styles.bone} ${styles.skelHead}`} />
              <span className={`${styles.bone} ${styles.skelHead}`} />
              <span className={`${styles.bone} ${styles.skelHeadShort}`} />

              <span className={`${styles.bone} ${styles.skelLine}`} />
              <span className={`${styles.bone} ${styles.skelLine}`} />
              <span className={`${styles.bone} ${styles.skelLineShort}`} />

              <span className={`${styles.bone} ${styles.skelBlock}`} />
            </div>

            {/*
              Mounted only once open, and unmounted on exit. Held behind
              display: none it would keep that second copy alive for the life of
              the page, which is a permanent tax for a control most visitors
              open once.
            */}
            {open && (
              <iframe
                className={styles.screen}
                src={pathname}
                title={mobilePreview.frameTitle}
                width={PHONE_W}
                height={PHONE_H}
                style={{ transform: `scale(${scale})` }}
                onLoad={() => setLoaded(true)}
              />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
