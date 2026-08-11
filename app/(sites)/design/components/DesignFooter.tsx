import { faHeart } from "@fortawesome/free-solid-svg-icons";

import MotionToggle from "../../../components/MotionToggle";
import { footer } from "../data/site";
import styles from "./DesignFooter.module.css";

/*
 * The heart's path data, taken straight from the package rather than through
 * case-03's Icon component. That component is scoped by its own header comment
 * to the vocabulary of the shipped sales app, which is what lets those renders
 * stand as evidence about the product; borrowing it for site chrome would
 * quietly undo that. One glyph, so it is drawn here.
 */
const [HEART_W, HEART_H, , , HEART_PATH] = faHeart.icon;

export default function DesignFooter() {
  /*
   * Read at build, not in the browser. This page is statically prerendered, so
   * the value is baked into the HTML and the footer costs no JavaScript; every
   * deploy sets it again. A client-side clock would be exact to the day, ship a
   * script to print one number, and mismatch on hydration for the first hours of
   * every new year.
   */
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.credit}>
        {footer.creditLead}
        <svg
          className={styles.heart}
          /* Sized by height with the width derived, so it sits on the line of
             the words rather than setting its own. */
          width={(11 * HEART_W) / HEART_H}
          height={11}
          viewBox={`0 0 ${HEART_W} ${HEART_H}`}
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d={HEART_PATH as string} />
        </svg>
        {footer.creditTail}
      </div>

      <div className={styles.end}>
        <MotionToggle className={styles.motion} />
        <span>
          {footer.copyright} {year}
        </span>
      </div>
    </footer>
  );
}
