import { researchIa } from "../../data/caseStudies";
import styles from "./CurrentSite.module.css";

const { currentSite } = researchIa;

/**
 * The institute's live clusters page, rebuilt in HTML rather than screenshotted,
 * so it sits under the wipe and can be compared with the proposal at the same
 * scale and the same crispness.
 *
 * Logos, wordmarks and brand colours are deliberately absent. What is reproduced
 * is the structure, because the structure is what the case study is about: a
 * heading, a bold lead, and a paragraph, repeated until the page ends.
 */
export default function CurrentSite() {
  return (
    <div className={styles.site}>
      <div className={styles.brandBar}>
        <div className={styles.mark}>[ UNIVERSITY MARK ]</div>
        <div className={styles.searchBox} aria-hidden="true">
          ⌕
        </div>
      </div>

      <div className={styles.instituteBar}>[ INSTITUTE NAME ]</div>

      <div className={styles.nav}>
        {["About", "Membership", "Facilities", "Research to Innovation", "News & Events", "Contact"].map(
          (item) => (
            <span key={item} className={styles.navItem}>
              {item}
              <span className={styles.navCaret} aria-hidden="true">
                ▾
              </span>
            </span>
          ),
        )}
      </div>

      <div className={styles.main}>
        <div className={styles.column}>
          <div className={styles.breadcrumb}>{currentSite.breadcrumb}</div>
          {/*
            A div, like every other label in this render. This is the title of
            somebody else's page, and as an <h3> it was the one piece of the mock
            that escaped into this document's heading outline, landing between
            two beats of the argument with nothing to say it had changed subject.
            The cluster names below it were already divs, so the heading it did
            export was arbitrary.

            It also inherited .root h3's weight 800, which outranks the 700 this
            sheet asks for: the design site's typography painting over a render
            whose whole job is to be a faithful rebuild.
          */}
          <div className={styles.title}>{currentSite.title}</div>
          <p className={styles.intro}>{currentSite.intro}</p>

          {currentSite.entries.map((entry) => (
            <div key={entry.name} className={styles.entry}>
              <div className={styles.entryName}>
                {entry.name}
                {/*
                  The tell that a cluster is published somewhere else entirely.
                  Kept because it is a finding, not an oversight in the render.
                */}
                {entry.external && (
                  <span className={styles.externalMark} aria-hidden="true">
                    {" "}
                    ↗
                  </span>
                )}
              </div>
              <p className={styles.entryBody}>
                <strong className={styles.entryLead}>{entry.lead}</strong> {entry.body}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.sidebar}>
          {currentSite.sidebar.map((item, index) => (
            <div
              key={item}
              className={`${styles.sidebarRow} ${index === 1 ? styles.sidebarRowActive : ""}`}
            >
              {item}
              <span aria-hidden="true">›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
