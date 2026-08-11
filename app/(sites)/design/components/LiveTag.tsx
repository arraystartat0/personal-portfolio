import type { ReactNode } from "react";
import styles from "./LiveTag.module.css";

interface LiveTagProps {
  /** Names the gesture, not the technology: "TRY IT", "PICK A DAY". */
  label: string;
  children: ReactNode;
}

/**
 * Pins a filled tag to the top edge of a mockup that is actually operable.
 *
 * Two renders on this page are the working component rather than a drawing of
 * one, and nothing about looking at them says so. The claim used to live in a
 * sentence above and a note below, which is the one place it cannot do its job:
 * a reader who has to be told in prose that a thing is interactive has already
 * decided it is a picture and moved on.
 *
 * It straddles the mockup's top edge rather than sitting inside it. Every render
 * that earns this tag opens with its own header row, so a tag placed within the
 * content box would land on a title or a month control. Half above the edge sits
 * on the frame's rule; half below sits in padding that is empty by construction.
 */
export default function LiveTag({ label, children }: LiveTagProps) {
  return (
    <div className={styles.wrap}>
      <span className={styles.tag}>
        <span className={styles.dot} aria-hidden="true" />
        {label}
      </span>
      {children}
    </div>
  );
}
