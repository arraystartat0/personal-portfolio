/**
 * One switch for every looping animation in the suite.
 *
 * WCAG 2.2.2 asks that motion which starts on its own and runs past five seconds
 * can be paused, stopped or hidden. The marquee, the ScatterGrid loop and the
 * hero cue all qualify. prefers-reduced-motion alone does not answer it: that
 * setting only reaches a reader who has already found it in their operating
 * system, and it is not among the criterion's sufficient techniques.
 *
 * The switch is deliberately one-directional. It can turn motion off; it cannot
 * turn it back on over a system that has asked for less. That asymmetry is what
 * lets every `@media (prefers-reduced-motion: reduce)` block in the suite stay
 * exactly as it is, still working with no JavaScript, instead of being rewritten
 * to depend on an attribute a script has to arrive to set. Where the system is
 * already asking, the control has no work to do and takes itself off the page.
 */

/** Stamped on <html>, so one attribute governs all three sites at once. */
export const MOTION_ATTR = "data-motion";
export const MOTION_OFF = "off";

/** Namespaced: localStorage is shared by everything on the origin. */
export const MOTION_KEY = "mb:motion";

/**
 * Runs before the body is parsed, so a reader who turned motion off last visit
 * never sees a frame of it on this one. Inline and blocking for that reason; it
 * is two statements and deferring it would defeat the whole point.
 *
 * try/catch because localStorage throws outright in some privacy modes, and a
 * remembered preference is not worth taking the page down for.
 */
export const MOTION_BOOT_SCRIPT = `try{if(localStorage.getItem("${MOTION_KEY}")==="${MOTION_OFF}")document.documentElement.setAttribute("${MOTION_ATTR}","${MOTION_OFF}")}catch(e){}`;

/**
 * The predicate for motion driven by script rather than by a stylesheet, so the
 * page transition, the count-ups and the dashboard charts answer to the control
 * and to the system setting on the same terms the CSS does. Without this they
 * would keep animating after a reader had asked the page to stop, which makes
 * the control a half-truth.
 */
export const isMotionReduced = () =>
  document.documentElement.getAttribute(MOTION_ATTR) === MOTION_OFF ||
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The wording matches what the operating systems call it, which is the phrase a
 * reader looking for this has already been taught.
 */
export const motionToggle = {
  label: "Reduce motion",
};
