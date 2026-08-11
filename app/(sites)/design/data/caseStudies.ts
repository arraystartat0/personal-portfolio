import type { SourceKey } from "./sources";

export interface WorkRow {
  number: string;
  href: string;
  title: string;
  summary: string;
  discipline: string;
  years: string;
  /** Hover thumbnail, from `public/`. Rows without one fall back to the swatch. */
  thumb?: string;
}

export interface Beat {
  kicker: string;
  title: string;
  body: string;
  cites?: readonly SourceKey[];
}

/** One line of an audit block: the claim, the explanation, and its sources. */
export interface CaseFinding {
  lead: string;
  body: string;
  cites?: readonly SourceKey[];
}

export interface MetaRow {
  key: string;
  value: string;
  href?: string;
}

/**
 * One line of the brief: something true about where the software has to run,
 * and the design decision that falls out of it. Kept as two fields rather than
 * one paragraph because the pairing is the argument, and a reader should be able
 * to check each consequence against the constraint that produced it.
 */
export interface BriefConstraint {
  kicker: string;
  finding: string;
  consequence: string;
  cites?: readonly SourceKey[];
}

export type MetricValue =
  | { kind: "text"; text: string }
  | { kind: "range"; from: string; to: string }
  | { kind: "count"; value: number; prefix?: string; suffix?: string }
  | { kind: "placeholder"; text: string };

export interface Metric {
  value: MetricValue;
  /** One entry per line, matching the two-line labels in the design. */
  label: string[];
  highlight?: boolean;
}

/*
 * Ordered by how much there is to read, not chronologically. The institute study
 * leads because it carries the most: two page rebuilds, five screens, a working
 * component and the fullest argument. A reader who only opens the first one
 * should meet the deepest piece of work, not the earliest.
 */
export const workRows: WorkRow[] = [
  {
    number: "01",
    href: "#c01",
    title: "Research, Not Directories",
    summary:
      "A research institute’s site, reorganised around problems instead of departments. A self-initiated concept.",
    discipline: "Information Architecture · Concept",
    years: "2026",
  },
  {
    number: "02",
    href: "#c02",
    title: "Blitz Packaging Ltd",
    summary:
      "I wasn't asked to redesign this. I made the case for it, then rebuilt their online branding, the structure and the way the team publishes.",
    discipline: "Brand · UI/UX · SEO",
    years: "2026",
    thumb: "/work/blitz-packaging.png",
  },
  {
    number: "03",
    href: "#c03",
    title: "Sales Platform",
    summary:
      "I shipped an ugly prototype to earn the data, then redesigned the system around what it taught me.",
    discipline: "Product & UI/UX · Data Visualisation · AI",
    years: "2024 to present",
  },
];

export const workIndex = {
  heading: "Case studies",
  hint: "hover a row · click to read",
  rows: workRows,
};

export const researchIa = {
  id: "c01",
  number: "01",
  eyebrow: "A research institute site, reorganised · 2026",
  /*
   * The summary is the whole disclosure in one line, and it is the line that
   * matters legally as well as editorially, so it is never folded away. The rest
   * is provenance for a reader who wants it, which is what a disclosure should
   * cost: one line to everyone, a paragraph to whoever asks.
   */
  disclaimer: {
    summary:
      "Disclaimer: this is a self-initiated concept with no affiliation with the University of British Columbia or ICICS.",
    hint: "Read more",
    body: [
      "I found a clusters page I thought could be considerably better, took it as a base and made the case. I have no inside knowledge of their constraints. Every render above is my own build in HTML and CSS, and it uses the University of British Columbia's published brand colours, because the before and the after have to share a palette or the comparison is just colour. No crest, wordmark or logo appears anywhere: those are theirs, and the argument is about structure.",
    ],
  },
  title: "World-class research, filed like an org chart.",
  /*
   * One block of two paragraphs now, rather than two columns, so the diagnosis
   * and the move read in sequence instead of as a pair to be compared. Kept
   * short for the same reason: this is the last thing before the exhibits, and
   * the exhibits are the argument.
   */
  intro: [
    "The institute's value is that its work crosses departments. Its site is an administrative directory, so that is the one thing you cannot see: research surfaces as news posts and PDFs, ages off the homepage in a fortnight, then stops existing.",
  ],
  thesis: {
    lead: "My move: make the research problem the primary organising unit.",
    body: " Not the department, not the membership category. People, labs, publications and news all hang off a problem. A directory answers \"who is a member?\" Members arrive asking \"who else is working on this?\"",
  },
  meta: [
    { key: "Designed for", value: "Members & faculty, first" },
    /*
     * The marker is back. It was cut when the tooltip could only open rightward
     * from its word, which put a term in this right-aligned column straight into
     * .root's clip. Term measures and pulls the tip back on screen now, so the
     * one word most likely to stop a reader can define itself where they meet it.
     */
    { key: "Scope", value: "Full [[ia]] rethink + 5 screens" },
    { key: "Design tools", value: "Figma, HTML & CSS rebuild" },
    /*
     * Carries the disclosure at the top of the page now that the full note sits
     * at the bottom. A reader meeting the university's blues in the renders
     * should not have to reach the footer to learn this was nobody's brief.
     */
    {
      key: "Status",
      value: "Unsolicited concept · not affiliated with the University of British Columbia or ICICS",
    },
  ] as MetaRow[],
  sourcesLabel: "SOURCES",
  sourcesHint: "Show the list",
  /*
   * A rebuild of the real clusters page, not a screenshot, so it can sit under
   * the wipe and be compared line for line with the proposal. Same six research
   * areas as the rework uses, so the comparison is treatment against treatment
   * rather than one set of content against another.
   *
   * Prose lengths are deliberately uneven. That is the finding, not sloppiness:
   * on the live page one cluster runs eight lines and the next runs two, and
   * nothing tells you which matters more.
   */
  currentSite: {
    label: "CURRENT SITE · REBUILT IN HTML, BRANDING REMOVED",
    breadcrumb: "Home / Research to Innovation / Research Clusters",
    title: "Research Clusters",
    intro:
      "The institute supports research clusters in areas of established and emerging strength. We provide various combinations of seed funding, lab and office space, workshop and conference logistical and financial support, and grant-writing and communications support to the following clusters:",
    sidebarLabel: "IN THIS SECTION",
    sidebar: ["Research Labs", "Research Clusters", "Integrated Sensing", "Ideas With Impact"],
    entries: [
      {
        name: "Human–computer interaction",
        lead: "Lead: A. Researcher, ECE.",
        body: "This cluster focuses on how people work with systems that learn, including interfaces for machine learning models, the design of explanations, and the study of trust and reliance in automated decision support across a range of applied settings.",
      },
      {
        name: "Robotics & autonomy",
        lead: "Leads: B. Researcher, Mech; C. Researcher, CS.",
        body: "The cluster endeavours to advance how machines act in unstructured space. By collaborating with experts in engineering, biology and public policy, it addresses key challenges such as manipulation under uncertainty, safe motion planning, and field deployment in remote environments, and it leverages advanced computational techniques and machine learning to promote resilient autonomous systems and enhance robotic communication.",
        external: true,
      },
      {
        name: "Medical imaging & health informatics",
        lead: "Leads: D. Researcher, Radiology; E. Researcher, BME.",
        body: "Turning scans, signals and records into decisions clinicians can act on.",
      },
      {
        name: "Machine learning & data",
        lead: "Lead: F. Researcher, CS (Director); G. Researcher, CS (Founding Director).",
        body: "The centre is the university's centre of excellence for method work and knowledge mobilisation, with a network of more than fifty professors leading groups that develop tools for decision-making and action. The centre also studies the social, policy and ethical impacts of the field.",
        external: true,
      },
      {
        name: "Sensing, networks & devices",
        lead: "Lead: H. Researcher, ECE.",
        body: "The hardware layer everything else assumes.",
      },
      {
        name: "Cognitive systems",
        lead: "Leads: I. Researcher, Psychology; J. Researcher, CS.",
        body: "This cluster brings together work on minds, models and where they diverge, spanning perception, memory and language, and connecting experimental work with computational accounts of the same phenomena.",
      },
    ],
  },
  /*
   * Every finding names something visible in the render above it. The institute
   * describes itself as multidisciplinary with 150 faculty across 10 faculties,
   * so "you cannot see the collaboration" is measured against their own words,
   * not against my taste.
   */
  diagnosis: {
    label: "DIAGNOSIS · WHAT THE PAGE CANNOT TELL YOU",
    findings: [
      {
        lead: "Every cluster is a paragraph.",
        body: " Name, lead, then prose. No counts, no tags, no dates: nothing is broken out, so the only way to compare two clusters is to read both and hold them in your head.",
      },
      {
        lead: "One runs eight lines, the next runs two.",
        body: " Length tracks who wrote the entry, not how much work sits behind it, and on a page with no other signals length is the only signal.",
      },
      {
        lead: "Some clusters lead off the site entirely.",
        body: " A few names are links to a separately built cluster website with its own navigation and its own look. Others go nowhere at all. Either way the institute stops being the place its research lives.",
      },
      {
        lead: "The overlap is in the prose, never in the structure.",
        body: " Individual entries mention working with clinicians, or with marine biology and public policy. That cross-faculty collaboration is the institute's stated purpose, and the page can only tell you about it one paragraph at a time.",
        cites: ["icics"] as const,
      },
    ] as CaseFinding[],
  },
  resolution: {
    label: "WHAT THE REWORK DOES · AND WHY IT WORKS",
    findings: [
      {
        lead: "A card that answers before you read it.",
        body: " Name, one line of what it is, then people and labs as figures, in the same shape every time so a short entry no longer reads as a minor one. You can rank six of these without finishing a sentence.",
        cites: ["nielsen-reading", "f-pattern"] as const,
      },
      {
        lead: "Departments as tags, not as prose.",
        body: " The faculties involved sit on the card as badges. Two clusters sharing a tag is the collaboration the institute exists for, finally visible in the structure instead of buried in the fourth sentence of a paragraph.",
        cites: ["icics"] as const,
      },
      {
        lead: "Overlap is a first-class field.",
        body: " Each cluster names the others it shares people with. That is the question a member actually arrives with, and no amount of prose per cluster can answer it: the answer lives between clusters.",
        cites: ["pirolli-card"] as const,
      },
      {
        lead: "Every cluster stays on the institute.",
        body: " A cluster page is a page here, with its people, labs, publications and facilities attached, and outside project sites become one link among those.",
      },
    ] as CaseFinding[],
  },
  cardSort: {
    kicker: "THE INSIGHT",
    title: "A department is an answer to a question nobody asked.",
    body: "I sorted the existing site's content the way a member would: by what they came to do. Almost nothing sorted cleanly under a department, but everything sorted under a problem. That [[card-sort]] is the entire argument, and it's the artifact I'd run properly with real members on day one.",
    label: "CARD SORT · 6 CLUSTERS EMERGED",
    note: "Placeholder clusters, to be replaced by a real sort with members",
    clusters: [
      { name: "Human–computer interaction", count: "24 people" },
      { name: "Robotics & autonomy", count: "19 people" },
      { name: "Medical imaging & health informatics", count: "31 people" },
      { name: "Machine learning & data", count: "27 people" },
      { name: "Sensing, networks & devices", count: "22 people" },
      { name: "Cognitive systems", count: "16 people" },
    ],
  },
  architecture: {
    kicker: "THE INFORMATION ARCHITECTURE",
    title: "One structural change does all the work.",
    body: "Today research is a leaf node in the [[ia]]: buried under news, or a PDF attached to a member's page. Move it to the root and the cross-departmental collaboration the institute exists for becomes the thing you browse, not the thing you have to already know about.",
    now: {
      label: "NOW · ADMINISTRATIVE DIRECTORY",
      root: "Institute",
      children: {
        before: "About · Members ",
        muted: "(by department)",
        after: " · News · Events · Facilities · Contact",
      },
      footnote: {
        before: "↳ research lives ",
        emphasis: "inside",
        after: " news posts and PDFs",
      },
    },
    proposed: {
      label: "PROPOSED · PROBLEM FIRST",
      root: "Institute",
      primary: "Research problems",
      primaryCount: "(6)",
      children: "↳ people · labs · publications · news · facilities",
      footnote: "About · Join · Members' tools",
    },
  },
  screens: {
    proposedLabel: "PROPOSED · 2026: THE REWORK",
    homeKicker: "SCREEN 01 · HOME",
    problemKicker: "SCREEN 02 · ONE PROBLEM",
  },
  home: {
    /* Kept because the institute is required to carry it. Unbranded here. */
    instituteBand: "[ INSTITUTE NAME ]",
    /* Names the linked people, the way the current page's bold "Lead:" does. */
    leadsLabel: "Led by:",
    memberBar: {
      label: "MEMBERS",
      links: ["Book space", "Grant deadlines", "Internal directory"],
      signIn: "Sign in",
    },
    nav: ["Research", "People", "Labs", "News", "Join"],
    search: "Search ⌕",
    kicker: "WHAT WE'RE WORKING ON",
    headline: "Six problems, and everyone here working on them.",
    body: "People, labs, publications and funding all hang off a problem, so you can see who to talk to before you know their department.",
    /*
     * tags and overlap are the whole argument of this screen. Every other field
     * describes a cluster on its own; these two are the only ones that say
     * anything about the space between clusters, which is what the institute
     * exists to support and what a directory structurally cannot show.
     *
     * Counts and names are placeholders until a real sort with members.
     */
    problems: [
      {
        name: "Human–computer interaction",
        leads: ["A. Researcher", "K. Researcher"],
        blurb: "How people work with systems that learn.",
        meta: "24 people · 6 labs",
        tags: ["CS", "ECE", "Psychology"],
        overlap: "Shares people with Machine learning & data, Cognitive systems",
      },
      {
        name: "Robotics & autonomy",
        leads: ["B. Researcher", "C. Researcher"],
        blurb: "Machines that act in unstructured space.",
        meta: "19 people · 5 labs",
        tags: ["Mech", "ECE", "CS"],
        overlap: "Shares people with Sensing, networks & devices",
      },
      {
        name: "Medical imaging & health informatics",
        leads: ["D. Researcher", "E. Researcher"],
        blurb: "Turning scans and records into decisions.",
        meta: "31 people · 7 labs",
        tags: ["ECE", "CS", "Radiology", "BME"],
        overlap: "Shares people with Machine learning & data",
        active: true,
      },
      {
        name: "Machine learning & data",
        leads: ["F. Researcher", "G. Researcher"],
        blurb: "Method work, and what it costs to deploy.",
        meta: "27 people · 8 labs",
        tags: ["CS", "Statistics", "ECE"],
        overlap: "Shares people with 4 of the 5 other problems",
      },
      {
        name: "Sensing, networks & devices",
        leads: ["H. Researcher"],
        blurb: "The hardware layer everything else assumes.",
        meta: "22 people · 6 labs",
        tags: ["ECE", "Mech"],
        overlap: "Shares people with Robotics & autonomy",
      },
      {
        name: "Cognitive systems",
        leads: ["I. Researcher", "J. Researcher"],
        blurb: "Minds, models, and where they diverge.",
        meta: "16 people · 4 labs",
        tags: ["Psychology", "CS", "iSchool"],
        overlap: "Shares people with Human–computer interaction",
      },
    ],
    fromTheLabs: {
      label: "FROM THE LABS",
      rows: [
        { kind: "Preprint", text: "[ Placeholder: tagged to a problem, not just dated ]" },
        { kind: "Grant", text: "[ Placeholder: surfaces on the problem page too ]" },
      ],
    },
  },
  problem: {
    breadcrumb: { parent: "Research", current: "Medical imaging & health informatics" },
    title: "Medical imaging & health informatics",
    body: "Turning scans, signals and records into decisions clinicians can act on. Four departments, one problem. Placeholder copy, to be written with the leads.",
    stats: [
      { value: "31", label: "PEOPLE" },
      { value: "7", label: "LABS" },
      { value: "84", label: "PUBLICATIONS" },
      { value: "4", label: "OPENINGS" },
    ],
    tabs: ["People", "Labs", "Publications", "News", "Facilities"],
    people: [
      "Electrical & Computer Eng.",
      "Computer Science",
      "Radiology",
      "Biomedical Eng.",
      "Computer Science",
      "Statistics",
    ],
    aside: {
      why: {
        label: "WHY THIS PAGE EXISTS",
        body: 'A member arrives asking "who else here is working on this?" A directory can\'t answer that. This page can, and it answers it across four departments at once.',
      },
      departments: {
        label: "DEPARTMENTS INVOLVED",
        items: [
          "Electrical & Computer Engineering",
          "Computer Science",
          "Radiology",
          "Biomedical Engineering",
        ],
      },
      shortcuts: {
        label: "MEMBER SHORTCUTS",
        items: ["Book the imaging suite", "Grant deadlines for this cluster"],
      },
    },
  },
  /*
   * A heading, not another kicker. The three panels below each open with a 10px
   * ochre label, so a fourth one here would sit beside its own children rather
   * than above them.
   */
  features: {
    title: "Features",
    /*
     * The second sentence is the only place this study says where the first two
     * features came from. The rest of it is an unsolicited concept, so the part
     * that answers a stated requirement should name the requirement rather than
     * let a reader assume it was invented along with everything else.
     */
    note: "What the rework adds, and what each one is for.",
  },
  /*
   * The three things the rework is actually arguing for, each with a small
   * mockup so a reader sees the idea rather than reading a claim about it.
   * Accessibility leads because it is the one that is non-negotiable.
   */
  principles: [
    {
      kicker: "ACCESSIBILITY · BUILT TO WCAG 2.1 AA",
      body: "Contrast that clears 4.5:1 on body text and 3:1 on large text, a visible focus ring on everything reachable by keyboard, a heading order you can navigate by, and no colour carrying meaning on its own: [[wcag]] 2.1 at level AA, measured rather than claimed. An institute publishes for everyone who might read it, so this is a constraint the design starts from rather than an audit bolted on at the end.",
      mock: "accessibility" as const,
      cites: ["wcag", "w3c"] as const,
    },
    {
      kicker: "THE FILTER · RELATIONSHIPS, NOT KEYWORDS",
      body: "Filter by problem, by department, by which clusters already share people with which, and by whether a cluster is taking students. The third one is the point: choosing Radiology does not only return clusters tagged Radiology, it returns the ones collaborating with it. A keyword filter can only find what somebody remembered to type into a paragraph.",
      mock: "filter" as const,
      cites: ["icics", "pirolli-card"] as const,
    },
    {
      kicker: "FAMILIAR UI · WHY IT IS ROUNDED",
      body: "Rounded cards, pill controls, tags: the vocabulary of the interfaces people already use every day. An unfamiliar pattern spends working memory on the interface instead of on the research. A first-year who has never read a paper should not also have to decode a website in order to find the person they want to work with.",
      mock: "familiar" as const,
      cites: ["jakobs-law", "sweller"] as const,
    },
  ],
};

export const blitz = {
  id: "c02",
  number: "02",
  eyebrow: "Blitz Packaging Limited · 2024 to present · sole designer & developer",
  title: "A factory with no front door.",
  intro:
    "My first job as their designer was to stop treating the website as decoration. Blitz makes packaging for companies across Uganda, and what a buyer met was four hand-maintained pages that never named the thing they were searching for. I wasn’t hired to restyle it; I asked to rebuild how it was organised, and then made the case for it.",
  meta: [
    {
      key: "My role",
      value: "Research, design & apply branding, UI, build website, handover, maintenance & analytics",
    },
    { key: "Tech Stack", value: "HTML, CSS, vanilla JS, PHP, Font Awesome" },
    { key: "Design tools", value: "Figma, Illustrator" },
    { key: "Live site", value: "blitzpackaging.co.ug ↗", href: "https://blitzpackaging.co.ug" },
  ] as MetaRow[],
  beforeLabel: "BEFORE · 2024: WHAT I INHERITED",
  /*
   * Reads as an audit of the render above it, so every finding names something
   * visible in that frame or measurable in Search Console. No adjectives:
   * "dated" is an opinion, "nothing a buyer searched for had a page" is not.
   */
  diagnosis: {
    label: "DIAGNOSIS · WHAT IT COST THEM",
    findings: [
      {
        lead: "Four pages, a dozen product lines.",
        body: " Carrier bags, bread bags, shrink wrap and the rest all shared a single Our Products strip. Nothing a buyer searched for had a page of its own to land on.",
      },
      {
        lead: "It never used the words buyers type.",
        body: " Someone looking for carrier bags in Kampala found nothing here to match. The site answered to the company name, which is the one search nobody runs.",
      },
      {
        lead: "The homepage opened on a carousel.",
        body: " No headline, no claim, nothing naming what the company actually made. The first words on the page were Who we are, then three paragraphs of company description before the first product appeared.",
      },
      {
        lead: "No accessibility baseline.",
        body: " No visible focus states, no considered heading order, no alt text discipline. None of it had been measured against [[wcag]].",
      },
    ] as CaseFinding[],
  },
  afterLabel: "AFTER · 2026: WHAT I SHIPPED",
  sourcesLabel: "SOURCES",
  sourcesHint: "Show the list",
  /*
   * Answers the diagnosis in its own order, so the two blocks read as one
   * argument run forwards and back. Claims that rest on research
   * carry the citation; the ones that are just decisions do not, because
   * decorating an ordinary choice with a footnote devalues the real ones.
   */
  resolution: {
    label: "WHAT THE REBUILD DOES · AND WHY IT WORKS",
    findings: [
      {
        lead: "Twelve pages, one per thing they sell.",
        body: " Carrier bags, bread bags, shrink wrap and the rest each got a page of their own, named for the thing itself and ending in a way to ask what it costs. A buyer following a search lands on the answer instead of a homepage that happens to mention it.",
        cites: ["pirolli-card"] as const,
      },
      {
        lead: "A headline where the carousel was.",
        body: " Visual appeal is judged in roughly 50 milliseconds, before anyone reads a word, and auto-advancing panels get mistaken for adverts and skipped. So the hero holds still and carries one sentence, with three capabilities under it in six words each. People get through somewhere between a fifth and a quarter of the words on a page, and anything longer is a page you choose to open.",
        cites: ["lindgaard", "nielsen-carousels", "nielsen-reading"] as const,
      },
      {
        lead: "Pages with nothing to wait for.",
        body: " Shared components render flat pages with no database in the request path. Google's study with Deloitte measured a 0.1 second gain in mobile load time moving retail conversions by 8.4 percent, and the cheapest way to buy that time is never to spend it.",
        cites: ["deloitte"] as const,
      },
      {
        lead: "Accessibility built in, not retrofitted.",
        body: " Focus states, heading order and alt text live in the components rather than in an audit at the end. The W3C's case is that this widens reach and lowers legal exposure at once.",
        cites: ["w3c"] as const,
      },
    ] as CaseFinding[],
  },
  transition:
    "I didn't just restyle this. I rebuilt how it was organised: one page for each thing a buyer searches for, built for [[seo]] from shared components and a custom [[cms]], so the team can keep it moving without me.",
  beats: [
    {
      kicker: "THE INSIGHT",
      title: "Nobody searches your company name.",
      body: "Buyers type “carrier bags Uganda”, not “Blitz Packaging”. So the site stopped being a brochure and became twelve pages, one for each thing they make. Each one answers the silent question a buyer arrives with: can these people actually do it?",
    },
    {
      kicker: "THE CRAFT",
      title: "Google reads the page before any buyer does.",
      body: "Every page has two readers: the crawler that decides who finds it, and the person who arrives. Write for one and you lose the other, because words chosen to rank read like a list. So I stacked them. The line above the headline is the search phrase itself, “flexible plastic packaging solutions in Uganda”. The headline under it is for the human who just landed.",
    },
    {
      kicker: "THE HANDOVER",
      title: "Designed for how buyers actually make contact.",
      body: "A floating WhatsApp button, because that is the channel Kampala buyers actually use, not a form built for how I'd like them to behave. People arrive carrying the habits every other app taught them, and a site that argues with those habits loses. The publishing workflow means the marketing team runs the site alone: news, campaigns, Google Ads. I don’t want to be a dependency.",
      cites: ["jakobs-law"] as const,
    },
  ] as Beat[],
  /*
   * One sketch per beat, the same move the other two studies make: draw the
   * claim so a reader sees it instead of taking it on trust.
   *
   * Each one quotes something real from the rebuild rendered above rather than
   * inventing a prettier version of it. The hero sketch uses the live eyebrow and
   * headline verbatim, so a reader who scrolls back finds the same two lines.
   */
  beatMocks: {
    /*
     * No label above it and no note under it. A search bar with a query typed in
     * needs neither: the reader has met one of these before, and captioning it
     * would explain a thing that is already explaining itself.
     */
    search: {
      query: "carrier bags uganda",
      url: "blitzpackaging.co.ug › carrier-bags",
      title: "Carrier Bags in Uganda",
      snippet:
        "Printed and plain carrier bags for supermarkets, bakeries and laundries in Kampala.",
    },
    hero: {
      label: "ONE HERO, TWO READERS",
      crawlerFor: "READ BY THE CRAWLER",
      crawler: "FLEXIBLE PLASTIC PACKAGING SOLUTIONS IN UGANDA",
      personFor: "READ BY THE BUYER",
      person: "Packaging that carries your brand forward.",
    },
    handover: {
      label: "PINNED TO EVERY PAGE",
      button: "✆ WhatsApp",
      publishLabel: "PUBLISHED WITHOUT ME",
      published: "News · Campaigns · Google Ads",
    },
  },
  metricsLabel: "RESULTS · MEASURED, NOT CLAIMED",
  metrics: [
    {
      value: { kind: "count", value: 7, suffix: "×" },
      label: ["monthly search impressions,", "100 → roughly 700"],
    },
    {
      value: { kind: "count", value: 30, prefix: "~" },
      label: ["inquiries a month,", "from almost none"],
      highlight: true,
    },
    {
      value: { kind: "range", from: "2", to: "5%" },
      label: ["average click-through", "(Google Search Console)"],
    },
  ] as Metric[],
};

export const salesPlatform = {
  id: "c03",
  number: "03",
  eyebrow: "Sales platform · Blitz Packaging Limited · 2024 to present · sole designer & developer",
  /*
   * The title names the constraint rather than the product, because the
   * constraint is what makes every other decision in this study non-obvious.
   * "Software shaped around them" was true and said nothing a reader could see.
   */
  title: "The power cuts. The order still goes out.",
  intro: [
    "Blitz had two ways to computerise. Buy an ERP built for a factory somewhere with reliable power and a training budget, or commission one locally at a price a startup should not be paying for software it will spend the first year working around. I looked at both, then went and asked the owners, the sales desk and the dispatch team what their week actually looks like.",
  ],
  thesis: {
    lead: "My move: treat the infrastructure as the brief, not as the excuse.",
    body: " Power cuts, fibre cuts, a two-day wait for a technician, and a floor where the phone is the only computer most people carry. A packaged system treats all four as somebody else's problem. I designed for them first and let every other decision fall out of that.",
  },
  meta: [
    {
      key: "My role",
      value: "Stakeholder research, product & interface design, build, onboarding, maintenance",
    },
    { key: "Scope", value: "Sales, records, purchasing, dispatch planning, reporting" },
    { key: "Design tools", value: "Figma, HTML & CSS rebuild" },
    { key: "In production", value: "2024 to present · currently v3.3.0" },
    { key: "Running cost", value: "Under US$75 a year, all in" },
    /*
     * Carries the constraint at the top, the way the institute study's status
     * row carries its disclosure. A reader who wants to see the repository
     * should learn there is not one to see before they go looking.
     */
    { key: "Source code", value: "Not public · client-internal" },
  ] as MetaRow[],
  sourcesLabel: "SOURCES",
  sourcesHint: "Show the list",
  /*
   * The band that makes this a design case study rather than a build log. Every
   * constraint is something true about where the software runs; every
   * consequence is a decision a reader can go and check against the render
   * below. Read as a pair, they are the reason the interface looks the way it
   * does, which is the one thing a screenshot can never explain.
   */
  brief: {
    label: "THE PROBLEM · FOUR CONSTRAINTS",
    note: "The constraints that I denoted after stakeholder analysis, and how each one led to a final system design.",
    consequenceLabel: "SO",
    items: [
      {
        kicker: "CONSTRAINT 01 · POWER",
        finding: "Roughly four in five Ugandan firms report electrical outages.",
        consequence:
          "The system runs in a browser on the phone already in their pocket. A cut moves the work onto a device with its own battery instead of ending the working day.",
        cites: ["wb-uganda-power"] as const,
      },
      {
        kicker: "CONSTRAINT 02 · NETWORK",
        finding: "Fibre gets cut, and mobile data is slow long before it is absent.",
        consequence:
          "A new entry is held on the device and shown as done the moment it is made, then reconciled with the server. One second is the limit of an uninterrupted train of thought, and an outage is a great deal longer than a second.",
        cites: ["nielsen-response"] as const,
      },
      {
        kicker: "CONSTRAINT 03 · TRAINING",
        finding: "A company this size cannot spare a new hire for a week of training.",
        consequence:
          "The interface has to teach itself, in the vocabulary of the apps already on their phone. People start using software immediately and never read the manual, so the manual has to be the screen.",
        cites: ["active-user", "sweller"] as const,
      },
      {
        kicker: "CONSTRAINT 04 · SUPPORT",
        finding: "One technical person, and a fault can wait two days for help.",
        consequence:
          "Nothing is destructive. Every delete is recoverable for thirty days, and there is no state a user can reach on their own that needs me to get them out of it.",
        cites: ["nielsen-heuristics"] as const,
      },
    ] as BriefConstraint[],
  },
  marketLabel: "WHAT THE MARKET OFFERED · A TYPICAL ERP SCREEN, REBUILT IN HTML",
  /*
   * A composite, and labelled as one. Drawing a real vendor's screen would make
   * this an attack on a product instead of an argument about a category, and
   * the faults below are the ones common to all of them rather than any one.
   */
  marketNote:
    "Composite of the systems I evaluated, rebuilt from memory rather than copied. No vendor is named, because the argument is about the category.",
  diagnosis: {
    label: "DIAGNOSIS · WHY NEITHER OPTION FIT",
    findings: [
      {
        lead: "Priced for a company ten times the size.",
        body: " Per-seat licensing plus an implementation fee on one side, a local studio quoting a bespoke build at similar money on the other. Both ask a startup to pay enterprise prices for a fit it will not get.",
        cites: ["soh-erp"] as const,
      },
      {
        lead: "The process belongs to the vendor.",
        body: " A packaged system carries a business model inside it, and where that model and the company disagree, the company is the one expected to change. The misfit never shows up in a demo. It shows up months later, as staff keeping the real numbers in a notebook.",
        cites: ["soh-erp"] as const,
      },
      {
        lead: "Every field on one screen.",
        body: " Thirty inputs in a grey grid: no grouping, no order, no defaults, and no way to tell which ones matter. Recognition is replaced by recall, so you have to already know what the form wants before you can fill it in.",
        cites: ["nielsen-heuristics"] as const,
      },
      {
        lead: "The screen never says what it just did.",
        body: " Press Save and the page reloads into the same grey. Whether the order exists is something you find out by going to look for it, which is exactly how the same order gets entered twice.",
        cites: ["nielsen-heuristics"] as const,
      },
      {
        lead: "It assumes a desk, a chair and mains power.",
        body: " Fixed-width layouts drawn for a monitor, and a session that dies with the connection. Where the power goes out this often, that is not an edge case, it is a normal Tuesday.",
        cites: ["wb-uganda-power"] as const,
      },
      {
        lead: "Training is a line item.",
        body: " Nothing here is learnable by using it, so competence has to be installed by a person, in a room, for a week. That cost returns with every hire, and it is never the number on the quote.",
        cites: ["sweller"] as const,
      },
    ] as CaseFinding[],
  },
  prototypeLabel: "WHAT I SHIPPED FIRST · 2024 PROTOTYPE, REBUILT IN HTML",
  /*
   * The honest middle of the study, and the part that would have been easiest to
   * leave out. A portfolio that shows only the finished thing implies the
   * finished thing was the first idea. This one shipped deliberately ugly,
   * because what it was for was not looking good.
   */
  prototype: {
    label: "THE PROTOTYPE · WHAT IT BOUGHT, AND WHAT IT COST",
    findings: [
      {
        lead: "I built this, and I did not design it.",
        body: " Bootstrap straight out of the box: default buttons, default modals, default tables. That was the decision, not an oversight. A company with no system at all needed one running in weeks.",
      },
      {
        lead: "It bought three months of real data.",
        body: " v2.0 shipped a quarter later as a migration, not a move: same customers, same order history, same IDs, nothing re-typed. A system that arrives empty asks a business to do its worst week twice.",
      },
      {
        lead: "It bought the requirements.",
        body: " Watching people use it told me what no interview did: which fields get skipped, which get filled with a full stop to get past the validation, and that most orders enter the building as a photograph on WhatsApp.",
      },
      {
        lead: "But everything was a modal.",
        body: " Create a customer, edit a specification, delete a record: the same grey box over the same page every time. No sense of place, no way back, and no answer to the question of where in the system you currently are.",
        cites: ["nielsen-heuristics"] as const,
      },
      {
        lead: "Fourteen columns, all at the same volume.",
        body: " The customer table printed every field it had at equal weight. The eye is very good at pulling one thing out of many when a design lets it, and a uniform grid of small grey text does not.",
        cites: ["healey-enns"] as const,
      },
      {
        lead: "And it needed the network to be up.",
        body: " A failed form post lost the typing. That is the single thing this business cannot afford, and it is the reason there was a version two at all.",
        cites: ["wb-uganda-power"] as const,
      },
    ] as CaseFinding[],
  },
  transition:
    "So version two started from the constraints instead of the feature list: [[offline-first]] by default, [[optimistic-ui]] on every submission, and an interface assembled out of controls people already know how to work, because a factory floor is not the place to teach anyone a new one.",
  shippedLabel: "WHAT RUNS TODAY · v3.3.0",
  /*
   * Sits inside the frame, under its header, the way the market frame's note
   * does. The screens below are honest about the design and deliberately not
   * authoritative about the build, and a reader should be told which is which
   * before they read three screens' worth of detail.
   */
  shippedNote:
    "These mock ups are using a demonstration dataset rather than real customers and many internal features have been stripped to maintain business secrets. What is accurate here is the design philosophy: the layout, the colour, the type and the controls.",
  screens: {
    dashboardKicker: "SCREEN 01 · DASHBOARD",
    ordersKicker: "SCREEN 02 · ORDERS",
    trashKicker: "SCREEN 03 · TRASH",
  },
  resolution: {
    label: "WHAT THE REBUILD DOES · AND WHY IT WORKS",
    findings: [
      {
        lead: "It runs on the phone in their pocket.",
        body: " One responsive app and one account, with no second mobile product to keep in step. When the power goes, the work moves to a device with its own battery, which is why the layout is designed from the small end up rather than squeezed down to it.",
        cites: ["wb-uganda-power"] as const,
      },
      {
        lead: "A submission survives the network.",
        body: " New entries are held on the device and confirmed on screen straight away, then reconciled when the connection returns. The alternative is a spinner on a dying link, and a spinner is just a slower way of losing the work.",
        cites: ["nielsen-response"] as const,
      },
      {
        lead: "Figures before sentences.",
        body: " Three numbers across the top, each with a direction and a comparison to last month. Position, length and colour are registered before a reader has decided to look at anything, so the state of the business arrives ahead of the reading.",
        cites: ["healey-enns"] as const,
      },
      {
        lead: "The screen always says what it just did.",
        body: " Saved, queued, restored, re-scheduled. Every action answers in the place the action happened, so nobody has to go and verify the system by hand.",
        cites: ["nielsen-heuristics"] as const,
      },
      {
        lead: "One thing at a time.",
        body: " Order entry is a short form and a line-item table that grows as you add to it, instead of thirty inputs demanded at once. The order is the list you can see, so the form never has to be remembered.",
        cites: ["nielsen-heuristics"] as const,
      },
      {
        lead: "The process is theirs.",
        body: " Orders, quotations, records and purchases are named the way the floor names them, in their currency, on their delivery calendar. The software was written around their week rather than around a package's idea of one.",
        cites: ["soh-erp"] as const,
      },
    ] as CaseFinding[],
  },
  beats: [
    {
      kicker: "THE NETWORK",
      title: "Slow is a design problem before it is a bandwidth problem.",
      body: "The connection here is not reliably anything, so the interface stops treating the server as the source of truth about whether your work happened. Press the button and the row appears, marked as queued, and the sync is the software's problem rather than yours. What that buys is not speed, it is the ability to keep going.",
      cites: ["nielsen-response"] as const,
    },
    {
      kicker: "THE TRAINING",
      title: "Nobody reads the manual, so the screen has to be it.",
      body: "New staff learn this system by using it: a short guided pass the first time you open a section, then hints that sit next to the thing they explain rather than in a document nobody opens. People are motivated to get started, not to get trained, and an interface that fights that loses to a notebook.",
      cites: ["active-user"] as const,
    },
    {
      kicker: "THE SUPPORT GAP",
      title: "Undo is infrastructure.",
      body: "Two days from technical help, the expensive mistakes are the irreversible ones. So deletes are soft for thirty days, restoring an order brings its line items back with it, and the trash tells you which is which. Confidence is a design output: people who know they cannot break it will actually use it.",
      cites: ["nielsen-heuristics"] as const,
    },
  ] as Beat[],
  features: {
    title: "Features",
    note: "The two the system is actually known for internally, and what each one is for.",
  },
  intake: {
    kicker: "FEATURE 01 · INTAKE",
    title: "The machine reads. The human signs.",
    body: {
      before:
        "The obvious build was a customer portal, and nobody would have used it: it asks every customer to change how they order, for the vendor's convenience. So the work went on my side of the screen instead. An order arrives as a WhatsApp photo, a PDF, a scanned purchase order, or a sheet of paper walked to the desk, and ",
      strong: "Claude",
      after: " reads all of it into a draft record. Nothing commits on its own.",
    },
    frameLabel: "INTAKE · WHATEVER ARRIVES, ONE QUEUE",
    findings: {
      label: "WHY IT IS BUILT THIS WAY",
      items: [
        {
          lead: "Every extracted field shows its source.",
          body: " Quantity, price and delivery date each name the line of the original they came from, so checking the draft is reading two things side by side rather than trusting a number that appeared.",
          cites: ["parasuraman-riley"] as const,
        },
        {
          lead: "Uncertainty is shown, not hidden.",
          body: " A value the model is unsure of is flagged and left for a person. Automation that is quietly wrong is worse than automation that is loudly unsure.",
          cites: ["parasuraman-riley"] as const,
        },
        {
          lead: "A person approves before anything is real.",
          body: " Keeping a [[human-in-the-loop]] is the difference between a tool people adopt and one they quietly work around. The time saved is in the typing, and the typing is the part nobody wanted to do.",
        },
        {
          lead: "It collapsed forty minutes into fifteen.",
          body: " A batch of five orders used to take about forty minutes of transcription. It now takes about fifteen, and the fifteen are spent reading rather than typing.",
        },
      ] as CaseFinding[],
    },
  },
  living: {
    kicker: "FEATURE 02 · THE LIVING INTERFACE",
    title: "Software that knows what day it is.",
    body: "Blitz runs a mixed floor: Eid, Christmas, Diwali and the national days all land in the same delivery calendar. The system knows the dates, so it says so, shifts the dispatch deadlines that fall on them, and greets the people whose festival it is. Pick a day below and it tells you what dispatch can and cannot promise.",
    bannerLabel: "ON THE DASHBOARD, THAT WEEK",
    frameLabel: "DISPATCH CALENDAR · MARCH 2026",
    /* Names the gesture, so the render invites the click rather than describing it. */
    liveTag: "LIVE · PICK A DAY",
    findings: {
      label: "WHAT IT IS ACTUALLY FOR",
      items: [
        {
          lead: "The planning stops being somebody's memory.",
          body: " Dispatch used to work out the knock-on effects of a closed day by hand, order by order. The calendar shifts the affected deadlines and shows which ones moved, so the re-plan is a thing you check instead of a thing you do.",
        },
        {
          lead: "Recognising a festival is not decoration.",
          body: " Belonging and uniqueness are both conditions of an inclusive team, and a shared tool that names one group's festival and not another's is quietly making a statement about who it was built for. This one names all of them.",
          cites: ["shore-inclusion"] as const,
        },
        {
          lead: "Reported back as a calmer floor.",
          body: " In my own conversations with staff, the two things that came up were people wishing each other well on days the system surfaced, and dispatch no longer carrying the holiday schedule in their heads. Qualitative, from a team of twenty, and reported as exactly that.",
        },
      ] as CaseFinding[],
    },
  },
  principles: [
    {
      kicker: "GLANCEABILITY · THE FIGURE BEFORE THE SENTENCE",
      body: "A supervisor opens this between two other jobs, so the top of every screen answers before it explains: the number, the direction it moved, and what it is being compared against. Length and position are [[preattentive]], read in a fraction of a second, while the same fact set in a paragraph has to be found first. That is why the figure is large and the label is small, and not the other way round.",
      mock: "glance" as const,
      cites: ["healey-enns", "nielsen-heuristics"] as const,
    },
    {
      kicker: "THE RECAP · A TOOL THAT SAYS WELL DONE",
      body: "December closes with a recap of the team's year: orders shipped, the biggest month, the customer who grew most, each person's own share of it. Specific, attainable feedback against a goal is one of the better-evidenced findings in work motivation, and a company this size has no other moment that does this. It costs the business nothing and it is the feature people mention first.",
      mock: "recap" as const,
      cites: ["locke-latham", "shore-inclusion"] as const,
    },
    {
      kicker: "COST · THE REQUIREMENT NOBODY WRITES DOWN",
      body: "Under US$75 a year covers hosting, the domain, email and the AI usage, and I know the figure because I handle all four and pass the invoices to the company. A design that a client cannot afford to keep running is not a finished design, it is a proposal. Building it unpaid was my side of the trade: they got a system, I got two years of shipping one.",
      mock: "cost" as const,
      cites: ["soh-erp"] as const,
    },
  ],
  metricsLabel: "RESULTS · MEASURED, AND SAID PLAINLY",
  metrics: [
    {
      value: { kind: "range", from: "40", to: "15" },
      label: ["minutes to enter", "a batch of five orders"],
    },
    {
      value: { kind: "count", value: 5, suffix: " / 5" },
      label: ["informal internal survey,", "20 regular users"],
      highlight: true,
    },
    { value: { kind: "text", text: "<$75" }, label: ["a year to run:", "hosting, domain, email, AI"] },
    {
      value: { kind: "count", value: 3, suffix: " mo" },
      label: ["from prototype to v2.0,", "migrated, not re-typed"],
    },
  ] as Metric[],
  /*
   * Sits with the sources, for the same reason the institute study's disclaimer
   * does: a reader who wants to weigh the 5 / 5 should find out how it was
   * gathered from the study itself rather than by asking.
   */
  method: {
    summary: "How were the numbers gathered?",
    hint: "Read more",
    /*
     * A list, not a paragraph. These were always four separate claims about four
     * separate figures, and running them together made a reader checking one of
     * them read all four to find it.
     */
    list: true,
    body: [
      "The satisfaction figure is an informal survey I ran myself with the twenty people who use the system regularly, not an independent study, and it should be read as what it is.",
      "The entry-time range is measured against the prototype it replaced, on the same task with the same staff.",
      "The running cost is the total of invoices I pay and forward to the company.",
      "The source is not public. It runs Blitz's commercial operation, so this study argues from decisions and from what I can show.",
    ],
  },
};
