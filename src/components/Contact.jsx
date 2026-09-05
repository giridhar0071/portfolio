import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../data';
import { fadeUp, viewport } from '../motion';
import MagneticButton from './MagneticButton';

const Contact = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.id]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.firstName} ${form.lastName}`.trim());
    const body = encodeURIComponent(`${form.message}\n\n— ${form.firstName} ${form.lastName} (${form.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="bg-white w-full py-24 md:py-28 px-6 md:px-12 border-t border-line">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left — bold heading + details */}
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="lg:col-span-5">
          <span className="eyebrow text-xs font-bold tracking-[0.25em] uppercase text-accent-2">Get in touch</span>

          <h2 className="font-display text-[18vw] sm:text-[12rem] lg:text-[9rem] leading-[0.85] text-ink uppercase tracking-tight mt-5 mb-6">
            Let's<br /><span className="text-accent-2">talk.</span>
          </h2>

          <p className="text-ink-dim text-base md:text-lg leading-relaxed max-w-md mb-8">
            Hiring for a backend or full-stack role? Need another solid pair of hands? Or just want to talk systems? My inbox is genuinely open, and I reply to every thoughtful message.
          </p>

          <div className="space-y-3 mb-8">
            <a href={`mailto:${PROFILE.email}`} data-cursor="link" className="flex items-center gap-3 text-ink font-semibold hover:text-accent-2 transition-colors group">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-panel border border-line group-hover:border-accent-2/40">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M3 6h18v12H3z"/></svg>
              </span>
              {PROFILE.email}
            </a>
            <div className="flex items-center gap-3 text-ink-dim">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-panel border border-line">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.3-7-11a7 7 0 1114 0c0 5.7-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
              </span>
              {PROFILE.location}
            </div>
          </div>

          <div className="flex items-center gap-4 text-ink-dim">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" data-cursor="link" aria-label="GitHub" className="hover:text-accent-2 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.8 18.3 5.1 18.3 5.1c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.7 18.3.5 12 .5z"/></svg></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" data-cursor="link" aria-label="LinkedIn" className="hover:text-accent-2 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg></a>
            <a href={PROFILE.hashnode} target="_blank" rel="noreferrer" data-cursor="link" aria-label="Hashnode" className="hover:text-accent-2 transition-colors font-mono text-xs tracking-wide">hashnode ↗</a>
          </div>
        </motion.div>

        {/* Right — form card */}
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} transition={{ delay: 0.15 }} className="lg:col-span-7">
          <form onSubmit={onSubmit} className="bg-panel border border-line rounded-3xl p-7 md:p-10 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]">
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-2">First name</label>
                <input type="text" id="firstName" value={form.firstName} onChange={onChange} placeholder="Jane" className="w-full bg-panel-2 border border-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-accent-2 transition-colors placeholder-black/25" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-2">Last name</label>
                <input type="text" id="lastName" value={form.lastName} onChange={onChange} placeholder="Doe" className="w-full bg-panel-2 border border-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-accent-2 transition-colors placeholder-black/25" />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-2">Email</label>
              <input type="email" id="email" value={form.email} onChange={onChange} placeholder="jane@company.com" className="w-full bg-panel-2 border border-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-accent-2 transition-colors placeholder-black/25" />
            </div>
            <div className="mb-7">
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-2">Message</label>
              <textarea id="message" value={form.message} onChange={onChange} placeholder="Tell me a little about the role or the problem you're solving…" rows={5} className="w-full bg-panel-2 border border-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-accent-2 transition-colors placeholder-black/25 resize-none" />
            </div>
            <MagneticButton as="button" type="submit" cursor="link" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent text-white font-bold flex items-center justify-center gap-3 hover:bg-accent-2 transition-colors duration-300 group shadow-[0_10px_30px_-8px_rgba(177,18,16,0.6)]">
              Send message
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </MagneticButton>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
