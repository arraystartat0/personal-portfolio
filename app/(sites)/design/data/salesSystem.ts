/**
 * Every string and figure the case-03 renders draw, in one place, the way
 * `blitzSite.ts` holds the two Blitz pages. Components here render; nothing
 * user-visible is written inline in a component.
 *
 * The customer names, people and figures throughout are the system's own
 * demonstration dataset, not Blitz's book of business. Publishing a real
 * customer list and its order values on a portfolio would be a breach of the
 * thing the client actually trusted me with.
 */

/* --- what the market offered --------------------------------------------- */

/*
 * A composite, and said to be one in the frame header. Every label here is
 * generic terminology common to packaged systems rather than any one vendor's
 * screen, because the argument is that the category shares these faults.
 */
export const marketErp = {
  /*
   * These three tables are wider than a phone and scroll sideways inside their
   * own box. A scroll container that no key can reach is content a keyboard
   * cannot read at all, so each one is focusable and each one says what it is.
   */
  tableLabel: "Sales order line items, scrolls sideways",
  menu: ["File", "Edit", "Master Data", "Transactions", "Reports", "Window", "Help"],
  breadcrumb: "Home > Sales & Distribution > Sales Order > Create",
  title: "SALES ORDER ENTRY",
  code: "[ SO-ENTRY-01 ]",
  toolbar: ["New", "Open", "Save", "Delete", "Copy", "Find", "Print", "Exit"],
  /*
   * Thirty of them, unordered and ungrouped, because that is the finding. Do
   * not tidy this list into sections: the diagnosis directly above the render
   * says there are no sections, and a reader checks that by counting.
   */
  fields: [
    "Doc. Type",
    "Sales Org.",
    "Distr. Channel",
    "Division",
    "Sales Office",
    "Sales Group",
    "Sold-To Party",
    "Ship-To Party",
    "Cust. Ref.",
    "Cust. Ref. Date",
    "Req. Deliv. Date",
    "Complete Dlv.",
    "Delivery Block",
    "Billing Block",
    "Pricing Date",
    "Payment Terms",
    "Incoterms",
    "Incoterms Loc.",
    "Order Reason",
    "Currency",
    "Exch. Rate",
    "Item Cat.",
    "Plant",
    "Storage Loc.",
    "Batch",
    "Route",
    "Shipping Cond.",
    "Tax Class.",
    "Acct. Assgmt",
    "Ref. Doc.",
  ],
  tableHead: [
    "Itm",
    "Material",
    "Order Qty",
    "Un",
    "S",
    "Description",
    "Cust. Material No.",
    "ItCa",
    "Net Price",
    "Curr.",
    "Plnt",
    "SLoc",
  ],
  tableRows: [
    ["10", "MAT-000418", "1,250", "PC", "", "WOVEN PP SACK 25KG", "", "TAN", "1250.00", "UGX", "1000", "0001"],
    ["20", "MAT-000902", "30", "RO", "", "STRETCH FILM 23MIC 1.5KG", "", "TAN", "52000.00", "UGX", "1000", "0001"],
    ["30", "", "", "", "", "", "", "", "", "", "", ""],
    ["40", "", "", "", "", "", "", "", "", "", "", ""],
  ],
  buttons: ["Save", "Cancel", "Reset"],
  status: "Ready.",
  licence: "Licensed seats: 5 of 5 in use. Contact your administrator to add users.",
};

/* --- the 2024 prototype --------------------------------------------------- */

/*
 * Bootstrap's defaults, drawn honestly rather than flattered. The point of this
 * frame is that it looks like every other Bootstrap app, so the render has to
 * as well: the stacked coloured buttons, the centred greeting and the table
 * that prints every column it has.
 */
export const prototypeApp = {
  tableLabel: "Customer records, scrolls sideways",
  brand: "Sales | Blitz Packaging",
  nav: ["Records", "Orders"],
  greeting: "Good Evening, Admin",
  sub: "What would you like to do this evening ?",
  groups: [
    { heading: "Generate:", buttons: ["Sales Order", "Sales Order Report"], tone: "primary" as const },
    {
      heading: "Create a new record for",
      buttons: ["Customer", "Product", "Specification", "Product type"],
      tone: "success" as const,
    },
    { heading: "Account:", buttons: ["Sign Out"], tone: "danger" as const },
  ],
  table: {
    heading: "Customer records",
    head: [
      "Operations",
      "ID",
      "Customer",
      "Category",
      "Address",
      "City",
      "Contact",
      "Phone",
      "Currency",
      "Payment Mode",
      "Day Number",
      "Designation",
      "Email",
      "Reference",
    ],
    rows: [
      [
        "Edit Delete",
        "1",
        "Nile Beverages Ltd",
        "B2B",
        "Plot 14, Industrial Area",
        "Kampala",
        "R. Kiggundu",
        "+256 414 220 118",
        "UGX",
        "Credit",
        "30",
        "Procurement Officer",
        "procurement@nilebeverages.example",
        "REF-0001",
      ],
      [
        "Edit Delete",
        "2",
        "Savannah Foods Ltd",
        "B2B",
        "Plot 7, Ntinda",
        "Kampala",
        "A. Nabirye",
        "+256 414 331 204",
        "UGX",
        "Cash",
        "0",
        "Supply Chain Lead",
        "supply@savannahfoods.example",
        "REF-0002",
      ],
      [
        "Edit Delete",
        "3",
        "Kigo Dairy Ltd",
        "B2B",
        "Kigo Road",
        "Entebbe",
        "P. Ssemwanga",
        "+256 392 118 402",
        "UGX",
        "Credit",
        "45",
        "Operations Manager",
        "orders@kigodairy.example",
        "REF-0003",
      ],
    ],
  },
  modal: {
    title: "Create a new Customer Record",
    fields: ["Customer", "Cust. Category", "Address", "City", "Contact person", "Phone"],
    submit: "Create Record",
  },
};

/* --- what runs today ------------------------------------------------------ */

/*
 * Read off a running build rather than off a screenshot, so the tokens below are
 * the ones in its `sass/main.scss` and the series colours are the ones its
 * `js/analytics.js` passes to Chart.js.
 *
 * That build is the one without a confidentiality obligation on it. The system
 * Blitz actually runs is not public and its figures are not publishable, so this
 * is accurate about the design language and deliberately not authoritative about
 * the product. The frame says so above the screens.
 *
 *   $primary   #D0D0D0  the page ground
 *   $secondary #f7f6fb  every card
 *   altdark    #e0e0e0  toolbar strips
 *   tertiary   #D9D9D9  table header row
 *   altlight   #8B8B8B  muted type
 *   blitzGreen #ACD04D  the active nav pill, on black text
 *
 * Bootstrap's $border-radius is overridden to 50rem, which is why every control
 * in this app is a full pill; cards carry `rounded-4` and a 2px border.
 */
export const shipped = {
  /*
   * The client's own mark, as the app serves it: owl, wordmark and strapline
   * in one asset at 60px in the live navbar. Their branding is my work on this
   * account, and case 02 already shows it, so the render uses the real file
   * rather than setting the name in a typeface it does not use.
   */
  brand: { src: "/work/blitz-mark.svg", alt: "Blitz Packaging" },
  /*
   * Icons named after the Font Awesome glyphs the app actually uses:
   * fa-house, fa-boxes-stacked, fa-rectangle-list, fa-cart-shopping.
   */
  nav: [
    { label: "Dashboard", icon: "house" as const },
    { label: "Sales", icon: "boxes" as const },
    { label: "Records", icon: "list" as const },
    { label: "Purchase", icon: "cart" as const },
  ],
  /*
   * The offcanvas the fa-bars toggler opens below the app's lg breakpoint, where
   * the 230px rail is `d-none d-lg-block` and gone.
   *
   * Its nav is deliberately not `shipped.nav` above. The live offcanvas and the
   * live rail disagree with each other: the rail says "Purchase" and draws
   * Records with fa-rectangle-list, this says "Purchases" and draws it with
   * fa-list. Reproduced rather than reconciled, because a render that quietly
   * fixes the product is no longer evidence about the product.
   *
   * `user` is the same $safe_name that feeds the greeting below, so the two have
   * to agree or the render contradicts itself inside one screen.
   */
  mobile: {
    menuLabel: "Menu",
    closeLabel: "Close menu",
    title: "Sales | Blitz Packaging",
    nav: [
      { label: "Dashboard", icon: "house" as const },
      { label: "Sales", icon: "boxes" as const },
      { label: "Records", icon: "listPlain" as const },
      { label: "Purchases", icon: "cart" as const },
    ],
    activeNav: "Sales",
    user: "Admin",
    signOut: "Sign Out",
  },
  greeting: "Welcome, Admin!",
  /*
   * "morning" because the clock beside it reads 09:12. The live app picks the
   * word off the hour, so a render showing "evening" at nine in the morning
   * would be showing a bug the product does not have.
   */
  sub: "What would you like to do this morning?",
  stamp: "Thu, 19 Mar 2026, 09:12:04 EAT",
  /* fa-users, fa-cart-flatbed, fa-money-bill-trend-up, each in a 25% lime tile. */
  kpis: [
    {
      label: "Customers",
      value: "148",
      delta: "+12.5%",
      since: "Since last month",
      icon: "users" as const,
    },
    {
      label: "Orders",
      value: "1,284",
      delta: "+8.33%",
      since: "Since last month",
      icon: "flatbed" as const,
    },
    {
      label: "Revenue",
      value: "UGX 2,847,650,000",
      delta: "+14.7%",
      since: "Since last month",
      icon: "moneyTrend" as const,
    },
  ],
  /*
   * Chart.js defaults, which is what the app passes: teal rgba(75,192,192,1) and
   * pink rgba(255,99,132,1) at borderWidth 2, filled to 0.2, tension 0.4,
   * pointRadius 3, on black gridlines with black ticks and axis titles.
   */
  chart: {
    title: "Orders per month",
    series: [
      {
        key: "current",
        label: "Current Period",
        values: [86, 94, 102, 97, 118, 124],
        stroke: "rgba(75, 192, 192, 1)",
        fill: "rgba(75, 192, 192, 0.2)",
      },
      {
        key: "prior",
        label: "Same Period Last Year",
        values: [72, 80, 88, 91, 96, 105],
        stroke: "rgba(255, 99, 132, 1)",
        fill: "rgba(255, 99, 132, 0.2)",
      },
    ],
    months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    axisMax: 140,
    xTitle: "Month",
    yTitle: "Total Orders",
  },
  /* Purple, rgba(153,102,255,...), the third Chart.js default. */
  revenue: {
    title: "Revenue",
    legend: "Total Sales Amount (in millions)",
    values: [185, 212, 198, 240, 266, 214],
    months: ["Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026"],
    axisMax: 300,
    xTitle: "Month",
    yTitle: "Total Sales Amount (in millions)",
    stroke: "rgba(153, 102, 255, 1)",
    fill: "rgba(153, 102, 255, 0.2)",
  },
  /*
   * Orange, rgba(255,159,64,...), the fourth Chart.js default, drawn with a
   * customer selected. The empty state was the honest thing to show and the
   * wrong thing: this card exists to answer "how much does this account buy",
   * and a card with no bars in it cannot demonstrate that it does.
   */
  perCustomer: {
    title: "Orders per customer",
    select: "Serengeti Snacks Ltd",
    legend: "Number of Orders",
    values: [3, 5, 2, 6, 4, 7],
    months: ["Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026"],
    axisMax: 8,
    xTitle: "Month",
    yTitle: "Number of Orders",
    stroke: "rgba(255, 159, 64, 1)",
    fill: "rgba(255, 159, 64, 0.2)",
  },
  /*
   * Timeline colours straight from analytics.js: order rgb(57,175,209),
   * quote falls to the default rgb(135,195,143), customer rgb(250,92,124).
   * The heading takes the colour and the icon disc takes it at 80%.
   */
  activity: {
    title: "Activity",
    /*
     * The link is always the record the entry is about, never the person who
     * acted: a customer entry links the customer, a report entry links the
     * report. Two of these had it on the staff member, which sends a reader
     * clicking "Grace Nakato" to find out about Victoria Millers.
     *
     * That is also why the copy is split around the link rather than always
     * ending with it. Where the record is the subject of the sentence it has to
     * come first, and a template that only appends could not express that.
     */
    rows: [
      {
        kind: "order" as const,
        icon: "cart" as const,
        lead: "A new order was generated.",
        before: "Daniel Okello generated an order for ",
        link: "Nile Beverages Ltd",
        after: "",
        when: "Just now",
      },
      {
        kind: "quote" as const,
        icon: "fileLines" as const,
        lead: "A new quote was generated.",
        before: "Grace Nakato generated a quote for ",
        link: "Serengeti Snacks Ltd",
        after: "",
        when: "12 minutes ago",
      },
      {
        kind: "customer" as const,
        icon: "user" as const,
        lead: "A new customer was added.",
        before: "",
        link: "Victoria Millers Ltd",
        after: " was added by Grace Nakato",
        when: "1 hour ago",
      },
      /*
       * The other two kinds analytics.js colours: purchase orders in
       * rgb(255,148,71) and reports in rgb(177,141,255). Five entries rather
       * than three because the live feed is a busy column that scrolls, and a
       * render showing three rows above a half-empty card describes a quieter
       * business than this one is.
       */
      {
        kind: "purchase" as const,
        icon: "cart" as const,
        lead: "A new purchase order was generated.",
        before: "Daniel Okello raised a purchase order with ",
        link: "Rwenzori Polymers Ltd",
        after: "",
        when: "3 hours ago",
      },
      {
        kind: "report" as const,
        icon: "fileLines" as const,
        lead: "A new report was generated.",
        before: "",
        link: "February sales report",
        after: " was exported by Grace Nakato",
        when: "Yesterday",
      },
    ],
  },
  orders: {
    tableLabel: "Orders table, scrolls sideways",
    tabs: ["Orders", "Quotations", "Sales Report"],
    activeTab: "Orders",
    create: "Create a new order",
    trash: "Trash",
    beta: "BETA",
    search: "Search by Customer Name or Order ID",
    head: ["Operations", "Order ID", "Customer Name", "Order Date", "Delivery Date", "Status"],
    /*
     * Status runs oldest to newest through the pipeline, so the column reads as
     * a progression rather than five words scattered down a row. "Awaiting sync"
     * is where the offline behaviour belongs: a state the order is in, sitting
     * in the column that reports states, rather than a badge stapled to a date.
     *
     * The tone fills a chip around the word. Every one of these is legible as
     * text on its own, so the colour is a second, faster route to the same fact
     * rather than the only one carrying it.
     */
    rows: [
      {
        id: "BP-1594",
        status: "Created",
        tone: "created" as const,
        statusIcon: "created" as const,
        customer: "Bunyoro Grain Traders",
        ordered: "18-03-2026",
        delivery: "20-03-2026",
      },
      {
        id: "BP-1593",
        status: "Awaiting sync",
        tone: "awaiting" as const,
        statusIcon: "sync" as const,
        customer: "Nile Beverages Ltd",
        ordered: "17-03-2026",
        delivery: "20-03-2026",
      },
      {
        id: "BP-1592",
        status: "Production",
        tone: "production" as const,
        statusIcon: "production" as const,
        customer: "Serengeti Snacks Ltd",
        ordered: "16-03-2026",
        delivery: "23-03-2026",
      },
      {
        id: "BP-1591",
        status: "Dispatch ready",
        tone: "dispatch" as const,
        statusIcon: "dispatch" as const,
        customer: "Kigo Dairy Ltd",
        ordered: "16-03-2026",
        delivery: "24-03-2026",
      },
      {
        id: "BP-1590",
        status: "Completed",
        tone: "completed" as const,
        statusIcon: "completed" as const,
        customer: "Rwenzori Tea Exports",
        ordered: "13-03-2026",
        delivery: "25-03-2026",
      },
    ],
    /* fa-print and fa-dolly, the two printed outputs the floor actually uses. */
    printOrder: "Print Order",
    printProduction: "Print for Production",
    /*
     * The pager the render was missing. A table showing the first five rows of a
     * longer list is a table with a pager under it, and leaving it out made the
     * screen quietly claim the business has five orders.
     *
     * Load More and Load All are deliberately absent. buildPagination in the
     * live sales.js only reveals that pair on the last page of an unfiltered
     * list, so a screen with page 1 lit and those two buttons under it is one
     * the app cannot produce. This frame's whole claim is that it is what
     * shipped, so it does not get to show a state that never shipped.
     */
    pagination: {
      label: "Order pages",
      pages: ["1", "2", "3", "4", "5"],
      activePage: "1",
    },
  },
  trash: {
    title: "Trash",
    back: "Back to Orders",
    tabs: [
      { label: "Orders", count: 2, icon: "boxes" as const, active: true },
      { label: "Quotes", count: 0, icon: "fileLines" as const, active: false },
      { label: "Purchases", count: 1, icon: "cart" as const, active: false },
    ],
    search: "Search ID or customer",
    historyToggle: "Full history",
    /*
     * The live legend uses an em dash. The rest of this site does not, so the
     * separator is the only thing changed from the shipped copy.
     */
    legend: [
      { tone: "active" as const, lead: "Active", body: "record · restore items one by one" },
      {
        tone: "deleted" as const,
        lead: "Deleted",
        body: "record · restore it and every item returns with it",
      },
    ],
    retention: "Emptied automatically after 30 days",
    rows: [
      {
        id: "BP-1588",
        customer: "Pearl Cosmetics Ltd",
        removed: "Deleted by Grace Nakato · 2 days ago",
        expires: "28 days left",
        tone: "deleted" as const,
      },
      {
        id: "BP-1571",
        customer: "Victoria Millers Ltd",
        removed: "1 line item removed by Daniel Okello · 6 days ago",
        expires: "24 days left",
        tone: "active" as const,
      },
    ],
    restore: "Restore",
    /*
     * Shown beneath the populated list rather than instead of it, and labelled,
     * because the empty state is where the rule is actually taught and a reader
     * should not have to imagine it.
     */
    emptyLabel: "AND WHEN THERE IS NOTHING IN IT",
    emptyTitle: "No deleted orders",
    emptyBody:
      "When you delete an order or one of its items, it lands here for 30 days so you can recover it.",
  },
  footer: {
    left: "Services provided with",
    leftTail: "by Bhatt Studios",
    right: "© Bhatt Studios 2026",
    licencePrefix: "licensed under",
    licence: "CC BY-NC-ND 4.0",
  },
  version: "Sales v3.3.0",
};

/* --- intake --------------------------------------------------------------- */

export const intake = {
  /*
   * Not "INTAKE · ..." again: the frame this sits in is already headed with that
   * word, and two labels running the same first word read as one label repeated
   * rather than as a frame and a thing inside it.
   */
  queueLabel: "IN THE QUEUE RIGHT NOW",
  queue: [
    { text: "WhatsApp · 4 pending", tone: "blue" as const },
    { text: "Scanned PO · 2 pending", tone: "blue" as const },
    { text: "PDF · 1 needs a human", tone: "ochre" as const },
  ],
  sourceLabel: "WHAT ARRIVED · WHATSAPP PHOTO, HANDWRITTEN",
  /* Drawn as ruled lines with the readable bits called out, not as fake handwriting. */
  source: {
    from: "+256 7xx xxx 118 · Nile Beverages",
    lines: [
      { text: "NILE BEVERAGES LTD", ref: "header" },
      { text: "PO 4471 / 26", ref: "line 1" },
      { text: "PP sacks 25kg  ·  40,000 pcs  @ 1,250", ref: "line 3" },
      { text: "deliver by 14/03", ref: "line 5", uncertain: true },
    ],
  },
  draftLabel: "WHAT THE MODEL PROPOSED · DRAFT, NOT A RECORD",
  draft: {
    fields: [
      { key: "Customer", value: "Nile Beverages Ltd", from: "from the header" },
      { key: "Reference", value: "PO 4471/26", from: "from line 1" },
      { key: "Product", value: "Woven PP sack 25kg", from: "from line 3" },
      { key: "Quantity", value: "40,000 pcs", from: "from line 3" },
      { key: "Price per unit", value: "UGX 1,250.00", from: "from line 3" },
    ],
    flagged: {
      key: "Delivery date",
      value: "14 / 03 ?",
      note: "Year not written. Check this before approving.",
    },
    approve: "Approve and create order",
    reject: "Send back",
    footnote: "Nothing is written to the order book until somebody presses approve.",
  },
};

/* --- the living interface -------------------------------------------------- */

export const banner = {
  label: "THIS WEEK",
  headline: "Eid al-Fitr:\ndispatch pauses Thu",
  note: "Deadlines auto-shifted · 14 orders re-scheduled",
};

export interface DispatchOrder {
  id: string;
  customer: string;
  /** Set when this delivery was moved off a closed day onto this one. */
  movedFrom?: string;
}

export interface DispatchDay {
  iso: string;
  closed?: boolean;
  holiday?: { name: string; greeting: string; observed: string };
  /** Where this day's own deliveries went, for a closed day. */
  movedTo?: string;
  /**
   * Set on the day that takes a closed day's work. Held as data rather than
   * inferred from a count: a busy Tuesday and a Friday carrying Thursday as
   * well can hold the same number and mean different things.
   */
  absorbedFrom?: string;
  /**
   * No `load`, `movedCount` or `absorbedCount` here. Every one of them is a
   * count of `orders`, and storing a number beside the list it counts is how
   * the two came to disagree.
   */
  orders?: DispatchOrder[];
}

/*
 * March 2026, Monday first. A dispatch calendar is read against the working
 * week, so the week starts where the work does rather than on Sunday.
 *
 * Eid al-Fitr 1447 is expected on or about 19 to 20 March 2026 and, like every
 * lunar date, is confirmed locally by sighting. The system treats it as a
 * provisional date until it is confirmed, and the panel says so, because
 * silently asserting a date that can move by a day is exactly the kind of
 * confident wrongness that stops people trusting the tool.
 */
export const dispatchCalendar = {
  title: "Dispatch calendar",
  monthIso: "2026-03",
  monthName: "March 2026",
  today: "2026-03-16",
  initialDay: "2026-03-19",
  weekdays: [
    { short: "Mo", full: "Monday" },
    { short: "Tu", full: "Tuesday" },
    { short: "We", full: "Wednesday" },
    { short: "Th", full: "Thursday" },
    { short: "Fr", full: "Friday" },
    { short: "Sa", full: "Saturday" },
    { short: "Su", full: "Sunday" },
  ],
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
  legend: [
    { tone: "closed" as const, label: "Dispatch closed" },
    { tone: "heavy" as const, label: "Absorbing a closed day" },
    { tone: "open" as const, label: "Running normally" },
  ],
  /*
   * A bare figure in a cell is a figure nobody can read. The glyph names it in
   * the grid and this line names it in the legend, so the number means
   * something before anyone clicks a day to find out.
   */
  countLegend: "Deliveries scheduled",
  labels: {
    closed: "Dispatch closed",
    running: "Dispatch running",
    load: "deliveries",
    loadOne: "delivery",
    none: "Nothing scheduled. Dispatch does not run at weekends.",
    movedTo: "Moved to",
    movedFrom: "Moved from Thu 19 Mar",
    provisional: "Provisional date, confirmed by local sighting",
    todayLabel: "today",
    heavyNote: "Heavier than usual: it is carrying Thursday as well.",
    /*
     * Reads as the affordance it is on the real screen rather than as a
     * truncation notice. The rest of the day's deliveries are one press away
     * there, and a bare "+ 8 more" says the list gave up.
     */
    showMore: "Show",
    more: "more ↓",
    selectHint: "Pick a day to see what dispatch can promise.",
  },
  note: "Working component. The arrow keys walk the month and the panel follows.",
  /*
   * One entry per delivery, and the day's count is read off the length of this
   * list rather than stored beside it. Holding both meant they could disagree,
   * and they did: a cell read 9 while its panel listed one.
   *
   * Volumes are the business's own order rate, roughly five deliveries a working
   * day against 1,284 orders a year, building into the holiday and peaking at
   * month end. Weekends carry none because dispatch does not run.
   */
  days: [
    {
      iso: "2026-03-02",
      orders: [
        { id: "BP-1521", customer: "Nile Beverages Ltd" },
        { id: "BP-1522", customer: "Serengeti Snacks Ltd" },
        { id: "BP-1523", customer: "Kigo Dairy Ltd" },
        { id: "BP-1524", customer: "Rwenzori Tea Exports" },
      ],
    },
    {
      iso: "2026-03-03",
      orders: [
        { id: "BP-1525", customer: "Victoria Millers Ltd" },
        { id: "BP-1526", customer: "Pearl Cosmetics Ltd" },
        { id: "BP-1527", customer: "Bunyoro Grain Traders" },
        { id: "BP-1528", customer: "Savannah Foods Ltd" },
        { id: "BP-1529", customer: "Equator Agro Processors" },
      ],
    },
    {
      iso: "2026-03-04",
      orders: [
        { id: "BP-1530", customer: "Mbale Millers Ltd" },
        { id: "BP-1531", customer: "Nile Beverages Ltd" },
        { id: "BP-1532", customer: "Serengeti Snacks Ltd" },
      ],
    },
    {
      iso: "2026-03-05",
      orders: [
        { id: "BP-1533", customer: "Kigo Dairy Ltd" },
        { id: "BP-1534", customer: "Rwenzori Tea Exports" },
        { id: "BP-1535", customer: "Victoria Millers Ltd" },
        { id: "BP-1536", customer: "Pearl Cosmetics Ltd" },
        { id: "BP-1537", customer: "Bunyoro Grain Traders" },
      ],
    },
    {
      iso: "2026-03-06",
      orders: [
        { id: "BP-1538", customer: "Savannah Foods Ltd" },
        { id: "BP-1539", customer: "Equator Agro Processors" },
        { id: "BP-1540", customer: "Mbale Millers Ltd" },
        { id: "BP-1541", customer: "Nile Beverages Ltd" },
        { id: "BP-1542", customer: "Serengeti Snacks Ltd" },
        { id: "BP-1543", customer: "Kigo Dairy Ltd" },
      ],
    },
    {
      iso: "2026-03-08",
      /* A Sunday, so nothing was scheduled to move. Still named. */
      closed: true,
      holiday: {
        name: "International Women's Day",
        greeting: "A public holiday in Uganda.",
        observed: "Nationwide",
      },
    },
    {
      iso: "2026-03-09",
      orders: [
        { id: "BP-1544", customer: "Rwenzori Tea Exports" },
        { id: "BP-1545", customer: "Victoria Millers Ltd" },
        { id: "BP-1546", customer: "Pearl Cosmetics Ltd" },
        { id: "BP-1547", customer: "Bunyoro Grain Traders" },
        { id: "BP-1548", customer: "Savannah Foods Ltd" },
      ],
    },
    {
      iso: "2026-03-10",
      orders: [
        { id: "BP-1549", customer: "Equator Agro Processors" },
        { id: "BP-1550", customer: "Mbale Millers Ltd" },
        { id: "BP-1551", customer: "Nile Beverages Ltd" },
        { id: "BP-1552", customer: "Serengeti Snacks Ltd" },
      ],
    },
    {
      iso: "2026-03-11",
      orders: [
        { id: "BP-1553", customer: "Kigo Dairy Ltd" },
        { id: "BP-1554", customer: "Rwenzori Tea Exports" },
        { id: "BP-1555", customer: "Victoria Millers Ltd" },
        { id: "BP-1556", customer: "Pearl Cosmetics Ltd" },
        { id: "BP-1557", customer: "Bunyoro Grain Traders" },
      ],
    },
    {
      iso: "2026-03-12",
      orders: [
        { id: "BP-1558", customer: "Savannah Foods Ltd" },
        { id: "BP-1559", customer: "Equator Agro Processors" },
        { id: "BP-1560", customer: "Mbale Millers Ltd" },
      ],
    },
    {
      iso: "2026-03-13",
      orders: [
        { id: "BP-1561", customer: "Nile Beverages Ltd" },
        { id: "BP-1562", customer: "Serengeti Snacks Ltd" },
        { id: "BP-1563", customer: "Kigo Dairy Ltd" },
        { id: "BP-1564", customer: "Rwenzori Tea Exports" },
        { id: "BP-1565", customer: "Victoria Millers Ltd" },
        { id: "BP-1566", customer: "Pearl Cosmetics Ltd" },
      ],
    },
    {
      iso: "2026-03-16",
      orders: [
        { id: "BP-1567", customer: "Bunyoro Grain Traders" },
        { id: "BP-1568", customer: "Savannah Foods Ltd" },
        { id: "BP-1569", customer: "Equator Agro Processors" },
        { id: "BP-1570", customer: "Mbale Millers Ltd" },
        { id: "BP-1571", customer: "Nile Beverages Ltd" },
      ],
    },
    {
      iso: "2026-03-17",
      orders: [
        { id: "BP-1572", customer: "Serengeti Snacks Ltd" },
        { id: "BP-1573", customer: "Kigo Dairy Ltd" },
        { id: "BP-1574", customer: "Rwenzori Tea Exports" },
        { id: "BP-1575", customer: "Victoria Millers Ltd" },
        { id: "BP-1576", customer: "Pearl Cosmetics Ltd" },
      ],
    },
    {
      iso: "2026-03-18",
      orders: [
        { id: "BP-1577", customer: "Bunyoro Grain Traders" },
        { id: "BP-1578", customer: "Savannah Foods Ltd" },
        { id: "BP-1579", customer: "Equator Agro Processors" },
        { id: "BP-1580", customer: "Mbale Millers Ltd" },
        { id: "BP-1581", customer: "Nile Beverages Ltd" },
        { id: "BP-1582", customer: "Serengeti Snacks Ltd" },
      ],
    },
    {
      iso: "2026-03-19",
      closed: true,
      holiday: {
        name: "Eid al-Fitr",
        greeting: "Eid Mubarak to everyone observing.",
        observed: "Provisional",
      },
      movedTo: "Fri 20 Mar",
      orders: [
        { id: "BP-1583", customer: "Kigo Dairy Ltd" },
        { id: "BP-1584", customer: "Rwenzori Tea Exports" },
        { id: "BP-1585", customer: "Victoria Millers Ltd" },
        { id: "BP-1586", customer: "Pearl Cosmetics Ltd" },
        { id: "BP-1587", customer: "Bunyoro Grain Traders" },
        { id: "BP-1588", customer: "Savannah Foods Ltd" },
        { id: "BP-1589", customer: "Equator Agro Processors" },
        { id: "BP-1590", customer: "Mbale Millers Ltd" },
        { id: "BP-1591", customer: "Nile Beverages Ltd" },
        { id: "BP-1592", customer: "Serengeti Snacks Ltd" },
        { id: "BP-1593", customer: "Kigo Dairy Ltd" },
        { id: "BP-1594", customer: "Rwenzori Tea Exports" },
        { id: "BP-1595", customer: "Victoria Millers Ltd" },
        { id: "BP-1596", customer: "Pearl Cosmetics Ltd" },
      ],
    },
    {
      iso: "2026-03-20",
      absorbedFrom: "Thu 19 Mar",
      orders: [
        { id: "BP-1597", customer: "Bunyoro Grain Traders" },
        { id: "BP-1598", customer: "Savannah Foods Ltd" },
        { id: "BP-1599", customer: "Equator Agro Processors" },
        { id: "BP-1600", customer: "Mbale Millers Ltd" },
        { id: "BP-1601", customer: "Nile Beverages Ltd" },
        { id: "BP-1602", customer: "Serengeti Snacks Ltd" },
        { id: "BP-1603", customer: "Kigo Dairy Ltd", movedFrom: "2026-03-19" },
        { id: "BP-1604", customer: "Rwenzori Tea Exports", movedFrom: "2026-03-19" },
        { id: "BP-1605", customer: "Victoria Millers Ltd", movedFrom: "2026-03-19" },
        { id: "BP-1606", customer: "Pearl Cosmetics Ltd", movedFrom: "2026-03-19" },
        { id: "BP-1607", customer: "Bunyoro Grain Traders", movedFrom: "2026-03-19" },
        { id: "BP-1608", customer: "Savannah Foods Ltd", movedFrom: "2026-03-19" },
        { id: "BP-1609", customer: "Equator Agro Processors", movedFrom: "2026-03-19" },
        { id: "BP-1610", customer: "Mbale Millers Ltd", movedFrom: "2026-03-19" },
        { id: "BP-1611", customer: "Nile Beverages Ltd", movedFrom: "2026-03-19" },
        { id: "BP-1612", customer: "Serengeti Snacks Ltd", movedFrom: "2026-03-19" },
        { id: "BP-1613", customer: "Kigo Dairy Ltd", movedFrom: "2026-03-19" },
        { id: "BP-1614", customer: "Rwenzori Tea Exports", movedFrom: "2026-03-19" },
        { id: "BP-1615", customer: "Victoria Millers Ltd", movedFrom: "2026-03-19" },
        { id: "BP-1616", customer: "Pearl Cosmetics Ltd", movedFrom: "2026-03-19" },
      ],
    },
    {
      iso: "2026-03-23",
      orders: [
        { id: "BP-1617", customer: "Bunyoro Grain Traders" },
        { id: "BP-1618", customer: "Savannah Foods Ltd" },
        { id: "BP-1619", customer: "Equator Agro Processors" },
        { id: "BP-1620", customer: "Mbale Millers Ltd" },
        { id: "BP-1621", customer: "Nile Beverages Ltd" },
      ],
    },
    {
      iso: "2026-03-24",
      orders: [
        { id: "BP-1622", customer: "Serengeti Snacks Ltd" },
        { id: "BP-1623", customer: "Kigo Dairy Ltd" },
        { id: "BP-1624", customer: "Rwenzori Tea Exports" },
        { id: "BP-1625", customer: "Victoria Millers Ltd" },
      ],
    },
    {
      iso: "2026-03-25",
      orders: [
        { id: "BP-1626", customer: "Pearl Cosmetics Ltd" },
        { id: "BP-1627", customer: "Bunyoro Grain Traders" },
        { id: "BP-1628", customer: "Savannah Foods Ltd" },
        { id: "BP-1629", customer: "Equator Agro Processors" },
        { id: "BP-1630", customer: "Mbale Millers Ltd" },
      ],
    },
    {
      iso: "2026-03-26",
      orders: [
        { id: "BP-1631", customer: "Nile Beverages Ltd" },
        { id: "BP-1632", customer: "Serengeti Snacks Ltd" },
        { id: "BP-1633", customer: "Kigo Dairy Ltd" },
      ],
    },
    {
      iso: "2026-03-27",
      orders: [
        { id: "BP-1634", customer: "Rwenzori Tea Exports" },
        { id: "BP-1635", customer: "Victoria Millers Ltd" },
        { id: "BP-1636", customer: "Pearl Cosmetics Ltd" },
        { id: "BP-1637", customer: "Bunyoro Grain Traders" },
        { id: "BP-1638", customer: "Savannah Foods Ltd" },
        { id: "BP-1639", customer: "Equator Agro Processors" },
      ],
    },
    {
      iso: "2026-03-30",
      orders: [
        { id: "BP-1640", customer: "Mbale Millers Ltd" },
        { id: "BP-1641", customer: "Nile Beverages Ltd" },
        { id: "BP-1642", customer: "Serengeti Snacks Ltd" },
        { id: "BP-1643", customer: "Kigo Dairy Ltd" },
      ],
    },
    {
      iso: "2026-03-31",
      orders: [
        { id: "BP-1644", customer: "Rwenzori Tea Exports" },
        { id: "BP-1645", customer: "Victoria Millers Ltd" },
        { id: "BP-1646", customer: "Pearl Cosmetics Ltd" },
        { id: "BP-1647", customer: "Bunyoro Grain Traders" },
        { id: "BP-1648", customer: "Savannah Foods Ltd" },
        { id: "BP-1649", customer: "Equator Agro Processors" },
        { id: "BP-1650", customer: "Mbale Millers Ltd" },
      ],
    },
  ] as DispatchDay[],
};

/* --- closing panel mocks --------------------------------------------------- */

export const panelMocks = {
  /*
   * The tile and the same fact as a sentence, one above the other. The panel
   * argues that the figure is read before the sentence, so the mock has to show
   * both or the reader is taking the claim on trust.
   */
  glance: {
    label: "THE SAME FACT, TWICE",
    tile: {
      label: "Revenue",
      value: "UGX 2,847,650,000",
      delta: "+14.7%",
      since: "since last month",
    },
    sentenceLabel: "AS A SENTENCE",
    sentence:
      "Revenue for the month was UGX 2,847,650,000, an increase of 14.7 per cent on the previous month.",
  },
  recap: {
    label: "DECEMBER · THE YEAR, PER PERSON",
    title: "Your 2026 at Blitz",
    stats: [
      { value: "1,284", label: "orders shipped by the team" },
      { value: "214", label: "of them entered by you" },
      { value: "July", label: "the team's biggest month" },
    ],
    footer: "Generated against the [[design-tokens]], reviewed before it ships.",
  },
  cost: {
    label: "WHAT KEEPING IT ALIVE COSTS",
    /*
     * Shares of the annual bill, not amounts. Ordered longest first, because a
     * set of bars whose job is "which of these costs most" should not make the
     * reader do the sorting.
     *
     * Still no per-line figures: the total is the number I can stand behind,
     * and four invented amounts adding up to it would be the one dishonest
     * thing on the page. A share is a claim about proportion, which is all this
     * is being asked to say.
     */
    lines: [
      { label: "Hosting", share: 46 },
      { label: "AI usage", share: 22 },
      { label: "Domain", share: 17 },
      { label: "Email", share: 15 },
    ],
    totalLabel: "Total, per year",
    total: "< US$75",
    footnote: "Invoices I pay and forward. Design work: unpaid, by choice.",
  },
};
