import React from 'react';
import { motion } from 'framer-motion';
import { POSTS, PROFILE } from '../data';
import { fadeUp, stagger, viewport } from '../motion';

const Writing = () => {
  return (
    <section id="writing" className="bg-white w-full py-24 md:py-28 px-6 md:px-12 border-t border-line">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow text-xs font-bold tracking-[0.25em] uppercase text-accent-2">Writing</span>
            <h2 className="text-4xl md:text-6xl font-bold text-ink mt-4 leading-[1.05]">
              Notes from <span className="font-serif italic text-ink-dim">the build.</span>
            </h2>
          </div>
          <a href={PROFILE.hashnode} target="_blank" rel="noreferrer" data-cursor="link" className="text-sm font-semibold text-accent-2 hover:text-ink transition-colors whitespace-nowrap">
            All posts on Hashnode ↗
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
          className="divide-y divide-line border-y border-line"
        >
          {POSTS.map((p) => (
            <motion.a key={p.t} href={PROFILE.hashnode} target="_blank" rel="noreferrer" data-cursor="link" variants={fadeUp} className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-7 hover:px-2 transition-all duration-300">
              <span className="text-xs font-mono text-ink-dim md:w-24 shrink-0">{p.date}</span>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-ink group-hover:text-accent-2 transition-colors">{p.t}</h3>
                <p className="text-ink-dim text-sm mt-1 leading-relaxed">{p.e}</p>
              </div>
              <span className="text-black/15 group-hover:text-accent-2 group-hover:translate-x-1 transition-all hidden md:block">↗</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Writing;
