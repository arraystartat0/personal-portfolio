import { glossary, type GlossaryKey } from "../data/glossary";
import Term from "./Term";

/** Splits on [[key]] while keeping the key, so parts alternate text, key, text. */
const MARKER = /\[\[([a-z0-9-]+)\]\]/g;

/*
 * Callers pass whatever names their block, including labels with spaces and
 * middots. An id may not contain whitespace, so it is sanitised here rather than
 * at each call site: one place to get it right, and no way to pass a scope that
 * silently produces an id aria-describedby cannot resolve.
 */
const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

interface GlossaryTextProps {
  children: string;
  /**
   * Namespaces this string's tooltip ids. Required, not optional with a default:
   * the same term legitimately appears in more than one case study, and a missing
   * scope would collide silently. A compile error is the better failure.
   */
  scope: string;
}

/**
 * Renders copy carrying [[key]] markers, swapping each for its glossary entry.
 *
 * The point is that the data files keep holding plain strings. Marking a term is
 * one word inside the sentence rather than a structural split the copy has to be
 * broken around, so a second term in the same sentence costs nothing. An unknown
 * key renders as written instead of throwing, since a typo in copy should read
 * oddly, not take the page down.
 */
export default function GlossaryText({ children, scope }: GlossaryTextProps) {
  return (
    <>
      {children.split(MARKER).map((part, index) => {
        if (index % 2 === 0) return part;

        const entry = glossary[part as GlossaryKey];
        /* The split index disambiguates the same term twice in one string. */
        return entry ? (
          <Term
            key={`${part}-${index}`}
            id={`term-${slug(scope)}-${part}-${index}`}
            {...entry}
          />
        ) : (
          `[[${part}]]`
        );
      })}
    </>
  );
}
