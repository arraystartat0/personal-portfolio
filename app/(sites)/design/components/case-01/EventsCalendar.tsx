"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { EventTypeId, InstituteEvent } from "../../data/newsAndEvents";
import { newsAndEvents } from "../../data/newsAndEvents";
import styles from "./EventsCalendar.module.css";

const { calendar, eventTypes, events } = newsAndEvents;

const TYPES = Object.fromEntries(eventTypes.map((type) => [type.id, type])) as Record<
  EventTypeId,
  (typeof eventTypes)[number]
>;

/** Two chips fit a day cell at the narrowest column; the rest become a count. */
const CHIPS_PER_DAY = 2;

interface Cell {
  iso: string;
  day: number;
}

/*
 * Everything below is UTC arithmetic on purpose. A local-time Date built from a
 * YYYY-MM-DD string lands on the previous day west of Greenwich, which would put
 * the whole grid one column out for exactly the readers this is aimed at.
 */

function isoFor(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function daysIn(year: number, month: number) {
  /* Day 0 of the next month is the last day of this one. */
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function weekdayOf(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

/** Weeks of seven, Sunday first, padded with nulls so every row is full. */
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

function monthLabel(monthIso: string) {
  const [year, month] = monthIso.split("-").map(Number);
  return `${calendar.monthNames[month - 1]} ${year}`;
}

/** "Thursday 12 March 2026", spelled out because it is the panel's heading. */
function longDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${calendar.weekdays[weekdayOf(iso)].full} ${day} ${calendar.monthNames[month - 1]} ${year}`;
}

/** "12 March", for the accessible name of a day button. */
function shortDate(iso: string) {
  const [, month, day] = iso.split("-").map(Number);
  return `${day} ${calendar.monthNames[month - 1]}`;
}

/**
 * Screen 05, and the only live thing in the case study. Everything else on this
 * page is a render; this one is the component itself, at working size rather
 * than page scale, because a control you can operate makes an argument a picture
 * of it cannot. That is also why the type is larger here than in the screens
 * above: these are real hit targets, and a real hit target has a real size.
 *
 * The accessibility work is the point rather than a bonus. Type is carried by a
 * glyph and a word so nothing depends on colour, the filter reports its result
 * in a live region, the grid takes arrow keys off a roving tabindex, and every
 * toggle states its own condition through aria-pressed.
 */
export default function EventsCalendar() {
  const [monthIndex, setMonthIndex] = useState(calendar.initialMonthIndex);
  const [activeTypes, setActiveTypes] = useState<EventTypeId[]>([]);
  const [selectedIso, setSelectedIso] = useState(calendar.initialDay);
  const [focusIso, setFocusIso] = useState(calendar.initialDay);
  const [registered, setRegistered] = useState<string[]>([calendar.initialRegistration]);

  /* Focused imperatively on arrow keys, so the grid needs a handle on each day. */
  const dayRefs = useRef(new Map<string, HTMLButtonElement>());

  const monthIso = calendar.months[monthIndex];

  const byDay = useMemo(() => {
    const map = new Map<string, InstituteEvent[]>();
    for (const event of events) {
      const day = map.get(event.date);
      if (day) day.push(event);
      else map.set(event.date, [event]);
    }
    return map;
  }, []);

  const weeks = useMemo(() => monthGrid(monthIso), [monthIso]);

  const matchesFilter = (event: InstituteEvent) =>
    activeTypes.length === 0 || activeTypes.includes(event.type);

  const dayEvents = (iso: string) => byDay.get(iso) ?? [];
  const shownOn = (iso: string) => dayEvents(iso).filter(matchesFilter);

  /* Counts on the filter buttons are for the month in view, not the whole set. */
  const monthEvents = useMemo(
    () => events.filter((event) => event.date.startsWith(monthIso)),
    [monthIso],
  );
  const shownThisMonth = monthEvents.filter(matchesFilter);

  const toggleType = (id: EventTypeId) => {
    setActiveTypes((current) =>
      current.includes(id) ? current.filter((type) => type !== id) : [...current, id],
    );
  };

  /*
   * Moving month moves the selection with it. Leaving the panel on a day the
   * reader can no longer see in the grid is the kind of small incoherence that
   * makes an interface feel like it is not listening.
   */
  const changeMonth = (delta: number) => {
    const next = monthIndex + delta;
    if (next < 0 || next >= calendar.months.length) return;

    const nextMonth = calendar.months[next];
    const [year, month] = nextMonth.split("-").map(Number);
    let landing = isoFor(year, month, 1);
    for (let day = 1; day <= daysIn(year, month); day += 1) {
      const iso = isoFor(year, month, day);
      if (shownOn(iso).length > 0) {
        landing = iso;
        break;
      }
    }

    setMonthIndex(next);
    setSelectedIso(landing);
    setFocusIso(landing);
  };

  const selectDay = (iso: string) => {
    setSelectedIso(iso);
    setFocusIso(iso);
  };

  /*
   * Focus follows state, in an effect, rather than being moved from inside the
   * key handler. Calling .focus() next to setFocusIso aimed at whatever the ref
   * map held during the render the keypress happened in, a commit before the
   * target became the grid's tab stop. Here the DOM being focused is the DOM
   * React has just committed.
   *
   * The flag is what keeps this to the keyboard. changeMonth moves focusIso as
   * well, to keep the roving stop on a day the grid is showing, and a month
   * button that threw focus into the grid could not be pressed twice.
   */
  const pendingFocus = useRef(false);

  useEffect(() => {
    if (!pendingFocus.current) return;
    pendingFocus.current = false;
    dayRefs.current.get(focusIso)?.focus();
  }, [focusIso]);

  /*
   * Arrow keys walk the month and take the selection with them, so the panel
   * underneath always describes the day the grid shows as chosen.
   *
   * Focus-only movement is the textbook date-picker pattern and it was the wrong
   * one here. This render's whole claim is that it can be operated, and a
   * keypress that moves nothing but a focus ring is indistinguishable from a
   * keypress that did nothing. Enter and Space still select, because the day is
   * a button and that has never stopped being true.
   *
   * Movement stops at the month boundary rather than wrapping into a month the
   * grid is not showing.
   */
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

    if (target === null || target < 1 || target > lastDay) return;

    event.preventDefault();
    pendingFocus.current = true;
    selectDay(isoFor(year, month, target));
  };

  const toggleSignup = (id: string) => {
    setRegistered((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    );
  };

  const selectedShown = shownOn(selectedIso);
  const selectedHidden = dayEvents(selectedIso).length - selectedShown.length;

  const filterSummary =
    activeTypes.length === 0
      ? calendar.allTypes
      : activeTypes.map((id) => TYPES[id].plural).join(", ");

  return (
    <div className={styles.calendar}>
      <div className={styles.head}>
        <div className={styles.title}>{calendar.title}</div>

        <div className={styles.monthNav}>
          <button
            type="button"
            className={styles.monthButton}
            onClick={() => changeMonth(-1)}
            disabled={monthIndex === 0}
            aria-label={calendar.previousMonth}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <span className={styles.monthLabel}>{monthLabel(monthIso)}</span>
          <button
            type="button"
            className={styles.monthButton}
            onClick={() => changeMonth(1)}
            disabled={monthIndex === calendar.months.length - 1}
            aria-label={calendar.nextMonth}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      {/*
        Each filter carries its glyph, its word and its count. The pressed state
        is a fill, a border and aria-pressed together, so it never rests on the
        one signal a reader might not be able to see.
      */}
      <div className={styles.filters} role="group" aria-label={calendar.filterLabel}>
        {eventTypes.map((type) => {
          const on = activeTypes.includes(type.id);
          const count = monthEvents.filter((event) => event.type === type.id).length;

          return (
            <button
              key={type.id}
              type="button"
              className={on ? styles.filterOn : styles.filter}
              aria-pressed={on}
              onClick={() => toggleType(type.id)}
            >
              <span className={styles.filterGlyph} aria-hidden="true">
                {type.glyph}
              </span>
              {type.plural}
              <span className={styles.filterCount}>{count}</span>
            </button>
          );
        })}

        {activeTypes.length > 0 && (
          <button
            type="button"
            className={styles.clear}
            onClick={() => setActiveTypes([])}
          >
            {calendar.clearFilters}
          </button>
        )}
      </div>

      {/*
        Visible and live at once. A count only a screen reader hears is a count
        the sighted keyboard user has to infer, and both of them deserve to know
        the filter did something.
      */}
      <p className={styles.status} aria-live="polite">
        Showing {shownThisMonth.length} of {monthEvents.length} events in{" "}
        {monthLabel(monthIso)} · {filterSummary}
      </p>

      <div className={styles.body}>
        {/*
          A plain table, not role="grid". The month reads as a table of dates to
          a screen reader, which is exactly what it is, and the arrow keys are
          added on top through a roving tabindex rather than by taking over
          semantics that already work.
        */}
        <table className={styles.grid}>
          <caption className={styles.caption}>{monthLabel(monthIso)}</caption>
          <thead>
            <tr>
              {calendar.weekdays.map((weekday) => (
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

                  const shown = shownOn(cell.iso);
                  const hidden = dayEvents(cell.iso).length - shown.length;
                  const isSelected = cell.iso === selectedIso;
                  const isToday = cell.iso === calendar.today;

                  /*
                   * The button names itself in full. Its visible contents are
                   * abbreviated to fit a cell, and an abbreviation is not a
                   * name anyone should have to decode by ear.
                   */
                  const noun =
                    shown.length === 1 ? calendar.eventSingular : calendar.eventPlural;
                  const label = shown.length
                    ? `${shortDate(cell.iso)}, ${shown.length} ${noun}: ${shown
                        .map((event) => event.title)
                        .join(", ")}`
                    : `${shortDate(cell.iso)}, ${calendar.noEvents}`;

                  return (
                    <td key={cellIndex} className={styles.cell}>
                      <button
                        type="button"
                        ref={(node) => {
                          if (node) dayRefs.current.set(cell.iso, node);
                          else dayRefs.current.delete(cell.iso);
                        }}
                        className={`${styles.day} ${isSelected ? styles.daySelected : ""} ${
                          isToday ? styles.dayToday : ""
                        }`}
                        tabIndex={cell.iso === focusIso ? 0 : -1}
                        aria-pressed={isSelected}
                        aria-current={isToday ? "date" : undefined}
                        aria-label={label}
                        onClick={() => selectDay(cell.iso)}
                        onKeyDown={(event) => onDayKeyDown(event, cell.iso)}
                      >
                        <span className={styles.dayNumber}>
                          {cell.day}
                          {/*
                            The word is wrapped so a phone can drop it and keep
                            the mark. Below 560px seven columns leave about 42px
                            a cell, and a pill spelling "Today" beside a numeral
                            in that is a pill sitting on the next day. The word
                            is not lost: the button's aria-label still says it.
                          */}
                          {isToday && (
                            <span className={styles.todayMark}>
                              <span className={styles.todayText}>{calendar.todayLabel}</span>
                            </span>
                          )}
                        </span>

                        <span className={styles.chips} aria-hidden="true">
                          {shown.slice(0, CHIPS_PER_DAY).map((event) => (
                            <span key={event.id} className={styles.chip}>
                              <span className={styles.chipGlyph}>
                                {TYPES[event.type].glyph}
                              </span>
                              <span className={styles.chipText}>{event.title}</span>
                            </span>
                          ))}

                          {shown.length > CHIPS_PER_DAY && (
                            <span className={styles.more}>
                              +{shown.length - CHIPS_PER_DAY} {calendar.moreSuffix}
                            </span>
                          )}

                          {/* A filtered-out day says so instead of reading as free. */}
                          {hidden > 0 && (
                            <span className={styles.hidden}>
                              {hidden} {calendar.hiddenSuffix}
                            </span>
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

          {selectedShown.length === 0 && (
            <p className={styles.panelEmpty}>
              {selectedHidden > 0 ? calendar.emptyFiltered : calendar.emptyDay}
            </p>
          )}

          {selectedShown.map((event) => {
            const type = TYPES[event.type];
            const isOn = registered.includes(event.id);

            return (
              <div key={event.id} className={styles.event}>
                <div className={styles.eventType}>
                  <span className={styles.eventGlyph} aria-hidden="true">
                    {type.glyph}
                  </span>
                  {type.label}
                </div>

                <div className={styles.eventTitle}>{event.title}</div>
                <div className={styles.eventMeta}>
                  {event.time} · {event.location}
                </div>
                <div className={styles.eventProblem}>
                  <span className={styles.eventProblemLabel}>{calendar.filedUnder}</span>
                  {event.problem}
                </div>

                <SignupControl event={event} isOn={isOn} onToggle={toggleSignup} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.note}>{calendar.note}</div>
    </div>
  );
}

interface SignupControlProps {
  event: InstituteEvent;
  isOn: boolean;
  onToggle: (id: string) => void;
}

/**
 * Three kinds of event, three ways to act on one. A seminar anyone can walk into
 * should not be wearing the same button as a workshop with twenty-four seats,
 * because a button that does nothing teaches people to distrust the ones that do.
 */
function SignupControl({ event, isOn, onToggle }: SignupControlProps) {
  if (event.signup.kind === "open") {
    return <div className={styles.openNote}>{calendar.open}</div>;
  }

  if (event.signup.kind === "reminder") {
    return (
      <button
        type="button"
        className={isOn ? styles.signupOn : styles.signup}
        aria-pressed={isOn}
        onClick={() => onToggle(event.id)}
      >
        {isOn ? calendar.reminded : calendar.remind}
      </button>
    );
  }

  /* Stored without the reader in it, so the count moves when they join. */
  const taken = event.signup.taken + (isOn ? 1 : 0);
  const isFull = taken >= event.signup.seats;

  return (
    <div className={styles.signupRow}>
      <button
        type="button"
        className={isOn ? styles.signupOn : styles.signup}
        aria-pressed={isOn}
        onClick={() => onToggle(event.id)}
      >
        {isOn ? calendar.registered : isFull ? calendar.waitlist : calendar.register}
      </button>
      <span className={isFull && !isOn ? styles.seatsFull : styles.seats}>
        {isFull && !isOn ? `${calendar.full} · ` : ""}
        {taken} of {event.signup.seats} {calendar.seatsTaken}
      </span>
    </div>
  );
}
