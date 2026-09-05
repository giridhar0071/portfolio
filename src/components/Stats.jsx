import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { STATS, PROFILE } from '../data';
import { fadeUp, stagger, viewport } from '../motion';

const PROOF_LINKS = [
  {
    label: 'GitHub',
    href: PROFILE.github,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.8 18.3 5.1 18.3 5.1c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.7 18.3.5 12 .5z" /></svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: PROFILE.linkedin,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
    ),
  },
  {
    label: 'Résumé',
    href: '/Sai_Giridhar_Bandla_Resume.docx',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0l-4-4m4 4l4-4M4 20h16" /></svg>
    ),
  },
];

// Parses "~25%" -> { prefix: "~", value: 25, suffix: "%" }
const parseStat = (n) => {
  const m = n.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!m) return { prefix: '', value: null, suffix: n };
  return { prefix: m[1], value: parseFloat(m[2]), suffix: m[3] };
};

const Counter = ({ n }) => {
  const { prefix, value, suffix } = parseStat(n);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = React.useState(0);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (inView && value !== null) {
      const controls = animate(count, value, { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 });
      return controls.stop;
    }
  }, [inView, value, count]);

  if (value === null) {
    return <span ref={ref}>{suffix}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section className="bg-white w-full px-6 md:px-12 py-16 md:py-20 border-b border-line">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={fadeUp}
        className="max-w-6xl mx-auto flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 md:mb-12"
      >
        {PROOF_LINKS.map((p) => (
          <a
            key={p.label}
            href={p.href}
            target={p.href.startsWith('http') ? '_blank' : undefined}
            rel={p.href.startsWith('http') ? 'noreferrer' : undefined}
            data-cursor="link"
            className="inline-flex items-center gap-2 text-ink-dim text-sm font-semibold hover:text-accent-2 transition-colors"
          >
            {p.icon}
            {p.label}
          </a>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.1)}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        {STATS.map((s) => (
          <motion.div key={s.l} variants={fadeUp} className="group">
            <div className="text-4xl md:text-5xl font-display text-ink tracking-tight group-hover:text-accent-2 transition-colors duration-300">
              <Counter n={s.n} />
            </div>
            <div className="text-[12px] md:text-[13px] text-ink-dim leading-snug mt-3 max-w-[14rem]">{s.l}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Stats;
