import { researchIa } from "../../data/caseStudies";
import InstituteChrome from "./InstituteChrome";
import styles from "./ScreenProblem.module.css";

const { problem } = researchIa;

/** Screen 02: one research problem, answering "who else is working on this?". */
export default function ScreenProblem() {
  return (
    <div className={styles.screen}>
      {/* Byte-identical chrome to screen 01: one component draws both. */}
      <InstituteChrome activeIndex={0} />

      <div className={styles.breadcrumbBar}>
        <div className={styles.breadcrumb}>
          {problem.breadcrumb.parent} <span className={styles.breadcrumbSlash}>/</span>{" "}
          <span className={styles.breadcrumbCurrent}>{problem.breadcrumb.current}</span>
        </div>
      </div>

      <div className={styles.columns}>
        <div className={styles.main}>
          <div className={styles.title}>{problem.title}</div>
          <div className={styles.body}>{problem.body}</div>

          <div className={styles.stats}>
            {problem.stats.map((stat) => (
              <div key={stat.label}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className={styles.tabs}>
            {problem.tabs.map((tab, index) => (
              <span key={tab} className={index === 0 ? styles.tabActive : undefined}>
                {tab}
              </span>
            ))}
          </div>

          <div className={styles.people}>
            {problem.people.map((department, index) => (
              <div key={`${department}-${index}`} className={styles.person}>
                <div className={styles.avatar} />
                <div className={styles.personText}>
                  <div className={styles.personName}>[ Name ]</div>
                  <div className={styles.personDept}>{department}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.aside}>
          <div className={styles.asideLabel}>{problem.aside.why.label}</div>
          <div className={styles.asideBody}>{problem.aside.why.body}</div>

          <div className={styles.asideBlock}>
            <div className={styles.asideLabel}>{problem.aside.departments.label}</div>
            <div className={styles.asideList}>
              {problem.aside.departments.items.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>

          <div className={styles.asideBlock}>
            <div className={styles.asideLabel}>{problem.aside.shortcuts.label}</div>
            <div className={styles.shortcuts}>
              {problem.aside.shortcuts.items.map((item) => (
                <div key={item} className={styles.shortcut}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
