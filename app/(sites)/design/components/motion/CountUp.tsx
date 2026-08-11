"use client";

import { useEffect, useState } from "react";
import { isMotionReduced } from "../../../../lib/motion";
import { useReveal } from "./useReveal";

const DURATION_MS = 1100;

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Counts from zero to `value` on a cubic ease-out the first time it is seen. */
export default function CountUp({ value, prefix = "", suffix = "", className }: CountUpProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!revealed) return;

    let frame = 0;

    /* The page's own control counts here too, not just the system setting. */
    if (isMotionReduced()) {
      frame = requestAnimationFrame(() => setCurrent(value));
      return () => cancelAnimationFrame(frame);
    }

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [revealed, value]);

  return (
    <div ref={ref} className={className}>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </div>
  );
}
