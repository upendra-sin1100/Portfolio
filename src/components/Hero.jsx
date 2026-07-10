import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// ─── Rotating role word — cycles through what he actually builds ─────────────
const ROLES = ['machine learning models', 'deep learning pipelines', 'data-driven products', 'generative AI systems']

function useTypewriter(words, { typeSpeed = 55, deleteSpeed = 30, pause = 1400 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex(i => i + 1)
    } else {
      timeout = setTimeout(() => {
        setText(t => current.slice(0, deleting ? t.length - 1 : t.length + 1))
      }, deleting ? deleteSpeed : typeSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/upendra-sin1100',
    icon: (
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.25-.01-.9-.01-1.77-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.9-1.32 2.74-1.05 2.74-1.05.56 1.42.2 2.47.1 2.73.65.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/upendra-singh-tomar-222a41312/',
    icon: (
      <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 21h-3.37v-6.06c0-1.44-.03-3.3-2.02-3.3-2.02 0-2.33 1.58-2.33 3.2V21h-3.37V8.5h3.24v1.71h.05c.45-.85 1.55-1.75 3.2-1.75 3.43 0 4.6 2.26 4.6 5.19V21Z" />
    ),
  },
  {
    label: 'Email',
    href: 'mailto:upendratomar1100@gmail.com',
    icon: (
      <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.2.3 7.8 6.1 7.8-6.1H4.2ZM20 7.4l-7.4 5.8a1 1 0 0 1-1.24 0L4 7.4v11.1c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5V7.4Z" />
    ),
  },
]

const downloadResume = () => {
  const link = document.createElement('a')
  link.href = '/Upendra_Singh_Tomar_Resume.pdf'
  link.download = 'Upendra_Singh_Tomar_Resume.pdf'
  link.click()
}

export default function Hero() {
  const typed = useTypewriter(ROLES)

  return (
    <div className="min-h-screen flex items-center pt-28 pb-16">
      <div className="container-custom w-full">
        <div className="max-w-3xl">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-white/50 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Gwalior, Madhya Pradesh · Open to ML/AI roles
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight"
          >
            Upendra Singh
            <br />
            <span className="gradient-text">Tomar</span>
          </motion.h1>

          {/* Typewriter role line — the signature moment */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex items-center gap-2 font-mono text-base sm:text-lg text-white/60"
          >
            <span className="text-purple-400">{'>'}</span>
            <span>I build</span>
            <span className="text-cyan-300">{typed}</span>
            <span className="inline-block w-[2px] h-5 bg-cyan-300 animate-pulse" />
          </motion.div>

          {/* Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-base sm:text-lg text-white/50 leading-relaxed max-w-xl"
          >
            Data Science undergraduate at the Institute of Technology of Management, Gwalior,
            building end-to-end ML applications — from a real-time patient triage dashboard to an
            unsupervised resume classifier — with two published research papers along the way.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(124,58,237,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
            >
              View Projects
            </motion.a>
            <motion.button
              onClick={downloadResume}
              whileHover={{ scale: 1.03, borderColor: 'rgba(139,92,246,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full text-sm font-bold text-white/80 border border-white/15 bg-white/[0.02]"
            >
              Download Resume
            </motion.button>

            {/* Socials */}
            <div className="flex items-center gap-2 pl-2">
              {SOCIALS.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/50 hover:text-white hover:border-purple-500/40 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">{s.icon}</svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}