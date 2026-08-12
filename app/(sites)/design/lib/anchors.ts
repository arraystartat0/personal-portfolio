/**
 * Ids that one component sets and another looks up.
 *
 * Kept out of `data/` on purpose: that directory holds copy, and most of these
 * are never read by anyone. They live here so the two halves of a lookup import
 * the same constant instead of agreeing on a string by hand and drifting the
 * first time one of them is renamed.
 *
 * The three case ids below are the exception to "never read": they are in the
 * address bar the moment someone follows a work-index row, and they are what
 * gets pasted into an application. That is the second reason they are named
 * rather than numbered.
 */

/*
 * One per case study, set on the <section> and pointed at by its row in the work
 * index. Named for the work, not for its position.
 *
 * They were #c01, #c02 and #c03, which encoded the running order into the URL:
 * reordering the studies either renamed every anchor or left #c01 pointing at
 * the second one. Neither is a choice worth having to make, and a link that says
 * what it opens survives the next reorder for free.
 */
export const CASE_SALES_ID = "sales";
export const CASE_BLITZ_ID = "blitz";
export const CASE_RESEARCH_ID = "research";

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
