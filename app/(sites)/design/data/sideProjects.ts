export interface SideProject {
  kicker: string;
  title: string;
  body: string;
  /** An optional pointer to whichever of the other two sites covers it properly. */
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
    more: { text: "Read more on the embedded portfolio", href: "/embedded" },
  },
  {
    kicker: "FREELANCE · FIGMA · REACT · EXPO",
    title: "HelloDay, classroom platform",
    body: "Two-person build. I took the client's brand guidelines into web and mobile screens, then owned auth and load: 5,000 concurrent users, COPPA safeguards for under-13s, a security audit acted on before launch.",
    more: { text: "Read more on the software portfolio", href: "/swe" },
  },
];
