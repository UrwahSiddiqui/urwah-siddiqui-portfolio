'use client'

import { useEffect, useState } from 'react'
import { circuit, getPowerLabel, getRecruiterLabel, getStatusLine, powerOn, toggleRecruiterMode } from '@/lib/circuit-store'

export function SystemControlRoom() {
  const [booted, setBooted] = useState(false)
  const [recruiter, setRecruiter] = useState(false)
  const [status, setStatus] = useState(getStatusLine())

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    circuit.reducedMotion = reduced
    if (reduced) {
      powerOn()
      setBooted(true)
    }
    const timer = window.setInterval(() => setStatus(getStatusLine()), 500)
    return () => window.clearInterval(timer)
  }, [])

  const startSystem = () => {
    powerOn()
    setBooted(true)
  }

  const quickView = () => {
    const next = toggleRecruiterMode()
    setRecruiter(next)
    document.documentElement.dataset.recruiter = next ? 'true' : 'false'
  }

  return (
    <>
      {!booted && (
        <section className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 px-5 backdrop-blur-md" aria-label="System boot">
          <div className="w-full max-w-xl border border-line/70 bg-surface/85 p-6 shadow-2xl shadow-ink/30 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/60 pb-4">
              <span className="eyebrow text-coral">URWAH.SYS / CONTROL ROOM</span>
              <span className="tech-label text-muted">v1.0.26</span>
            </div>
            <div className="py-10">
              <p className="tech-label text-coral">BOOT SEQUENCE READY</p>
              <h1 className="mt-4 max-w-lg font-serif text-4xl leading-tight tracking-tight text-ivory sm:text-5xl">See what happens behind the screen.</h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">A field guide to the backend APIs, security layers, and cloud operations I build.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 border-t border-line/60 pt-5">
              <button type="button" onClick={startSystem} className="rounded-full bg-coral px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-coral-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral">Power on system</button>
              <button type="button" onClick={() => { circuit.reducedMotion = true; startSystem() }} className="text-sm text-text transition-colors hover:text-coral">Skip cinematic intro</button>
            </div>
            <p className="mt-6 tech-label text-muted">{status}</p>
          </div>
        </section>
      )}

      <aside className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-opacity duration-500 ${booted ? 'opacity-100' : 'opacity-0'} ${recruiter ? 'hidden' : ''}`} aria-label="System status">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 pb-4 sm:px-8">
          <div className="pointer-events-auto flex w-full items-center gap-3 border border-line/70 bg-surface/85 px-3 py-2 backdrop-blur-md sm:gap-5 sm:px-4">
            <span className="hidden h-2 w-2 rounded-full bg-coral shadow-[0_0_12px_rgba(255,107,87,0.9)] sm:block" aria-hidden="true" />
            <span className="tech-label text-coral">{circuit.activeStage}</span>
            <div className="h-1 flex-1 overflow-hidden bg-line/60" aria-label="Case study progress"><div className="h-full bg-coral transition-[width] duration-500" style={{ width: `${circuit.scroll * 100}%` }} /></div>
            <span className="hidden tech-label text-muted sm:block">{circuit.integrity.toFixed(1)}% INTEGRITY</span>
            <button type="button" onClick={quickView} className="shrink-0 border-l border-line/60 pl-3 text-xs text-text transition-colors hover:text-coral sm:pl-5">{getRecruiterLabel()}</button>
          </div>
        </div>
      </aside>
    </>
  )
}

export function RecruiterModeButton() {
  const [recruiter, setRecruiter] = useState(false)
  return <button type="button" onClick={() => { const next = toggleRecruiterMode(); setRecruiter(next) }} className="tech-label text-muted transition-colors hover:text-coral">{recruiter ? 'Circuit mode' : 'Quick view'}</button>
}

export function ControlRoomStatus() {
  return <span className="tech-label text-muted">{getPowerLabel()} · {getStatusLine()}</span>
}
