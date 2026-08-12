import { researchIa } from "../../data/caseStudies";
import { newsAndEvents } from "../../data/newsAndEvents";
import { CASE_RESEARCH_ID } from "../../lib/anchors";
import ds from "../../styles/design.module.css";
import BeatCard from "../BeatCard";
import CaseGlance from "../CaseGlance";
import { CiteMarks, collectCites, SourceList } from "../Citations";
import Disclosure from "../Disclosure";
import Findings from "../Findings";
import GlossaryText from "../GlossaryText";
import LiveTag from "../LiveTag";
import Reveal from "../motion/Reveal";
import CurrentSite from "./CurrentSite";
import EventsCalendar from "./EventsCalendar";
import { AccessibilityMock, FamiliarMock, FilterMock } from "./PanelMocks";
import ScreenHome from "./ScreenHome";
import ScreenNews, { EditorView } from "./ScreenNews";
import ScreenProblem from "./ScreenProblem";
import styles from "./CaseStudyResearch.module.css";

const { contentAudit, architecture, screens } = researchIa;

function ContentAuditSketch() {
  return (
    <div className={styles.sketch}>
      <div className={styles.sketchHeader}>{contentAudit.label}</div>
      <div className={styles.clusters}>
        {contentAudit.clusters.map((cluster) => (
          <div key={cluster.name} className={styles.cluster}>
            <span>{cluster.name}</span>
            <span className={styles.clusterDepartments}>{cluster.departments}</span>
          </div>
        ))}
      </div>
      <div className={styles.sketchFooter}>{contentAudit.note}</div>
    </div>
  );
}

function ArchitectureSketch() {
  const { now, proposed } = architecture;

  return (
    <div className={styles.trees}>
      <div className={styles.tree}>
        <div className={`${styles.sketchHeader} ${styles.sketchHeaderMuted}`}>{now.label}</div>
        <div className={styles.treeBody}>
          <div className={styles.treeRoot}>{now.root}</div>
          <div className={styles.treeBranch}>
            {now.children.before}
            <span className={styles.treeMuted}>{now.children.muted}</span>
            {now.children.after}
          </div>
          <div className={styles.treeFootnote}>
            {now.footnote.before}
            <em>{now.footnote.emphasis}</em>
            {now.footnote.after}
          </div>
        </div>
      </div>

      <div className={styles.tree}>
        <div className={`${styles.sketchHeader} ${styles.sketchHeaderAccent}`}>
          {proposed.label}
        </div>
        <div className={styles.treeBody}>
          <div className={styles.treeRoot}>{proposed.root}</div>
          <div className={styles.treeBranchAccent}>
            <span className={styles.treeRoot}>{proposed.primary}</span>{" "}
            <span className={styles.treeMuted}>{proposed.primaryCount}</span>
          </div>
          <div className={styles.treeLeaf}>{proposed.children}</div>
          <div className={styles.treeFootnote}>{proposed.footnote}</div>
        </div>
      </div>
    </div>
  );
}

/* The study's own anchor rather than a second string. See case-02. */
const CITE_ID = CASE_RESEARCH_ID;

/** Keyed by the `mock` field in the data, so copy chooses its own sketch. */
const PANEL_MOCKS = {
  accessibility: AccessibilityMock,
  filter: FilterMock,
  familiar: FamiliarMock,
} as const;

export default function CaseStudyResearch() {
  /*
   * Reading order: the diagnosis of the current page, the rework's answers, then
   * the features in the order the band lists them. The reference numbers come
   * out of this array, so it has to match the order a reader meets the claims.
   */
  const cited = collectCites([
    ...researchIa.diagnosis.findings,
    ...researchIa.resolution.findings,
    ...newsAndEvents.feedFindings.items,
    ...newsAndEvents.calendarFindings.items,
    ...researchIa.principles,
  ]);

  return (
    <section id={researchIa.id} className={ds.section}>
      <div className={ds.studyHead}>
        <div className={ds.studyNumber}>{researchIa.number}</div>
        <div className={ds.kicker}>{researchIa.eyebrow}</div>
      </div>

      <div className={styles.body}>
        <Reveal as="h2" className={`${ds.studyTitle} ${styles.title}`}>
          {researchIa.title}
        </Reveal>

        <CaseGlance glance={researchIa.glance} />

        <div className={styles.intro}>
          {/*
            One block, two paragraphs. Set as columns these read as a pair to be
            weighed against each other; the second one answers the first, so it
            belongs underneath it.
          */}
          <div className={styles.introText}>
            {researchIa.intro.map((paragraph, index) => (
              <Reveal key={index} as="p" className={ds.lede} delayIndex={index + 1}>
                {paragraph}
              </Reveal>
            ))}

            <Reveal as="p" className={ds.lede} delayIndex={2}>
              <strong className={styles.thesisLead}>{researchIa.thesis.lead}</strong>
              {researchIa.thesis.body}
            </Reveal>
          </div>

          <Reveal className={ds.metaList} delayIndex={3}>
            {researchIa.meta.map((row) => (
              <div key={row.key} className={ds.metaRow}>
                <span className={ds.metaKey}>{row.key}</span>
                <span className={ds.metaValue}>
                  <GlossaryText scope={`${CITE_ID}-meta-${row.key}`}>
                    {row.value}
                  </GlossaryText>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      <div className={styles.beats}>
        <BeatCard
          beat={{
            kicker: contentAudit.kicker,
            title: contentAudit.title,
            body: contentAudit.body,
          }}
          scale="medium"
          glossaryScope={`${CITE_ID}-content-audit`}
        >
          <ContentAuditSketch />
        </BeatCard>
        <BeatCard
          beat={{
            kicker: architecture.kicker,
            title: architecture.title,
            body: architecture.body,
          }}
          scale="medium"
          glossaryScope={`${CITE_ID}-architecture`}
          delayIndex={1}
        >
          <ArchitectureSketch />
        </BeatCard>
      </div>

      {/*
        Two exhibits, framed the way the Blitz study frames its before and after: the
        page as it stands with its diagnosis attached, then both proposed
        screens in one frame with the fixes attached. Stacked rather than wiped,
        because a comparison you can scroll back to beats one you have to hover.
      */}
      <div className={styles.renders}>
        <Reveal className={ds.frame}>
          <div className={ds.frameHeader}>{researchIa.currentSite.label}</div>
          <CurrentSite />

          <Findings
            id={CITE_ID}
            label={researchIa.diagnosis.label}
            findings={researchIa.diagnosis.findings}
            citeOrder={cited}
          />
        </Reveal>

        <div className={styles.transition}>
          <div className={styles.transitionArrow} aria-hidden="true">
            ↓
          </div>
          <div className={styles.transitionText}>{researchIa.thesis.lead}</div>
        </div>

        <Reveal className={ds.frame} delayIndex={1}>
          <div className={`${ds.frameHeader} ${ds.frameHeaderAccent}`}>
            {screens.proposedLabel}
          </div>

          <div className={styles.screenLabel}>{screens.homeKicker}</div>
          {/* data-thumb: scripts/thumbs.mjs photographs this for the work index. */}
          <div data-thumb="research">
            <ScreenHome />
          </div>

          {/* Both screens in one frame, so they read as one product. */}
          <div className={`${styles.screenLabel} ${styles.screenLabelStacked}`}>
            {screens.problemKicker}
          </div>
          <ScreenProblem />

          <Findings
            id={CITE_ID}
            label={researchIa.resolution.label}
            findings={researchIa.resolution.findings}
            citeOrder={cited}
          />
        </Reveal>
      </div>

      {/*
        The three arguments the rework rests on, each with its own sketch. A
        mockup beside the claim is the same move the render frames make: show
        the thing rather than describe it.
      */}
      {/*
        The two the institute asked for by name, stacked at full width above the
        three that are arguments rather than deliverables. A feature you can
        operate needs the room; a principle with a sketch beside it does not.
      */}
      <div className={styles.bigFeatures}>
        <Reveal className={styles.bigFeature}>
          {/*
            The band's heading rides inside the first feature rather than above
            it, so the 2px rule opens the whole band. Set outside, the rule fell
            between the heading and the first thing it was heading.
          */}
          <div className={styles.featuresHead}>
            <h3 className={styles.featuresTitle}>{researchIa.features.title}</h3>
            <p className={styles.featuresNote}>{researchIa.features.note}</p>
          </div>

          <div className={ds.kickerTight}>{newsAndEvents.featureOne.kicker}</div>
          {/*
            h4: the band's h3 above heads both features, including the one in the
            next Reveal that has no head of its own.
          */}
          <h4 className={styles.bigFeatureTitle}>{newsAndEvents.featureOne.title}</h4>
          <p className={styles.bigFeatureBody}>{newsAndEvents.featureOne.body}</p>

          <div className={`${ds.frame} ${styles.bigFrame}`}>
            <div className={`${ds.frameHeader} ${ds.frameHeaderAccent}`}>
              {newsAndEvents.feedKicker}
            </div>
            <ScreenNews />

            {/* The compose form is the same product, so it stays in the frame. */}
            <div className={`${styles.screenLabel} ${styles.screenLabelStacked}`}>
              {newsAndEvents.editorKicker}
            </div>
            <EditorView />

            <Findings
              id={CITE_ID}
              label={newsAndEvents.feedFindings.label}
              findings={newsAndEvents.feedFindings.items}
              citeOrder={cited}
            />
          </div>
        </Reveal>

        <Reveal className={styles.bigFeature} delayIndex={1}>
          <div className={ds.kickerTight}>{newsAndEvents.featureTwo.kicker}</div>
          <h4 className={styles.bigFeatureTitle}>{newsAndEvents.featureTwo.title}</h4>
          <p className={styles.bigFeatureBody}>{newsAndEvents.featureTwo.body}</p>

          <div className={`${ds.frame} ${styles.bigFrame}`}>
            <div className={`${ds.frameHeader} ${ds.frameHeaderAccent}`}>
              {newsAndEvents.calendarKicker}
            </div>
            <LiveTag label={newsAndEvents.calendarLiveTag}>
              <EventsCalendar />
            </LiveTag>

            <Findings
              id={CITE_ID}
              label={newsAndEvents.calendarFindings.label}
              findings={newsAndEvents.calendarFindings.items}
              citeOrder={cited}
            />
          </div>
        </Reveal>
      </div>

      {/*
        Every panel is divided, including the last one. The band clips a pixel
        off its right and bottom edges, so the trailing rules never land on the
        page however many columns auto-fit settles on.
      */}
      <div className={styles.panelsBand}>
        <div className={styles.panels}>
          {researchIa.principles.map((principle, index) => {
            const Mock = PANEL_MOCKS[principle.mock];

            return (
              <Reveal key={principle.kicker} delayIndex={index} className={styles.panel}>
                <div className={ds.kickerTight}>{principle.kicker}</div>
                <Mock />
                <div className={styles.panelBody}>
                  <GlossaryText scope={`${CITE_ID}-principle-${index}`}>
                    {principle.body}
                  </GlossaryText>
                  <CiteMarks id={CITE_ID} cites={principle.cites} order={cited} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* One list for the whole study, exactly as the Blitz study closes. */}
      <div className={styles.sources}>
        <div className={styles.sourcesInner}>
          <SourceList
            id={CITE_ID}
            order={cited}
            label={researchIa.sourcesLabel}
            hint={researchIa.sourcesHint}
          />

          {/*
            The full note closes the study, with the sources. The status row up
            top already says this was unsolicited and unaffiliated, so leading
            with the caveats is throat-clearing; this is where a reader who wants
            the provenance comes looking for it.

            Folded, but the sentence that does the disclaiming is the summary and
            is always on screen. What is behind the chevron is the detail, not
            the disclosure.
          */}
          <Disclosure
            tone="ochre"
            summary={researchIa.disclaimer.summary}
            hint={researchIa.disclaimer.hint}
          >
            {researchIa.disclaimer.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Disclosure>
        </div>
      </div>
    </section>
  );
}
