import { Fragment } from "react";
import { marqueeItems } from "../data/site";
import styles from "./Marquee.module.css";

/** The list runs twice so the track can loop on a -50% translation. */
const sequence = [...marqueeItems, ...marqueeItems];

export default function Marquee() {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {sequence.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            <span>{item}</span>
            <span className={styles.separator}>·</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
