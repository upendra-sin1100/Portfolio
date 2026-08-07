import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    title: 'UpFeed — News Aggregator',
    period: 'May 2026',
    stack: ['React.js', 'GNews API', 'Vercel'],
    description:
      'A responsive news aggregator pulling live articles from GNews and NewsAPI across multiple categories and sources.',
    demo: 'https://up-feed.vercel.app',
    className: 'md:col-span-2 md:row-span-2',
    color: 'from-purple-500/20 to-transparent',
    accentColor: 'rgba(168,85,247,0.15)',
  },
  {
    title: 'Resume Analyzer',
    period: 'April 2026',
    stack: ['Python', 'Scikit-Learn', 'K-Means'],
    description:
      'An ML pipeline trained on 78,670 resume entries that sorts resumes into 7 job categories using MiniBatch K-Means clustering over TF-IDF vectors.',
    demo: 'https://resume-analyzer-with-unsupervised-learning.streamlit.app',
    className: 'md:col-span-1 md:row-span-1',
    color: 'from-amber-signal/20 to-transparent',
    accentColor: 'rgba(245,158,11,0.15)',
  },
  {
    title: 'Disease X Command Center',
    period: 'April 2026',
    stack: ['Streamlit', 'PostgreSQL', 'Supabase', 'ML'],
    description:
      'A real-time, full-stack hospital management dashboard for patient triage. It flags critical cases as data comes in and surfaces actionable insight.',
    demo: 'https://disease-x-project.streamlit.app',
    className: 'md:col-span-1 md:row-span-1',
    color: 'from-sapphire/20 to-transparent',
    accentColor: 'rgba(0,240,255,0.15)',
  },
]

// ─── Spotlight Card ──────────────────────────────────────────────────────────
function SpotlightCard({ p, i }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e) => {
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const spotlightBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(350px circle at ${x}px ${y}px, ${p.accentColor}, transparent 70%)`
  )

  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 })

  const rotateX = useTransform(springY, [0, 300], [4, -4])
  const rotateY = useTransform(springX, [0, 500], [-4, 4])

  return (
    <motion.a
      ref={cardRef}
      key={p.title}
      href={p.demo}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      whileTap={{ scale: 0.98 }}
      className={`shimmer-card group relative overflow-hidden flex flex-col justify-between rounded-[2rem] surface-card p-8 min-h-[340px] hover:border-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire ${p.className}`}
    >
      {/* Cursor spotlight */}
      <motion.div
        className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlightBackground }}
      />

      {/* Static hover gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-[2rem]`} />

      {/* Shimmer border */}
      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)',
          boxShadow: isHovered ? `0 0 0 1px rgba(255,255,255,0.15), 0 20px 60px -20px ${p.accentColor}` : 'none',
        }}
      />

      {/* Top content */}
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-mono font-bold tracking-[0.18em] text-steel uppercase">
            Case Study {String(i + 1).padStart(2, '0')}
          </p>
          <motion.span
            animate={isHovered ? { rotate: 0, x: 2, y: -2 } : { rotate: 0, x: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-steel group-hover:text-void group-hover:bg-sapphire transition-all shadow-lg"
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.span>
        </div>
        <h3 className="mt-6 text-2xl font-display font-bold text-white leading-tight group-hover:text-sapphire transition-colors duration-300">
          {p.title}
        </h3>
        <p className="mt-4 text-sm font-sans text-steel leading-relaxed">{p.description}</p>
      </div>

      {/* Bottom Stack Chips */}
      <div className="relative z-10 mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-2" style={{ transform: 'translateZ(10px)' }}>
        {p.stack.map((t, chipIdx) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 + chipIdx * 0.06 + 0.3 }}
            className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-sans font-medium text-ice group-hover:border-white/20 transition-colors"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </motion.a>
  )
}

export default function Projects() {
  return (
    <div className="section-shell">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex items-end justify-between flex-wrap gap-4"
        >
          <div className="max-w-2xl">
            <span className="section-kicker">Selected Work</span>
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <motion.a
            href="https://github.com/upendra-sin1100"
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 4 }}
            className="text-sm font-sans font-bold text-steel hover:text-white transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
          >
            More on GitHub <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(340px,auto)]" style={{ perspective: 1000 }}>
          {PROJECTS.map((p, i) => (
            <SpotlightCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
