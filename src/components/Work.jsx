import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { CASES } from '../data';
import { VIZ } from '../viz';
import loanCover from '../assets/projects/loan.png';
import securenoteCover from '../assets/projects/securenote.png';
import ewalletCover from '../assets/projects/ewallet.png';
import { fadeUp, viewport } from '../motion';

const COVERS = { loan: loanCover, securenote: securenoteCover, ewallet: ewalletCover };

const Chapter = ({ c, index }) => {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const [open, setOpen] = useState(false);

  return (
    <article className="border-b border-line last:border-b-0">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Chapter header — click to expand */}
        <motion.button
          type="button"
          data-cursor="link"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          className="w-full flex items-center justify-between gap-6 text-left"
        >
          <div className="flex items-center gap-5 md:gap-8 min-w-0">
            <div className="w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-2xl overflow-hidden border border-line bg-panel">
              <img src={COVERS[c.viz]} alt={c.title} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <span className="font-mono text-ink-dim text-xs uppercase tracking-widest">{c.num}</span>
              <h3 className="text-2xl md:text-4xl font-bold text-ink leading-tight truncate">{c.title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-ink-dim text-sm">{c.year}</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="text-accent-2"
              style={{ transition: 'transform 250ms ease', transform: open ? 'rotate(180deg)' : 'none' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </motion.button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div className="pt-10 md:pt-14">
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

                  <div>
                    <p className="text-ink-dim text-base md:text-lg leading-relaxed mb-6">{c.one}</p>
                    <div className="flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full border border-line text-ink-dim text-xs font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Architecture diagram panel */}
                <div className="mb-10 md:mb-14">
                  <h4 className="eyebrow text-[11px] uppercase tracking-widest text-accent-2 font-bold mb-3">Architecture</h4>
                  <div className="rounded-3xl bg-[#0a0a0a] border border-white/10 p-6 md:p-10 flex items-center justify-center">
                    <div className="viz-host w-full h-[240px] md:h-[320px]" dangerouslySetInnerHTML={{ __html: VIZ[c.viz] || '' }} />
                  </div>
                </div>

                {/* Problem / approach / decisions / metrics */}
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  <div>
                    <h4 className="eyebrow text-[11px] uppercase tracking-widest text-accent-2 font-bold mb-2">The problem</h4>
                    <p className="text-ink-dim text-sm leading-relaxed">{c.problem}</p>
                  </div>
                  <div>
                    <h4 className="eyebrow text-[11px] uppercase tracking-widest text-accent-2 font-bold mb-2">The approach</h4>
                    <ul className="space-y-2">
                      {c.approach.map((a, i) => (
                        <li key={i} className="text-ink-dim text-sm leading-relaxed pl-4 relative"><span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-black/20" />{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="eyebrow text-[11px] uppercase tracking-widest text-accent-2 font-bold mb-2">Key decisions</h4>
                    <ul className="space-y-2">
                      {c.decisions.map((d, i) => (
                        <li key={i} className="text-ink-dim text-sm leading-relaxed pl-4 relative"><span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-accent-2" />{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
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
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
