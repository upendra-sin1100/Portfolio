import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Projects from './components/Projects'
import Publications from './components/Publications'
import Footer from './components/Footer'

// ─── Shared: respects the user's OS-level motion preference ───────────────────
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const trail = useRef({ x: 0, y: 0 })

  // Skip entirely on touch/coarse-pointer devices — otherwise a stray dot
  // sits frozen in the corner since mousemove never fires there.
  useEffect(() => {
    setEnabled(!window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    let raf
    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.12
      trail.current.y += (pos.current.y - trail.current.y) * 0.12
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trail.current.x - 18}px, ${trail.current.y - 18}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    // Event delegation on document instead of querySelectorAll-once: this
    // way buttons/links rendered later (modals, accordions, async content
    // inside Hero/About/etc.) still trigger the hover state correctly.
    const onOver = (e) => { if (e.target.closest('a, button, [data-cursor-hover]')) setHovered(true) }
    const onOut = (e) => { if (e.target.closest('a, button, [data-cursor-hover]')) setHovered(false) }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-neon-purple pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{ transition: hovered ? 'width 0.2s, height 0.2s' : 'none', ...(hovered && { width: 28, height: 28, marginLeft: -8, marginTop: -8 }) }}
      />
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-purple-500/40 pointer-events-none z-[9998] will-change-transform"
        style={{ transition: 'width 0.2s, height 0.2s', ...(hovered && { width: 56, height: 56, marginLeft: -10, marginTop: -10, borderColor: 'rgba(168,85,247,0.6)' }) }}
      />
    </>
  )
}

// ─── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Fully skip the animation loop for motion-sensitive users.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, animId
    const COLORS = ['rgba(168,85,247,', 'rgba(6,182,212,', 'rgba(236,72,153,']

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    // Fewer particles on small screens — same effect, lighter on low-power devices.
    const particleCount = window.innerWidth < 768 ? 40 : 90
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.45 + 0.1,
      color: COLORS[Math.floor(Math.random() * 3)],
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + p.alpha + ')'
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(139,92,246,${0.07 * (1 - d / 130)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-40 pointer-events-none opacity-60" />
}

// ─── Ambient Orbs ─────────────────────────────────────────────────────────────
const orbVariants = {
  animate: (custom) => ({
    x: [0, custom.x, 0],
    y: [0, custom.y, 0],
    scale: [1, custom.s, 1],
    transition: { duration: custom.d, repeat: Infinity, ease: 'easeInOut' },
  }),
}

function AmbientOrbs() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const orbs = [
    { className: 'top-[-10%] left-[-8%] w-[580px] h-[580px] bg-purple-600', custom: { x: 70, y: 50, s: 1.06, d: 18 } },
    { className: 'bottom-[5%] right-[-5%] w-[500px] h-[500px] bg-cyan-500', custom: { x: -90, y: -60, s: 0.95, d: 22 } },
    { className: 'top-[40%] right-[20%] w-[380px] h-[380px] bg-pink-500', custom: { x: 50, y: 90, s: 1.1, d: 16 } },
    { className: 'top-[20%] right-[5%] w-[260px] h-[260px] bg-violet-500', custom: { x: -40, y: 60, s: 0.9, d: 25 } },
  ]

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#050508] via-purple-950/10 to-[#050508]" />
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full opacity-20 blur-[90px] ${orb.className}`}
          custom={orb.custom}
          variants={orbVariants}
          animate={prefersReducedMotion ? undefined : 'animate'}
        />
      ))}
    </div>
  )
}

// ─── Command Palette ──────────────────────────────────────────────────────────
const NAV_COMMANDS = [
  { icon: '🏠', label: 'Home', href: '#hero' },
  { icon: '👤', label: 'About', href: '#about' },
  { icon: '💼', label: 'Experience', href: '#experience' },
  { icon: '🏆', label: 'Certifications', href: '#certifications' },
  { icon: '🚀', label: 'Projects', href: '#projects' },
  { icon: '📚', label: 'Publications', href: '#publications' },
  { icon: '✉️', label: 'Contact', href: '#contact' },
]

// Downloads the actual resume instead of re-opening LinkedIn (that was a
// copy-paste duplicate of the "LinkedIn Profile" action below). Drop your
// resume PDF in /public/Upendra_Singh_Tomar_Resume.pdf.
const downloadResume = () => {
  const link = document.createElement('a')
  link.href = '/Upendra_Singh_Tomar_Resume.pdf'
  link.download = 'Upendra_Singh_Tomar_Resume.pdf'
  link.click()
}

const ACTION_COMMANDS = [
  { icon: '📄', label: 'Download Resume', action: downloadResume },
  { icon: '🔗', label: 'LinkedIn Profile', action: () => window.open('https://www.linkedin.com/in/upendra-singh-tomar-222a41312/', '_blank') },
]

function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const [active, setActive] = useState(0)

  const all = [...NAV_COMMANDS, ...ACTION_COMMANDS]
  const filtered = query
    ? all.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : all

  useEffect(() => {
    if (isOpen) { setTimeout(() => inputRef.current?.focus(), 50); setQuery(''); setActive(0) }
  }, [isOpen])

  const handleKey = (e) => {
    // Was missing — the UI shows an "ESC" hint but nothing closed on Escape.
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
    if (e.key === 'Enter') {
      const cmd = filtered[active]
      if (cmd) { cmd.href ? (window.location.href = cmd.href) : cmd.action?.(); onClose() }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-start justify-center pt-[15vh] px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-xl bg-[#0d0d14]/95 border border-purple-500/30 rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_0_1px_rgba(139,92,246,0.1)]"
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onKeyDown={handleKey}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
              <span className="text-purple-400/60 text-sm">⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setActive(0) }}
                placeholder="Type a command or search..."
                aria-label="Search commands"
                className="flex-1 bg-transparent text-white placeholder-white/25 outline-none text-sm font-medium"
              />
              <kbd className="text-xs text-white/20 border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
            </div>
            <div className="py-2 max-h-72 overflow-y-auto scrollbar-hide">
              {[{ title: 'Navigation', items: NAV_COMMANDS }, { title: 'Actions', items: ACTION_COMMANDS }].map(({ title, items }) => {
                const show = query ? items.filter(c => c.label.toLowerCase().includes(query.toLowerCase())) : items
                if (!show.length) return null
                const globalIndexOf = (item) => filtered.indexOf(item)
                return (
                  <div key={title}>
                    {!query && <p className="px-5 pt-2 pb-1 text-[10px] font-bold tracking-[2px] text-white/20 uppercase">{title}</p>}
                    {show.map((cmd) => {
                      const gi = globalIndexOf(cmd)
                      return (
                        <div
                          key={cmd.label}
                          className={`flex items-center gap-3 px-5 py-3 cursor-pointer text-sm transition-colors ${gi === active ? 'bg-purple-500/10 text-white' : 'text-white/60 hover:bg-white/[0.04] hover:text-white/90'}`}
                          onMouseEnter={() => setActive(gi)}
                          onClick={() => { cmd.href ? (window.location.href = cmd.href) : cmd.action?.(); onClose() }}
                        >
                          <span className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center text-sm flex-shrink-0">{cmd.icon}</span>
                          {cmd.label}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
              {filtered.length === 0 && (
                <p className="px-5 py-6 text-sm text-white/30 text-center">No results for "{query}"</p>
              )}
            </div>
            <div className="flex items-center gap-4 px-5 py-2.5 border-t border-white/[0.04] bg-white/[0.01]">
              <span className="text-[10px] text-white/20 flex items-center gap-1.5"><kbd className="border border-white/10 rounded px-1">↑↓</kbd> Navigate</span>
              <span className="text-[10px] text-white/20 flex items-center gap-1.5"><kbd className="border border-white/10 rounded px-1">↵</kbd> Select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
// "Publications" was missing here even though the section exists and is in
// the command palette — it was unreachable from the visible nav.
const NAV_ITEMS = ['Home', 'About', 'Experience', 'Certifications', 'Projects', 'Publications', 'Contact']

function Navbar({ onOpenCmd }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = NAV_ITEMS.map(n => n.toLowerCase() === 'home' ? 'hero' : n.toLowerCase())
      for (const id of sections.slice().reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) { setActiveSection(id); break }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // run once on mount so scrolled/activeSection aren't wrong pre-first-scroll
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink origin-left z-[200]"
        style={{ scaleX }}
      />

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050508]/85 backdrop-blur-xl border-b border-purple-500/10 shadow-[0_0_40px_rgba(139,92,246,0.06)]' : 'bg-transparent'}`}
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-custom py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="text-2xl font-black gradient-text flex items-center gap-1.5 select-none"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>⚡</motion.span>
            UST
          </motion.a>

          {/* Desktop links — pill group */}
          <div className="hidden md:flex bg-white/[0.03] border border-white/[0.06] rounded-full p-1 gap-0.5">
            {NAV_ITEMS.map((item) => {
              const id = item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase()
              const isActive = activeSection === id
              return (
                <motion.a
                  key={item}
                  href={`#${id}`}
                  className="relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors tracking-wide"
                  style={{ color: isActive ? '#fff' : 'rgba(226,232,240,0.55)' }}
                  whileHover={{ color: '#fff' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/50 to-cyan-500/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </motion.a>
              )
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={onOpenCmd}
              aria-label="Open search"
              className="flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-purple-500/40 rounded-lg text-xs text-white/50 hover:text-white/80 transition-all font-medium"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            >
              ⌘ Search <kbd className="bg-white/[0.06] rounded px-1.5 py-0.5 text-[10px]">K</kbd>
            </motion.button>

            {/* Was pointing at the LinkedIn URL — same target as the LinkedIn
                action in the command palette. Now downloads the resume. */}
            <motion.a
              href="/Upendra_Singh_Tomar_Resume.pdf"
              download="Upendra_Singh_Tomar_Resume.pdf"
              className="relative px-5 py-2 text-xs font-bold text-white rounded-full overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(124,58,237,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0"
                style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)' }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Resume ↗</span>
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg border border-white/10"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            whileTap={{ scale: 0.95 }}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="block h-px w-5 bg-white/70 origin-center"
                animate={mobileOpen ? (i === 1 ? { opacity: 0 } : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 6 : -6 }) : { rotate: 0, y: 0, opacity: 1 }}
              />
            ))}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="md:hidden bg-[#050508]/95 backdrop-blur-xl border-t border-white/[0.06] px-6 py-4 flex flex-col gap-2"
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase()}`}
                  className="py-2.5 text-sm font-semibold text-white/60 hover:text-white border-b border-white/[0.04] last:border-0 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

// ─── Scroll To Top ─────────────────────────────────────────────────────────────
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full text-white font-bold text-lg shadow-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(139,92,246,0.5)' }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ─── Section Wrapper with scroll reveal ───────────────────────────────────────
function RevealSection({ id, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`scroll-mt-20 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [cmdOpen, setCmdOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(o => !o) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="bg-[#050508] text-white overflow-hidden">
      {/* ─ Background systems ─ */}
      <AmbientOrbs />
      <ParticleField />

      {/* ─ Overlays ─ */}
      <CustomCursor />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <Navbar onOpenCmd={() => setCmdOpen(true)} />

      {/* ─ Main content ─ */}
      <main className="relative z-10">
        <section id="hero" className="scroll-mt-20">
          <Hero />
        </section>

        <RevealSection id="about"><About /></RevealSection>
        <RevealSection id="experience"><Experience /></RevealSection>
        <RevealSection id="certifications"><Certifications /></RevealSection>
        <RevealSection id="projects"><Projects /></RevealSection>
        <RevealSection id="publications"><Publications /></RevealSection>
        <RevealSection id="contact"><Footer /></RevealSection>
      </main>

      {/* ─ Scroll to top ─ */}
      <ScrollToTopButton />
    </div>
  )
}

export default App