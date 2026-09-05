import React from 'react';
import { motion } from 'framer-motion';
import stackImage from '../assets/about/image.png';
import { ABOUT, PROFILE } from '../data';
import { dropBounce, fadeLeft, fadeUp, stagger, viewport } from '../motion';

const About = () => {
  return (
    <section id="about" className="bg-[#f6f5f3] py-24 md:py-28 px-6 md:px-12 w-full relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start relative z-10">
        {/* Left: ID badge */}
        <div className="flex flex-col items-center w-full md:w-[340px] shrink-0 mt-16 md:mt-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={dropBounce}
            className="relative flex justify-center w-full"
          >
            <div className="absolute -top-32 left-1/2 w-2.5 h-40 bg-[#2a2826] -translate-x-1/2 z-0" />
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-[#3a3735] rounded -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.4)]" />
            <div className="bg-panel border border-line w-full max-w-[280px] rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-20 -rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-panel rounded-t-xl -translate-x-1/2 flex justify-center items-center">
                <div className="w-8 h-2 bg-black/10 rounded-full shadow-inner" />
              </div>
              {/* PHOTO: replace /src/assets/about/image.png with your avatar */}
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-panel-2">
                <img src={stackImage} alt={PROFILE.name} className="w-full h-full object-cover" />
              </div>
              <div className="px-1 pt-3 pb-1 text-center">
                <div className="text-ink font-bold text-sm leading-tight">{PROFILE.name}</div>
                <div className="text-[11px] text-accent-2 font-mono mt-0.5">{PROFILE.role}</div>
              </div>
            </div>
          </motion.div>

          {/* fills the space under the badge */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
            className="mt-10 w-full max-w-[280px] flex flex-col items-center gap-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-panel border border-line px-4 py-1.5 text-xs font-mono text-ink-dim">
              <span className="w-2 h-2 rounded-full bg-accent-2 animate-pulse" /> Open to roles · {PROFILE.location}
            </span>
            <div className="flex items-center gap-5 text-ink-dim">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" data-cursor="link" aria-label="GitHub" className="hover:text-accent-2 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.8 18.3 5.1 18.3 5.1c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.7 18.3.5 12 .5z"/></svg></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" data-cursor="link" aria-label="LinkedIn" className="hover:text-accent-2 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg></a>
              <a href={`mailto:${PROFILE.email}`} data-cursor="link" aria-label="Email" className="hover:text-accent-2 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M3 6h18v12H3z"/></svg></a>
            </div>
            <MagneticResume />
          </motion.div>
        </div>

        {/* Right: narrative + facts */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeLeft}
          className="flex-1 mt-8 md:mt-0"
        >
          <span className="eyebrow text-xs font-bold tracking-[0.25em] uppercase text-accent-2">This is me</span>
          <h2 className="text-4xl md:text-5xl font-black text-ink mt-3 mb-6">Hello!</h2>

          <div className="space-y-4 max-w-2xl text-ink-dim text-[15px] md:text-base leading-relaxed">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={stagger(0.08)}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 max-w-2xl"
          >
            {ABOUT.facts.map((f) => (
              <motion.div key={f.k} variants={fadeUp} className="flex flex-col border-t border-line pt-2">
                <dt className="text-[11px] uppercase tracking-wider text-ink-dim font-bold">{f.k}</dt>
                <dd className="text-sm text-ink font-semibold">{f.v}</dd>
              </motion.div>
            ))}
          </motion.dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="px-4 py-1.5 rounded-full bg-panel border border-line text-ink text-xs font-semibold">{PROFILE.education}</span>
            <span className="px-4 py-1.5 rounded-full bg-panel border border-line text-ink text-xs font-semibold">{PROFILE.cert}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MagneticResume = () => (
  <a href="/Sai_Giridhar_Bandla_Resume.docx" data-cursor="link" className="w-full text-center px-5 py-2.5 rounded-full bg-accent text-white text-sm font-semibold hover:bg-accent-2 transition-colors">Download résumé</a>
);

export default About;
