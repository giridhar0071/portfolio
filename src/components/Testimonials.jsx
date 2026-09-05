import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { QUOTES } from '../data';
import { fadeUp, stagger, viewport } from '../motion';

const VerifiedTestimonials = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/testimonials?status=approved')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setItems(data);
      })
      .catch(() => {
        // Fail closed: on any error the section just stays empty rather than
        // showing a broken UI on a job-search-critical page.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="text-lg font-bold text-ink mb-1">Verified recommendations</h3>
      <p className="text-ink-dim text-sm leading-relaxed max-w-xl mb-6">
        From people I've worked with. Each one links back to the real profile it came from.
      </p>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.1)}
        className="grid md:grid-cols-3 gap-6"
      >
        {items.map((t, i) => (
          <motion.div key={i} variants={fadeUp} className="bg-panel border border-line rounded-3xl p-7 flex flex-col hover:shadow-[0_20px_50px_-16px_rgba(177,18,16,0.25)] hover:-translate-y-1 hover:border-accent-2/30 transition-all duration-300">
            <p className="text-ink/90 text-[15px] leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-6 pt-5 border-t border-line">
              <a href={t.profile_url} target="_blank" rel="noreferrer" className="text-ink font-bold text-sm hover:text-accent-2 transition-colors">
                {t.name} ↗
              </a>
              <div className="text-ink-dim text-xs">
                {t.role}
                {t.company ? ` · ${t.company}` : ''}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-[#f6f5f3] w-full py-24 md:py-28 px-6 md:px-12 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="mb-12 max-w-2xl">
          <span className="eyebrow text-xs font-bold tracking-[0.25em] uppercase text-accent-2">In their words</span>
          <h2 className="text-4xl md:text-6xl font-black text-ink mt-4 leading-[1.05] tracking-tight mb-6">
            What people say <span className="font-serif italic text-accent-2">working with me</span>.
          </h2>
          <a
            href="/submit"
            data-cursor="link"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent-2 transition-colors duration-300"
          >
            Leave a testimonial
          </a>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="mb-6">
          <h3 className="text-lg font-bold text-ink">Students I've taught</h3>
          <p className="text-ink-dim mt-1 text-sm leading-relaxed max-w-xl">
            On the side, I've taught C and Python to more than 50 learners, from the ground up, never just syntax. Here are a few of their own words, exactly as they sent them.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.1)}
          className="grid md:grid-cols-3 gap-6"
        >
          {QUOTES.map((q) => (
            <motion.div key={q.name} variants={fadeUp} className="bg-panel border border-line rounded-3xl p-7 flex flex-col hover:shadow-[0_20px_50px_-16px_rgba(177,18,16,0.25)] hover:-translate-y-1 hover:border-accent-2/30 transition-all duration-300">
              <span className="eyebrow text-[10px] font-bold uppercase tracking-widest text-accent-2 mb-4">{q.topic}</span>
              <p className="text-ink/90 text-[15px] leading-relaxed flex-1">&ldquo;{q.text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-line">
                <span className="w-10 h-10 rounded-full bg-accent text-white font-black grid place-items-center">{q.initial}</span>
                <div>
                  <div className="text-ink font-bold text-sm">{q.name}</div>
                  <div className="text-ink-dim text-xs">{q.handle}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="mt-16 mb-6">
          <h3 className="text-lg font-bold text-ink">From LinkedIn</h3>
          <p className="text-ink-dim mt-1 text-sm leading-relaxed max-w-xl">
            A couple of recommendations, straight from LinkedIn.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.1)}
          className="grid md:grid-cols-2 gap-6"
        >
          {['linkedin-1.png', 'linkedin-2.png'].map((src) => (
            <motion.a
              key={src}
              href={`/testimonials/${src}`}
              target="_blank"
              rel="noreferrer"
              data-cursor="view"
              variants={fadeUp}
              className="block rounded-3xl border border-line bg-panel overflow-hidden hover:shadow-[0_20px_50px_-16px_rgba(177,18,16,0.25)] hover:-translate-y-1 hover:border-accent-2/30 transition-all duration-300"
            >
              <img src={`/testimonials/${src}`} alt="LinkedIn recommendation" className="w-full h-auto block" />
            </motion.a>
          ))}
        </motion.div>

        <VerifiedTestimonials />
      </div>
    </section>
  );
};

export default Testimonials;
