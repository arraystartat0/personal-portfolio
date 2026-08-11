import styles from "./PanelMocks.module.css";

/**
 * Three sketches, one per closing principle. Small enough to sit inside a panel
 * and concrete enough that a reader sees the idea instead of reading a claim
 * about it, which is the same reason the case study rebuilds pages rather than
 * screenshotting them.
 */

/** Contrast measured, focus visible, and a state that does not rely on colour. */
export function AccessibilityMock() {
  return (
    <div className={styles.mock} aria-hidden="true">
      <div className={styles.row}>
        <span className={styles.swatchInk}>Body text</span>
        <span className={styles.pass}>7.1:1 AA</span>
      </div>
      <div className={styles.row}>
        <span className={styles.swatchAccent}>Links</span>
        <span className={styles.pass}>7.0:1 AA</span>
      </div>

      {/* The focus ring drawn, not described: it is the thing most sites omit. */}
      <div className={styles.focusRow}>
        <span className={styles.focused}>Medical imaging</span>
        <span className={styles.keyHint}>⇥ focus visible</span>
      </div>

      <div className={styles.note}>Status carries an icon and a word, never colour alone.</div>
    </div>
  );
}

/** The filter reading relationships: a department returns its collaborators too. */
export function FilterMock() {
  return (
    <div className={styles.mock} aria-hidden="true">
      <div className={styles.chips}>
        <span className={styles.chip}>Problem ▾</span>
        <span className={styles.chipActive}>Department: Radiology ×</span>
        <span className={styles.chip}>Taking students</span>
      </div>

      <div className={styles.resultLine}>
        <strong>4 of 6</strong> clusters
      </div>

      <div className={styles.resultRow}>
        <span>Medical imaging &amp; health informatics</span>
        <span className={styles.tagDirect}>tagged</span>
      </div>
      {/*
        The row that a keyword filter could never return: this cluster is not
        tagged Radiology, it works with the one that is.
      */}
      <div className={styles.resultRow}>
        <span>Machine learning &amp; data</span>
        <span className={styles.tagLinked}>⇄ collaborates</span>
      </div>
      <div className={styles.resultRow}>
        <span>Cognitive systems</span>
        <span className={styles.tagLinked}>⇄ collaborates</span>
      </div>
    </div>
  );
}

/** The same control in both vocabularies, so the argument is visible not asserted. */
export function FamiliarMock() {
  return (
    <div className={styles.mock} aria-hidden="true">
      <div className={styles.compare}>
        <div>
          <div className={styles.compareLabel}>Inherited</div>
          <div className={styles.oldCard}>
            <div className={styles.oldTitle}>Medical imaging</div>
            <div className={styles.oldMeta}>Lead: D. Researcher</div>
            <span className={styles.oldButton}>View</span>
          </div>
        </div>

        <div>
          <div className={styles.compareLabel}>Proposed</div>
          <div className={styles.newCard}>
            <div className={styles.newTitle}>Medical imaging</div>
            <div className={styles.newTags}>
              <span className={styles.newTag}>Radiology</span>
              <span className={styles.newTag}>CS</span>
            </div>
            <span className={styles.newButton}>View</span>
          </div>
        </div>
      </div>
    </div>
  );
}
