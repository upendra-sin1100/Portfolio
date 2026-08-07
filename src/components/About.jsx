import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import AmbientFigures from './AmbientFigures'
import { Database, Brain, Globe, Terminal, Settings } from 'lucide-react'

const SKILLS = [
  {
    group: 'Languages',
    items: [
      { name: 'Python', icon: <Terminal className="w-4 h-4" /> },
      { name: 'JavaScript', icon: <Terminal className="w-4 h-4" /> },
      { name: 'SQL', icon: <Database className="w-4 h-4" /> },
    ],
  },
  {
    group: 'Frameworks & Tools',
    items: [
      { name: 'React.js', icon: <Globe className="w-4 h-4" /> },
      { name: 'FastAPI', icon: <Settings className="w-4 h-4" /> },
      { name: 'Streamlit', icon: <Globe className="w-4 h-4" /> },
    ],
  },
  {
    group: 'AI & ML',
    items: [
      { name: 'TensorFlow', icon: <Brain className="w-4 h-4" /> },
      { name: 'Scikit-Learn', icon: <Brain className="w-4 h-4" /> },
      { name: 'Hugging Face', icon: <Brain className="w-4 h-4" /> },
      { name: 'Pandas', icon: <Database className="w-4 h-4" /> },
    ],
  },
]

const STATS = [
  { value: '3', label: 'Full-stack ML projects shipped' },
  { value: '1', label: 'Fine-tuned LLM pushed to Hugging Face' },
  { value: '2', label: 'Published research papers' },
]

// ─── Animated Counter ────────────────────────────────────────────────────────
function CountUp({ end, duration = 1500 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return <span ref={ref}>{count}</span>
}

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  show: (i) => ({ opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] } }),
}

export default function About() {
  return (
    <div className="section-shell">
      <div className="container-custom relative">
        <AmbientFigures density="normal" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <span className="section-kicker">
            About & Skills
          </span>
          <h2 className="section-title">
            Background & Expertise
          </h2>
          <p className="section-lead mt-4">
            A practical mix of machine learning, product thinking, and deployment discipline. The work below shows how I go from data and model selection to interfaces people can actually use.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* Large Card: Bio - Spans 3 columns */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="md:col-span-3 rounded-[2rem] surface-card p-8 hover:border-sapphire/40 transition-colors duration-300 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            <div className="space-y-6 font-sans relative z-10">
              <motion.p
                custom={0}
                variants={paragraphVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="text-lg text-steel leading-relaxed"
              >
                I'm a Data Science undergraduate at the Institute of Technology and Management, Gwalior,
                currently in my third year. I build machine learning applications end to end — from data
                pipeline to deployed interface — using Python, TensorFlow, Scikit-Learn, PostgreSQL, and
                React.js.
              </motion.p>
              <motion.p
                custom={1}
                variants={paragraphVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="text-lg text-steel leading-relaxed"
              >
                My project work spans healthcare analytics and automated resume classification, and I've
                co-authored published research on AI-driven sustainability in pharmaceutical logistics and
                generative AI for carbon capture materials.
              </motion.p>
              <motion.p
                custom={2}
                variants={paragraphVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="text-lg text-steel leading-relaxed"
              >
                Right now I'm most interested in machine learning engineering and intelligent data systems
                — the layer between a trained model and something people can actually use.
              </motion.p>
            </div>
          </motion.div>

          {/* Right Column: Medium and Small Cards - Spans 2 columns */}
          <div className="md:col-span-2 space-y-6">
            {/* Medium Card: Tech Stack */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="rounded-[2rem] surface-card p-8 relative group overflow-hidden hover:border-sapphire/40 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              <div className="relative z-10">
                {SKILLS.map((group, i) => (
                  <div key={group.group} className={i > 0 ? 'mt-8' : ''}>
                    <p className="text-xs font-mono font-bold tracking-[0.15em] text-sapphire uppercase mb-4">
                      {group.group}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {group.items.map(item => (
                        <div
                          key={item.name}
                          className="group/skill flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs font-sans font-medium text-ice hover:border-sapphire hover:text-white transition-all duration-300"
                        >
                          <div className="text-steel group-hover/skill:text-sapphire transition-colors">
                            {item.icon}
                          </div>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Small Card: Stats */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="rounded-[2rem] surface-card p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sapphire/10 to-transparent pointer-events-none" />
              {/* Animated accent line */}
              <motion.div
                className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-sapphire to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              />
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {STATS.map((s, si) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: si * 0.15 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-4xl font-display font-black accent-gradient">
                      <CountUp end={parseInt(s.value)} duration={1200} />+
                    </p>
                    <p className="mt-2 text-xs text-steel/80 leading-relaxed font-sans">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
