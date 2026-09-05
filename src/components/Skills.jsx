import React from 'react';
import { motion } from 'framer-motion';
import { EXPERTISE } from '../data';
import { fadeUp, stagger, viewport } from '../motion';

const Skills = () => {
  return (
    <section id="skills" className="bg-white w-full py-24 md:py-28 px-6 md:px-12 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="mb-14">
          <span className="eyebrow text-xs font-bold tracking-[0.25em] uppercase text-accent-2">Expertise</span>
          <h2 className="text-4xl md:text-6xl font-bold text-ink mt-4 leading-[1.05]">
            The tools I reach for,
            <br className="hidden md:block" /> grouped by <span className="font-serif italic text-ink-dim">what they do.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10"
        >
          {EXPERTISE.map((group) => (
            <motion.div key={group.cat} variants={fadeUp} className="border-t border-line-2 pt-5">
              <h3 className="text-sm font-bold text-ink-dim uppercase tracking-wider mb-4">{group.cat}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((it) => (
                  <span key={it} className="px-3 py-1.5 rounded-lg bg-panel border border-line text-ink text-[13px] font-medium hover:border-accent-2/60 hover:text-accent-2 hover:shadow-[0_0_20px_-4px_rgba(177,18,16,0.4)] transition-all duration-300">
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
