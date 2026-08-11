import Image from "next/image";
import { Fragment } from "react";

import { about } from "../data/about";
import ds from "../styles/design.module.css";
import Reveal from "./motion/Reveal";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={`${ds.section} ${styles.section}`}>
      <div className={styles.copy}>
        <Reveal className={`${ds.kicker} ${styles.kicker}`}>{about.kicker}</Reveal>

        <Reveal as="h2" className={styles.headline} delayIndex={1}>
          {about.headline}
        </Reveal>

        {about.paragraphs.map((paragraph, index) => (
          <Reveal
            key={index}
            as="p"
            delayIndex={index + 2}
            className={`${styles.paragraph} ${index > 0 ? styles.paragraphTight : ""}`}
          >
            {paragraph}
          </Reveal>
        ))}

        <Reveal className={styles.facts}>
          {about.facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <div className={`${ds.kickerMuted} ${styles.factLabel}`}>{fact.label}</div>
              <div className={styles.factLines}>
                {fact.lines.map((line, index) => (
                  <Fragment key={line}>
                    {index > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <div className={styles.portraitColumn}>
        <Reveal className={styles.portrait}>
          {/*
            The source is only a little wider than this frame renders on a 2x
            screen, so there is no resolution to spare: quality is raised above
            the default 75 to stop re-encoding from spending any more of it.
          */}
          <Image
            src={about.portrait.src}
            alt={about.portrait.alt}
            fill
            quality={90}
            sizes="(max-width: 700px) 92vw, 600px"
            className={styles.portraitImage}
          />
        </Reveal>
      </div>
    </section>
  );
}
