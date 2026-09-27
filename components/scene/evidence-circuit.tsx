'use client'

import dynamic from 'next/dynamic'
import { WebglFallback } from './webgl-fallback'

// The whole WebGL experience is loaded client-side only, on top of a complete
// CSS fallback so there is never a blank loading screen.
const EvidenceCircuitCanvas = dynamic(
  () => import('./evidence-circuit-canvas').then((m) => m.EvidenceCircuitCanvas),
  { ssr: false },
)

export function EvidenceCircuit() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <WebglFallback />
      <EvidenceCircuitCanvas />
    </div>
  )
}
