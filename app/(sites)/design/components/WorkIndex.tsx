import Image from "next/image";

import { workIndex } from "../data/caseStudies";
import ds from "../styles/design.module.css";
import Reveal from "./motion/Reveal";
import styles from "./WorkIndex.module.css";

/* The reveal animates a 150px box open, so the image is sized to its end state. */
const THUMB_WIDTH = 150;
const THUMB_HEIGHT = 78;

export default function WorkIndex() {
  return (
    <section id="work" className={ds.section} style={{ scrollMarginTop: 64 }}>
      <div className={styles.head}>
        {/*
          Small and set in caps, but it is still what this section is called, and
          the rows below it are h3. Left as a div the rows would have hung off
          the previous section's h2 instead.
        */}
        <h2 className={styles.heading}>{workIndex.heading}</h2>
        {/*
          Both strings ship and CSS hides one. The page is prerendered, so
          reading the input device at render time is not available, and reading it
          on the client would mean a hydration mismatch or a hint that changes
          under the reader. A media query is the only thing that can pick here.
        */}
        <div className={styles.hint}>
          <span className={styles.hintPointer}>{workIndex.hint.pointer}</span>
          <span className={styles.hintTouch}>{workIndex.hint.touch}</span>
        </div>
      </div>

      {workIndex.rows.map((row, index) => (
        <Reveal key={row.number} delayIndex={index}>
          <a
            href={row.href}
            className={`${styles.row} ${
              index === workIndex.rows.length - 1 ? styles.rowLast : ""
            }`}
          >
            <div className={styles.number}>{row.number}</div>

            <div className={styles.text}>
              {/*
                A heading inside the link, not beside it: the row is one target
                and splitting it would mean two. Nesting is allowed here, an <a>
                takes flow content, and it is what puts these three rows in the
                heading list beside the studies they point at.
              */}
              <h3 className={styles.title}>{row.title}</h3>
              <div className={styles.summary}>{row.summary}</div>
              {/*
                What it did, under what it was. This is the line that makes the
                index readable on its own, for the reader who never opens a
                study, so it is the one part of the row that does not mute.
              */}
              <div className={styles.outcome}>{row.outcome}</div>
            </div>

            {/*
              Every row has one now, so there is no conditional left: a slot that
              appeared on one row and not the next read as a broken row rather
              than a styled one.
            */}
            <div className={styles.thumb} aria-hidden="true">
              <Image
                src={row.thumb}
                alt=""
                width={THUMB_WIDTH}
                height={THUMB_HEIGHT}
                className={styles.thumbImage}
              />
            </div>

            <div className={styles.meta}>
              {row.discipline}
              <br />
              {row.years}
            </div>

            <div className={styles.arrow} aria-hidden="true">
              ↓
            </div>
          </a>
        </Reveal>
      ))}
    </section>
  );
}
