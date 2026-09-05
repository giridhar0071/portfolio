import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Wraps any link/button and gives it a subtle magnetic pull toward
// the cursor on hover. Pass through all props (href, className, etc.)
const MagneticButton = ({ as = 'a', className = '', children, strength = 0.35, cursor = 'link', ...rest }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = motion[as] || motion.a;

  return (
    <Tag
      ref={ref}
      data-cursor={cursor}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default MagneticButton;
