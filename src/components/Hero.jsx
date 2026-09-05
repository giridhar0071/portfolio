import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import heroVideo from '../assets/hero-video/hero-reel.mp4';
import { PROFILE } from '../data';
import MagneticButton from './MagneticButton';
import { stagger, fadeUp } from '../motion';

const word = {
  hidden: { opacity: 0, y: '100%' },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const Line = ({ children, delay = 0 }) => (
  <span className="inline-block overflow-hidden">
    <motion.span
      className="inline-block"
      initial={{ y: '110%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.span>
  </span>
);

const Hero = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const next = !isMuted;
    v.muted = next;
    if (!next) v.play().catch(() => {});
    setIsMuted(next);
  };

  return (
    <section id="home" className="relative w-full bg-[#0a0a0a] overflow-hidden lg:h-screen lg:min-h-[680px]">
      {/* Video:
          - mobile: in normal flow at its natural aspect ratio → fully visible, no crop
          - desktop: absolute, fills the screen (object-cover) */}
      <div className="relative w-full aspect-[1060/650] lg:absolute lg:inset-0 lg:h-full lg:aspect-auto">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover lg:object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* grain */}
        <div className="grain-overlay" />

        {/* Showreel tag */}
        <div className="absolute top-16 left-4 lg:top-28 lg:left-12 z-20 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-2 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/90">Showreel</span>
        </div>

        {/* Sound toggle (overlaid on the video, both layouts) */}
        <div role="button" data-cursor="link" aria-label={isMuted ? 'Unmute reel' : 'Mute reel'} onClick={toggleSound} className="absolute bottom-3 right-3 lg:bottom-6 lg:right-12 z-20 flex items-center gap-2 cursor-pointer group">
          <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full border backdrop-blur-md flex justify-center items-center group-hover:scale-110 transition-all duration-500 ${isMuted ? 'border-white/20 bg-black/40 group-hover:bg-accent' : 'border-accent bg-accent shadow-[0_0_24px_rgba(177,18,16,0.7)]'}`}>
            {isMuted ? (
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3z" /><path d="M19 12l3 3m0-3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
            ) : (
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3z" /><path d="M16 8.5a4.5 4.5 0 010 7M18.5 6a8 8 0 010 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
            )}
          </div>
          <span className="text-white text-[10px] font-bold tracking-widest uppercase opacity-85 group-hover:opacity-100 transition-opacity drop-shadow">{isMuted ? 'Sound' : 'Mute'}</span>
        </div>
      </div>

      {/* Content:
          - mobile: below the video on dark
          - desktop: absolute overlay anchored bottom-left over the video */}
      <div className="relative z-20 bg-[#0a0a0a] lg:bg-transparent lg:absolute lg:inset-0 lg:h-full lg:flex lg:flex-col lg:justify-end">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 lg:py-0 lg:pb-20">
          <div className="max-w-2xl">
            <div className="eyebrow text-[11px] font-bold tracking-[0.28em] uppercase text-accent-2 mb-4 lg:mb-5 overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: '120%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              >
                {PROFILE.role} · Open to roles
              </motion.span>
            </div>

            <h1 className="text-[#f4f2ef] text-3xl lg:text-5xl font-bold leading-[1.05] tracking-tight mb-5 lg:mb-7 drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
              <Line delay={0.18}>Once the <span className="font-serif italic text-accent-2">why</span> clicks,</Line>
              <br />
              <Line delay={0.3}>the <span className="font-serif italic text-accent-2">how</span> takes care of itself.</Line>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.55 }}
              className="text-[#9a958f] text-base leading-relaxed max-w-md mb-7 lg:text-white/75 lg:max-w-lg"
            >
              I build secure, event-driven backends — and the clean screens on top of them. Spring Boot, Kafka and AWS, explained in plain words.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(0.1, 0.7)}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.div variants={fadeUp}>
                <MagneticButton href="#work" className="inline-flex px-7 py-3 text-sm lg:text-base rounded-full bg-accent text-white font-semibold hover:bg-accent-2 transition-colors duration-300 shadow-[0_10px_30px_-8px_rgba(177,18,16,0.7)]">
                  View selected work
                </MagneticButton>
              </motion.div>
              <motion.div variants={fadeUp}>
                <MagneticButton href="/Sai_Giridhar_Bandla_Resume.docx" className="inline-flex px-7 py-3 text-sm lg:text-base rounded-full border font-semibold transition-colors duration-300 border-white/20 text-white hover:bg-white/10 backdrop-blur-md">
                  Download résumé
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden lg:block absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-white text-xs font-mono tracking-widest"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>↓</motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
