import Image from "next/image";

import heroPhoto from "@/public/work/blitz-hero.jpg";
import { afterSite } from "../../data/blitzSite";
import styles from "./AfterSite.module.css";
import SiteMenu from "./SiteMenu";

export default function AfterSite() {
  return (
    <div className={styles.site}>
      <div className={styles.topbar}>
        <span>{afterSite.topbar.address}</span>
        <span>{afterSite.topbar.phone}</span>
        <span>{afterSite.topbar.email}</span>
        <span className={styles.hours}>{afterSite.topbar.hours}</span>
      </div>

      {/* The shipped header sits on white, over the dark hero. */}
      <div className={styles.header}>
        <div className={styles.logo}>[ LOGO ]</div>
        <div className={styles.nav}>
          {afterSite.nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className={styles.headerActions}>
          <span className={styles.contact}>{afterSite.contact}</span>
          <span className={styles.cta}>{afterSite.cta}</span>
        </div>

        {/*
          On a phone the links go behind a toggler and the quote button does not,
          which is the shipped site's own priority: the header exists to keep
          that one action in reach.
        */}
        <SiteMenu id="bp-site-menu" />
      </div>

      {/* Same three layers the shipped hero stacks: photo, wash, then the glow. */}
      <div className={styles.hero}>
        {/*
          fill, so it keeps covering the hero the way the background did. The
          sizes hint is the frame's own width: this sits inside ds.frame, which
          is the page minus two gutters, so it never needs a source wider than
          the viewport and usually needs a good deal less.
        */}
        <Image
          src={heroPhoto}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1400px) 1300px, 100vw"
          className={styles.heroPhoto}
        />
        <div className={styles.heroWash} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.heroBody}>
          <div className={styles.eyebrow}>{afterSite.eyebrow}</div>

          <div className={styles.headline}>
            {afterSite.headline.lead}
            <span className={styles.headlineAccent}>{afterSite.headline.accent}</span>
            {afterSite.headline.tail}
          </div>

          <div className={styles.tagline}>
            <span className={styles.taglineRule} aria-hidden="true" />
            {afterSite.tagline}
          </div>

          <div className={styles.lead}>{afterSite.lead}</div>

          <div className={styles.ctaRow}>
            <span className={`${styles.cta} ${styles.ctaHero}`}>{afterSite.cta}</span>
            <span className={styles.ctaGhost}>{afterSite.secondaryCta}</span>
          </div>

          <div className={styles.features}>
            {afterSite.features.map((feature) => (
              <div key={feature.title} className={styles.feature}>
                <span className={styles.featureMark} aria-hidden="true" />
                <div>
                  <div className={styles.featureTitle}>{feature.title}</div>
                  <div className={styles.featureBody}>{feature.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.whatsapp} aria-hidden="true">
        ✆
      </div>
    </div>
  );
}
