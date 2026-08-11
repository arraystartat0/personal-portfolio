import { approach, type ScatterCard } from "../data/approach";
import styles from "./ScatterGrid.module.css";

const variantClass: Record<ScatterCard["variant"], string> = {
  paper: styles.paper,
  ink: styles.ink,
  blue: styles.blue,
};

const driftClasses = [
  styles.drift1,
  styles.drift2,
  styles.drift3,
  styles.drift4,
  styles.drift5,
  styles.drift6,
];

const CALENDAR_CELLS = 4;

/**
 * The paper pile, in three beats: six loose documents scatter, snap into the
 * grid, then close their gutters and lose the rules between them so the block
 * reads as one framed artifact rather than six.
 */
export default function ScatterGrid() {
  return (
    <div className={styles.panel} aria-hidden="true">
      <div className={styles.graph} />

      <div className={styles.cards}>
        {approach.scatterCards.map((card, index) => (
          <div
            key={card.label}
            className={`${styles.card} ${variantClass[card.variant]} ${driftClasses[index]}`}
          >
            <div className={styles.label}>{card.label}</div>

            {card.lines?.map((width, lineIndex) => (
              <div key={lineIndex} className={styles.bar} style={{ width: `${width}%` }} />
            ))}

            {card.calendar && (
              <div className={styles.calendar}>
                {Array.from({ length: CALENDAR_CELLS }, (_, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={`${styles.cell} ${
                      cellIndex === card.calendar?.highlightIndex ? styles.cellActive : ""
                    }`}
                  />
                ))}
              </div>
            )}

            {card.stat && (
              <>
                <div className={styles.statValue}>{card.stat.value}</div>
                <div className={styles.statCaption}>{card.stat.caption}</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Draws on the same box the cards tile, so it lands exactly on their edge. */}
      <div className={styles.system}>
        <div className={styles.systemTag}>{approach.systemLabel}</div>
      </div>
    </div>
  );
}
