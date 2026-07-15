import React from 'react'
import { motion } from 'framer-motion'

const CONTACT = [
  { label: 'Email', value: 'upendratomar1100@gmail.com', href: 'mailto:upendratomar1100@gmail.com' },
  { label: 'Phone', value: '+91 887-123-2117', href: 'tel:+918871232117' },
  { label: 'Location', value: 'Birla Nagar, Gwalior, MP 474003', href: null },
]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/upendra-sin1100' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/upendra-singh-tomar-222a41312/' },
  { label: 'Resume', href: '/certificates/Upendra%20Singh%20Tomar%20Resume.pdf' },
]

export default function Footer() {
  return (
    <div className="container-custom py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white/[0.03] border border-white/[0.07] p-10 md:p-14 text-center"
      >
        <span className="inline-block text-xs font-bold tracking-[3px] text-purple-400/70 uppercase mb-3">Contact</span>
        <h2 className="text-4xl md:text-5xl font-black gradient-text max-w-lg mx-auto leading-tight">
          Let's build something worth shipping.
        </h2>
        <p className="mt-5 text-white/50 max-w-md mx-auto">
          Open to machine learning engineering and data science roles, internships, and interesting
          collaborations.
        </p>

        <motion.a
          href="mailto:upendratomar1100@gmail.com"
          whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(124,58,237,0.5)' }}
          whileTap={{ scale: 0.97 }}
          className="inline-block mt-8 px-7 py-3 rounded-full text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
        >
          Say Hello ↗
        </motion.a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/40">
          {CONTACT.map(c => (
            <span key={c.label}>
              {c.href ? (
                <a href={c.href} className="hover:text-white transition-colors">{c.value}</a>
              ) : (
                c.value
              )}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
        <p>© {new Date().getFullYear()} Upendra Singh Tomar. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              download={s.href.startsWith('/') ? 'Upendra Singh Tomar Resume.pdf' : undefined}
              className="hover:text-white/60 transition-colors font-medium"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
