import React, { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/*
  AmbientFigures — reusable ambient background texture component.
  
  Props:
    density  — 'sparse' | 'normal' | 'dense' (default 'normal')
               Controls the number of floating figures.
  
  Renders thin blueprint-style SVG figures (dots, circles, hexagons, crosshairs)
  in Sapphire / Amber / Steel at 5–15% opacity, drifting slowly with a subtle
  parallax scroll offset. Fully static when prefers-reduced-motion is set.
*/

const DENSITY_MAP = { sparse: 5, normal: 8, dense: 12 }

// Figure types — small SVG elements in the blueprint visual family
const FIGURE_TYPES = [
  // Small dot / node
  (color) => (
    <circle cx="4" cy="4" r="2" fill="none" stroke={color} strokeWidth="0.8" />
  ),
  // Hollow circle
  (color) => (
    <circle cx="6" cy="6" r="5" fill="none" stroke={color} strokeWidth="0.6" />
  ),
  // Crosshair
  (color) => (
    <g stroke={color} strokeWidth="0.6">
      <line x1="6" y1="0" x2="6" y2="12" />
      <line x1="0" y1="6" x2="12" y2="6" />
      <circle cx="6" cy="6" r="3" fill="none" />
    </g>
  ),
  // Hexagon outline
  (color) => (
    <polygon
      points="6,0.5 11,3.25 11,8.75 6,11.5 1,8.75 1,3.25"
      fill="none"
      stroke={color}
      strokeWidth="0.6"
    />
  ),
  // Small plus
  (color) => (
    <g stroke={color} strokeWidth="0.7">
      <line x1="4" y1="0" x2="4" y2="8" />
      <line x1="0" y1="4" x2="8" y2="4" />
    </g>
  ),
  // Right angle / bracket
  (color) => (
    <polyline
      points="0,0 0,8 8,8"
      fill="none"
      stroke={color}
      strokeWidth="0.6"
    />
  ),
  // Diamond
  (color) => (
    <polygon
      points="5,0 10,5 5,10 0,5"
      fill="none"
      stroke={color}
      strokeWidth="0.6"
    />
  ),
]

// Tailwind semantic token CSS variable values
const COLORS = [
  'rgb(37, 99, 235)',   // sapphire
  'rgb(37, 99, 235)',   // sapphire (weighted)
  'rgb(136, 146, 168)', // steel
  'rgb(245, 158, 11)',  // amber-signal
]

// Deterministic pseudo-random seeded by index
function seeded(i) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

export default function AmbientFigures({ density = 'normal' }) {
  const count = DENSITY_MAP[density] || DENSITY_MAP.normal
  const containerRef = React.useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Parallax: figures shift at a slower rate than content scroll
  const parallaxY = useTransform(scrollYProgress, [0, 1], [20, -20])

  // Generate figure data deterministically so it's stable across renders
  const figures = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const figureType = FIGURE_TYPES[Math.floor(seeded(i) * FIGURE_TYPES.length)]
      const color = COLORS[Math.floor(seeded(i + 50) * COLORS.length)]
      const x = seeded(i + 10) * 100          // % position
      const y = seeded(i + 20) * 100          // % position
      const size = 10 + seeded(i + 30) * 14   // px size 10–24
      const opacity = 0.05 + seeded(i + 40) * 0.10  // 5–15%
      const duration = 18 + seeded(i + 60) * 22     // 18–40s drift cycle
      const driftX = (seeded(i + 70) - 0.5) * 30    // -15 to 15px
      const driftY = (seeded(i + 80) - 0.5) * 24    // -12 to 12px
      const rotation = seeded(i + 90) * 360          // initial rotation
      const rotDrift = (seeded(i + 100) - 0.5) * 40  // -20 to 20deg drift

      return { figureType, color, x, y, size, opacity, duration, driftX, driftY, rotation, rotDrift, id: i }
    })
  }, [count])

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10"
      style={{ y: parallaxY }}
      aria-hidden="true"
    >
      {figures.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
          }}
          animate={{
            x: [0, f.driftX, 0],
            y: [0, f.driftY, 0],
            rotate: [f.rotation, f.rotation + f.rotDrift, f.rotation],
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            viewBox="0 0 12 12"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {f.figureType(f.color)}
          </svg>
        </motion.div>
      ))}
    </motion.div>
  )
}