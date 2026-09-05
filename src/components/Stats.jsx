import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { STATS } from '../data';
import { fadeUp, stagger, viewport } from '../motion';

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
