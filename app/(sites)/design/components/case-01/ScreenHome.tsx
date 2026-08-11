import { researchIa } from "../../data/caseStudies";
import InstituteChrome from "./InstituteChrome";
import styles from "./ScreenHome.module.css";

const { home } = researchIa;

/** Screen 01: the proposed home page, organised by research problem. */
export default function ScreenHome() {
  return (
    <div className={styles.screen}>
      <InstituteChrome activeIndex={0} />

      {/*
        The institute's own layer, below the university chrome: member routes and
        the section search. It sits under the standard band rather than replacing
        any part of it, because that band is not ours to move.
      */}
      <div className={styles.memberBar}>
        <span className={styles.memberBarTitle}>{home.memberBar.label}</span>
        {home.memberBar.links.map((link) => (
          <span key={link} className={styles.memberLink}>
            {link}
          </span>
        ))}
        <span className={styles.search}>{home.search}</span>
        <span className={styles.signIn}>{home.memberBar.signIn}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.kicker}>{home.kicker}</div>
        <div className={styles.headline}>{home.headline}</div>
        <div className={styles.body}>{home.body}</div>

        <div className={styles.problems}>
          {home.problems.map((problem) => (
            <div key={problem.name} className={styles.problem}>
              <div className={styles.problemName}>{problem.name}</div>

              {/*
                The one thing the current page already does well: it names who
                leads the work. Kept, and turned into a route to that person
                rather than a dead line of bold text. Spans, not anchors: this
                sits inside a role="button" wipe and is a mockup, not a live page.
              */}
              <div className={styles.leads}>
                <span className={styles.leadsLabel}>{home.leadsLabel}</span>
                {problem.leads.map((lead) => (
                  <span key={lead} className={styles.lead}>
                    {lead}
                  </span>
                ))}
              </div>

              <div className={styles.problemBlurb}>{problem.blurb}</div>

              {/*
                The departments as badges. Two cards carrying the same tag is
                the cross-faculty collaboration the institute exists for, said
                in the structure instead of in somebody's fourth sentence.
              */}
              <div className={styles.tags}>
                {problem.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.problemMeta}>{problem.meta}</div>

              {/* The only field on the card about the space between clusters. */}
              <div className={styles.overlap}>
                <span className={styles.overlapMark} aria-hidden="true">
                  ⇄
                </span>
                {problem.overlap}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.labs}>
          <div className={styles.labsLabel}>{home.fromTheLabs.label}</div>
          <div className={styles.labsRows}>
            {home.fromTheLabs.rows.map((row) => (
              <div key={row.kind} className={styles.labsRow}>
                <span className={styles.labsKind}>{row.kind}</span>
                <span>{row.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
