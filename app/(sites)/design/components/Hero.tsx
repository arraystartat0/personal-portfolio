import { Fragment } from "react";
import { hero } from "../data/hero";
import ds from "../styles/design.module.css";
import Reveal from "./motion/Reveal";
import styles from "./Hero.module.css";

const toneClass = {
  accent: styles.accent,
  muted: styles.muted,
} as const;

export default function Hero() {
  return (
    <header id="top" className={styles.header}>
      <Reveal className={`${ds.kicker} ${styles.kicker}`}>{hero.kicker}</Reveal>

      <Reveal as="h1" className={styles.headline} delayIndex={1}>
        {hero.headline.map((segment, index) => (
          <Fragment key={index}>
            {segment.break ? (
              <br />
            ) : (
              <span className={segment.tone ? toneClass[segment.tone] : undefined}>
                {segment.text}
              </span>
            )}
          </Fragment>
        ))}
      </Reveal>

      <div className={styles.columns}>
        <Reveal as="p" className={styles.intro} delayIndex={2}>
          {hero.intro}
        </Reveal>

        <Reveal delayIndex={3}>
          <div className={`${ds.kickerMuted} ${styles.asideLabel}`}>
            {hero.currently.label}
          </div>
          <div className={styles.asideBody}>
            {hero.currently.role}
            <br />
            {hero.currently.company}
            <br />
            <a
              className={ds.link}
              href={hero.currently.href}
              target="_blank"
              rel="noopener"
            >
              {hero.currently.hrefLabel}
            </a>
          </div>
        </Reveal>

        <Reveal delayIndex={4}>
          <div className={`${ds.kickerMuted} ${styles.asideLabel}`}>
            {hero.toolkit.label}
          </div>
          <div className={styles.tags}>
            {hero.toolkit.tags.map((tag) => (
              <span
                key={tag.label}
                className={`${styles.tag} ${
                  tag.variant === "outline" ? styles.tagOutline : styles.tagFill
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <div className={styles.actions}>
        {/* Grouped so the three can be sized against each other. Loose siblings
            of the scroll cue, they could only ever be as wide as their labels. */}
        <div className={styles.ctaGroup}>
          <a className={styles.cta} href={hero.actions.primary.href}>
            {hero.actions.primary.label}
          </a>
          <a className={styles.ctaGhost} href={hero.actions.secondary.href}>
            {hero.actions.secondary.label}
          </a>
          <a
            className={styles.ctaGhost}
            href={hero.actions.resume.href}
            target="_blank"
            rel="noopener"
          >
            {hero.actions.resume.label}
          </a>
        </div>
        <div className={styles.scrollCue} aria-hidden="true">
          {hero.actions.scrollCue}
        </div>
      </div>
    </header>
  );
}
