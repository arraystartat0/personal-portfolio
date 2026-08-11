import { sideProjects, sideProjectsIntro } from "../data/sideProjects";
import ds from "../styles/design.module.css";
import Reveal from "./motion/Reveal";
import styles from "./SideProjects.module.css";

export default function SideProjects() {
  return (
    <section id="side" className={ds.section}>
      <div className={styles.head}>
        <h2 className={styles.heading}>{sideProjectsIntro.heading}</h2>
        <div className={styles.intro}>{sideProjectsIntro.body}</div>
      </div>

      {/*
        Every card draws its own right-hand rule and the band clips a pixel off
        the grid, so whichever card lands in the last column loses its divider.
        This replaced a hardcoded set of cell indices that assumed four columns
        and five cards; it was wrong the moment either number changed, and both
        just did.
      */}
      <div className={styles.gridBand}>
        <div className={styles.grid}>
          {sideProjects.map((project, index) => (
            <Reveal key={project.title} delayIndex={index} className={styles.card}>
              <div className={styles.kicker}>{project.kicker}</div>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.body}>{project.body}</p>
              {project.more && (
                <a className={styles.more} href={project.more.href}>
                  {project.more.text} →
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
