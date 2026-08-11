import type { ReactNode } from "react";
import styles from "./Disclosure.module.css";

type DisclosureTone = "ochre" | "plain";

interface DisclosureProps {
  /** The line that stands in for the whole thing while it is closed. */
  summary: ReactNode;
  /** What the chevron promises: "Read more", "Show the list". */
  hint: string;
  tone?: DisclosureTone;
  /** Lands the summary clear of the sticky nav when an anchor opens it. */
  id?: string;
  children: ReactNode;
}

const toneClasses: Record<DisclosureTone, string> = {
  ochre: styles.ochre,
  plain: styles.plain,
};

/**
 * A block that states its point in one line and keeps the rest folded away.
 *
 * Native <details>, so it needs no JavaScript, keeps its expanded state in the
 * accessibility tree for free, and, the part that matters here, is opened by the
 * browser when a fragment link targets something inside it. That last one is why
 * the source lists can close: a superscript citation still jumps to its entry.
 *
 * Only the chevron animates. Growing the panel would need ::details-content and
 * interpolate-size, which is a lot of new surface to buy a 200ms flourish, and
 * the reveal reads fine as an instant one.
 */
export default function Disclosure({
  summary,
  hint,
  tone = "plain",
  id,
  children,
}: DisclosureProps) {
  return (
    <details className={`${styles.root} ${toneClasses[tone]}`}>
      <summary id={id} className={styles.summary}>
        <span className={styles.summaryText}>{summary}</span>
        <span className={styles.hint}>
          {hint}
          <svg
            className={styles.chevron}
            viewBox="0 0 12 8"
            width="10"
            height="7"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M1 1.5 6 6.5 11 1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </span>
      </summary>

      <div className={styles.body}>{children}</div>
    </details>
  );
}
