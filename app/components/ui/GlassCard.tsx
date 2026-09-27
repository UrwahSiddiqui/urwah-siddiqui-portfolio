'use client'

import type { MouseEvent, ReactNode } from 'react'

export default function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  function tilt(event: MouseEvent<HTMLDivElement>) {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const node = event.currentTarget
    const box = node.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width - 0.5
    const y = (event.clientY - box.top) / box.height - 0.5
    node.style.transform = `perspective(700px) rotateX(${-y * 16}deg) rotateY(${x * 16}deg)`
  }

  return (
    <div className={`glass-card ${className}`} onMouseMove={tilt} onMouseLeave={(event) => { event.currentTarget.style.transform = '' }}>
      <span className="glass-glow" aria-hidden="true" /><div className="glass-content">{children}</div>
    </div>
  )
}
