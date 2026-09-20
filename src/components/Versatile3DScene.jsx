import { useEffect, useRef } from 'react'

// A quiet, low-cost data-field backdrop. It deliberately avoids a focal object
// so the portfolio copy, rather than a rotating globe, remains the hero.
export default function Versatile3DScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId
    let particles = []
    let width = 0
    let height = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      const count = width < 769 ? 22 : 46
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: index % 7 === 0 ? 1.8 : 1,
        phase: Math.random() * Math.PI * 2,
        warm: index % 4 === 0
      }))
    }

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)
      const drift = reducedMotion ? 0 : time * 0.0002
      const wash = context.createRadialGradient(width * 0.72, height * 0.4, 0, width * 0.72, height * 0.4, Math.max(width, height) * 0.65)
      wash.addColorStop(0, 'rgba(145, 170, 255, 0.075)')
      wash.addColorStop(0.55, 'rgba(255, 128, 102, 0.035)')
      wash.addColorStop(1, 'rgba(6, 10, 15, 0)')
      context.fillStyle = wash
      context.fillRect(0, 0, width, height)

      particles.forEach((particle) => {
        const x = (particle.x + Math.sin(drift + particle.phase) * 22 + width) % width
        const y = (particle.y + Math.cos(drift * 0.8 + particle.phase) * 14 + height) % height
        const alpha = 0.22 + Math.sin(drift * 5 + particle.phase) * 0.1
        context.beginPath()
        context.arc(x, y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = particle.warm ? `rgba(255, 150, 120, ${alpha})` : `rgba(166, 186, 255, ${alpha})`
        context.fill()
      })

      if (!reducedMotion) frameId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="versatile-hero-scene" aria-hidden="true">
      <span className="aurora-wave aurora-wave-one" />
      <span className="aurora-wave aurora-wave-two" />
      <canvas ref={canvasRef} className="hero-particle-field" />
    </div>
  )
}
