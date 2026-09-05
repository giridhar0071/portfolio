import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

// Custom cursor: a tight dot + a lagging ring. Reads `data-cursor`
// attributes off hovered elements ("link" | "view" | "drag") to
// resize/relabel the ring via event delegation, so existing
// elements just need a data-cursor attribute — no extra wiring.
const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 30, stiffness: 280, mass: 0.4 });
  const ringY = useSpring(y, { damping: 30, stiffness: 280, mass: 0.4 });

  const rootRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches && !prefersReduced);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [prefersReduced]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-custom-cursor');
      return;
    }
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      const el = e.target.closest?.('[data-cursor]');
      setMode(el ? el.getAttribute('data-cursor') : null);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isLink = mode === 'link';
  const isView = mode === 'view';
  const isDrag = mode === 'drag';
  const scaled = isLink || isView || isDrag;

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-[99999]" aria-hidden="true">
      {/* core dot */}
      <motion.div
        className="absolute rounded-full bg-accent-2"
        style={{ x, y, width: 8, height: 8, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: scaled ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* lagging ring */}
      <motion.div
        className="absolute rounded-full border flex items-center justify-center mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: 'rgba(255,255,255,0.7)',
        }}
        animate={{
          width: scaled ? (isView ? 84 : 56) : 32,
          height: scaled ? (isView ? 84 : 56) : 32,
          backgroundColor: scaled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)',
          borderWidth: scaled ? 1 : 1.5,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 300, mass: 0.5 }}
      >
        {isView && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-white"
          >
            View
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};

export default Cursor;
