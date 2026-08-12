import type { CSSProperties } from "react";

import type { CaseFinding } from "../data/caseStudies";
import type { SourceKey } from "../data/sources";
import { CiteMarks } from "./Citations";
import Disclosure from "./Disclosure";
import GlossaryText from "./GlossaryText";
import styles from "./Findings.module.css";

interface FindingsProps {
  /** Shared by every block in the study, so the anchors resolve to one list. */
  id: string;
  label: string;
  findings: readonly CaseFinding[];
  /**
   * Every source cited across the whole case study, in reference order. Passed
   * in rather than derived here: a block that numbered its own citations would
   * restart at 1 and give the study two conflicting reference [1]s.
   */
  citeOrder?: readonly SourceKey[];
  /**
   * Folds the list behind a line that makes its point without it. Only worth it
   * where a block runs to six findings and the study already runs to several
   * blocks; a four-item list costs less to read than the chevron costs to trust.
   */
  fold?: { summary: string; hint: string };
}

/**
 * A labelled audit that annotates the render above it: the before frame's
 * faults, the after frame's answers. One component for both, because they are
 * the same argument run in opposite directions and should look it.
 */
export default function Findings({
  id,
  label,
  findings,
  citeOrder = [],
  fold,
}: FindingsProps) {
  /*
   * Derived rather than fixed, because the track count has to divide the number
   * of findings or the last row trails empty cells. Three divides a block of
   * three or six and nothing else these blocks come in, so it is offered only
   * when it divides; every other block holds at two, which divides any even
   * count. This is why a block can be cut from six to four without the widest
   * layout going ragged.
   */
  const wideColumns = findings.length % 3 === 0 ? 3 : 2;

  const list = (
    <ol
      className={styles.findings}
      style={{ "--finding-columns": wideColumns } as CSSProperties}
    >
      {findings.map((finding, index) => (
        <li key={finding.lead} className={styles.finding}>
          <span className={styles.text}>
            <span className={styles.lead}>{finding.lead}</span>
            {/*
              Scoped by block label as well as by study: one study runs several
              of these, and two blocks each citing the same term would otherwise
              hand both tooltips the same id.
            */}
            <GlossaryText scope={`${id}-${label}-${index}`}>{finding.body}</GlossaryText>
            <CiteMarks id={id} cites={finding.cites} order={citeOrder} />
          </span>
        </li>
      ))}
    </ol>
  );

  return (
    <div className={styles.block}>
      <div className={styles.label}>{label}</div>

      {/*
        Folded, the summary has to carry the claim on its own: what is behind the
        chevron is the evidence, never the point. Same contract the disclaimer
        and the source lists are held to.

        Citation numbering is untouched by this. collectCites reads the data in
        reading order, and folding changes what is painted, not what is in the
        document, so a marker inside a closed block keeps the number it would
        have had open. A fragment link to one opens the block on the way.
      */}
      {fold ? (
        <Disclosure summary={fold.summary} hint={fold.hint}>
          {list}
        </Disclosure>
      ) : (
        list
      )}
    </div>
  );
}
