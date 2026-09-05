import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Writing', href: '#writing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solid = isScrolled || isOpen;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${solid ? 'bg-white border-b border-line py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" data-cursor="link" className={`text-2xl font-black tracking-tight transition-colors duration-300 ${solid ? 'text-[#14110f]' : 'text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]'}`}>
          Giridhar<span className="text-accent-2">.</span>
        </a>

        <div className="hidden lg:flex space-x-7">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} data-cursor="link" className={`font-medium relative group transition-colors duration-300 text-[15px] ${solid ? 'text-[#14110f]/70 hover:text-[#14110f]' : 'text-white/80 hover:text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]'}`}>
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-2 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="/Sai_Giridhar_Bandla_Resume.docx" data-cursor="link" className={`px-5 py-2.5 rounded-full border font-semibold transition-all duration-300 text-sm ${solid ? 'border-black/15 text-[#14110f] hover:bg-black/5' : 'border-white/20 text-white hover:bg-white/10'}`}>
            Résumé
          </a>
          <a href="#contact" data-cursor="link" className="px-6 py-2.5 rounded-full bg-accent text-white font-semibold hover:bg-accent-2 transition-all duration-300">
            Hire Me
          </a>
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className={`focus:outline-none p-2 transition-colors duration-300 ${solid ? 'text-[#14110f]' : 'text-white'}`} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-line shadow-xl py-4"
          >
            <div className="flex flex-col px-6 space-y-3">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="text-[#14110f] hover:text-accent-2 font-bold text-lg border-b border-line pb-2 transition-colors">
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex gap-3">
                <a href="/Sai_Giridhar_Bandla_Resume.docx" onClick={() => setIsOpen(false)} className="flex-1 px-5 py-3 rounded-full border border-black/15 text-[#14110f] font-bold text-center">Résumé</a>
                <a href="#contact" onClick={() => setIsOpen(false)} className="flex-1 px-5 py-3 rounded-full bg-accent text-white font-black text-center">Hire Me</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
