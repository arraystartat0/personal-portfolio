import { intake } from "../../data/salesSystem";
import styles from "./IntakeReview.module.css";

/**
 * The review screen, side by side, because side by side is the whole design.
 * What arrived sits on the left with its lines numbered; what the model
 * proposed sits on the right with every value naming the line it came from. A
 * layout that put the draft on its own would be asking a person to approve a
 * record by trusting it, which is the opposite of what this screen is for.
 */
export default function IntakeReview() {
  return (
    <div className={styles.review}>
      <div className={styles.queue}>
        <div className={styles.queueLabel}>{intake.queueLabel}</div>
        <div className={styles.queueRows}>
          {intake.queue.map((row) => (
            <span key={row.text} className={styles.queueRow}>
              <span
                className={`${styles.dot} ${
                  row.tone === "ochre" ? styles.dotFlagged : styles.dotOk
                }`}
                aria-hidden="true"
              />
              {row.text}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.split}>
        <div className={styles.side}>
          <div className={styles.sideLabel}>{intake.sourceLabel}</div>

          <div className={styles.source}>
            <div className={styles.from}>{intake.source.from}</div>
            {intake.source.lines.map((line) => (
              <div
                key={line.ref}
                className={`${styles.sourceLine} ${line.uncertain ? styles.sourceFlagged : ""}`}
              >
                <span className={styles.sourceRef}>{line.ref}</span>
                <span className={styles.sourceText}>{line.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.side}>
          <div className={styles.sideLabel}>{intake.draftLabel}</div>

          <div className={styles.draft}>
            {intake.draft.fields.map((field) => (
              <div key={field.key} className={styles.field}>
                <span className={styles.fieldKey}>{field.key}</span>
                <span className={styles.fieldValue}>{field.value}</span>
                {/*
                  Every value names its origin. Checking the draft becomes
                  reading two things against each other rather than trusting a
                  number that simply appeared in a box.
                */}
                <span className={styles.fieldFrom}>{field.from}</span>
              </div>
            ))}

            {/* Shown as unresolved rather than guessed at, and it blocks nothing else. */}
            <div className={`${styles.field} ${styles.fieldFlagged}`}>
              <span className={styles.fieldKey}>{intake.draft.flagged.key}</span>
              <span className={styles.fieldValue}>{intake.draft.flagged.value}</span>
              <span className={styles.fieldNote}>{intake.draft.flagged.note}</span>
            </div>

            <div className={styles.approve}>
              <span className={styles.approveButton}>{intake.draft.approve}</span>
              <span className={styles.rejectButton}>{intake.draft.reject}</span>
            </div>

            <div className={styles.footnote}>{intake.draft.footnote}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
