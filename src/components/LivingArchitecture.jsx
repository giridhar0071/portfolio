import React from 'react';
import { motion } from 'framer-motion';

// Abstract "living system" diagram for the hero: nodes connected by
// paths, with small packets traveling the connections on loop via
// native SVG <animateMotion> (GPU-driven, no rAF needed) and nodes
// pulsing via Framer Motion. Purely decorative / low-opacity layer.

const NODES = [
  { id: 'a', x: 90, y: 90, r: 5 },
  { id: 'b', x: 290, y: 60, r: 7 },
  { id: 'c', x: 470, y: 130, r: 5 },
  { id: 'd', x: 230, y: 220, r: 8 },
  { id: 'e', x: 430, y: 290, r: 5 },
  { id: 'f', x: 80, y: 290, r: 5 },
  { id: 'g', x: 350, y: 380, r: 6 },
];

const PATHS = [
  'M90,90 C170,80 230,40 290,60',
  'M290,60 C370,85 430,100 470,130',
  'M290,60 C270,130 250,170 230,220',
  'M230,220 C320,250 380,260 430,290',
  'M230,220 C170,250 120,265 80,290',
  'M80,290 C200,340 280,360 350,380',
  'M470,130 C460,220 440,260 430,290',
];

const LivingArchitecture = ({ className = '' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 520 420"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* connections */}
      <g fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2">
        {PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* traveling packets */}
      <g filter="url(#glow)">
        {PATHS.map((d, i) => (
          <circle key={i} r="2.6" fill="#b11210" opacity="0.9">
            <animateMotion
              dur={`${5 + (i % 4) * 1.6}s`}
              begin={`${i * 0.7}s`}
              repeatCount="indefinite"
              path={d}
              rotate="auto"
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0.9;0"
              keyTimes="0;0.08;0.85;1"
              dur={`${5 + (i % 4) * 1.6}s`}
              begin={`${i * 0.7}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      {/* nodes */}
      {NODES.map((n, i) => (
        <g key={n.id} filter="url(#glow)">
          <circle cx={n.x} cy={n.y} r={n.r + 6} fill="none" stroke="rgba(177,18,16,0.25)" strokeWidth="1" />
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="rgba(244,242,239,0.9)"
            initial={{ opacity: 0.5, scale: 0.85 }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1, 0.85] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        </g>
      ))}
    </svg>
  );
};

export default LivingArchitecture;
