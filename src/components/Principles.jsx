import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { PRINCIPLES } from '../data';
import { fadeLeft, fadeRight, fadeIn, viewport } from '../motion';

const PrincipleCard = ({ p, side, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, 'change', (latest) => {
    if (!ref.current || !containerRef.current) return;
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const cardTop = cardRect.top - containerRect.top;
    const triggerY = cardTop + 40;
    const lineTipY = latest * containerRect.height;
    if (lineTipY >= triggerY && !isActive) setIsActive(true);
    else if (lineTipY < triggerY && isActive) setIsActive(false);
  });

  return (
    <div className={`w-full flex ${side === 'left' ? 'md:justify-start' : 'md:justify-end'} justify-center`}>
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={side === 'left' ? fadeRight : fadeLeft}
        className={`w-full sm:w-[24rem] md:w-[42%] rounded-[1.75rem] p-2 relative transition-all duration-700 ${
          isActive ? 'bg-accent shadow-[0_16px_36px_-14px_rgba(177,18,16,0.45)]' : 'bg-panel border border-line shadow-[0_12px_28px_-16px_rgba(0,0,0,0.25)]'
        }`}
      >
        <div className="w-5 h-5 bg-black/10 rounded-full absolute top-4 left-1/2 -translate-x-1/2 border border-line z-10" />
        <div className={`w-full rounded-[1.4rem] mt-8 p-7 flex flex-col min-h-[180px] transition-colors duration-700 ${isActive ? 'bg-white/10' : 'bg-panel-2'}`}>
          <span className={`text-xl font-serif italic mb-2 transition-colors duration-700 ${isActive ? 'text-white/70' : 'text-ink-dim'}`}>{p.n}</span>
          <h3 className={`text-xl md:text-2xl font-black mb-3 tracking-tight transition-colors duration-700 ${isActive ? 'text-white' : 'text-ink'}`}>{p.t}</h3>
          <p className={`text-sm leading-relaxed font-medium transition-colors duration-700 ${isActive ? 'text-white/90' : 'text-ink-dim'}`}>{p.d}</p>
        </div>
      </motion.div>
    </div>
  );
};

const Principles = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section
      id="principles"
      ref={containerRef}
      className="bg-[#f6f5f3] pt-24 pb-28 px-6 md:px-12 w-full relative overflow-hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeIn}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-block border border-line rounded-full px-5 py-1.5 text-sm text-ink-dim font-bold mb-6 bg-panel">How I think</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-ink leading-[1.05] tracking-tight">
            Engineering principles
            <br /> I <span className="font-serif italic text-accent-2">actually</span> hold.
          </h2>
        </motion.div>

        <svg className="hidden md:block absolute left-1/2 -translate-x-1/2 top-[260px] w-4 h-[calc(100%-300px)] pointer-events-none z-0" viewBox="0 0 4 100" preserveAspectRatio="none">
          <path d="M2,0 L2,100" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="3" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
          <mask id="prin-mask">
            <motion.path d="M2,0 L2,100" fill="none" stroke="white" strokeWidth="4" style={{ pathLength }} vectorEffect="non-scaling-stroke" />
          </mask>
          <path d="M2,0 L2,100" fill="none" stroke="#b11210" strokeWidth="3" strokeDasharray="4 6" mask="url(#prin-mask)" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="flex flex-col gap-8 md:gap-10 relative z-10">
          {PRINCIPLES.map((p, i) => (
            <PrincipleCard key={p.n} p={p} side={i % 2 === 0 ? 'left' : 'right'} pathLength={pathLength} containerRef={containerRef} />
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeIn}
          className="text-center mt-12"
        >
          <span className="font-hand text-3xl text-ink-dim">— the why before the how.</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Principles;
