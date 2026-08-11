import { panelMocks } from "../../data/salesSystem";
import GlossaryText from "../GlossaryText";
import styles from "./PanelMocks.module.css";

/**
 * One small sketch per closing panel, in the product's palette rather than the
 * study's, the way the institute study's panel mocks carry the institute's.
 * Each one shows the thing its panel argues for instead of describing it.
 */

/**
 * The tile and the same fact written out, stacked, so the panel's claim is
 * testable rather than asserted: a reader learns the revenue from the top block
 * before they have finished the first clause of the bottom one.
 */
export function GlanceMock() {
  const { glance } = panelMocks;

  return (
    <div className={styles.mock}>
      <div className={styles.label}>{glance.label}</div>

      <div className={styles.tile}>
        <div className={styles.tileLabel}>{glance.tile.label}</div>
        <div className={styles.tileValue}>{glance.tile.value}</div>
        <div className={styles.tileDelta}>
          <span aria-hidden="true">↗</span>
          <strong>{glance.tile.delta}</strong>
          <span className={styles.tileSince}>{glance.tile.since}</span>
        </div>
      </div>

      <div className={styles.subLabel}>{glance.sentenceLabel}</div>
      <p className={styles.sentence}>{glance.sentence}</p>
    </div>
  );
}

export function RecapMock() {
  const { recap } = panelMocks;

  return (
    <div className={styles.mock}>
      <div className={styles.label}>{recap.label}</div>

      <div className={styles.recap}>
        <div className={styles.recapTitle}>{recap.title}</div>
        <div className={styles.recapStats}>
          {recap.stats.map((stat) => (
            <div key={stat.label} className={styles.recapStat}>
              <div className={styles.recapValue}>{stat.value}</div>
              <div className={styles.recapLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/*
        Run through GlossaryText so "design tokens" is a term a reader can hover
        rather than a phrase they either know or skip. The panel copy no longer
        explains the generated look; this line and its definition carry it.
      */}
      <div className={styles.footnote}>
        <GlossaryText scope="c03-recap-mock">{recap.footer}</GlossaryText>
      </div>
    </div>
  );
}

/**
 * A bill, drawn as one. The line items carry no invented figures: what is
 * actually known is the four things being paid for and the annual total, so
 * that is all it shows.
 */
export function CostMock() {
  const { cost } = panelMocks;

  return (
    <div className={styles.mock}>
      <div className={styles.label}>{cost.label}</div>

      <div className={styles.bill}>
        {cost.lines.map((line) => (
          <div key={line.label} className={styles.billLine}>
            <span className={styles.billLabel}>{line.label}</span>
            {/*
              A bar rather than a leader rule, so the row says which of these is
              the expensive one instead of only naming it. Width is the share of
              the annual bill; the figure under it is the only amount published.
            */}
            <span className={styles.billTrack}>
              <span className={styles.billBar} style={{ width: `${line.share}%` }} />
            </span>
          </div>
        ))}

        <div className={styles.billTotal}>
          <span>{cost.totalLabel}</span>
          <strong className={styles.billValue}>{cost.total}</strong>
        </div>
      </div>

      <div className={styles.footnote}>{cost.footnote}</div>
    </div>
  );
}
