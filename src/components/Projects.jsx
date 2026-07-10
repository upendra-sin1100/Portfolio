import React from 'react'
import { motion } from 'framer-motion'

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2]">
    <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PROJECTS = [
  {
    title: 'Disease X Command Center',
    period: 'April 2026',
    stack: ['Streamlit', 'PostgreSQL', 'Supabase', 'Machine Learning'],
    description:
      'A real-time, full-stack hospital management dashboard for patient triage. It flags critical cases as data comes in and surfaces actionable insight, cutting down on manual triage effort — with PostgreSQL and Supabase working together to keep structured patient data live and in sync across the dashboard.',
    demo: 'https://disease-x-project.streamlit.app',
    accent: 'from-purple-600/20 to-transparent',
  },
  {
    title: 'Resume Analyzer with Unsupervised Learning',
    period: 'April 2026',
    stack: ['Python', 'Streamlit', 'Scikit-Learn', 'K-Means', 'TF-IDF'],
    description:
      'An ML pipeline trained on 78,670 resume entries that sorts resumes into 7 job categories using MiniBatch K-Means clustering over TF-IDF vectors. When the primary model isn’t confident, a keyword-based classifier steps in as a fallback — deployed on Streamlit with real-time PDF parsing.',
    demo: 'https://resume-analyzer-with-unsupervised-learning.streamlit.app',
    accent: 'from-cyan-500/20 to-transparent',
  },
  {
    title: 'UpFeed — News Aggregator',
    period: 'May 2026',
    stack: ['React.js', 'GNews API', 'NewsAPI', 'Vercel'],
    description:
      'A responsive news aggregator pulling live articles from GNews and NewsAPI across multiple categories and sources. Built with a React.js frontend, reusable components, and category-based filtering for fast news discovery — deployed on Vercel.',
    demo: 'https://up-feed.vercel.app',
    accent: 'from-pink-500/20 to-transparent',
  },
]

export default function Projects() {
  return (
    <div className="container-custom py-24 md:py-32">
      <div className="mb-14 flex items-end justify-between flex-wrap gap-4">
        <div>
          <span className="inline-block text-xs font-bold tracking-[3px] text-purple-400/70 uppercase mb-3">Projects</span>
          <h2 className="text-4xl md:text-5xl font-black gradient-text">Things I've built</h2>
        </div>
        <a
          href="https://github.com/upendra-sin1100"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
        >
          More on GitHub <ArrowIcon />
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 overflow-hidden hover:border-purple-500/30 transition-colors duration-300"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            <div className="relative z-10 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-white leading-snug">{p.title}</h3>
                <span className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-purple-500/40 group-hover:bg-purple-500/10 transition-all">
                  <ArrowIcon />
                </span>
              </div>
              <p className="text-xs text-white/35 mt-1 font-medium">{p.period}</p>

              <p className="mt-4 text-sm text-white/60 leading-relaxed">{p.description}</p>
            </div>

            <div className="relative z-10 mt-5 flex flex-wrap gap-2">
              {p.stack.map(t => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] font-medium text-white/45"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="relative z-10 mt-5 text-xs font-bold text-purple-300/80 flex items-center gap-1.5">
              Live Demo <ArrowIcon />
            </p>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
