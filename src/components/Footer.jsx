import React from 'react';
import { PROFILE } from '../data';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#f6f5f3] text-ink-dim py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh] border-t border-line">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1">
          <p>Secure, event-driven backends</p>
          <p>Spring Boot · Kafka · AWS</p>
          <p>&amp; the clean screens on top</p>
        </div>
        <div className="flex flex-col gap-1 md:items-center">
          <p>{PROFILE.education}</p>
          <p>{PROFILE.cert}</p>
          <a href="#work" data-cursor="link" className="hover:text-accent-2 transition-colors mt-1 underline underline-offset-4 decoration-1">View Work</a>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <p>{PROFILE.location}</p>
          <p>{year}</p>
        </div>
      </div>

      <div className="w-full flex justify-center items-center py-16 md:py-20 overflow-hidden">
        <h2 className="text-[18vw] md:text-[16vw] leading-none font-bold tracking-tighter lowercase select-none text-black/[0.04] w-full text-center">
          giridhar
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-4">
          <div className="flex gap-5">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" data-cursor="link" className="hover:text-accent-2 transition-colors underline underline-offset-4 decoration-1">GitHub</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" data-cursor="link" className="hover:text-accent-2 transition-colors underline underline-offset-4 decoration-1">LinkedIn</a>
            <a href={PROFILE.hashnode} target="_blank" rel="noreferrer" data-cursor="link" className="hover:text-accent-2 transition-colors underline underline-offset-4 decoration-1">Hashnode</a>
          </div>
          <p className="text-black/30 text-[9px] md:text-[10px]">&copy; {year} {PROFILE.name} · Designed &amp; built with care.</p>
        </div>
        <div className="flex flex-col gap-1 md:items-center">
          <a href={`mailto:${PROFILE.email}`} data-cursor="link" className="hover:text-accent-2 transition-colors underline underline-offset-4 decoration-1 lowercase">{PROFILE.email}</a>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <a href="/Sai_Giridhar_Bandla_Resume.docx" data-cursor="link" className="hover:text-accent-2 transition-colors underline underline-offset-4 decoration-1">Download Résumé</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
