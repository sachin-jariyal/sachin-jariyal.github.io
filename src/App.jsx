import { useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import { navLinks } from "./data/content";
import { useSectionScroll } from "./hooks/useSectionScroll";

export default function App() {
  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.slice(1)),
    []
  );
  useSectionScroll(sectionIds);

  return (
    <div className="app-shell">
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <ScrollToTop />
    </div>
  );
}
