"use client";

import { useSyncExternalStore } from "react";
import { MOTION_ATTR, MOTION_KEY, MOTION_OFF, motionToggle } from "../lib/motion";
import styles from "./MotionToggle.module.css";

/*
 * The switch is one value shared by every copy of this control on a page, and it
 * lives on <html> rather than in React, so it is read the way external state is
 * meant to be read. The alternative, syncing it into state from an effect, hands
 * the two render passes different answers and is what the boot script exists to
 * avoid in the first place.
 */
const listeners = new Set<() => void>();

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
};

const getSnapshot = () =>
  document.documentElement.getAttribute(MOTION_ATTR) === MOTION_OFF;

/*
 * Prerendered as motion-on, always. A build cannot read a browser's storage, and
 * useSyncExternalStore hydrates against this before swapping to the real value,
 * which is what keeps a remembered preference from tripping a hydration
 * mismatch on aria-pressed.
 */
const getServerSnapshot = () => false;

type MotionToggleProps = {
  /** The button's look, supplied by whichever site is rendering it. */
  className?: string;
};

/**
 * Stops every looping animation in the suite, for WCAG 2.2.2. See app/lib/motion.ts
 * for why the switch only travels in one direction.
 *
 * Shared the way SiteSwitcher is shared: the behaviour is one component, the look
 * arrives as a class name from the site rendering it, so the three sites keep
 * their own languages.
 */
export default function MotionToggle({ className }: MotionToggleProps) {
  const off = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !off;

    if (next) document.documentElement.setAttribute(MOTION_ATTR, MOTION_OFF);
    else document.documentElement.removeAttribute(MOTION_ATTR);

    try {
      if (next) localStorage.setItem(MOTION_KEY, MOTION_OFF);
      else localStorage.removeItem(MOTION_KEY);
    } catch {
      /* Same reason as the boot script: a refused write must not break the page. */
    }

    listeners.forEach((notify) => notify());
  };

  return (
    <div className={styles.mount}>
      {/*
        A toggle button rather than a pair of links, and the label stays put
        while aria-pressed carries the state. Changing both at once is the
        classic way to leave a screen reader announcing a name and a state that
        contradict each other.
      */}
      <button type="button" className={className} aria-pressed={off} onClick={toggle}>
        {motionToggle.label}
      </button>
    </div>
  );
}
