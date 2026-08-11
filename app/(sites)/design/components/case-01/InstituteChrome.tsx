import { researchIa } from "../../data/caseStudies";
import styles from "./InstituteChrome.module.css";

const { home } = researchIa;

interface InstituteChromeProps {
  /** Index of the nav item to mark current. */
  activeIndex?: number;
}

/**
 * The standard top of every page on the institute's site: the university mark,
 * the institute band, and the main nav bar. Reproduced unchanged from the live
 * site because it is university chrome, not the institute's to redesign, and the
 * proposal has to survive that constraint rather than wish it away.
 *
 * One component so both proposed screens carry byte-identical chrome. It reads
 * its colours from whichever screen wraps it: the tokens are set on .screen and
 * inherit down, so there is no third copy of the palette to drift.
 */
export default function InstituteChrome({ activeIndex }: InstituteChromeProps) {
  return (
    <>
      <div className={styles.brandBar}>
        <div className={styles.mark}>[ UNIVERSITY MARK ]</div>
        <div className={styles.search} aria-hidden="true">
          ⌕
        </div>
      </div>

      <div className={styles.instituteBand}>{home.instituteBand}</div>

      {/*
        Same bar, same position as the live site. What changed is what is in it:
        the nav is the information architecture, so this is where the rework has
        to show up rather than in a second bar bolted underneath.
      */}
      <div className={styles.nav}>
        {home.nav.map((item, index) => (
          <span
            key={item}
            className={index === activeIndex ? styles.navActive : styles.navItem}
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
}
