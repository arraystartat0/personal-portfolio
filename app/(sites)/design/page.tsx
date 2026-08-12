import About from "./components/About";
import CaseStudyResearch from "./components/case-01/CaseStudyResearch";
import CaseStudyBlitz from "./components/case-02/CaseStudyBlitz";
import CaseStudySoftware from "./components/case-03/CaseStudySoftware";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import HowIWork from "./components/HowIWork";
import Marquee from "./components/Marquee";
import Reveal from "./components/motion/Reveal";
import SideProjects from "./components/SideProjects";
import WorkIndex from "./components/WorkIndex";
import { OUTRO_ID } from "./lib/anchors";
import ds from "./styles/design.module.css";

export default function DesignPage() {
  return (
    <>
      <Hero />

      <Reveal className={ds.rule} variant="rule" />
      <HowIWork />

      {/*
        The studies in the order the index lists them: shipped, shipped, concept.
        Ordered by what it takes to believe rather than by how much there is to
        read, because the reader this page is for is deciding in about ninety
        seconds whether any of it shipped.

        "How I work" stays above the index, where it has always been. It was
        tried below the studies, to put named work with outcomes in the second
        screenful, and the ScatterGrid was too good a thing to bury three long
        studies deep to buy that.
      */}
      <div className={ds.rule} />
      <WorkIndex />

      <CaseStudySoftware />
      <div className={ds.rule} />
      <CaseStudyBlitz />
      <div className={ds.rule} />
      <CaseStudyResearch />

      <SideProjects />
      <About />

      {/*
        The two of them named as one region, because they read as one: the
        marquee hands off to the contact panel and the work is over. A plain
        wrapper with no styles of its own, so it changes nothing about the
        layout; it exists so MobilePreview has an edge to measure its button's
        fade against. See lib/anchors.
      */}
      <div id={OUTRO_ID}>
        <Marquee />
        <Contact />
      </div>
    </>
  );
}
