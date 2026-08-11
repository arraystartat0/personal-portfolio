import type { CSSProperties } from "react";
import Link from "next/link";
import MotionToggle from "./MotionToggle";
import { getSite, otherSites } from "../lib/sites";
import styles from "../styles/construction.module.css";

type UnderConstructionProps = {
  slug: string;
};

/** The placeholder both unbuilt sites use until they get an identity of their own. */
export default function UnderConstruction({ slug }: UnderConstructionProps) {
  const site = getSite(slug);
  const live = otherSites(slug).filter((other) => other.status === "live");
  const pending = otherSites(slug).filter((other) => other.status !== "live");

  return (
    <main className={styles.root} style={{ "--accent": site.accentRgb } as CSSProperties}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.mesh} aria-hidden="true" />

      <div className={styles.topbar}>
        <Link href="/" className={styles.back}>
          ← Other portfolios
        </Link>
        {/* These pages have no footer, so the topbar is where a control can go. */}
        <MotionToggle className={styles.motion} />
      </div>

      <div className={styles.body}>
        <div className={styles.inner}>
          <div className={styles.kicker}>
            <span className={styles.dot} aria-hidden="true" />
            Under construction
          </div>

          <h1 className={styles.discipline}>{site.discipline}</h1>
          <p className={styles.headline}>{site.headline}</p>
          <p className={styles.blurb}>{site.blurb}</p>
          <p className={styles.blurb}>
            This one is still being built. The design portfolio is finished, if you want
            something to read in the meantime.
          </p>

          <div className={styles.progress}>
            <div className={styles.progressLabel}>In progress</div>
            <div className={styles.track} aria-hidden="true" />
          </div>

          <div className={styles.actions}>
            {live.map((other) => (
              <Link
                key={other.slug}
                href={other.href}
                className={`${styles.action} ${styles.actionPrimary}`}
              >
                {other.discipline} portfolio →
              </Link>
            ))}
            {pending.map((other) => (
              <Link key={other.slug} href={other.href} className={styles.action}>
                {other.discipline} (also in progress) →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
