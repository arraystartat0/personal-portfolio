"use client";

import { useEffect, useRef } from "react";
/*
 * Type-only, so it is erased at compile time and pulls nothing into the bundle.
 * The library itself is imported inside the effect below. See useChart.
 */
import type { Chart as ChartType, ChartConfiguration } from "chart.js";
import { isMotionReduced } from "../../../../lib/motion";
import { shipped } from "../../data/salesSystem";
import { useReveal } from "../motion/useReveal";
import Icon from "./AppIcons";
import styles from "./ShippedSystem.module.css";

/**
 * The dashboard's charts, drawn by Chart.js rather than by my hand.
 *
 * The three of them were inline SVG at first, reconstructed from the app's
 * config: cardinal splines for `tension: 0.4`, hand-placed gridlines, a legend
 * built out of spans. It was close and it was not right, which on a page whose
 * whole argument is "this is what I shipped" is the wrong kind of close. These
 * now run the same library the product runs, with the options copied out of its
 * `analytics.js`, so the curve, the fill, the black grid, the axis titles and
 * the legend marks are the library's rather than my impression of them.
 *
 * The one deliberate departure is type size. The live charts sit in 300px-tall
 * cards at full width; these sit in a page-scale render where everything else
 * is 9 to 11px, so the fonts are scaled to match their surroundings. Leaving
 * Chart.js at its 12px defaults would make the charts the loudest thing in a
 * mockup they are only one part of.
 */

/**
 * Chart.js is the single largest thing this site ships, and it exists to draw
 * three canvases most of the way down the third case study. Registering it at
 * module scope put all of it on the critical path of every visit, including the
 * ones that never scroll that far.
 *
 * So it is imported when a chart is about to be looked at, and registered once
 * across all three. The controllers are still hand-picked rather than taken from
 * `chart.js/auto`, which would pull in every controller the library has.
 */
let registering: Promise<typeof import("chart.js")> | null = null;

function loadChartJs() {
  registering ??= import("chart.js").then((chartjs) => {
    chartjs.Chart.register(
      chartjs.BarController,
      chartjs.BarElement,
      chartjs.CategoryScale,
      chartjs.Filler,
      chartjs.Legend,
      chartjs.LinearScale,
      chartjs.LineController,
      chartjs.LineElement,
      chartjs.PointElement,
      chartjs.Title,
      chartjs.Tooltip,
    );
    return chartjs;
  });

  return registering;
}

/*
 * The app passes `fill: true` on its bar datasets too. Chart.js ignores it for
 * bars and its types reject it outright, so it is dropped here: carrying a
 * no-op option across purely to match the source would not change a pixel.
 */

/* Scaled down together, so the three charts stay consistent with each other. */
const TICK = { size: 8 } as const;
const TITLE_FONT = { size: 9 } as const;
const LEGEND_FONT = { size: 9 } as const;

/** The scale block every one of these charts shares, straight from analytics.js. */
function axis(text: string) {
  return {
    ticks: { color: "black", font: TICK },
    title: { display: true, text, color: "black", font: TITLE_FONT },
    grid: { color: "black" },
  };
}

function plugins() {
  return {
    legend: { display: true, labels: { color: "black", font: LEGEND_FONT } },
    tooltip: {
      backgroundColor: "#D0D0D0",
      titleColor: "black",
      bodyColor: "black",
      titleFont: TICK,
      bodyFont: TICK,
    },
  };
}

const ordersConfig: ChartConfiguration<"line"> = {
  type: "line",
  data: {
    labels: [...shipped.chart.months],
    datasets: shipped.chart.series.map((series) => ({
      label: series.label,
      data: [...series.values],
      backgroundColor: series.fill,
      borderColor: series.stroke,
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 6,
    })),
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: axis(shipped.chart.xTitle),
      y: { ...axis(shipped.chart.yTitle), beginAtZero: true },
    },
    plugins: plugins(),
  },
};

const revenueConfig: ChartConfiguration<"bar"> = {
  type: "bar",
  data: {
    labels: [...shipped.revenue.months],
    datasets: [
      {
        label: shipped.revenue.legend,
        data: [...shipped.revenue.values],
        backgroundColor: shipped.revenue.fill,
        borderColor: shipped.revenue.stroke,
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: axis(shipped.revenue.xTitle),
      y: { ...axis(shipped.revenue.yTitle), beginAtZero: true },
    },
    plugins: plugins(),
  },
};

const perCustomerConfig: ChartConfiguration<"bar"> = {
  type: "bar",
  data: {
    labels: [...shipped.perCustomer.months],
    datasets: [
      {
        label: shipped.perCustomer.legend,
        data: [...shipped.perCustomer.values],
        backgroundColor: shipped.perCustomer.fill,
        borderColor: shipped.perCustomer.stroke,
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: axis(shipped.perCustomer.xTitle),
      y: { ...axis(shipped.perCustomer.yTitle), beginAtZero: true },
    },
    plugins: plugins(),
  },
};

/**
 * Configs are module constants so their identity is stable; a config rebuilt on
 * every render would tear the chart down and construct a new one each pass.
 */
function useChart(
  config: ChartConfiguration<"line"> | ChartConfiguration<"bar">,
  /** Held false until the card is near the viewport, so the library waits too. */
  active: boolean,
) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!active || !canvas) return;

    let chart: ChartType | undefined;
    let cancelled = false;

    void loadChartJs().then((chartjs) => {
      /* Scrolled past and unmounted while the library was still arriving. */
      if (cancelled) return;

      /*
       * globals.css shortens CSS animation to 0.001ms under reduced motion,
       * which a canvas drawing itself over 1000ms never sees. Chart.js has to be
       * told separately or the one thing on the page that still moves is this.
       * Asked through the shared predicate, so the page's own control stops it
       * as surely as the system setting does.
       */
      const reduced = isMotionReduced();

      /* The app's type is Poppins; the canvas needs the resolved family name. */
      chartjs.Chart.defaults.font.family = getComputedStyle(canvas).fontFamily;

      chart = new chartjs.Chart(canvas, {
        ...config,
        options: { ...config.options, animation: reduced ? false : config.options?.animation },
      } as ChartConfiguration);
    });

    return () => {
      cancelled = true;
      chart?.destroy();
    };
  }, [config, active]);

  return ref;
}

/**
 * A canvas is empty in the prerendered HTML and empty to a screen reader, so
 * each chart names itself and states its own numbers. The summary is real
 * content in the static page rather than a courtesy: without it this card is a
 * blank rectangle to anyone whose browser has not run the script yet.
 */
function ChartCanvas({
  config,
  label,
  summary,
}: {
  config: ChartConfiguration<"line"> | ChartConfiguration<"bar">;
  label: string;
  summary: string;
}) {
  /*
   * The shared observer the whole site reveals on, reused rather than given a
   * second one of its own. It fires when the card is near the viewport, which is
   * exactly when the library is worth fetching.
   */
  const { ref: boxRef, revealed } = useReveal<HTMLDivElement>();
  const ref = useChart(config, revealed);

  return (
    <div className={styles.chartBox} ref={boxRef}>
      <canvas ref={ref} role="img" aria-label={`${label}. ${summary}`}>
        {summary}
      </canvas>
    </div>
  );
}

const seriesSummary = (series: readonly { label: string; values: readonly number[] }[]) =>
  series.map((one) => `${one.label}: ${one.values.join(", ")}`).join(". ");

export function OrdersChart() {
  const { chart } = shipped;

  return (
    <div className={`${styles.card} ${styles.chartCard}`}>
      <div className={styles.cardTitle}>{chart.title}</div>
      <ChartCanvas
        config={ordersConfig}
        label={`${chart.title}, ${chart.months[0]} to ${chart.months[chart.months.length - 1]}`}
        summary={seriesSummary(chart.series)}
      />
    </div>
  );
}

export function RevenueChart() {
  const { revenue } = shipped;

  return (
    <div className={`${styles.card} ${styles.chartCard}`}>
      <div className={styles.cardTitle}>{revenue.title}</div>
      <ChartCanvas
        config={revenueConfig}
        label={revenue.title}
        summary={`${revenue.legend}: ${revenue.values.join(", ")}`}
      />
    </div>
  );
}

export function PerCustomerChart() {
  const { perCustomer } = shipped;

  return (
    <div className={`${styles.card} ${styles.chartCard}`}>
      <div className={styles.cardHead}>
        <div className={styles.cardTitle}>{perCustomer.title}</div>
        <span className={styles.select}>
          {perCustomer.select}
          <Icon name="chevronDown" size={9} />
        </span>
      </div>
      <ChartCanvas
        config={perCustomerConfig}
        label={`${perCustomer.title}, ${perCustomer.select}`}
        summary={`${perCustomer.legend}: ${perCustomer.values.join(", ")}`}
      />
    </div>
  );
}
