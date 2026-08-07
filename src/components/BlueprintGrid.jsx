import React, { useEffect, useRef } from 'react'

export default function BlueprintGrid() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let width = 0
    let height = 0

    const gridSize = 48
    const dotRadius = 1.5

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    let time = 0

    const draw = () => {
      time += 0.015
      ctx.clearRect(0, 0, width, height)

      // Draw Grid Lines
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(136, 146, 168, 0.05)'

      ctx.beginPath()
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }
      ctx.stroke()

      // Draw Grid Intersections (Dots)
      const mouse = mouseRef.current
      const cols = Math.ceil(width / gridSize) + 1
      const rows = Math.ceil(height / gridSize) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize
          const y = j * gridSize

          const dx = mouse.x - x
          const dy = mouse.y - y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 180

          let alpha = 0.12
          let radius = dotRadius
          let color = 'rgba(136, 146, 168, '

          if (dist < maxDist) {
            const factor = 1 - dist / maxDist
            alpha = 0.12 + factor * 0.75
            radius = dotRadius + factor * 2.2
            // Sapphire glow on close, amber highlight on extreme proximity
            if (dist < 40) {
              color = 'rgba(245, 158, 11, ' // Amber Signal
            } else {
              color = 'rgba(37, 99, 235, ' // Sapphire Blue
            }
          } else {
            // Subtle wave pulse when idle/mobile
            const pulse = Math.sin(time + (i + j) * 0.3) * 0.04
            alpha += Math.max(0, pulse)
          }

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `${color}${alpha})`
          ctx.fill()

          // Draw connection lines near mouse
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(37, 99, 235, ${(1 - dist / 100) * 0.25})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  )
}