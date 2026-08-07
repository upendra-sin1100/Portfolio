import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ReactLenis } from '@studio-freight/react-lenis'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Projects from './components/Projects'
import Publications from './components/Publications'
import Footer from './components/Footer'
import NoiseOverlay from './components/NoiseOverlay'

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const trail = useRef({ x: -100, y: -100 })

  useEffect(() => {
    setEnabled(!window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    let raf
    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.15
      trail.current.y += (pos.current.y - trail.current.y) * 0.15
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trail.current.x - 16}px, ${trail.current.y - 16}px, 0)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onOver = (e) => { if (e.target.closest('a, button, input, textarea, [data-cursor-hover]')) setHovered(true) }
    const onOut = (e) => { if (e.target.closest('a, button, input, textarea, [data-cursor-hover]')) setHovered(false) }
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
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white pointer-events-none z-[9999] will-change-transform mix-blend-difference"
        style={{ transition: hovered ? 'width 0.3s, height 0.3s, opacity 0.3s' : 'none', ...(hovered && { opacity: 1, width: 48, height: 48, marginLeft: -24, marginTop: -24 }) }}
      />
    </>
  )
}

// ─── Ambient Glow Background ──────────────────────────────────────────────
function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 bg-void" />

      {/* Top-left cyan orb */}
      <motion.div
        className="absolute -top-[15%] left-[5%] w-[700px] h-[700px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 70%)' }}
        animate={{ x: [0, 50, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom-right purple orb */}
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full blur-[160px]"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)' }}
        animate={{ x: [0, -60, 20, 0], y: [0, -40, 15, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mid-screen warm orb */}
      <motion.div
        className="absolute top-[40%] left-[35%] w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)' }}
        animate={{ x: [0, 40, -30, 0], y: [0, -50, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle dot-grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
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

const openResume = () => {
  window.open('/certificates/Upendra_Singh_Tomar_Resume.pdf', '_blank', 'noopener,noreferrer')
}

const ACTION_COMMANDS = [
  { icon: '📄', label: 'Open Resume', action: openResume },
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
          <div className="absolute inset-0 bg-void/80 backdrop-blur-md" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-xl bg-slate-deep border border-steel/20 rounded-xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.96, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onKeyDown={handleKey}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-steel/15">
              <span className="text-sapphire text-sm font-mono">⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setActive(0) }}
                placeholder="Type a command or search..."
                aria-label="Search commands"
                className="flex-1 bg-transparent text-ice placeholder-steel/50 outline-none text-sm font-sans"
              />
              <kbd className="text-xs text-steel border border-steel/20 rounded px-1.5 py-0.5 font-mono">ESC</kbd>
            </div>
            <div className="py-2 max-h-72 overflow-y-auto">
              {[{ title: 'Navigation', items: NAV_COMMANDS }, { title: 'Actions', items: ACTION_COMMANDS }].map(({ title, items }) => {
                const show = query ? items.filter(c => c.label.toLowerCase().includes(query.toLowerCase())) : items
                if (!show.length) return null
                const globalIndexOf = (item) => filtered.indexOf(item)
                return (
                  <div key={title}>
                    {!query && <p className="px-5 pt-3 pb-1 text-[10px] font-bold tracking-[2px] text-steel/60 uppercase font-display">{title}</p>}
                    {show.map((cmd) => {
                      const gi = globalIndexOf(cmd)
                      return (
                        <div
                          key={cmd.label}
                          className={`flex items-center gap-3 px-5 py-3 cursor-pointer text-sm font-sans transition-colors ${gi === active ? 'bg-sapphire/15 text-white' : 'text-steel hover:bg-steel/10 hover:text-ice'}`}
                          onMouseEnter={() => setActive(gi)}
                          onClick={() => { cmd.href ? (window.location.href = cmd.href) : cmd.action?.(); onClose() }}
                        >
                          <span className="w-7 h-7 rounded bg-sapphire/10 border border-sapphire/20 flex items-center justify-center text-sm flex-shrink-0">{cmd.icon}</span>
                          {cmd.label}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
              {filtered.length === 0 && (
                <p className="px-5 py-6 text-sm text-steel/60 text-center font-sans">No results for "{query}"</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Projects', id: 'projects' },
  { label: 'Publications', id: 'publications' },
  { label: 'Contact', id: 'contact' },
]

function Navbar({ onOpenCmd }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
      const sections = NAV_ITEMS.map(n => n.id)
      for (const id of sections.slice().reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) { setActiveSection(id); break }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-sapphire origin-left z-[200]"
        style={{ scaleX }}
      />

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-deep/90 backdrop-blur-md border-b border-steel/15 shadow-lg py-3.5' : 'bg-transparent py-5'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-custom flex justify-between items-center">
          {/* Logo */}
          <a
            href="#hero"
            className="text-xl font-display font-bold text-white tracking-tight flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire rounded px-1.5 py-0.5"
          >
            <span className="w-7 h-7 rounded bg-sapphire text-white flex items-center justify-center text-xs font-mono font-bold group-hover:bg-sapphire-hover transition-colors">
              UST
            </span>
            <span className="text-ice font-display">Upendra</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-deep/60 border border-steel/15 rounded-full px-3 py-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-3.5 py-1 text-xs font-sans font-medium transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire ${isActive ? 'text-white font-semibold' : 'text-steel hover:text-ice'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-sapphire rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{item.label}</span>
                </a>
              )
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenCmd}
              aria-label="Open search"
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-deep/80 border border-steel/20 hover:border-sapphire/50 rounded-lg text-xs text-steel hover:text-white transition-all font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
            >
              <span className="font-mono text-[11px] text-sapphire">⌘K</span> Search
            </button>

            <a
              href="/certificates/Upendra_Singh_Tomar_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 text-xs font-sans font-semibold text-white bg-sapphire hover:bg-sapphire-hover rounded-lg transition-all shadow-sm hover:shadow-sapphire/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg border border-steel/20 text-steel hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="md:hidden bg-slate-deep border-b border-steel/15 px-6 py-4 flex flex-col gap-2 mt-3"
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="py-2 text-sm font-sans font-medium text-steel hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

// ─── Scroll To Top Button ─────────────────────────────────────────────────────
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-lg bg-slate-deep border border-steel/20 text-ice hover:text-white hover:border-sapphire shadow-xl flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ─── App Component ────────────────────────────────────────────────────────────
function App() {
  const [cmdOpen, setCmdOpen] = useState(false)

  useEffect(() => {
    // scrollBehavior is handled by Lenis
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(o => !o) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <ReactLenis root>
      <div className="bg-void text-ice overflow-hidden min-h-screen font-sans selection:bg-sapphire/30">
        <NoiseOverlay />
        <AmbientBackground />
        <CustomCursor />
        <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
        <Navbar onOpenCmd={() => setCmdOpen(true)} />

      <main className="relative z-10">
        <section id="hero">
          <Hero />
        </section>
        <div className="section-divider container-custom" />
        <section id="about">
          <About />
        </section>
        <div className="section-divider container-custom" />
        <section id="experience">
          <Experience />
        </section>
        <div className="section-divider container-custom" />
        <section id="certifications">
          <Certifications />
        </section>
        <div className="section-divider container-custom" />
        <section id="projects">
          <Projects />
        </section>
        <div className="section-divider container-custom" />
        <section id="publications">
          <Publications />
        </section>
        <div className="section-divider container-custom" />
        <section id="contact">
          <Footer />
        </section>
      </main>

      <ScrollToTopButton />
      </div>
    </ReactLenis>
  )
}

export default App

