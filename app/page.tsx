import type { CSSProperties } from "react";
import Link from "next/link";
import MotionToggle from "./components/MotionToggle";
import { profile } from "./lib/profile";
import { sites } from "./lib/sites";
import styles from "./styles/hub.module.css";

/** Staggers the entrance animation without any client-side JS. */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Hub() {
  return (
    <main className={styles.root}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.mesh} aria-hidden="true" />

      <header className={styles.topbar}>
        <div className={styles.mark} aria-hidden="true">
          {profile.monogram}
        </div>
        <div className={styles.wordmark}>{profile.name}</div>
        <div className={styles.topbarMeta}>
          <span>{profile.location}</span>
          <span className={styles.available}>
            <span
              className={`${styles.dot} ${styles.dotLive}`}
              style={{ "--accent": "63 201 138" } as CSSProperties}
              aria-hidden="true"
            />
            {profile.availability}
          </span>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={`${styles.kicker} ${styles.enter}`} style={step(0)}>
          {profile.kicker}
        </div>

        <h1 className={`${styles.headline} ${styles.enter}`} style={step(1)}>
          {profile.headline.lead}{" "}
          <span className={styles.headlineTail}>{profile.headline.tail}</span>
        </h1>

        <p className={`${styles.intro} ${styles.enter}`} style={step(2)}>
          {profile.intro}
        </p>

        <div className={`${styles.cue} ${styles.enter}`} style={step(3)} aria-hidden="true">
          <span className={styles.cueRule} />
          Choose a portfolio
        </div>
      </section>

      <nav aria-label="Portfolios" className={styles.list}>
        {sites.map((site, i) => (
          <Link
            key={site.slug}
            href={site.href}
            className={`${styles.row} ${styles.enter}`}
            style={{ "--accent": site.accentRgb, "--i": i + 4 } as CSSProperties}
          >
            <div className={styles.index} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </div>

            <div>
              <div className={styles.discipline}>{site.discipline}</div>
              <div className={styles.status}>
                <span
                  className={`${styles.dot} ${site.status === "live" ? styles.dotLive : ""}`}
                  aria-hidden="true"
                />
                {site.statusLabel}
              </div>
            </div>

            <div>
              <div className={styles.rowHeadline}>{site.headline}</div>
              <p className={styles.blurb}>{site.blurb}</p>
              <div className={styles.tags} aria-hidden="true">
                {site.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.arrow} aria-hidden="true">
              →
            </div>
          </Link>
        ))}
      </nav>

      <footer className={styles.footer}>
        <div className={styles.channels}>
          {profile.channels.map((channel) => (
            <a
              key={channel.href}
              href={channel.href}
              className={styles.channel}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {channel.label}
            </a>
          ))}
          {/* In the channel row, because it is one more thing the page offers. */}
          <MotionToggle className={styles.motion} />
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </div>
      </footer>
    </main>
  );
}
