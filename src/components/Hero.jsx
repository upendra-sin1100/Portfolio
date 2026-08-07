import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlueprintGrid from './BlueprintGrid'
import MagneticButton from './MagneticButton'
import { Mail, FileText } from 'lucide-react'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/upendra-sin1100', icon: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.25-.01-.9-.01-1.77-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.9-1.32 2.74-1.05 2.74-1.05.56 1.42.2 2.47.1 2.73.65.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" /></svg> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/upendra-singh-tomar-222a41312/', icon: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 21h-3.37v-6.06c0-1.44-.03-3.3-2.02-3.3-2.02 0-2.33 1.58-2.33 3.2V21h-3.37V8.5h3.24v1.71h.05c.45-.85 1.55-1.75 3.2-1.75 3.43 0 4.6 2.26 4.6 5.19V21Z" /></svg> },
  { label: 'Email', href: 'mailto:upendratomar1100@gmail.com', icon: <Mail className="w-5 h-5" /> },
]

const downloadResume = () => {
  window.open('/certificates/Upendra_Singh_Tomar_Resume.pdf', '_blank', 'noopener,noreferrer')
}

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      staggerChildren: 0.08,
    },
  },
}

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    }
  },
}

function AnimatedText({ text, className }) {
  return (
    <motion.span variants={sentence} initial="hidden" animate="visible" className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span key={char + "-" + index} variants={letter} className="inline-block relative">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -60])

  return (
    <motion.div
      style={{ opacity: heroOpacity, y: heroY }}
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
    >
      {/* Signature Interactive Blueprint Grid Background */}
      <BlueprintGrid />

      <div className="container-custom relative z-10 w-full">
        <div className="max-w-4xl">
          {/* Location / Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full surface-card text-xs font-medium text-steel mb-10 border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-sapphire animate-pulse" />
            <span className="text-ice font-sans tracking-wide">Gwalior, Madhya Pradesh · Open to ML/AI roles</span>
          </motion.div>

          {/* Name - Split Text Reveal */}
          <h1 className="text-display-xl tracking-tight text-white m-0">
            <span className="block overflow-hidden pb-2">
              <AnimatedText text="Upendra Singh" />
            </span>
            <span className="block overflow-hidden pb-4">
              <AnimatedText text="Tomar" className="accent-gradient" />
            </span>
          </h1>

          {/* Bio pitch */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-lg sm:text-xl text-steel leading-relaxed max-w-2xl font-sans"
          >
            Data Science undergraduate building end-to-end ML applications — from real-time patient triage dashboards to unsupervised generative AI systems — with two published research papers.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <MagneticButton as="a" href="#projects" className="px-8 py-4 rounded-xl text-sm font-sans font-bold text-void bg-sapphire hover:bg-sapphire-hover transition-all">
              View Projects
            </MagneticButton>

            <MagneticButton onClick={downloadResume} className="px-8 py-4 rounded-xl text-sm font-sans font-bold text-ice glass-panel glass-panel-hover flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Download Resume
            </MagneticButton>

            {/* Socials */}
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              {SOCIALS.map(s => (
                <MagneticButton
                  key={s.label}
                  as="a"
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  className="w-12 h-12 rounded-xl glass-panel glass-panel-hover flex items-center justify-center text-steel hover:text-sapphire"
                >
                  {s.icon}
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-steel"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-gradient-to-b from-steel/60 to-transparent"
        />
      </motion.div>
    </motion.div>
  )
}
