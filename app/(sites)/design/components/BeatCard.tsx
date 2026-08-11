import type { ReactNode } from "react";
import type { Beat } from "../data/caseStudies";
import type { SourceKey } from "../data/sources";
import ds from "../styles/design.module.css";
import { CiteMarks } from "./Citations";
import GlossaryText from "./GlossaryText";
import Reveal from "./motion/Reveal";

/** Each case study runs its beats at a slightly different scale. */
type BeatScale = "compact" | "medium" | "roomy";

const scaleClasses: Record<BeatScale, { cell: string; title: string; body: string }> = {
  compact: { cell: "", title: "", body: "" },
  medium: { cell: ds.beatMedium, title: ds.beatTitleMedium, body: ds.beatBodyMedium },
  roomy: { cell: ds.beatRoomy, title: ds.beatTitleRoomy, body: ds.beatBodyMedium },
};

type BeatCardProps = {
  beat: Beat;
  delayIndex?: number;
  /**
   * Draws the rules that separate this cell from the next one, right and below.
   * Both, because auto-fit decides which of the two a reader sees. Set it on
   * every cell in the band, including the last: the band clips its own trailing
   * pixel. See ds.dividedBand.
   */
  divided?: boolean;
  scale?: BeatScale;
  /** Namespaces the reference anchors; required only when a beat cites. */
  citeId?: string;
  /**
   * Namespaces the glossary tooltips; set it when the beat body carries a [[key]]
   * marker. Absent, the body renders as written, which is what the beats without
   * jargon in them want.
   */
  glossaryScope?: string;
  /** Every source cited across the sibling beats, in reference order. */
  citeOrder?: readonly SourceKey[];
  /**
   * Puts the sketch between the title and the body instead of after it. Worth it
   * where the sketch is the evidence for the claim the title makes: the reader
   * meets the thing, then reads why it is that way.
   */
  sketchFirst?: boolean;
  /** An optional interface sketch, beneath the copy unless sketchFirst is set. */
  children?: ReactNode;
};

export default function BeatCard({
  beat,
  delayIndex = 0,
  divided = false,
  scale = "compact",
  citeId,
  citeOrder,
  glossaryScope,
  sketchFirst = false,
  children,
}: BeatCardProps) {
  const classes = scaleClasses[scale];

  return (
    <Reveal
      delayIndex={delayIndex}
      className={[ds.beat, classes.cell, divided ? ds.beatDivided : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={ds.kickerTight}>{beat.kicker}</div>
      {/*
        h3 because every beat band on the site sits directly under the h2 that
        titles its case study. It reads as a heading at 19 to 27px and weight
        800, so it has to be one: set as a div it was invisible to anyone moving
        through the page by heading, which is most of what a screen reader user
        does on a page this long. Nest a band deeper than a study and this has to
        be revisited.
      */}
      <h3 className={`${ds.beatTitle} ${classes.title}`}>{beat.title}</h3>
      {sketchFirst && children}
      <p className={`${ds.beatBody} ${classes.body}`}>
        {glossaryScope ? (
          <GlossaryText scope={glossaryScope}>{beat.body}</GlossaryText>
        ) : (
          beat.body
        )}
        {citeId && citeOrder && (
          <CiteMarks id={citeId} cites={beat.cites} order={citeOrder} />
        )}
      </p>
      {!sketchFirst && children}
    </Reveal>
  );
}
