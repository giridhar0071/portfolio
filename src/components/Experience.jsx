import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE, NOW } from '../data';
import { fadeUp, stagger, viewport } from '../motion';

const chipColor = (chip) => {
  if (chip === 'Full-time') return 'bg-accent text-white';
  if (chip === 'Part-time') return 'bg-black/[0.06] text-ink';
  return 'bg-black/[0.03] text-ink-dim';
};

const Experience = () => {
  return (
    <section id="experience" className="bg-[#f6f5f3] w-full py-24 md:py-28 px-6 md:px-12 border-t border-line">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="mb-14">
          <span className="eyebrow text-xs font-bold tracking-[0.25em] uppercase text-accent-2">The path</span>
          <h2 className="text-4xl md:text-6xl font-black text-ink mt-4 leading-[1.05] tracking-tight">
            Where I've shipped,
            <br className="hidden md:block" /> studied &amp; <span className="font-serif italic text-accent-2">grown.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.12)}
          className="relative border-l-2 border-line-2 pl-8 md:pl-12 space-y-12"
        >
          {TIMELINE.map((t, i) => (
            <motion.div key={i} variants={fadeUp} className="relative">
              <span className="absolute -left-[2.6rem] md:-left-[3.65rem] top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-[#f6f5f3] shadow" />
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <span className="text-xs font-mono text-ink-dim">{t.when} · {t.where}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit ${chipColor(t.chip)}`}>{t.chip}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-ink">{t.role}</h3>
              <p className="text-accent-2 font-bold mb-3">{t.org}</p>
              <ul className="space-y-1.5">
                {t.pts.map((pt, j) => (
                  <li key={j} className="text-ink-dim text-sm md:text-[15px] leading-relaxed pl-4 relative"><span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-black/20" />{pt}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20">
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="eyebrow text-xs font-bold tracking-[0.25em] uppercase text-accent-2">Currently</span>
            <h3 className="text-2xl md:text-3xl font-black text-ink mt-3 mb-8">What's pulling my attention right now.</h3>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={stagger(0.08)}
            className="grid sm:grid-cols-2 gap-5"
          >
            {NOW.map((n) => (
              <motion.div key={n.t} variants={fadeUp} className="rounded-2xl border border-line bg-panel p-6 hover:border-accent-2/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(177,18,16,0.25)] transition-all duration-300">
                <h4 className="font-black text-ink mb-1.5">{n.t}</h4>
                <p className="text-ink-dim text-sm leading-relaxed">{n.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
