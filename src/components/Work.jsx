import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CASES } from '../data';
import { VIZ } from '../viz';
import loanCover from '../assets/projects/loan.png';
import securenoteCover from '../assets/projects/securenote.png';
import ewalletCover from '../assets/projects/ewallet.png';
import { fadeUp, fadeIn, stagger, viewport } from '../motion';

const COVERS = { loan: loanCover, securenote: securenoteCover, ewallet: ewalletCover };

const Chapter = ({ c, index }) => {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <article className="border-b border-line last:border-b-0">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Chapter header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          className="flex items-end justify-between gap-6 mb-10 md:mb-14"
        >
          <div>
            <span className="font-display text-[#1f1d1c] text-[14vw] md:text-[8rem] leading-none block -mb-4 md:-mb-8 select-none" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.08)', color: 'transparent' }}>
              {c.num}
            </span>
            <h3 className="text-3xl md:text-5xl font-bold text-ink leading-tight max-w-xl">{c.title}</h3>
          </div>
          <span className="font-mono text-ink-dim text-sm shrink-0 mb-1">{c.year}</span>
        </motion.div>

        {/* Cover image with parallax + intro */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-10 md:mb-14">
          <div ref={imgRef} data-cursor="view" className="relative rounded-3xl overflow-hidden border border-line bg-panel min-h-[260px] md:min-h-[380px]">
            <motion.img
              style={{ y }}
              src={COVERS[c.viz]}
              alt={c.title}
              className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <p className="text-ink-dim text-base md:text-lg leading-relaxed mb-6">{c.one}</p>
            <div className="flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full border border-line text-ink-dim text-xs font-mono">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Architecture diagram panel */}
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeIn} className="mb-10 md:mb-14">
          <h4 className="eyebrow text-[11px] uppercase tracking-widest text-accent-2 font-bold mb-3">Architecture</h4>
          <div className="rounded-3xl bg-[#0a0a0a] border border-white/10 p-6 md:p-10 flex items-center justify-center">
            <div className="viz-host w-full h-[240px] md:h-[320px]" dangerouslySetInnerHTML={{ __html: VIZ[c.viz] || '' }} />
          </div>
        </motion.div>

        {/* Problem / approach / decisions / metrics */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.12)}
          className="grid md:grid-cols-2 gap-x-12 gap-y-10"
        >
          <motion.div variants={fadeUp}>
            <h4 className="eyebrow text-[11px] uppercase tracking-widest text-accent-2 font-bold mb-2">The problem</h4>
            <p className="text-ink-dim text-sm leading-relaxed">{c.problem}</p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4 className="eyebrow text-[11px] uppercase tracking-widest text-accent-2 font-bold mb-2">The approach</h4>
            <ul className="space-y-2">
              {c.approach.map((a, i) => (
                <li key={i} className="text-ink-dim text-sm leading-relaxed pl-4 relative"><span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-black/20" />{a}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4 className="eyebrow text-[11px] uppercase tracking-widest text-accent-2 font-bold mb-2">Key decisions</h4>
            <ul className="space-y-2">
              {c.decisions.map((d, i) => (
                <li key={i} className="text-ink-dim text-sm leading-relaxed pl-4 relative"><span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-accent-2" />{d}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4 className="eyebrow text-[11px] uppercase tracking-widest text-accent-2 font-bold mb-3">By the numbers</h4>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {c.metrics.map((m, i) => (
                <div key={i} className="rounded-xl bg-panel border border-line p-3 text-center hover:border-accent-2/40 transition-colors duration-300">
                  <div className="text-lg font-bold text-ink">{m.n}</div>
                  <div className="text-[10px] text-ink-dim leading-tight mt-1">{m.l}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-accent-soft border border-accent-2/25 p-4">
              <span className="text-[11px] uppercase tracking-widest text-accent-2 font-bold">What I learned</span>
              <p className="text-ink/90 text-sm leading-relaxed mt-1.5 italic">{c.lesson}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </article>
  );
};

const Work = () => {
  return (
    <section id="work" className="bg-white w-full pt-24 md:pt-28 px-0">
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-4 md:mb-8">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          <span className="eyebrow text-xs font-bold tracking-[0.25em] uppercase text-accent-2">Selected work</span>
          <h2 className="text-4xl md:text-6xl font-bold text-ink mt-4 leading-[1.05]">
            Three systems I built,
            <br className="hidden md:block" /> told as <span className="font-serif italic text-ink-dim">chapters</span>, not screenshots.
          </h2>
        </motion.div>
      </div>

      <div>
        {CASES.map((c, i) => (
          <Chapter key={c.num} c={c} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Work;
