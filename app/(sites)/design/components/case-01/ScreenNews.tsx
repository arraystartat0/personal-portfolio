import { newsAndEvents } from "../../data/newsAndEvents";
import InstituteChrome from "./InstituteChrome";
import styles from "./ScreenNews.module.css";

const { feed, editor } = newsAndEvents;

/**
 * Screen 03: the news and events feed, at page scale with the same chrome the
 * other two proposed screens carry, so it reads as one more page of the same
 * site rather than a component pulled out of nowhere.
 */
export default function ScreenNews() {
  return (
    <div className={styles.screen}>
      {/* News is the fourth nav item, so the chrome marks it current. */}
      <InstituteChrome activeIndex={3} />

      <div className={styles.breadcrumbBar}>
        <div className={styles.breadcrumb}>{feed.breadcrumb}</div>
      </div>

      <div className={styles.content}>
        <div className={styles.kicker}>{feed.kicker}</div>
        <div className={styles.headline}>{feed.headline}</div>
        <div className={styles.body}>{feed.body}</div>

        {/*
          The feed filters by problem, not by month or by department. Its own
          axis is already recency, so the only second axis worth offering is the
          one the whole site is organised on.
        */}
        <div className={styles.filters}>
          <span className={styles.filtersLabel}>{feed.filterLabel}</span>
          {feed.filters.map((filter) => (
            <span
              key={filter.name}
              className={filter.active ? styles.filterActive : styles.filter}
            >
              {filter.name}
              <span className={styles.filterCount}>{filter.count}</span>
            </span>
          ))}
        </div>

        <div className={styles.columns}>
          <div className={styles.main}>
            {/*
              The lead's art field is the tag, set large. A stock photograph of a
              laboratory would say nothing about this piece; the problem it is
              filed under says what it is about, and demonstrates the mechanism
              the whole rework rests on in the same gesture.
            */}
            <div className={styles.lead}>
              <div className={styles.leadArt}>
                <span className={styles.leadArtLabel}>{feed.artLabel}</span>
                <span className={styles.leadArtProblem}>{feed.lead.problem}</span>
              </div>

              <div className={styles.leadText}>
                <div className={styles.leadMeta}>
                  <span className={styles.kind}>{feed.lead.kind}</span>
                  <span className={styles.date}>{feed.lead.date}</span>
                </div>
                <div className={styles.leadTitle}>{feed.lead.title}</div>
                <div className={styles.leadDek}>{feed.lead.dek}</div>
              </div>
            </div>

            <div className={styles.rows}>
              {feed.rows.map((row) => (
                <div key={row.title} className={styles.row}>
                  <span className={styles.kind}>{row.kind}</span>
                  <span className={styles.rowTitle}>{row.title}</span>
                  <span className={styles.rowProblem}>{row.problem}</span>
                  <span className={styles.date}>{row.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* The bridge to screen 05: the same items, read as dates. */}
          <div className={styles.rail}>
            <div className={styles.railLabel}>{feed.rail.label}</div>
            {feed.rail.items.map((item) => (
              <div key={item.title} className={styles.railItem}>
                <span className={styles.railGlyph} aria-hidden="true">
                  {item.glyph}
                </span>
                <span>
                  <span className={styles.railDate}>{item.date}</span>
                  <span className={styles.railTitle}>{item.title}</span>
                </span>
              </div>
            ))}
            <div className={styles.railLink}>{feed.rail.link}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Screen 04: the compose form, because "easy to update" is a question about how
 * many fields there are and how much one of them does, not about admin styling.
 */
export function EditorView() {
  return (
    <div className={styles.editor}>
      <div className={styles.editorForm}>
        <div className={styles.editorTitle}>{editor.title}</div>

        {editor.fields.map((field) => (
          <div key={field.label} className={styles.field}>
            <span className={styles.fieldLabel}>{field.label}</span>
            <span
              className={field.required ? styles.fieldInputRequired : styles.fieldInput}
            >
              {field.value}
            </span>
            {field.hint ? <span className={styles.fieldHint}>{field.hint}</span> : null}
          </div>
        ))}

        <div className={styles.editorButton}>{editor.button}</div>
      </div>

      {/*
        The payoff, and the reason the required field is worth arguing for: one
        submission, three surfaces, no second act of upkeep on any of them.
      */}
      <div className={styles.publishes}>
        <div className={styles.publishesLabel}>{editor.publishLabel}</div>
        <div className={styles.publishesList}>
          {editor.publishesTo.map((destination) => (
            <div key={destination} className={styles.destination}>
              <span className={styles.destinationMark} aria-hidden="true">
                →
              </span>
              {destination}
            </div>
          ))}
        </div>
        <div className={styles.publishesNote}>{editor.note}</div>
      </div>
    </div>
  );
}
