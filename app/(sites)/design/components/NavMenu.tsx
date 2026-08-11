"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import SiteSwitcher from "../../../components/SiteSwitcher";
import { navLinks } from "../data/site";
import styles from "./NavMenu.module.css";

/** Everything the Tab loop below treats as a stop inside the panel. */
const FOCUSABLE = "a[href], button:not([disabled])";

/**
 * Where the hamburger gives way to the row of links, matching the max-width in
 * NavMenu.module.css. Duplicated in JS on purpose and worth the duplication: it
 * is what lets the panel close itself when a window is dragged wider, and a
 * scroll lock left behind by a panel nobody can see any more is the worst thing
 * this component could do.
 */
const COLLAPSED = "(max-width: 720px)";

/**
 * The nav's mobile half: a hamburger and a panel that comes in from the right.
 *
 * Right, not left, because this is the one control on the site a reader is
 * likely to reach for one-handed, and a thumb reaches the right edge.
 *
 * A leaf client component, so DesignNav and SiteSwitcher stay server-rendered.
 * The links are rendered a second time here rather than moved between two
 * layouts: one DOM set would have to know at render time which layout it is in,
 * which means reading matchMedia and mismatching on hydration. The desktop row
 * is display: none below the breakpoint and this is display: none above it, so
 * only ever one of them is in the accessibility tree.
 */
export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  /**
   * Escape and the scrim hand focus back to the button that opened the panel.
   * Following a link must not: the reader asked to be at a section, and pulling
   * focus back up to the nav would undo the thing they just did.
   */
  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) burgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close(true);
        return;
      }

      /*
       * A real trap rather than a hint. The panel covers the page, so tabbing
       * past its last link and landing on a case study nobody can see is the
       * one failure a keyboard reader cannot recover from without guessing.
       */
      if (event.key !== "Tab" || !panelRef.current) return;

      const stops = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (!stops.length) return;

      const first = stops[0];
      const last = stops[stops.length - 1];
      const onEdge = event.shiftKey ? document.activeElement === first : document.activeElement === last;

      if (onEdge) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };

    /* Widened past the breakpoint, the panel is display: none and unreachable.
       Closing it here is what releases the scroll lock with it. */
    const collapsed = window.matchMedia(COLLAPSED);
    const onWidthChange = () => {
      if (!collapsed.matches) close(false);
    };

    document.addEventListener("keydown", onKeyDown);
    collapsed.addEventListener("change", onWidthChange);
    /* The page behind must not scroll under a panel that covers it. */
    document.documentElement.classList.add(styles.lock);
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      collapsed.removeEventListener("change", onWidthChange);
      document.documentElement.classList.remove(styles.lock);
    };
  }, [open, close]);

  return (
    <div className={styles.root}>
      <button
        ref={burgerRef}
        type="button"
        className={styles.burger}
        /* Undefined rather than false, so the attribute is absent when closed
           and [data-open] is a plain presence selector. */
        data-open={open || undefined}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => (open ? close(true) : setOpen(true))}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      <div
        className={`${styles.scrim} ${open ? styles.scrimOpen : ""}`}
        onClick={() => close(true)}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        id={panelId}
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        /* visibility already takes the closed panel out of the tab order; inert
           covers the third of a second it spends visible on the way out. */
        inert={!open}
        /* Delegated, so every link closes the panel including any added later.
           A hash link keeps the pathname, so a route effect would never fire. */
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) close(false);
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`${styles.panelLink} ${link.accent ? styles.panelLinkAccent : ""}`}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener" : undefined}
          >
            {link.label}
          </a>
        ))}

        <SiteSwitcher
          current="design"
          className={styles.panelSwitcher}
          linkClassName={styles.panelSwitchLink}
        />
      </div>
    </div>
  );
}
