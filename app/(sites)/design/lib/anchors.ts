/**
 * Ids that one component sets and another looks up.
 *
 * Kept out of `data/` on purpose: that directory holds copy, and these are never
 * read by anyone. They live here so the two halves of a lookup import the same
 * constant instead of agreeing on a string by hand and drifting the first time
 * one of them is renamed.
 */

/**
 * The marquee and the contact panel, which are where the page stops being work
 * to look at and starts being a way out of it. Set on a wrapper in page.tsx and
 * watched by MobilePreview, so its button can get out of the way.
 *
 * Not the <footer> underneath: that is two lines of small print at the very
 * bottom, and by the time it is on screen the button has been in the way for a
 * screenful already.
 */
export const OUTRO_ID = "design-outro";

/**
 * The <main> landmark, and the skip link's target. Set in layout.tsx and read by
 * the SkipLink beside it, which is the one pairing where a mismatched string
 * would fail silently: the link would still render, still take focus, and jump
 * nowhere.
 */
export const MAIN_ID = "design-main";
