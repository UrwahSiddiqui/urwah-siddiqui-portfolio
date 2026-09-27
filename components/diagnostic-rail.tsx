'use client'
import { useEffect, useState } from 'react'
import { circuit, getSystemStage } from '@/lib/circuit-store'

function useProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => setProgress(Math.round(circuit.scroll * 100))
    update()
    window.addEventListener('portfolio:progress', update)
    return () => window.removeEventListener('portfolio:progress', update)
  }, [])
  return progress
}

export function DiagnosticRail() {
  const progress = useProgress()
  return <aside aria-label="Portfolio reading progress" className="diagnostic-rail pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-3 xl:flex">
    <div className="flex flex-col items-end gap-3 font-mono text-xs text-muted" aria-hidden="true"><span className="text-coral">{progress}%</span><span className="[writing-mode:vertical-rl] tracking-widest">{getSystemStage(progress / 100)}</span></div>
    <div role="progressbar" aria-label="Page explored" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="h-48 w-0.5 overflow-hidden bg-line/60"><div className="diagnostic-fill h-full origin-top bg-coral" style={{ transform: `scaleY(${progress / 100})` }} /></div>
  </aside>
}

export function CompletionBanner() {
  const progress = useProgress()
  const [unlocked, setUnlocked] = useState(false)
  useEffect(() => { if (progress >= 98) setUnlocked(true) }, [progress])
  return <div data-completion={unlocked ? 'unlocked' : 'ready'} className="completion-banner border-y border-line/60 bg-surface px-5 py-5 sm:px-8">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 font-mono text-sm">
      <span className="text-muted">{unlocked ? 'EXPLORATION COMPLETE / LET’S BUILD WHAT’S NEXT' : 'YOUR NEXT SYSTEM STARTS WITH A CONVERSATION'}</span>
      <a href="mailto:urwahsiddiqui6@gmail.com" className="text-coral hover:text-coral-bright">START A CONVERSATION →</a>
    </div>
  </div>
}
