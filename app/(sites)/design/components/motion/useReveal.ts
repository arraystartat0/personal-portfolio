"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Every revealing element on the page shares one observer rather than creating
 * its own, and unsubscribes the moment it has fired.
 */
const listeners = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function release(element: Element) {
  observer?.unobserve(element);
  listeners.delete(element);
}

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        // A section taller than the viewport can never reach an 18% ratio, so
        // tall elements reveal as soon as they cross the margin instead.
        const isTall = entry.boundingClientRect.height > window.innerHeight * 0.5;
        if (entry.intersectionRatio < 0.18 && !isTall) continue;

        const fire = listeners.get(entry.target);
        release(entry.target);
        fire?.();
      }
    },
    { threshold: [0, 0.18], rootMargin: "0px 0px -8% 0px" },
  );

  return observer;
}

/** Returns a ref to attach and whether that element has entered the viewport. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || revealed) return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer available: reveal on the next frame rather than synchronously
      // in the effect body (react-hooks/set-state-in-effect).
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }

    listeners.set(element, () => setRevealed(true));
    getObserver().observe(element);

    return () => release(element);
  }, [revealed]);

  return { ref, revealed };
}
