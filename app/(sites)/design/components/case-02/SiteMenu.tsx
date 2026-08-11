"use client";

import { useCallback, useEffect, useState } from "react";
import { afterSite } from "../../data/blitzSite";
import styles from "./AfterSite.module.css";

/**
 * The header's links on a phone, in a sheet that comes up from the bottom.
 *
 * Up from the bottom rather than down from the bar, because the bar is at the
 * top of a screen held at the bottom. A menu that opens where the thumb already
 * is asks for no reach at all, and the links are the one thing here worth more
 * than one tap.
 *
 * A client leaf rather than the <details> this started as. <details> was the
 * right call while the panel was a dropdown that simply appeared, but a sheet
 * that does not slide reads as a mistake, and content inside a <details> is not
 * rendered until it opens, so it has nothing to slide from.
 *
 * The sheet and its scrim are DOM children of the header but are positioned
 * against the whole render, which is what .site's container-type already makes
 * them do. That is the fix for the layering as much as the redesign is: hung off
 * the header, the panel sat at z-index 2 in the same stacking context as the
 * hero's copy at 3, and the headline printed straight through it.
 */
export default function SiteMenu({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        className={styles.menuBtn}
        aria-label={open ? afterSite.menuCloseLabel : afterSite.menuLabel}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((was) => !was)}
      >
        <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true" focusable="false">
          <path
            d={open ? "M3 3l10 10M13 3L3 13" : "M1.5 4h13M1.5 8h13M1.5 12h13"}
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      </button>

      {/* Tapping off a sheet closes it. That is the gesture people arrive with. */}
      <div
        className={`${styles.menuScrim} ${open ? styles.menuScrimOpen : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        id={id}
        className={`${styles.menuSheet} ${open ? styles.menuSheetOpen : ""}`}
        /* visibility already takes the parked sheet out of the tab order; inert
           covers the third of a second it spends visible on the way down. */
        inert={!open}
      >
        <span className={styles.menuGrip} aria-hidden="true" />

        {afterSite.nav.map((item) => (
          <span key={item} className={styles.menuLink}>
            {item}
          </span>
        ))}
        <span className={`${styles.menuLink} ${styles.menuLinkAccent}`}>
          {afterSite.contact}
        </span>
      </div>
    </>
  );
}
