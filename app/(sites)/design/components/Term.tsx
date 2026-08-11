"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Term.module.css";

/**
 * How close to the edge of the screen a tip is allowed to open. Its own margin,
 * not the page's --gutter: this floats over the text rather than sitting in the
 * column, so what it owes the edge is clearance, not alignment.
 */
const EDGE = 12;

export interface Glossary {
  term: string;
  definition: string;
}

interface TermProps extends Glossary {
  /**
   * Unique across the page. GlossaryText builds it from its scope and the term's
   * position in the string, because a generated one would have to survive
   * hydration and useId gives the two passes different answers.
   */
  id: string;
}

/**
 * A jargon word that explains itself on hover or focus.
 *
 * Revealing the tip is still pure CSS: it is a sibling shown by :hover and
 * :focus-within, so it works before hydration and costs nothing per frame. The
 * script does two jobs, and only for the one term a reader has actually reached
 * for: measure where the tip has landed and shift it back inside the screen,
 * and let Escape close it.
 *
 * That measurement is worth the kilobyte because CSS genuinely cannot do it. The
 * tip is positioned from its word, and no selector knows how far that word sits
 * from the edge of the viewport. The site was clipping the overflow at .root as
 * a backstop, and one glossary marker had already been cut from the copy to keep
 * a tip out of a narrow right-hand column. Anchor positioning would express this
 * directly, but not yet everywhere this has to run.
 *
 * Escape is WCAG 1.4.13, which asks that content shown on hover or focus can be
 * dismissed without moving either one. So the dismissal cannot be a blur, and it
 * has to beat a :hover that is by definition still true: it lands as an
 * attribute on the wrapper and the sheet hides the tip from there. Keeping the
 * reveal in CSS and overriding it, rather than moving the whole thing into
 * state, is what preserves the pre-hydration behaviour above.
 */
export default function Term({ term, definition, id }: TermProps) {
  const tipRef = useRef<HTMLSpanElement>(null);

  /*
   * Hover and focus are tracked apart because they overlap: clicking a term
   * leaves it both hovered and focused. Collapsed into one flag, the pointer
   * wandering off would read as disengagement and re-open a tip the reader had
   * just dismissed, while their focus never moved.
   */
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const engaged = hovered || focused;

  /*
   * Measured on the way in rather than from a resize listener. A tip is
   * transient, resizing the window with one open is not a real scenario, and the
   * alternative is an observer per glossary word on a page that has dozens.
   */
  const place = useCallback(() => {
    const tip = tipRef.current;
    if (!tip) return;

    /* Measure unshifted, so the correction is never applied twice. */
    tip.style.setProperty("--tip-shift", "0px");
    const { left, right } = tip.getBoundingClientRect();

    let shift = 0;
    const overRight = right - (window.innerWidth - EDGE);
    if (overRight > 0) shift = -overRight;

    /*
     * Checked after the pull left, and it wins. A tip too wide for the screen to
     * hold cannot satisfy both edges, and pinning it left is the one that keeps
     * the start of the sentence visible.
     */
    if (left + shift < EDGE) shift = EDGE - left;

    tip.style.setProperty("--tip-shift", `${Math.round(shift)}px`);
  }, []);

  /*
   * On the document, because a term the pointer is merely resting on holds no
   * focus, so an Escape meant for it is delivered to whatever else the page is
   * focusing. Bound only while this term is engaged, and only one term can be
   * engaged at a time, so the page never carries more than a single listener no
   * matter how many glossary words are on it.
   */
  useEffect(() => {
    if (!engaged) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDismissed(true);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [engaged]);

  return (
    <span
      className={styles.term}
      /* Undefined rather than false, so [data-dismissed] is a presence selector. */
      data-dismissed={dismissed || undefined}
      /*
       * pointerenter does not refire as the pointer moves onto a child, so the
       * tip becoming hoverable cannot re-measure it out from under the pointer.
       * pointerleave holds for the same reason it always did: the tip is a DOM
       * descendant of this span, whatever box it is painted in.
       */
      onPointerEnter={() => {
        setHovered(true);
        place();
      }}
      /*
       * Re-arming is guarded on the other half of the engagement rather than
       * done outright, for the reason the two flags are kept apart above: with
       * a word both hovered and focused, an unconditional reset here would let
       * the pointer wandering off re-open a tip the reader had dismissed, while
       * the focus 1.4.13 cares about never moved.
       */
      onPointerLeave={() => {
        setHovered(false);
        if (!focused) setDismissed(false);
      }}
      onFocus={() => {
        setFocused(true);
        place();
      }}
      onBlur={() => {
        setFocused(false);
        if (!hovered) setDismissed(false);
      }}
    >
      <abbr className={styles.trigger} tabIndex={0} aria-describedby={id}>
        {term}
      </abbr>
      <span ref={tipRef} id={id} role="tooltip" className={styles.tip}>
        {definition}
      </span>
    </span>
  );
}
