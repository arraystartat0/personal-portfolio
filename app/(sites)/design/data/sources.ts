export interface Source {
  authors: string;
  year: string;
  title: string;
  publication: string;
  /** Shown as the link text, so it reads as a destination rather than a bare URL. */
  linkLabel: string;
  url: string;
}

/**
 * Every source cited in a case study, in one place so the same paper is
 * described identically wherever it appears.
 *
 * Each of these was checked against its publisher before being added. If you
 * add one, do the same: an invented citation on a portfolio is worse than no
 * citation at all, and a reader who checks one and finds it wrong stops
 * trusting the numbers too.
 */
export const sources = {
  "pirolli-card": {
    authors: "Pirolli, P., & Card, S.",
    year: "1999",
    title: "Information foraging",
    publication: "Psychological Review, 106(4), 643–675",
    linkLabel: "doi.org",
    url: "https://doi.org/10.1037/0033-295X.106.4.643",
  },
  lindgaard: {
    authors: "Lindgaard, G., Fernandes, G., Dudek, C., & Brown, J.",
    year: "2006",
    title: "Attention web designers: You have 50 milliseconds to make a good first impression!",
    publication: "Behaviour & Information Technology, 25(2), 115–126",
    linkLabel: "tandfonline.com",
    url: "https://www.tandfonline.com/doi/abs/10.1080/01449290500330448",
  },
  "nielsen-carousels": {
    authors: "Nielsen, J.",
    year: "2013",
    title: "Auto-forwarding carousels and accordions annoy users and reduce visibility",
    publication: "Nielsen Norman Group",
    linkLabel: "nngroup.com",
    url: "https://www.nngroup.com/articles/auto-forwarding/",
  },
  "nielsen-reading": {
    authors: "Nielsen, J.",
    year: "2008",
    title: "How little do users read?",
    publication: "Nielsen Norman Group, reporting Weinreich et al., ACM Transactions on the Web, 2(1)",
    linkLabel: "nngroup.com",
    url: "https://www.nngroup.com/articles/how-little-do-users-read/",
  },
  deloitte: {
    authors: "Deloitte, commissioned by Google",
    year: "2020",
    title: "Milliseconds make millions",
    publication: "Deloitte Ireland",
    linkLabel: "web.dev",
    url: "https://web.dev/case-studies/milliseconds-make-millions",
  },
  /*
   * A primary source, and the strongest one in this list: the institute states
   * cross-faculty collaboration as its own reason for existing, which is what
   * makes "the clusters page cannot show it" a gap rather than an opinion.
   */
  icics: {
    authors: "Institute for Computing, Information and Cognitive Systems",
    year: "2026",
    title:
      "A multidisciplinary research institute supporting collaborative research, with over 150 faculty from 10 faculties and schools",
    publication: "University of British Columbia",
    linkLabel: "icics.ubc.ca",
    url: "https://icics.ubc.ca/",
  },
  "f-pattern": {
    authors: "Nielsen Norman Group",
    year: "2017",
    title:
      "F-shaped pattern of reading on the web: Misunderstood, but still relevant (even on mobile)",
    publication: "Nielsen Norman Group",
    linkLabel: "nngroup.com",
    url: "https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/",
  },
  sweller: {
    authors: "Sweller, J.",
    year: "1988",
    title: "Cognitive load during problem solving: Effects on learning",
    publication: "Cognitive Science, 12(2), 257–285",
    linkLabel: "doi.org",
    url: "https://doi.org/10.1207/s15516709cog1202_4",
  },
  wcag: {
    authors: "W3C",
    year: "2018",
    title: "Web Content Accessibility Guidelines (WCAG) 2.1",
    publication: "W3C Recommendation",
    linkLabel: "w3.org",
    url: "https://www.w3.org/TR/WCAG21/",
  },
  "jakobs-law": {
    authors: "Nielsen, J.",
    year: "2000",
    title: "Jakob's law of internet user experience",
    publication: "Nielsen Norman Group",
    linkLabel: "nngroup.com",
    url: "https://www.nngroup.com/videos/jakobs-law-internet-ux/",
  },
  w3c: {
    authors: "W3C Web Accessibility Initiative",
    year: "2018",
    title: "The business case for digital accessibility",
    publication: "World Wide Web Consortium",
    linkLabel: "w3.org",
    url: "https://www.w3.org/WAI/business-case/",
  },
  /*
   * The number the sales platform is built on. Software that treats a power cut
   * as an edge case is software designed for a country this one is not in, and
   * this is the World Bank's own survey of Ugandan firms rather than anecdote.
   */
  "wb-uganda-power": {
    authors: "World Bank Enterprise Surveys",
    year: "2025",
    title: "Firms experiencing electrical outages (% of firms), Uganda: 79.9",
    publication: "World Bank Group, Uganda country data",
    linkLabel: "data.worldbank.org",
    url: "https://data.worldbank.org/indicator/IC.ELC.OUTG.ZS?locations=UG",
  },
  "soh-erp": {
    authors: "Soh, C., Kien, S. S., & Tay-Yap, J.",
    year: "2000",
    title: "Enterprise resource planning: Cultural fits and misfits: Is ERP a universal solution?",
    publication: "Communications of the ACM, 43(4), 47–51",
    linkLabel: "doi.org",
    url: "https://doi.org/10.1145/332051.332070",
  },
  "nielsen-response": {
    authors: "Nielsen, J.",
    year: "1993",
    title: "Response times: The 3 important limits",
    publication: "Nielsen Norman Group",
    linkLabel: "nngroup.com",
    url: "https://www.nngroup.com/articles/response-times-3-important-limits/",
  },
  /*
   * Cited to the chapter rather than to the summary, with the summary as the
   * link: the book is the source, and a reader who wants to check it in ten
   * seconds should not have to find a 1987 MIT Press volume to do it.
   */
  "active-user": {
    authors: "Carroll, J. M., & Rosson, M. B.",
    year: "1987",
    title: "Paradox of the active user",
    publication:
      "In J. M. Carroll (Ed.), Interfacing Thought: Cognitive Aspects of Human-Computer Interaction, MIT Press, 80–111",
    linkLabel: "nngroup.com summary",
    url: "https://www.nngroup.com/articles/paradox-of-the-active-user/",
  },
  "parasuraman-riley": {
    authors: "Parasuraman, R., & Riley, V.",
    year: "1997",
    title: "Humans and automation: Use, misuse, disuse, abuse",
    publication: "Human Factors, 39(2), 230–253",
    linkLabel: "doi.org",
    url: "https://doi.org/10.1518/001872097778543886",
  },
  "nielsen-heuristics": {
    authors: "Nielsen, J.",
    year: "1994",
    title: "10 usability heuristics for user interface design",
    publication: "Nielsen Norman Group, last updated 2024",
    linkLabel: "nngroup.com",
    url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
  },
  "healey-enns": {
    authors: "Healey, C. G., & Enns, J. T.",
    year: "2012",
    title: "Attention and visual memory in visualization and computer graphics",
    publication: "IEEE Transactions on Visualization and Computer Graphics, 18(7), 1170–1188",
    linkLabel: "doi.org",
    url: "https://doi.org/10.1109/TVCG.2011.127",
  },
  "shore-inclusion": {
    authors:
      "Shore, L. M., Randel, A. E., Chung, B. G., Dean, M. A., Holcombe Ehrhart, K., & Singh, G.",
    year: "2011",
    title: "Inclusion and diversity in work groups: A review and model for future research",
    publication: "Journal of Management, 37(4), 1262–1289",
    linkLabel: "doi.org",
    url: "https://doi.org/10.1177/0149206310385943",
  },
  "locke-latham": {
    authors: "Locke, E. A., & Latham, G. P.",
    year: "2002",
    title:
      "Building a practically useful theory of goal setting and task motivation: A 35-year odyssey",
    publication: "American Psychologist, 57(9), 705–717",
    linkLabel: "doi.org",
    url: "https://doi.org/10.1037/0003-066X.57.9.705",
  },
} satisfies Record<string, Source>;

export type SourceKey = keyof typeof sources;
