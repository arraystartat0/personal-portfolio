import { sources, type SourceKey } from "../data/sources";
import styles from "./Citations.module.css";
import Disclosure from "./Disclosure";

export interface Cited {
  cites?: readonly SourceKey[];
}

/**
 * Numbered by first appearance rather than by the order they sit in sources.ts,
 * so reordering or cutting an item renumbers the references instead of leaving
 * a marker pointing at the wrong paper.
 */
export function collectCites(items: readonly Cited[]): SourceKey[] {
  const cited: SourceKey[] = [];
  for (const item of items) {
    for (const key of item.cites ?? []) {
      if (!cited.includes(key)) cited.push(key);
    }
  }
  return cited;
}

interface CiteMarksProps {
  /** Namespaces the anchors, so two blocks can cite the same paper. */
  id: string;
  cites?: readonly SourceKey[];
  order: readonly SourceKey[];
}

export function CiteMarks({ id, cites, order }: CiteMarksProps) {
  if (!cites?.length) return null;

  return (
    <>
      {cites.map((key) => (
        <a key={key} className={styles.cite} href={`#${id}-${key}`}>
          {order.indexOf(key) + 1}
        </a>
      ))}
    </>
  );
}

interface SourceListProps {
  id: string;
  order: readonly SourceKey[];
  label?: string;
  /** The chevron's promise. Copy, so it lives with the rest of the study's. */
  hint: string;
}

/**
 * Folded by default. A reference list is there to be checked, not read through,
 * and eight of them at the foot of a study is a wall a reader has to scroll past
 * to reach the next one.
 *
 * It stays reachable because <details> is: a browser opens one when a fragment
 * link targets something inside it, so the superscript markers still land on
 * their entry. That is the whole reason this is a <details> and not a widget.
 */
export function SourceList({ id, order, label, hint }: SourceListProps) {
  if (!order.length) return null;

  return (
    <div className={styles.sources}>
      <Disclosure summary={`${label} · ${order.length}`} hint={hint}>
        <ol className={styles.sourceList}>
          {order.map((key) => {
            const source = sources[key];
            return (
              <li key={key} id={`${id}-${key}`} className={styles.source}>
                {/*
                  One element, not loose text beside spans. The row is a flex
                  container, so every bare text node here would become its own
                  flex item and sit on a line that cannot wrap.
                */}
                <span className={styles.sourceText}>
                  {source.authors} ({source.year}). {source.title}.{" "}
                  <span className={styles.publication}>{source.publication}</span>.{" "}
                  <a
                    className={styles.sourceLink}
                    href={source.url}
                    target="_blank"
                    rel="noopener"
                  >
                    {source.linkLabel} ↗
                  </a>
                </span>
              </li>
            );
          })}
        </ol>
      </Disclosure>
    </div>
  );
}
