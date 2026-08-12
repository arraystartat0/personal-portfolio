import { blitz } from "../../data/caseStudies";
import { CASE_BLITZ_ID } from "../../lib/anchors";
import ds from "../../styles/design.module.css";
import BeatCard from "../BeatCard";
import CaseGlance from "../CaseGlance";
import { collectCites, SourceList } from "../Citations";
import Findings from "../Findings";
import GlossaryText from "../GlossaryText";
import Metrics from "../Metrics";
import Reveal from "../motion/Reveal";
import AfterSite from "./AfterSite";
import BeforeSite from "./BeforeSite";
import styles from "./CaseStudyBlitz.module.css";

/*
 * One namespace for the study, so every marker resolves into the single list.
 * The study's own anchor, rather than a second string saying the same thing: it
 * was "c02", which would now be naming the study by a position it no longer
 * holds, and these ids go into footnote links a reader can land on.
 */
const CITE_ID = CASE_BLITZ_ID;

const [insightBeat, craftBeat, handoverBeat] = blitz.beats;
const { search, hero, handover } = blitz.beatMocks;

/**
 * The query, and the page that now answers it. Drawn in the study's own Swiss
 * language rather than as a pastiche of a search engine: the point is which
 * words are in the title, not whose result page it is.
 */
function SearchSketch() {
  return (
    <div className={styles.sketch}>
      <div className={styles.query}>
        <span className={styles.queryGlyph} aria-hidden="true">
          ⌕
        </span>
        {search.query}
      </div>

      <div className={styles.result}>
        <div className={styles.resultUrl}>{search.url}</div>
        <div className={styles.resultTitle}>{search.title}</div>
        <div className={styles.resultSnippet}>{search.snippet}</div>
      </div>
    </div>
  );
}

/**
 * The two lines of the live hero, each labelled with who it was written for.
 * The quiet rule belongs to the crawler's line and the ochre one to the buyer's,
 * so the order of the stack is legible before either line is read.
 */
function HeroSketch() {
  return (
    <div className={styles.sketch}>
      <div className={styles.sketchLabel}>{hero.label}</div>

      <div className={styles.heroLine}>
        <div className={styles.heroFor}>{hero.crawlerFor}</div>
        <div className={styles.heroEyebrow}>{hero.crawler}</div>
      </div>

      <div className={`${styles.heroLine} ${styles.heroLineAccent}`}>
        <div className={styles.heroFor}>{hero.personFor}</div>
        <div className={styles.heroHeadline}>{hero.person}</div>
      </div>
    </div>
  );
}

/**
 * Where the contact route actually sits, and what the team ships without me.
 * The page is schematic on purpose: the argument is the button's position, and
 * filling the rectangle with copy would only compete with it.
 */
function HandoverSketch() {
  return (
    <div className={styles.sketch}>
      <div className={styles.sketchLabel}>{handover.label}</div>

      <div className={styles.page}>
        <div className={styles.pageLines} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.fab}>{handover.button}</div>
      </div>

      <div className={styles.publish}>
        <div className={styles.publishLabel}>{handover.publishLabel}</div>
        <div className={styles.publishItems}>{handover.published}</div>
      </div>
    </div>
  );
}

export default function CaseStudyBlitz() {
  /*
   * Collected in reading order: the before frame's diagnosis, then the after
   * frame's resolution, then the beats. That is what numbers the references, so
   * a reader meeting [3] has already passed [1] and [2].
   */
  const cited = collectCites([
    ...blitz.diagnosis.findings,
    ...blitz.resolution.findings,
    ...blitz.beats,
  ]);

  return (
    <section id={blitz.id} className={ds.section}>
      <div className={ds.studyHead}>
        <div className={ds.studyNumber}>{blitz.number}</div>
        <div className={ds.kicker}>{blitz.eyebrow}</div>
      </div>

      <div className={ds.studyBody}>
        <Reveal as="h2" className={`${ds.studyTitle} ${styles.title}`}>
          {blitz.title}
        </Reveal>

        <CaseGlance glance={blitz.glance} />

        <div className={styles.intro}>
          <Reveal as="p" className={ds.lede} delayIndex={1}>
            {blitz.intro}
          </Reveal>

          <Reveal className={ds.metaList} delayIndex={2}>
            {blitz.meta.map((row) => (
              <div key={row.key} className={ds.metaRow}>
                <span className={ds.metaKey}>{row.key}</span>
                <span className={ds.metaValue}>
                  {row.href ? (
                    <a className={ds.link} href={row.href} target="_blank" rel="noopener">
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      <Reveal className={styles.renders}>
        <div className={ds.frame}>
          <div className={ds.frameHeader}>{blitz.beforeLabel}</div>
          <BeforeSite />

          {/*
            Inside the frame, under the same 2px rule: this reads the render
            above it, so it is part of that exhibit rather than a second one.
          */}
          <Findings
            id={CITE_ID}
            label={blitz.diagnosis.label}
            findings={blitz.diagnosis.findings}
            citeOrder={cited}
          />
        </div>

        <div className={styles.transition}>
          <div className={styles.transitionArrow} aria-hidden="true">
            ↓
          </div>
          <div className={styles.transitionText}>
            <GlossaryText scope={`${CITE_ID}-transition`}>{blitz.transition}</GlossaryText>
          </div>
        </div>

        <div className={ds.frame}>
          <div className={`${ds.frameHeader} ${ds.frameHeaderAccent}`}>{blitz.afterLabel}</div>
          <AfterSite />

          {/* The mirror of the diagnosis: same block, same order, answers instead of faults. */}
          <Findings
            id={CITE_ID}
            label={blitz.resolution.label}
            findings={blitz.resolution.findings}
            citeOrder={cited}
          />
        </div>
      </Reveal>

      {/*
        Written out rather than mapped, now that each beat carries its own
        sketch. A map plus a positional lookup table would tie the third sketch
        to the third element by nothing more sturdy than an index.
      */}
      {/*
        Every beat is `divided`, including the last one. The band clips a pixel
        off its right and bottom edges, so the trailing rules never land on the
        page however many columns auto-fit settles on.
      */}
      <div className={styles.beatsBand}>
        <div className={styles.beats}>
          <BeatCard beat={insightBeat} citeId={CITE_ID} citeOrder={cited} sketchFirst divided>
            <SearchSketch />
          </BeatCard>
          <BeatCard
            beat={craftBeat}
            delayIndex={1}
            citeId={CITE_ID}
            citeOrder={cited}
            sketchFirst
            divided
          >
            <HeroSketch />
          </BeatCard>
          <BeatCard
            beat={handoverBeat}
            delayIndex={2}
            citeId={CITE_ID}
            citeOrder={cited}
            sketchFirst
            divided
          >
            <HandoverSketch />
          </BeatCard>
        </div>
      </div>

      {/*
        Label and strip banded together, and the band owns the rule that closes
        it. Borrowing the next section's top border would leave the ochre cell
        ending in open paper the moment anything after it moves or goes away.
      */}
      <div className={styles.results}>
        <div className={styles.resultsLabel}>{blitz.metricsLabel}</div>
        <Metrics metrics={blitz.metrics} />
      </div>

      {/*
        One list for the whole study, last thing in it. Every marker above
        points here, so a reader never meets a second reference [1] that means
        something else.

        Banded by its own 2px rules, top and bottom, so it reads as a closing
        section rather than as a footnote hanging off the results.
      */}
      <div className={styles.sources}>
        <div className={styles.sourcesInner}>
          <SourceList
            id={CITE_ID}
            order={cited}
            label={blitz.sourcesLabel}
            hint={blitz.sourcesHint}
          />
        </div>
      </div>
    </section>
  );
}
