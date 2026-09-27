'use client'

import { useEffect, useRef, useState } from 'react'
import { Database, Laptop, Layers3 } from 'lucide-react'
import GlassCard from './ui/GlassCard'

const PARTICLES = 30

export default function Pipeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [offline, setOffline] = useState(false)
  const [flushing, setFlushing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    let frame = 0
    let animation = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    function resize() {
      const box = canvas!.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = box.width * ratio; canvas!.height = box.height * ratio
      context!.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    function draw() {
      const width = canvas!.clientWidth; const height = canvas!.clientHeight
      context!.clearRect(0, 0, width, height)
      context!.strokeStyle = 'rgba(125,211,255,.18)'; context!.lineWidth = 1
      context!.beginPath(); context!.moveTo(width * .18, height * .48); context!.lineTo(width * .82, height * .48); context!.stroke()
      for (let i = 0; i < PARTICLES; i += 1) {
        const progress = offline ? .42 + (i % 8) * .012 : ((frame * .0017 + i / PARTICLES) % 1)
        const x = width * (.16 + progress * .68); const y = height * .48 + Math.sin(i * 2.3) * 14
        context!.fillStyle = i % 4 === 0 ? '#A3FF12' : 'rgba(125,211,255,.62)'
        context!.beginPath(); context!.arc(x, y, i % 4 === 0 ? 2.2 : 1.3, 0, Math.PI * 2); context!.fill()
      }
      frame += 1
      if (!reduced) animation = requestAnimationFrame(draw)
    }
    resize(); draw(); window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animation); window.removeEventListener('resize', resize) }
  }, [offline])

  function toggleQueue() {
    if (offline) { setOffline(false); setFlushing(true); window.setTimeout(() => setFlushing(false), 900) } else setOffline(true)
  }

  return (
    <section className={`pipeline ${offline ? 'is-offline' : ''} ${flushing ? 'is-flushing' : ''}`} aria-label="Interactive payment queue pipeline">
      <canvas ref={canvasRef} className="pipeline-canvas" aria-hidden="true" /><div className="pipeline-dot" aria-hidden="true" />
      <div className="pipeline-cards">
        <GlassCard className="pipeline-card"><Laptop aria-hidden="true" /><strong>CLIENT</strong><span>idempotent: PASS</span></GlassCard>
        <button type="button" className="queue-button" onClick={toggleQueue} aria-pressed={offline} aria-label={offline ? 'Reconnect queue and sync' : 'Take queue offline'}>
          <GlassCard className="pipeline-card security"><Layers3 aria-hidden="true" /><strong>QUEUE</strong><span className={offline ? 'status-red' : 'status-lime'}>{offline ? '3 queued • 0 synced' : '0 queued • 3 synced'}</span></GlassCard>
        </button>
        <GlassCard className="pipeline-card"><Database aria-hidden="true" /><strong>DB</strong><span>audit: LOGGED</span></GlassCard>
      </div>
      <span className="pipeline-hint">CLICK QUEUE · {offline ? 'OFFLINE' : flushing ? 'FLUSHING' : 'ONLINE'}</span>
    </section>
  )
}
