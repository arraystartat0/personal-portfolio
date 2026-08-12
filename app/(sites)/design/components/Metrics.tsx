import { Fragment } from "react";
import type { Metric, MetricValue } from "../data/caseStudies";
import ds from "../styles/design.module.css";
import CountUp from "./motion/CountUp";
import Reveal from "./motion/Reveal";

type MetricsProps = {
  metrics: Metric[];
  /** Draws the 2px rules above and below the strip. */
  bordered?: boolean;
};

function MetricFigure({ value, highlight }: { value: MetricValue; highlight?: boolean }) {
  const className = `${ds.metricValue} ${highlight ? ds.metricValueAccent : ""}`;

  switch (value.kind) {
    case "count":
      return (
        <CountUp
          className={className}
          value={value.value}
          prefix={value.prefix}
          suffix={value.suffix}
        />
      );
    case "range":
      return (
        <div className={className}>
          {value.from}
          <span className={ds.metricArrow}>→</span>
          {value.to}
        </div>
      );
    case "text":
    default:
      return <div className={className}>{value.text}</div>;
  }
}

export default function Metrics({ metrics, bordered = false }: MetricsProps) {
  return (
    <div
      className={ds.metrics}
      style={
        bordered
          ? { borderTop: "2px solid var(--rule)", borderBottom: "2px solid var(--rule)" }
          : undefined
      }
    >
      {metrics.map((metric, index) => (
        <Reveal
          key={metric.label.join(" ")}
          delayIndex={index}
          className={ds.metric}
        >
          <MetricFigure value={metric.value} highlight={metric.highlight} />
          <div className={ds.metricLabel}>
            {metric.label.map((line, lineIndex) => (
              <Fragment key={line}>
                {lineIndex > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
