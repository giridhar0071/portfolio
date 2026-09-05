// ============================================================
//  Shared Framer Motion variants — replaces AOS.
//  Keep animations transform/opacity-only for 60fps.
// ============================================================

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const dropBounce = {
  hidden: { opacity: 0, y: -260 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.28, 0.84, 0.42, 1] },
  },
};

// Container variant for staggered children — pair with fadeUp on children
export const stagger = (gap = 0.12, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

// Standard viewport config for scroll reveals
export const viewport = { once: true, amount: 0.2 };

// Common props bundle for a simple reveal-on-scroll element
export const reveal = (variant = fadeUp, extra = {}) => ({
  initial: 'hidden',
  whileInView: 'show',
  viewport,
  variants: variant,
  ...extra,
});
