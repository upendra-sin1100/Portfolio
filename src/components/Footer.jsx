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
  { label: 'Resume', href: '/certificates/Upendra_Singh_Tomar_Resume.pdf' },
]

export default function Footer() {
  return (
    <div className="section-shell">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="surface-card-strong rounded-[32px] p-8 md:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start">
            <div>
              <span className="section-kicker mb-4">Get In Touch</span>
              <h2 className="section-title max-w-xl leading-[0.95]">
                Let's build something worth shipping.
              </h2>
              <p className="section-lead mt-5">
                Open to machine learning engineering and data science roles, internships, and collaborations where design, systems, and research matter together.
              </p>

              <motion.a
                href="mailto:upendratomar1100@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex mt-8 px-7 py-3 rounded-lg text-sm font-sans font-semibold text-white bg-sapphire hover:bg-sapphire-hover shadow-lg shadow-sapphire/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
              >
                Say Hello ↗
              </motion.a>
            </div>

            <div className="surface-card rounded-[28px] p-6 md:p-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {CONTACT.map((c) => (
                  <div key={c.label} className="rounded-2xl bg-void/45 border border-steel/15 p-4 min-w-0">
                    <p className="text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-sapphire">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="mt-2 block max-w-full break-words text-sm text-ice hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire rounded">
                        {c.value}
                      </a>
                    ) : (
                      <span className="mt-2 block max-w-full break-words text-sm text-ice">{c.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-steel/15 bg-void/45 p-4">
                <p className="text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-steel">Quick Links</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      download={s.href.startsWith('/') ? 'Upendra_Singh_Tomar_Resume.pdf' : undefined}
                      className="inline-flex items-center rounded-full border border-steel/20 bg-slate-deep/60 px-4 py-2 text-xs font-semibold text-ice hover:border-sapphire hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-steel/60 pt-6 border-t border-steel/10">
          <p>© {new Date().getFullYear()} Upendra Singh Tomar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                download={s.href.startsWith('/') ? 'Upendra_Singh_Tomar_Resume.pdf' : undefined}
                className="hover:text-white transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire rounded px-1 py-0.5"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
