"use client";

import { createElement, type CSSProperties, type ElementType, type ReactNode } from "react";
import ds from "../../styles/design.module.css";
import { useReveal } from "./useReveal";

const STAGGER_MS = 70;
const STAGGER_CYCLE = 4;

type RevealProps = {
  children?: ReactNode;
  /** Element to render. Defaults to a div. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
  /** Position within a group of siblings; drives the staggered delay. */
  delayIndex?: number;
  /** "rise" fades and lifts, "rule" wipes a divider in from the left. */
  variant?: "rise" | "rule";
};

export default function Reveal({
  children,
  as = "div",
  className,
  style,
  id,
  delayIndex = 0,
  variant = "rise",
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLElement>();

  const classes = [
    variant === "rule" ? ds.revealRule : ds.reveal,
    revealed ? ds.revealIn : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(
    as,
    {
      ref,
      id,
      className: classes,
      style: {
        ...style,
        "--reveal-delay": `${(delayIndex % STAGGER_CYCLE) * STAGGER_MS}ms`,
      } as CSSProperties,
    },
    children,
  );
}
