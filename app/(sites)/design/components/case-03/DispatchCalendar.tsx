"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { DispatchDay } from "../../data/salesSystem";
import { dispatchCalendar } from "../../data/salesSystem";
import Icon from "./AppIcons";
import styles from "./DispatchCalendar.module.css";

const { days, labels, weekdays, monthNames } = dispatchCalendar;

/*
 * UTC arithmetic throughout, for the reason the institute calendar gives: a
 * local-time Date built from a YYYY-MM-DD string lands a day early west of
 * Greenwich, which would put the whole grid one column out.
 *
 * Monday first here, not Sunday. This is a working week being planned, and the
 * two days dispatch does not run belong together at the end of the row rather
 * than split across both ends of it.
 */

function isoFor(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function daysIn(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** 0 = Monday, 6 = Sunday. */
function weekdayOf(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return (new Date(Date.UTC(year, month - 1, day)).getUTCDay() + 6) % 7;
}

interface Cell {
  iso: string;
  day: number;
}

function monthGrid(monthIso: string): (Cell | null)[][] {
  const [year, month] = monthIso.split("-").map(Number);
  const cells: (Cell | null)[] = [];

  for (let i = 0; i < weekdayOf(`${monthIso}-01`); i += 1) cells.push(null);
  for (let day = 1; day <= daysIn(year, month); day += 1) {
    cells.push({ iso: isoFor(year, month, day), day });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Cell | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function longDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${weekdays[weekdayOf(iso)].full} ${day} ${monthNames[month - 1]} ${year}`;
}

function shortDate(iso: string) {
  const [, month, day] = iso.split("-").map(Number);
  return `${day} ${monthNames[month - 1]}`;
}

/*
 * Every count on this component is read off the order list rather than stored
 * beside it. The two used to be separate fields and they drifted: a cell read
 * "9" while its panel listed a single delivery, and a Monday claimed it had
 * absorbed four deliveries from a Sunday that never had any scheduled.
 */
const loadOf = (day: DispatchDay | undefined) => day?.orders?.length ?? 0;

const absorbedCount = (day: DispatchDay | undefined) =>
  day?.orders?.filter((order) => order.movedFrom).length ?? 0;

/** Beyond this the panel counts the rest instead of listing them. */
const ORDERS_SHOWN = 6;

type Tone = "closed" | "heavy" | "open";

/*
 * Derived from what is true about the day rather than from how big its number
 * is. A Friday carrying Thursday's fourteen deliveries and an ordinary busy
 * Tuesday can hold the same count and mean entirely different things to the
 * person planning the week.
 */
function toneOf(day: DispatchDay | undefined): Tone {
  if (!day) return "open";
  if (day.closed) return "closed";
  if (day.absorbedFrom) return "heavy";
  return "open";
}

const TONE_CLASS: Record<Tone, string> = {
  closed: styles.dayClosed,
  heavy: styles.dayHeavy,
  open: "",
};

const TONE_SWATCH: Record<Tone, string> = {
  closed: styles.swatchClosed,
  heavy: styles.swatchHeavy,
  open: styles.swatchOpen,
};

/**
 * The one thing on this page you can actually operate, in the way the institute
 * study's events calendar is. Everything else in case 03 is a render of a
 * screen; this is the component, at working size, because the claim it makes
 * (that a closed day re-plans itself and shows you what moved) is a claim about
 * behaviour, and behaviour cannot be screenshotted.
 *
 * Accessibility is load-bearing rather than a bonus. Condition is carried by a
 * word and a glyph as well as a fill, the grid takes arrow keys off a roving
 * tabindex, the day button names itself in full where the cell can only
 * abbreviate, and the panel's summary is announced through a live region so a
 * screen reader user learns what selecting a day did.
 */
export default function DispatchCalendar() {
  const [selectedIso, setSelectedIso] = useState(dispatchCalendar.initialDay);
  const [focusIso, setFocusIso] = useState(dispatchCalendar.initialDay);
  const dayRefs = useRef(new Map<string, HTMLButtonElement>());

  const byIso = useMemo(() => {
    const map = new Map<string, DispatchDay>();
    for (const day of days) map.set(day.iso, day);
    return map;
  }, []);

  const weeks = useMemo(() => monthGrid(dispatchCalendar.monthIso), []);

  const selected = byIso.get(selectedIso);

  const selectDay = (iso: string) => {
    setSelectedIso(iso);
    setFocusIso(iso);
  };

  /*
   * Focus follows state, in an effect, rather than being moved from inside the
   * key handler, which aimed at the ref map as it stood a commit earlier. Same
   * mechanism, and for the same reason, as the institute's events calendar.
   */
  const pendingFocus = useRef(false);

  useEffect(() => {
    if (!pendingFocus.current) return;
    pendingFocus.current = false;
    dayRefs.current.get(focusIso)?.focus();
  }, [focusIso]);

  /* Arrows walk the month and take the selection with them, so the panel below
     always describes the day the grid shows as chosen. A keypress that moved
     only a focus ring read, correctly, as a keypress that did nothing. */
  const onDayKeyDown = (event: KeyboardEvent<HTMLButtonElement>, iso: string) => {
    const step: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };

    const [year, month, day] = iso.split("-").map(Number);
    const lastDay = daysIn(year, month);

    let target: number | null = null;
    if (event.key in step) target = day + step[event.key];
    else if (event.key === "Home") target = 1;
    else if (event.key === "End") target = lastDay;

    /* Stops at the month edge rather than wrapping into a month not on screen. */
    if (target === null || target < 1 || target > lastDay) return;

    event.preventDefault();
    pendingFocus.current = true;
    selectDay(isoFor(year, month, target));
  };

  /* One sentence, shown and announced, so both readers learn the same thing. */
  const selectedLoad = loadOf(selected);
  const selectedAbsorbed = absorbedCount(selected);

  const summary = (() => {
    const date = longDate(selectedIso);
    if (!selected) return `${date}: ${labels.none}`;
    if (selected.closed) {
      const holiday = selected.holiday ? ` for ${selected.holiday.name}` : "";
      const moved =
        selected.movedTo && selectedLoad > 0
          ? ` ${selectedLoad} ${labels.load} moved to ${selected.movedTo}.`
          : "";
      return `${date}: ${labels.closed}${holiday}.${moved}`;
    }
    const noun = selectedLoad === 1 ? labels.loadOne : labels.load;
    const absorbed = selectedAbsorbed
      ? ` Carrying ${selectedAbsorbed} moved off ${selected.absorbedFrom}.`
      : "";
    return `${date}: ${labels.running}, ${selectedLoad} ${noun}.${absorbed}`;
  })();

  return (
    <div className={styles.calendar}>
      <div className={styles.head}>
        <div className={styles.title}>{dispatchCalendar.title}</div>
        <div className={styles.month}>{dispatchCalendar.monthName}</div>
      </div>

      <div className={styles.legend}>
        {dispatchCalendar.legend.map((item) => (
          <span key={item.label} className={styles.legendItem}>
            <span className={`${styles.swatch} ${TONE_SWATCH[item.tone]}`} aria-hidden="true" />
            {item.label}
          </span>
        ))}

        {/* Names the figure in every cell, which was previously unexplained. */}
        <span className={styles.legendItem}>
          <Icon name="dispatch" size={11} />
          {dispatchCalendar.countLegend}
        </span>
      </div>

      <div className={styles.body}>
        {/*
          A plain table, not role="grid". A month is a table of dates, which is
          what a screen reader should be told it is; the arrow keys go on top
          through a roving tabindex rather than by replacing semantics that
          already work.
        */}
        <table className={styles.grid}>
          <caption className={styles.caption}>{dispatchCalendar.monthName}</caption>
          <thead>
            <tr>
              {weekdays.map((weekday) => (
                <th key={weekday.full} scope="col" className={styles.weekday}>
                  <span aria-hidden="true">{weekday.short}</span>
                  <span className={styles.srOnly}>{weekday.full}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((cell, cellIndex) => {
                  if (!cell) return <td key={cellIndex} className={styles.empty} />;

                  const day = byIso.get(cell.iso);
                  const tone = toneOf(day);
                  const load = loadOf(day);
                  const isSelected = cell.iso === selectedIso;
                  const isToday = cell.iso === dispatchCalendar.today;

                  const name = day?.closed
                    ? `${shortDate(cell.iso)}, ${labels.closed}${
                        day.holiday ? `, ${day.holiday.name}` : ""
                      }`
                    : `${shortDate(cell.iso)}, ${load} ${
                        load === 1 ? labels.loadOne : labels.load
                      }`;

                  return (
                    <td key={cellIndex} className={styles.cell}>
                      <button
                        type="button"
                        ref={(node) => {
                          if (node) dayRefs.current.set(cell.iso, node);
                          else dayRefs.current.delete(cell.iso);
                        }}
                        className={`${styles.day} ${TONE_CLASS[tone]} ${
                          isSelected ? styles.daySelected : ""
                        } ${isToday ? styles.dayToday : ""}`}
                        tabIndex={cell.iso === focusIso ? 0 : -1}
                        aria-pressed={isSelected}
                        aria-current={isToday ? "date" : undefined}
                        aria-label={name}
                        onClick={() => selectDay(cell.iso)}
                        onKeyDown={(event) => onDayKeyDown(event, cell.iso)}
                      >
                        <span className={styles.dayNumber}>
                          {cell.day}
                          {/*
                            The word is wrapped so a phone can drop it and keep
                            the mark. Seven columns on a 350px frame leave about
                            42px a cell, and a pill spelling "today" beside a
                            numeral in that is a pill sitting on the next day.
                            The word is not lost: the button's aria-label says it.
                          */}
                          {isToday && (
                            <span className={styles.todayMark}>
                              <span className={styles.todayText}>{labels.todayLabel}</span>
                            </span>
                          )}
                        </span>

                        {/*
                          A closed day says the word as well as wearing the fill,
                          and an absorbing day carries an arrow. Colour is never
                          the only thing separating the three conditions.
                        */}
                        <span className={styles.dayState} aria-hidden="true">
                          {day?.closed ? (
                            <span className={styles.closedMark}>closed</span>
                          ) : (
                            /*
                              A weekend is left blank rather than printed as a
                              zero. Dispatch never runs then, so a nought there
                              is not information, it is twenty-two of them.
                            */
                            load > 0 && (
                              <>
                                <Icon name="dispatch" size={9} className={styles.loadGlyph} />
                                <span className={styles.load}>{load}</span>
                                {day?.absorbedFrom && (
                                  <span className={styles.absorbMark}>
                                    +{absorbedCount(day)}
                                  </span>
                                )}
                              </>
                            )
                          )}
                        </span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.panel}>
          <div className={styles.panelDate}>{longDate(selectedIso)}</div>

          <p className={styles.status} aria-live="polite">
            {summary}
          </p>

          {selected?.holiday && (
            <div className={styles.holiday}>
              <div className={styles.holidayName}>{selected.holiday.name}</div>
              <div className={styles.holidayGreeting}>{selected.holiday.greeting}</div>
              {/*
                A lunar date is confirmed by local sighting, so the system says
                "provisional" rather than asserting a day it might have to take
                back. Confident wrongness is how a tool loses the floor.
              */}
              <div className={styles.holidayObserved}>
                {selected.holiday.observed === "Provisional"
                  ? labels.provisional
                  : selected.holiday.observed}
              </div>
            </div>
          )}

          {selected?.movedTo && selectedLoad > 0 && (
            <div className={styles.moved}>
              {labels.movedTo} <strong>{selected.movedTo}</strong> · {selectedLoad}{" "}
              {labels.load}
            </div>
          )}

          {selected?.absorbedFrom && (
            <div className={styles.absorbed}>{labels.heavyNote}</div>
          )}

          {selected?.orders?.length ? (
            <>
              <ul className={styles.orders}>
                {selected.orders.slice(0, ORDERS_SHOWN).map((order) => (
                  <li key={order.id} className={styles.order}>
                    <span className={styles.orderId}>{order.id}</span>
                    <span className={styles.orderCustomer}>{order.customer}</span>
                    {order.movedFrom && (
                      <span className={styles.orderMoved}>{labels.movedFrom}</span>
                    )}
                  </li>
                ))}
              </ul>

              {/*
                Says so rather than quietly truncating, which is the old bug.
                Text rather than a button: on the real screen this opens the
                rest, and drawing a control here that does not is the one detail
                a reader is most likely to test.
              */}
              {selectedLoad > ORDERS_SHOWN && (
                <div className={styles.moreOrders}>
                  {labels.showMore} {selectedLoad - ORDERS_SHOWN} {labels.more}
                </div>
              )}
            </>
          ) : (
            !selected?.closed && <p className={styles.panelEmpty}>{labels.none}</p>
          )}
        </div>
      </div>

      <div className={styles.note}>{dispatchCalendar.note}</div>
    </div>
  );
}
