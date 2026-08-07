import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Drama } from 'lucide-react'

const TIMELINE = [
  {
    period: 'Sep 2023 — May 2027',
    title: 'B.Tech in Data Science',
    org: 'Institute of Technology and Management, Gwalior',
    tag: 'Education',
    icon: <GraduationCap className="w-6 h-6 text-sapphire" />,
    description:
      "Currently in the 3rd year, 6th semester. Coursework spans programming, data structures & algorithms, machine learning, deep learning, and artificial intelligence — the foundation behind every project below.",
    chips: ['Python', 'DSA', 'Machine Learning', 'Deep Learning', 'Data Science', 'AI'],
  },
  {
    period: '2023 — 2025',
    title: 'Theater Performer',
    org: 'RGPV University · Central Zone AIU',
    tag: 'Extracurricular',
    icon: <Drama className="w-6 h-6 text-amber-signal" />,
    description:
      'Performed in 4 major productions for live audiences of 1,000+, and represented RGPV University at Central Zone AIU inter-university theater competitions.',
    chips: ['Performance', 'Collaboration', 'Live Audiences'],
  },
]

export default function Experience() {
  return (
    <div className="section-shell">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <span className="section-kicker">
            Timeline
          </span>
          <h2 className="section-title">
            Education & Involvement
          </h2>
          <p className="section-lead mt-4">
            A short timeline of the academic and performance work that shapes how I collaborate, present ideas, and ship carefully.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="shimmer-card relative group rounded-[2rem] surface-card p-8 hover:border-sapphire/40 transition-colors duration-300"
            >
              {/* Subtle Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[2rem] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider text-sapphire bg-sapphire/10 border border-sapphire/20 px-3 py-1 rounded-full uppercase">
                    {item.period}
                  </span>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-sapphire transition-colors">{item.title}</h3>
                <p className="text-sm font-sans font-medium text-steel/80 mb-4">{item.org}</p>
                <p className="text-sm font-sans text-steel leading-relaxed">{item.description}</p>

                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                  {item.chips.map(chip => (
                    <span
                      key={chip}
                      className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-sans font-medium text-ice"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
