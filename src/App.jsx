import React from 'react';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Work from './components/Work';
import Principles from './components/Principles';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Writing from './components/Writing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Work />
        <Principles />
        <Skills />
        <Experience />
        <Writing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
