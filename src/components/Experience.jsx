import React from 'react'
import { motion } from 'framer-motion'

const TIMELINE = [
  {
    period: 'Sep 2023 — May 2027',
    title: 'B.Tech in Data Science',
    org: 'Institute of Technology of Management, Gwalior',
    tag: 'Education',
    description:
      "Currently in the 3rd year, 6th semester. Coursework spans programming, data structures & algorithms, machine learning, deep learning, and artificial intelligence — the foundation behind every project below.",
    chips: ['Python', 'DSA', 'Machine Learning', 'Deep Learning', 'Data Science', 'AI'],
  },
  {
    period: '2023 — 2025',
    title: 'Theater Performer',
    org: 'RGPV University · Central Zone AIU',
    tag: 'Extracurricular',
    description:
      'Performed in 4 major productions for live audiences of 1,000+, and represented RGPV University at Central Zone AIU inter-university theater competitions.',
    chips: ['Performance', 'Collaboration', 'Live Audiences'],
  },
]

export default function Experience() {
  return (
    <div className="container-custom py-24 md:py-32">
      <div className="mb-16">
        <span className="inline-block text-xs font-bold tracking-[3px] text-purple-400/70 uppercase mb-3">Experience</span>
        <h2 className="text-4xl md:text-5xl font-black gradient-text">Education & involvement</h2>
      </div>

      <div className="relative max-w-3xl">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-500/50 via-white/10 to-transparent" />

        <div className="space-y-14">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-10"
            >
              {/* Dot */}
              <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-[#050508] border-2 border-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]" />

              <p className="text-xs font-bold tracking-[1.5px] text-cyan-300/70 uppercase mb-1.5">{item.period}</p>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-sm text-white/40 mt-0.5">{item.org} · {item.tag}</p>
              <p className="mt-3 text-white/60 leading-relaxed max-w-xl">{item.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.chips.map(chip => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-[11px] font-medium text-white/45"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
