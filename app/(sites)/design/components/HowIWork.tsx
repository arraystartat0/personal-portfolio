import { approach } from "../data/approach";
import ds from "../styles/design.module.css";
import Reveal from "./motion/Reveal";
import ScatterGrid from "./ScatterGrid";
import styles from "./HowIWork.module.css";

const [firstHeadline, secondHeadline] = approach.headlines;

export default function HowIWork() {
  return (
    <section className={styles.section}>
      <div className={styles.copy}>
        <Reveal className={`${ds.kicker} ${styles.kicker}`}>{approach.kicker}</Reveal>

        {/*
          One heading, three lines. Set as two <h2>s this announced as two
          headings, so a sentence and its answer read as two sections of the
          page; the same split Contact already handles with a span inside one
          heading. A Reveal each rather than one around the h2, so the blue line
          still lands 70ms after the black one.
        */}
        <h2 className={styles.headline}>
          <Reveal as="span" className={styles.headlineLine} delayIndex={1}>
            {firstHeadline}
          </Reveal>
          <Reveal
            as="span"
            className={`${styles.headlineLine} ${styles.headlineAccent}`}
            delayIndex={2}
          >
            {secondHeadline}
          </Reveal>
        </h2>

        <Reveal as="p" className={styles.body} delayIndex={3}>
          {approach.body}
        </Reveal>

        <Reveal className={styles.principles}>
          {/*
            A grid item like the rows, so the 12px gap plus each row's own 12px
            padding puts it on the same rhythm as a header over a table.
          */}
          <div className={ds.kickerMuted}>{approach.principlesLabel}</div>

          {approach.principles.map((principle) => (
            <div key={principle.number} className={styles.principle}>
              <span className={styles.principleNumber}>{principle.number}</span>
              <span className={styles.principleText}>{principle.text}</span>
            </div>
          ))}
        </Reveal>
      </div>

      <ScatterGrid />
    </section>
  );
}
