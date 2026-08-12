export interface SideProject {
  kicker: string;
  title: string;
  body: string;
  /**
   * An optional pointer to whichever of the other two sites covers it properly.
   *
   * Nothing sets it at the moment, and that is the point: both destinations are
   * still the under-construction placeholder, so every one of these promised a
   * reader more and delivered a holding page. The worst of them was on HelloDay,
   * which is the only collaboration on this site and the only second client, so
   * the one card a hiring reader has most reason to follow was the one that led
   * nowhere. The field stays because the links come back the moment there is
   * something behind them.
   */
  more?: { text: string; href: string };
}

export const sideProjectsIntro = {
  heading: "Also shipped",
  body: "Other things I have worked on, used every day.",
};

export const sideProjects: SideProject[] = [
  {
    kicker: "WORDPRESS · PHP · MYSQL",
    title: "Employee & HR portal",
    body: "Records, time-off and clock-in hours managed by HR themselves, and it replaced a paid third-party licence.",
  },
  {
    kicker: "UBC FORMULA ELECTRIC",
    title: "Vehicle control software",
    body: "On the vehicle controls team: the software that reads the sensors and drives the motors on a Formula Student race car, integrated with suspension and electrical.",
  },
  {
    kicker: "FREELANCE · FIGMA · REACT · EXPO",
    title: "HelloDay, classroom platform",
    body: "Two-person build. I took the client's brand guidelines into web and mobile screens, then owned auth and load: 5,000 concurrent users, COPPA safeguards for under-13s, a security audit acted on before launch.",
  },
];
