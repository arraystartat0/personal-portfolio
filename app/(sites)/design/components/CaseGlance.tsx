import ds from "../styles/design.module.css";
import Reveal from "./motion/Reveal";
import styles from "./CaseGlance.module.css";

export interface Glance {
  role: string;
  timeline: string;
  outcome: string;
}

/**
 * The three things a stranger needs before deciding whether to read the study:
 * what I was, when it ran, and whether it worked.
 *
 * It sits directly under the study title, above the argument, because the
 * measured band at the foot of a study is only read by someone who already
 * committed to the study. This is the version for someone who has not: one
 * figure at the top, the full results with their method at the bottom. Top says
 * it worked, bottom says how that is known.
 *
 * Deliberately not `ds.frame`. The 2px ink rule on this site means "this is one
 * discrete artifact", and it is doing real work in the ScatterGrid resolution
 * and in every render frame. A summary of the page you are already on is not an
 * artifact, so this is drawn with hairlines and stays out of that vocabulary.
 */
export default function CaseGlance({ glance }: { glance: Glance }) {
  return (
    <Reveal className={styles.glance}>
      <dl className={styles.list}>
        <div className={styles.cell}>
          <dt className={`${ds.kickerMuted} ${styles.key}`}>Role</dt>
          <dd className={styles.value}>{glance.role}</dd>
        </div>
        <div className={styles.cell}>
          <dt className={`${ds.kickerMuted} ${styles.key}`}>Timeline</dt>
          <dd className={styles.value}>{glance.timeline}</dd>
        </div>
        {/* Wider than the other two, and the only one set at reading size. */}
        <div className={`${styles.cell} ${styles.cellWide}`}>
          <dt className={`${ds.kickerMuted} ${styles.key}`}>Outcome</dt>
          <dd className={`${styles.value} ${styles.outcome}`}>{glance.outcome}</dd>
        </div>
      </dl>
    </Reveal>
  );
}
