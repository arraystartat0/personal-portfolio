"use client";

import { useCallback, useEffect, useState } from "react";
import { shipped } from "../../data/salesSystem";
import Icon from "./AppIcons";
import styles from "./ShippedSystem.module.css";

/**
 * The offcanvas the fa-bars toggler opens below the app's lg breakpoint, where
 * the 230px rail is `d-none d-lg-block` and gone.
 *
 * A client leaf, so the three renders around it stay server components. The
 * first pass built this from <details> to keep it script-free, and that was the
 * wrong trade: a <details> has exactly one toggle, so the drawer's own close
 * button and its backdrop were pictures of controls rather than controls. In a
 * render whose argument is "this is what shipped", a close button that does not
 * close is the one detail a reader is most likely to test.
 */
export default function AppDrawer({ id }: { id: string }) {
  const { mobile } = shipped;
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
        className={styles.burger}
        aria-label={mobile.menuLabel}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((was) => !was)}
      >
        <Icon name={open ? "xmark" : "bars"} size={14} />
      </button>

      {/*
        The app's backdrop closes the panel, so this one does too. Absolute, not
        fixed: it dims the render and never the study around it.
      */}
      <div
        className={`${styles.scrim} ${open ? styles.scrimOpen : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        id={id}
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        /* visibility already takes the parked drawer out of the tab order; inert
           covers the 300ms it spends visible on the way out. */
        inert={!open}
      >
        <div className={styles.drawerHead}>
          <span className={styles.drawerTitle}>{mobile.title}</span>
          <button
            type="button"
            className={styles.drawerClose}
            aria-label={mobile.closeLabel}
            onClick={close}
          >
            <Icon name="xmark" size={11} />
          </button>
        </div>

        <nav className={styles.drawerNav}>
          {mobile.nav.map((item) => (
            <span
              key={item.label}
              className={`${styles.drawerLink} ${
                item.label === mobile.activeNav ? styles.drawerLinkActive : ""
              }`}
            >
              <Icon name={item.icon} size={11} />
              {item.label}
            </span>
          ))}
        </nav>

        <div className={styles.drawerFoot}>
          <span className={styles.drawerUser}>
            <Icon name="user" size={10} />
            {mobile.user}
          </span>
          <span className={styles.drawerOut}>
            {mobile.signOut}
            <Icon name="signOut" size={10} />
          </span>
        </div>
      </aside>
    </>
  );
}
