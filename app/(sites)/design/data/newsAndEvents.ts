import type { CaseFinding } from "./caseStudies";

/*
 * Content for the two components the institute's posting names by name: a news
 * feed that is easy to keep current, and an events calendar you can filter and
 * register from. Kept out of caseStudies.ts the way blitzSite.ts is, because a
 * render's content is a different thing from a case study's argument.
 *
 * Every date here is fixed rather than computed from the clock. A mockup that
 * reads `new Date()` renders differently on the server and in the browser, and
 * a case study that quietly changes under the reader is worse than a stale one.
 */

/** The four types the calendar filters by, taken from the posting's own list. */
export type EventTypeId = "talk" | "workshop" | "social" | "deadline";

export interface EventType {
  id: EventTypeId;
  /** Singular, for an event row. */
  label: string;
  /** Plural, for the filter control. */
  plural: string;
  /*
   * The reason nothing here is colour-coded. A shape and a word carry the type
   * in the filter, in the day cell and in the detail row, so the calendar reads
   * the same to someone who cannot separate the four colours a legend would
   * otherwise depend on.
   */
  glyph: string;
}

/** How you act on an event. Three kinds, because not every event takes a seat. */
export type Signup =
  | { kind: "seats"; seats: number; taken: number }
  | { kind: "open" }
  | { kind: "reminder" };

export interface InstituteEvent {
  id: string;
  /** ISO YYYY-MM-DD. */
  date: string;
  time: string;
  title: string;
  type: EventTypeId;
  location: string;
  /** The research problem it is filed under. This tag is the whole mechanism. */
  problem: string;
  signup: Signup;
}

export interface FeedItem {
  kind: string;
  date: string;
  title: string;
  problem: string;
  /** Only the lead item carries one. */
  dek?: string;
}

const INSTITUTE_WIDE = "Institute-wide";

export const newsAndEvents = {
  /*
   * Opens the features band. The two big ones sit above the three panel-sized
   * ones because they are the two the institute asked for by name, and because
   * a feature you can operate deserves more room than one you can only read.
   */
  featureOne: {
    kicker: "FEATURE 01 · NEWS & EVENTS FEED",
    title: "News that does not stop existing after a fortnight.",
    body: "A good feed needs two things: to be easy to keep current, and to be worth looking at. One decision does both. Every item is filed against a research problem before it publishes, so publishing once puts it in the feed and on the problem page, and that same tag becomes the lead item's artwork: the subject set large rather than a photograph of a corridor.",
  },
  featureTwo: {
    kicker: "FEATURE 02 · INTERACTIVE EVENTS CALENDAR",
    title: "Filter by what it is. Register without leaving.",
    body: "Speaking engagements, workshops, socials and deadlines, narrowed by type and registered for in the same row you read them in. The filters work, the days select, arrow keys move through the month and the register buttons hold their state. A calendar you cannot operate is a picture of a calendar.",
  },

  feedKicker: "SCREEN 03 · NEWS & EVENTS",
  editorKicker: "SCREEN 04 · THE EDITOR'S VIEW",
  calendarKicker: "SCREEN 05 · EVENTS CALENDAR",
  /* Says it on the render instead of in the header, where it was one more label. */
  calendarLiveTag: "LIVE · TRY IT",

  /* --- screen 03: the feed ---------------------------------------------- */

  feed: {
    breadcrumb: "Home / News & events",
    kicker: "NEWS & EVENTS",
    headline: "Published this month, and where it will still be in 2030.",
    body: "Everything below is filed against a research problem, so the feed is a view of the institute's work rather than the only place that work exists.",
    /*
     * Filters by problem, not by date or department. The feed's own axis is
     * recency; the only useful second axis is the one the whole site is
     * organised on, which is the point being made.
     */
    filterLabel: "FILED UNDER",
    filters: [
      { name: "Everything", count: "24", active: true },
      { name: "Human–computer interaction", count: "5" },
      { name: "Robotics & autonomy", count: "3" },
      { name: "Medical imaging & health informatics", count: "7" },
      { name: "Machine learning & data", count: "4" },
      { name: "Sensing, networks & devices", count: "2" },
      { name: "Cognitive systems", count: "3" },
    ],
    /*
     * The lead's art field is the tag itself, set large. A stock photo of a
     * laboratory would say nothing; the subject the piece is filed under says
     * what it is about and demonstrates the mechanism in the same gesture.
     */
    artLabel: "FILED UNDER",
    lead: {
      kind: "News",
      date: "11 March 2026",
      title: "Four departments, one imaging pipeline",
      dek: "How radiology, electrical engineering and computer science ended up annotating from the same set of rules, and what it cost to get there.",
      problem: "Medical imaging & health informatics",
    } as FeedItem,
    rows: [
      {
        kind: "Preprint",
        date: "9 March",
        title: "Uncertainty-aware segmentation for low-dose scans",
        problem: "Medical imaging & health informatics",
      },
      {
        kind: "Grant",
        date: "6 March",
        title: "Seed funding opens for cross-cluster projects",
        problem: INSTITUTE_WIDE,
      },
      {
        kind: "Award",
        date: "3 March",
        title: "K. Researcher elected a fellow of the national academy",
        problem: "Human–computer interaction",
      },
      {
        kind: "News",
        date: "27 February",
        title: "The field robotics testbed comes online",
        problem: "Robotics & autonomy",
      },
      {
        kind: "Preprint",
        date: "24 February",
        title: "What people do when the model says it is unsure",
        problem: "Cognitive systems",
      },
    ] as FeedItem[],
    rail: {
      label: "NEXT UP",
      /* Glyphs match the calendar's, so the two components share one vocabulary. */
      items: [
        { glyph: "◆", date: "Thu 12 Mar", title: "Guest lecture: what a model owes its user" },
        { glyph: "■", date: "Thu 19 Mar", title: "Intro to the imaging suite" },
        { glyph: "●", date: "Fri 20 Mar", title: "Graduate board games night" },
      ],
      link: "The full calendar ↓",
    },
  },

  /* --- screen 04: the editor's view -------------------------------------- */

  /*
   * The answer to "easy to update" is not a prettier admin theme, it is how few
   * fields there are and how much one of them does. Four fields, one of them
   * new, and that one new field is what publishes the item to three surfaces.
   */
  editor: {
    title: "New item",
    fields: [
      { label: "Title", value: "Intro to the imaging suite", hint: "" },
      { label: "Type", value: "Event · Workshop ▾", hint: "" },
      { label: "When", value: "19 / 03 / 2026 · 14:00 · Imaging suite, level 2", hint: "" },
      {
        label: "File under",
        value: "Medical imaging & health informatics ▾",
        hint: "Required",
        required: true,
      },
      { label: "Seats", value: "24", hint: "Registration opens on publish" },
    ],
    publishLabel: "PUBLISHES TO",
    publishesTo: [
      "The news & events feed",
      "The Medical imaging problem page, permanently",
      "The events calendar, because it carries a date",
    ],
    note: "Four fields the current site already asks for, and one that it does not. The one it does not is the only required field on the form, and it is the reason the other three surfaces need no separate upkeep.",
    button: "Publish",
  },

  /* --- screen 05: the calendar ------------------------------------------- */

  eventTypes: [
    { id: "talk", label: "Speaking engagement", plural: "Speaking engagements", glyph: "◆" },
    { id: "workshop", label: "Workshop", plural: "Workshops", glyph: "■" },
    { id: "social", label: "Social", plural: "Socials", glyph: "●" },
    { id: "deadline", label: "Deadline", plural: "Deadlines", glyph: "▲" },
  ] as EventType[],

  calendar: {
    title: "Events",
    /* Fixed, so the render is deterministic. 11 March 2026 is a Wednesday. */
    today: "2026-03-11",
    months: ["2026-02", "2026-03", "2026-04"],
    initialMonthIndex: 1,
    initialDay: "2026-03-12",
    /*
     * Seeded on the day the calendar opens on, so all three states are on screen
     * before anyone clicks: one event registered, one open to register, one that
     * takes no sign-up at all. Seeded on any other day it would be invisible.
     */
    initialRegistration: "e-2026-03-12-uncertainty",
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    weekdays: [
      { short: "Sun", full: "Sunday" },
      { short: "Mon", full: "Monday" },
      { short: "Tue", full: "Tuesday" },
      { short: "Wed", full: "Wednesday" },
      { short: "Thu", full: "Thursday" },
      { short: "Fri", full: "Friday" },
      { short: "Sat", full: "Saturday" },
    ],
    filterLabel: "Filter events by type",
    clearFilters: "Show all types",
    allTypes: "all types",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    todayLabel: "Today",
    moreSuffix: "more",
    hiddenSuffix: "hidden by the filter",
    /*
     * The day button's accessible name is the only place a screen reader hears
     * this count, so it gets the same grammar a sighted reader would be shown.
     */
    eventSingular: "event",
    eventPlural: "events",
    noEvents: "no events",
    emptyDay: "Nothing scheduled on this day.",
    emptyFiltered: "Nothing of the types you have chosen. Clear a filter to see what is here.",
    seatsTaken: "seats taken",
    full: "Full",
    register: "Register",
    registered: "Registered ✓",
    waitlist: "Join waitlist",
    remind: "Remind me",
    reminded: "Reminder set ✓",
    open: "Open to all, drop in",
    filedUnder: "Filed under",
    note: "Sample content, three months of it. Tab into the grid and the arrow keys walk the month.",
  },

  events: [
    {
      id: "e-2026-02-19-lecture",
      date: "2026-02-19",
      time: "16:00",
      title: "Distinguished lecture: designing an explanation",
      type: "talk",
      location: "Institute seminar room",
      problem: "Human–computer interaction",
      signup: { kind: "seats", seats: 120, taken: 74 },
    },
    {
      id: "e-2026-02-26-mixer",
      date: "2026-02-26",
      time: "17:30",
      title: "Winter mixer for new members",
      type: "social",
      location: "Atrium",
      problem: INSTITUTE_WIDE,
      signup: { kind: "seats", seats: 60, taken: 41 },
    },
    {
      id: "e-2026-03-03-grants",
      date: "2026-03-03",
      time: "10:00",
      title: "Writing a grant that survives review",
      type: "workshop",
      location: "Institute seminar room",
      problem: INSTITUTE_WIDE,
      signup: { kind: "seats", seats: 30, taken: 27 },
    },
    {
      id: "e-2026-03-05-motion",
      date: "2026-03-05",
      time: "15:00",
      title: "Seminar: safe motion planning in the field",
      type: "talk",
      location: "Institute seminar room",
      problem: "Robotics & autonomy",
      signup: { kind: "open" },
    },
    {
      id: "e-2026-03-09-seed",
      date: "2026-03-09",
      time: "23:59",
      title: "Seed funding, letters of intent close",
      type: "deadline",
      location: "Online",
      problem: INSTITUTE_WIDE,
      signup: { kind: "reminder" },
    },
    {
      id: "e-2026-03-11-annotating",
      date: "2026-03-11",
      time: "13:00",
      title: "Hands-on: annotating clinical scans",
      type: "workshop",
      location: "Imaging suite, level 2",
      problem: "Medical imaging & health informatics",
      signup: { kind: "seats", seats: 24, taken: 24 },
    },
    {
      id: "e-2026-03-12-owes",
      date: "2026-03-12",
      time: "11:00",
      title: "Guest lecture: what a model owes its user",
      type: "talk",
      location: "Institute seminar room",
      problem: "Human–computer interaction",
      signup: { kind: "seats", seats: 90, taken: 52 },
    },
    {
      id: "e-2026-03-12-uncertainty",
      date: "2026-03-12",
      time: "14:30",
      title: "Lab methods: uncertainty in segmentation",
      type: "workshop",
      location: "Imaging suite, level 2",
      problem: "Medical imaging & health informatics",
      signup: { kind: "seats", seats: 18, taken: 11 },
    },
    {
      id: "e-2026-03-12-coffee",
      date: "2026-03-12",
      time: "16:00",
      title: "Coffee and clusters",
      type: "social",
      location: "Atrium",
      problem: INSTITUTE_WIDE,
      signup: { kind: "open" },
    },
    {
      id: "e-2026-03-17-consent",
      date: "2026-03-17",
      time: "12:30",
      title: "Panel: imaging, records and consent",
      type: "talk",
      location: "Institute seminar room",
      problem: "Medical imaging & health informatics",
      signup: { kind: "seats", seats: 90, taken: 38 },
    },
    {
      id: "e-2026-03-19-imaging",
      date: "2026-03-19",
      time: "14:00",
      title: "Intro to the imaging suite",
      type: "workshop",
      location: "Imaging suite, level 2",
      problem: "Medical imaging & health informatics",
      signup: { kind: "seats", seats: 24, taken: 15 },
    },
    {
      id: "e-2026-03-20-games",
      date: "2026-03-20",
      time: "18:00",
      title: "Graduate board games night",
      type: "social",
      location: "Common room",
      problem: INSTITUTE_WIDE,
      signup: { kind: "seats", seats: 40, taken: 22 },
    },
    {
      id: "e-2026-03-24-studentships",
      date: "2026-03-24",
      time: "23:59",
      title: "Summer studentship applications close",
      type: "deadline",
      location: "Online",
      problem: INSTITUTE_WIDE,
      signup: { kind: "reminder" },
    },
    {
      id: "e-2026-03-26-edge",
      date: "2026-03-26",
      time: "15:00",
      title: "Seminar: sensing at the edge",
      type: "talk",
      location: "Institute seminar room",
      problem: "Sensing, networks & devices",
      signup: { kind: "open" },
    },
    {
      id: "e-2026-03-27-potluck",
      date: "2026-03-27",
      time: "17:00",
      title: "End-of-term potluck",
      type: "social",
      location: "Atrium",
      problem: INSTITUTE_WIDE,
      signup: { kind: "seats", seats: 80, taken: 63 },
    },
    {
      id: "e-2026-03-31-repro",
      date: "2026-03-31",
      time: "10:00",
      title: "Reproducibility clinic",
      type: "workshop",
      location: "Institute seminar room",
      problem: "Machine learning & data",
      signup: { kind: "seats", seats: 20, taken: 9 },
    },
    {
      id: "e-2026-04-02-memory",
      date: "2026-04-02",
      time: "15:00",
      title: "Seminar: memory models, ten years on",
      type: "talk",
      location: "Institute seminar room",
      problem: "Cognitive systems",
      signup: { kind: "open" },
    },
    {
      id: "e-2026-04-09-dataset",
      date: "2026-04-09",
      time: "13:00",
      title: "Building a dataset you can publish",
      type: "workshop",
      location: "Institute seminar room",
      problem: "Machine learning & data",
      signup: { kind: "seats", seats: 20, taken: 6 },
    },
    {
      id: "e-2026-04-15-travel",
      date: "2026-04-15",
      time: "23:59",
      title: "Conference travel fund, spring call closes",
      type: "deadline",
      location: "Online",
      problem: INSTITUTE_WIDE,
      signup: { kind: "reminder" },
    },
  ] as InstituteEvent[],

  /* --- what each of the two is arguing for ------------------------------- */

  /*
   * Split rather than pooled, so each block annotates the render directly above
   * it. That is how every other exhibit in this case study is footnoted, and a
   * single list covering two frames would make the reader work out which claim
   * belonged to which.
   */
  feedFindings: {
    label: "WHAT THE FEED DOES · AND WHY IT STAYS CURRENT",
    items: [
      {
        lead: "One required field does all of it.",
        body: " An item is filed against a research problem before it can publish, and that single tag puts it in three places at once: the feed, where it is current; the problem page, where it stays; and the calendar, if it carries a date. The [[cms]] gains one field and the site stops losing its own history.",
      },
      {
        lead: "The feed is a view, not the archive.",
        body: " Nothing here exists only in the feed. A post from four years ago still sits on the problem page it belongs to, because that page is organised by subject rather than by date. News ageing off the homepage stops being the same event as news disappearing.",
        cites: ["icics"] as const,
      },
      {
        lead: "The one visual element is generated from the record.",
        body: " The problem an item is filed under is already captured, and setting it large is what makes the lead read as a lead. Visually engaging and easy to update stop being two requirements if the art comes out of a field the editor has already filled in.",
        cites: ["nielsen-reading"] as const,
      },
    ] as CaseFinding[],
  },

  calendarFindings: {
    label: "WHAT THE CALENDAR DOES · AND WHY IT WORKS",
    items: [
      {
        lead: "The filter announces itself to a screen reader.",
        body: " Narrowing to two types updates a count in a [[live-region]], so someone who cannot see the grid redraw still learns what changed. A day whose events are hidden says how many rather than quietly looking empty.",
        cites: ["wcag"] as const,
      },
      {
        lead: "Registration sits where the decision gets made.",
        body: " Seats remaining are in the same row as the event, and so is the button. No second page, no third-party form, and no finding out it was full after you had already decided to go.",
        cites: ["jakobs-law"] as const,
      },
      {
        lead: "The whole month works from the keyboard.",
        body: " Tab reaches the grid once, then the arrow keys walk the month and the panel below follows the day you land on. Focus is visible on every control, the month is a real table caption so a screen reader announces which one it is reading, and the register button reports its own state instead of only changing colour. This is the part that normally waits for an audit to find it.",
        cites: ["wcag", "w3c"] as const,
      },
    ] as CaseFinding[],
  },
};
