'use client'
import { useEffect, useRef } from 'react'
import { circuit, setPointer } from '@/lib/circuit-store'

type Node = { x: number; y: number; phase: number; depth: number }
type Trail = { x: number; y: number; age: number }
const TAU = Math.PI * 2

export function SystemCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const motionQuery = matchMedia('(prefers-reduced-motion: reduce)')
    const pointerQuery = matchMedia('(pointer: fine)')
    let reduced = motionQuery.matches
    let width = 1, height = 1, raf = 0, last = 0, clock = 0, pulse = 0
    let pointer = { x: -1000, y: -1000 }
    const trail: Trail[] = []
    let nodes: Node[] = []
    const points: { x: number; y: number }[] = []

    function resize() {
      width = innerWidth
      height = innerHeight
      const dpr = Math.min(devicePixelRatio || 1, width < 768 ? 1.25 : 1.75)
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      canvas!.style.width = width + 'px'
      canvas!.style.height = height + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      let seed = 104729
      const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
      nodes = Array.from({ length: width < 768 ? 28 : 64 }, () => ({ x: random(), y: random(), phase: random() * TAU, depth: 0.3 + random() * 0.7 }))
      points.length = 0
      nodes.forEach(() => points.push({ x: 0, y: 0 }))
      schedule()
    }
    function schedule() {
      if (!raf && !document.hidden) raf = requestAnimationFrame(draw)
    }
    function onPointer(event: PointerEvent) {
      if (reduced || !pointerQuery.matches || event.pointerType === 'touch') return
      pointer = { x: event.clientX, y: event.clientY }
      setPointer(event.clientX / width * 2 - 1, event.clientY / height * 2 - 1)
      if (trail.length === 18) trail.shift()
      trail.push({ ...pointer, age: 0 })
      schedule()
    }
    function clearPointer() { pointer = { x: -1000, y: -1000 }; trail.length = 0; setPointer(0, 0) }
    function onProgress() { if (!reduced) pulse = Math.min(0.85, pulse + 0.08); schedule() }
    function onMotion() { reduced = motionQuery.matches; clearPointer(); pulse = 0; schedule() }
    function onVisibility() {
      cancelAnimationFrame(raf); raf = 0; last = 0
      if (!document.hidden) schedule()
    }
    function draw(time: number) {
      raf = 0
      if (document.hidden) return
      const dt = last ? Math.min((time - last) / 1000, 0.05) : 0
      last = time
      if (!reduced) clock += dt
      pulse *= Math.exp(-dt * 3)
      const t = reduced ? 0 : clock
      ctx!.clearRect(0, 0, width, height)
      const cx = width * (width < 768 ? 0.73 : 0.7)
      const cy = height * 0.46
      const radius = Math.min(width * 0.25, height * 0.28)
      const ambient = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.6)
      ambient.addColorStop(0, 'rgba(217,134,100,.12)')
      ambient.addColorStop(0.55, 'rgba(75,61,92,.08)')
      ambient.addColorStop(1, 'rgba(19,22,26,0)')
      ctx!.fillStyle = ambient
      ctx!.fillRect(0, 0, width, height)
      ctx!.lineWidth = 0.6
      ctx!.strokeStyle = 'rgba(161,153,145,.07)'
      ctx!.beginPath()
      for (let x = 0; x < width; x += 64) { ctx!.moveTo(x, 0); ctx!.lineTo(x, height) }
      for (let y = 0; y < height; y += 64) { ctx!.moveTo(0, y); ctx!.lineTo(width, y) }
      ctx!.stroke()

      nodes.forEach((node, i) => {
        const p = points[i]
        p.x = node.x * width + Math.sin(t * 0.16 + node.phase) * 14 * node.depth
        p.y = node.y * height + Math.cos(t * 0.12 + node.phase) * 16 * node.depth
        if (!reduced && pointerQuery.matches) {
          const dx = p.x - pointer.x, dy = p.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance > 0 && distance < 140) {
            p.x += dx / distance * (1 - distance / 140) * 18
            p.y += dy / distance * (1 - distance / 140) * 18
          }
        }
        ctx!.fillStyle = `rgba(217,134,100,${0.25 + node.depth * 0.3 + pulse * 0.15})`
        ctx!.fillRect(p.x - 1.5, p.y - 1.5, 3, 3)
      })
      for (let i = 0; i < points.length; i++) {
        // Bounded small field: one path batch avoids individual shadow passes.
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j], distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance > 120) continue
          ctx!.strokeStyle = `rgba(217,134,100,${(1 - distance / 120) * (0.18 + pulse * 0.15)})`
          ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke()
        }
      }

      ctx!.save()
      const tiltX = !reduced && pointer.x >= 0 ? (pointer.x / width - 0.5) * 12 : 0
      const tiltY = !reduced && pointer.y >= 0 ? (pointer.y / height - 0.5) * 8 : 0
      ctx!.translate(cx + tiltX, cy + tiltY)
      ctx!.rotate(t * 0.035)
      for (let ring = 0; ring < 3; ring++) {
        ctx!.strokeStyle = ring === 1 ? 'rgba(217,134,100,.45)' : 'rgba(227,221,210,.18)'
        ctx!.beginPath()
        ctx!.ellipse(0, 0, radius * (0.65 + ring * 0.18), radius * (0.32 + ring * 0.12), ring * 1.05, 0, TAU)
        ctx!.stroke()
      }
      for (let i = 0; i < 4; i++) {
        const angle = i * TAU / 4 + 0.35
        const x = Math.cos(angle) * radius, y = Math.sin(angle) * radius
        const active = i === (circuit.hoveredNode >= 0 ? circuit.hoveredNode : Math.min(3, Math.floor(circuit.scroll * 4)))
        ctx!.strokeStyle = active ? 'rgba(217,134,100,.65)' : 'rgba(227,221,210,.2)'
        ctx!.beginPath(); ctx!.moveTo(0, 0); ctx!.lineTo(x * 0.65, y * 0.25); ctx!.lineTo(x, y); ctx!.stroke()
        ctx!.fillStyle = active ? '#ed926f' : '#a19991'
        ctx!.beginPath(); ctx!.arc(x, y, active ? 4 : 2.5, 0, TAU); ctx!.fill()
        const signal = reduced ? 0.55 : (t * 0.16 + i / 4) % 1
        ctx!.beginPath(); ctx!.arc(x * signal, y * signal, 2, 0, TAU); ctx!.fill()
      }
      if (!reduced && pulse > 0.01) {
        ctx!.strokeStyle = `rgba(237,146,111,${pulse * 0.3})`
        ctx!.beginPath(); ctx!.arc(0, 0, radius * (1.3 - pulse * 0.35), 0, TAU); ctx!.stroke()
      }
      ctx!.restore()

      if (!reduced && pointerQuery.matches) {
        ctx!.save()
        ctx!.globalCompositeOperation = 'lighter'
        trail.forEach(point => {
          point.age += dt
          const alpha = Math.max(0, 1 - point.age / 0.36) * 0.3
          ctx!.fillStyle = `rgba(237,146,111,${alpha})`
          ctx!.shadowColor = '#d98664'; ctx!.shadowBlur = 10
          ctx!.beginPath(); ctx!.arc(point.x, point.y, 2.5, 0, TAU); ctx!.fill()
        })
        while (trail[0]?.age > 0.36) trail.shift()
        ctx!.restore()
      }
      if (!reduced) schedule()
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('pointerleave', clearPointer)
    window.addEventListener('portfolio:progress', onProgress)
    document.addEventListener('visibilitychange', onVisibility)
    motionQuery.addEventListener('change', onMotion)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('pointerleave', clearPointer)
      window.removeEventListener('portfolio:progress', onProgress)
      document.removeEventListener('visibilitychange', onVisibility)
      motionQuery.removeEventListener('change', onMotion)
    }
  }, [])
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-90" />
}
