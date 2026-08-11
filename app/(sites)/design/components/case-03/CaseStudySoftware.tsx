import { salesPlatform } from "../../data/caseStudies";
import { banner } from "../../data/salesSystem";
import ds from "../../styles/design.module.css";
import BeatCard from "../BeatCard";
import { CiteMarks, collectCites, SourceList } from "../Citations";
import Disclosure from "../Disclosure";
import Findings from "../Findings";
import GlossaryText from "../GlossaryText";
import LiveTag from "../LiveTag";
import Metrics from "../Metrics";
import Reveal from "../motion/Reveal";
import DispatchCalendar from "./DispatchCalendar";
import IntakeReview from "./IntakeReview";
import MarketErp from "./MarketErp";
import { CostMock, GlanceMock, RecapMock } from "./PanelMocks";
import PrototypeApp from "./PrototypeApp";
import { ShippedDashboard, ShippedOrders, ShippedTrash } from "./ShippedSystem";
import styles from "./CaseStudySoftware.module.css";

/* One namespace for the study, so every marker resolves into the single list. */
const CITE_ID = "c03";

const [networkBeat, trainingBeat, supportBeat] = salesPlatform.beats;

/** Keyed by the `mock` field in the data, so copy chooses its own sketch. */
const PANEL_MOCKS = {
  glance: GlanceMock,
  recap: RecapMock,
  cost: CostMock,
} as const;

/**
 * A row appearing before the server has heard about it. The point of the sketch
 * is the second line: the work is already on screen and already listed, and the
 * connection is the software's problem rather than the user's.
 */
function QueueSketch() {
  return (
    <div className={styles.sketch}>
      <div className={styles.sketchLabel}>ORDER SAVED · STILL ON THE DEVICE</div>

      <div className={styles.queue}>
        <div className={styles.queueRow}>
          <span className={`${styles.dot} ${styles.dotOchre}`} aria-hidden="true" />
          BP-1594 · Bunyoro Grain Traders
        </div>
        <div className={styles.queueState}>Queued offline · syncs when the line is back</div>

        <div className={styles.queueRow}>
          <span className={`${styles.dot} ${styles.dotBlue}`} aria-hidden="true" />
          BP-1593 · Nile Beverages Ltd
        </div>
        <div className={styles.queueState}>Synced 09:14</div>
      </div>

      <div className={styles.queueNote}>No spinner, no lost typing, no second attempt.</div>
    </div>
  );
}

/**
 * The training, such as it is: four steps attached to the screen they describe.
 * Drawn as a hint pinned to a control rather than as a page of instructions,
 * because that difference is the whole claim the beat makes.
 */
function OnboardingSketch() {
  return (
    <div className={styles.sketch}>
      <div className={styles.sketchLabel}>FIRST TIME IN SALES</div>

      <div className={styles.tourRow}>
        <span className={styles.tourStep}>STEP 2 OF 4</span>
        <span className={styles.tourTarget}>Create a new order +</span>
      </div>

      <div className={styles.tourHint}>
        Start here. You can add the delivery date later, and nothing is sent until you
        press save.
      </div>

      <div className={styles.tourDots} aria-hidden="true">
        <span />
        <span className={styles.tourDotOn} />
        <span />
        <span />
      </div>

      {/* Its two siblings close on a line of plain text; this one was the odd
          sketch out, and three of these sit in a row. */}
      <div className={styles.queueNote}>Shown once per section, then only the hints remain.</div>
    </div>
  );
}

/**
 * The moment a delete happens, which is the moment the promise has to be made.
 * A trash screen you have to go and find says the same thing far too late.
 */
function UndoSketch() {
  return (
    <div className={styles.sketch}>
      <div className={styles.sketchLabel}>THE SECOND AFTER DELETING</div>

      <div className={styles.toast}>
        <span>BP-1588 moved to trash</span>
        <span className={styles.toastAction}>Undo</span>
      </div>

      <div className={styles.queueNote}>
        Kept for 30 days. Restoring the order brings its line items back with it.
      </div>
    </div>
  );
}

export default function CaseStudySoftware() {
  /*
   * Collected in reading order: the brief, then the two frames it diagnoses,
   * then the rebuild's answers, then the beats and the features. That is what
   * numbers the references, so a reader meeting [7] has already passed [1].
   */
  const cited = collectCites([
    ...salesPlatform.brief.items,
    ...salesPlatform.diagnosis.findings,
    ...salesPlatform.prototype.findings,
    ...salesPlatform.resolution.findings,
    ...salesPlatform.beats,
    ...salesPlatform.intake.findings.items,
    ...salesPlatform.living.findings.items,
    ...salesPlatform.principles,
  ]);

  return (
    <section id={salesPlatform.id} className={`${ds.section} ${styles.section}`}>
      <div className={ds.studyHead}>
        <div className={ds.studyNumber}>{salesPlatform.number}</div>
        <div className={ds.kicker}>{salesPlatform.eyebrow}</div>
      </div>

      <div className={styles.body}>
        <Reveal as="h2" className={`${ds.studyTitle} ${styles.title}`}>
          {salesPlatform.title}
        </Reveal>

        <div className={styles.intro}>
          <div className={styles.introText}>
            {salesPlatform.intro.map((paragraph, index) => (
              <Reveal key={index} as="p" className={ds.lede} delayIndex={index + 1}>
                {paragraph}
              </Reveal>
            ))}

            <Reveal as="p" className={ds.lede} delayIndex={2}>
              <strong className={styles.thesisLead}>{salesPlatform.thesis.lead}</strong>
              {salesPlatform.thesis.body}
            </Reveal>
          </div>

          <Reveal className={ds.metaList} delayIndex={3}>
            {salesPlatform.meta.map((row) => (
              <div key={row.key} className={ds.metaRow}>
                <span className={ds.metaKey}>{row.key}</span>
                <span className={ds.metaValue}>{row.value}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/*
        The brief, before any render. Everything below is a consequence of one of
        these four lines, so a reader who meets the constraints first can check
        each screen against them instead of taking the decisions on trust.
      */}
      <div className={styles.brief}>
        <div className={styles.briefHead}>
          <div className={`${ds.kicker} ${styles.briefLabel}`}>{salesPlatform.brief.label}</div>
          <p className={styles.briefNote}>{salesPlatform.brief.note}</p>
        </div>

        <div className={styles.constraints}>
          {salesPlatform.brief.items.map((item, index) => (
            <Reveal key={item.kicker} delayIndex={index} className={styles.constraint}>
              <div className={ds.kickerTight}>{item.kicker}</div>
              <div className={styles.constraintFinding}>
                {item.finding}
                <CiteMarks id={CITE_ID} cites={item.cites} order={cited} />
              </div>
              <div className={styles.constraintConsequence}>
                <span className={styles.constraintSo}>
                  {salesPlatform.brief.consequenceLabel}
                </span>
                {item.consequence}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className={styles.renders}>
        <Reveal className={ds.frame}>
          <div className={ds.frameHeader}>{salesPlatform.marketLabel}</div>
          <div className={styles.frameNote}>{salesPlatform.marketNote}</div>
          <MarketErp />

          <Findings
            id={CITE_ID}
            label={salesPlatform.diagnosis.label}
            findings={salesPlatform.diagnosis.findings}
            citeOrder={cited}
          />
        </Reveal>

        {/*
          The prototype gets its own frame rather than a paragraph. It is the
          part of this story a portfolio would normally leave out, and leaving it
          out would imply the shipped system was the first idea.
        */}
        <Reveal className={`${ds.frame} ${styles.stackedFrame}`} delayIndex={1}>
          <div className={ds.frameHeader}>{salesPlatform.prototypeLabel}</div>
          <PrototypeApp />

          <Findings
            id={CITE_ID}
            label={salesPlatform.prototype.label}
            findings={salesPlatform.prototype.findings}
            citeOrder={cited}
          />
        </Reveal>

        <div className={styles.transition}>
          <div className={styles.transitionArrow} aria-hidden="true">
            ↓
          </div>
          <div className={styles.transitionText}>
            <GlossaryText scope={`${CITE_ID}-transition`}>
              {salesPlatform.transition}
            </GlossaryText>
          </div>
        </div>

        <Reveal className={ds.frame}>
          <div className={`${ds.frameHeader} ${ds.frameHeaderAccent}`}>
            {salesPlatform.shippedLabel}
          </div>
          <div className={styles.frameNote}>{salesPlatform.shippedNote}</div>

          {/* Three screens in one frame, so they read as one product. */}
          <div className={styles.screenLabel}>{salesPlatform.screens.dashboardKicker}</div>
          <ShippedDashboard />

          <div className={`${styles.screenLabel} ${styles.screenLabelStacked}`}>
            {salesPlatform.screens.ordersKicker}
          </div>
          <ShippedOrders />

          <div className={`${styles.screenLabel} ${styles.screenLabelStacked}`}>
            {salesPlatform.screens.trashKicker}
          </div>
          <ShippedTrash />

          <Findings
            id={CITE_ID}
            label={salesPlatform.resolution.label}
            findings={salesPlatform.resolution.findings}
            citeOrder={cited}
          />
        </Reveal>
      </div>

      {/*
        Written out rather than mapped, the same as the Blitz study: a map plus a
        positional lookup would tie the third sketch to the third beat by nothing
        sturdier than an index.
      */}
      {/*
        Every beat is `divided`, including the last one. The band clips a pixel
        off its right edge, so the trailing rule never lands on the page however
        many columns auto-fit settles on.
      */}
      <div className={styles.beatsBand}>
        <div className={styles.beats}>
          <BeatCard beat={networkBeat} citeId={CITE_ID} citeOrder={cited} scale="medium" divided>
            <QueueSketch />
          </BeatCard>
          <BeatCard
            beat={trainingBeat}
            delayIndex={1}
            citeId={CITE_ID}
            citeOrder={cited}
            scale="medium"
            divided
          >
            <OnboardingSketch />
          </BeatCard>
          <BeatCard
            beat={supportBeat}
            delayIndex={2}
            citeId={CITE_ID}
            citeOrder={cited}
            scale="medium"
            divided
          >
            <UndoSketch />
          </BeatCard>
        </div>
      </div>

      <div className={styles.bigFeatures}>
        <Reveal className={styles.bigFeature}>
          {/*
            The band's heading rides inside the first feature so the 2px rule
            opens the whole band rather than falling between the heading and the
            first thing it heads.
          */}
          <div className={styles.featuresHead}>
            <h3 className={styles.featuresTitle}>{salesPlatform.features.title}</h3>
            <p className={styles.featuresNote}>{salesPlatform.features.note}</p>
          </div>

          <div className={ds.kickerTight}>{salesPlatform.intake.kicker}</div>
          {/*
            h4: the band's h3 above heads both features, including the one in the
            next Reveal that has no head of its own.
          */}
          <h4 className={styles.bigFeatureTitle}>{salesPlatform.intake.title}</h4>
          <p className={styles.bigFeatureBody}>
            {salesPlatform.intake.body.before}
            <strong className={styles.bodyStrong}>{salesPlatform.intake.body.strong}</strong>
            {salesPlatform.intake.body.after}
          </p>

          <div className={`${ds.frame} ${styles.bigFrame}`}>
            <div className={`${ds.frameHeader} ${ds.frameHeaderAccent}`}>
              {salesPlatform.intake.frameLabel}
            </div>
            <IntakeReview />

            <Findings
              id={CITE_ID}
              label={salesPlatform.intake.findings.label}
              findings={salesPlatform.intake.findings.items}
              citeOrder={cited}
            />
          </div>
        </Reveal>

        <Reveal className={styles.bigFeature} delayIndex={1}>
          <div className={ds.kickerTight}>{salesPlatform.living.kicker}</div>
          <h4 className={styles.bigFeatureTitle}>{salesPlatform.living.title}</h4>
          <p className={styles.bigFeatureBody}>{salesPlatform.living.body}</p>

          {/*
            The banner first, because it is what the floor actually sees, then
            the calendar that decided what it says. Effect, then mechanism.

            Stacked, and it stays stacked. Moving it into the empty column beside
            the copy closed the gap and cost more than it saved: set to one side
            it reads as a sidebar, and a sidebar is the thing an eye running down
            the left edge learns to skip. Under the paragraph it sits in the
            reading path, which is the only place an exhibit does its work.
          */}
          <div className={styles.bannerWrap}>
            <div className={ds.kickerTight}>{salesPlatform.living.bannerLabel}</div>
            <div className={styles.week}>
              <div className={styles.weekLabel}>{banner.label}</div>
              <div className={styles.weekHeadline}>{banner.headline}</div>
              <div className={styles.weekNote}>{banner.note}</div>
            </div>
          </div>

          <div className={`${ds.frame} ${styles.bigFrame}`}>
            <div className={`${ds.frameHeader} ${ds.frameHeaderAccent}`}>
              {salesPlatform.living.frameLabel}
            </div>
            <LiveTag label={salesPlatform.living.liveTag}>
              <DispatchCalendar />
            </LiveTag>

            <Findings
              id={CITE_ID}
              label={salesPlatform.living.findings.label}
              findings={salesPlatform.living.findings.items}
              citeOrder={cited}
            />
          </div>
        </Reveal>
      </div>

      <div className={styles.panelsBand}>
        <div className={styles.panels}>
          {salesPlatform.principles.map((principle, index) => {
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

      <div className={styles.results}>
        <div className={styles.resultsLabel}>{salesPlatform.metricsLabel}</div>
        <Metrics metrics={salesPlatform.metrics} />
      </div>

      {/* One list for the whole study, exactly as the other two close. */}
      <div className={styles.sources}>
        <div className={styles.sourcesInner}>
          <SourceList
            id={CITE_ID}
            order={cited}
            label={salesPlatform.sourcesLabel}
            hint={salesPlatform.sourcesHint}
          />

          {/*
            The method note sits with the sources for the reason the institute
            study's disclaimer does: a reader weighing the 5 / 5 should find out
            how it was gathered from the study rather than by asking.
          */}
          <Disclosure
            tone="ochre"
            summary={salesPlatform.method.summary}
            hint={salesPlatform.method.hint}
          >
            <ul>
              {salesPlatform.method.body.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Disclosure>
        </div>
      </div>
    </section>
  );
}
