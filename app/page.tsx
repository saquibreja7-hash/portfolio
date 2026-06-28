import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Gallery from "./components/Gallery";
import Writing from "./components/Writing";
import Contact from "./components/Contact";
import StatsBar from "./components/StatsBar";

export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      <Nav />
      <StatsBar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Work />
        <Gallery />
        <Writing />
        <Contact />
      </main>
    </div>
  );
}
