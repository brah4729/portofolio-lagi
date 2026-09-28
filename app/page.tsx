import About from "../components/About";
import Certificates from "../components/Certificates";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import Pointer from "../components/Pointer";
import Projects from "../components/Projects";
import Reveal from "../components/Reveal";
import Skills from "../components/Skills";
import Terminal from "../components/Terminal";

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <Terminal />
      <Pointer />
      <Reveal />
    </>
  );
}
