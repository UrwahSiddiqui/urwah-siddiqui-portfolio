'use client'

import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { useDeviceCapability } from '@/hooks/use-device-capability'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { circuit } from '@/lib/circuit-store'
import { EvidenceCircuitScene } from './evidence-circuit-scene'

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

export function EvidenceCircuitCanvas() {
  const reducedMotion = useReducedMotion()
  const capability = useDeviceCapability()
  const [supported, setSupported] = useState<boolean | null>(null)
  const rafPointer = useRef<number | null>(null)

  // Detect WebGL once on the client. On failure we render nothing and the
  // CSS fallback behind us remains visible.
  useEffect(() => {
    setSupported(hasWebGL())
    circuit.mountTime = performance.now()
  }, [])

  // Sync accessibility + capability flags into the shared store.
  useEffect(() => {
    circuit.reducedMotion = reducedMotion
  }, [reducedMotion])

  useEffect(() => {
    circuit.lowPerf = capability.lowPerf
  }, [capability.lowPerf])

  // Pointer parallax (skipped for reduced motion). Throttled via rAF.
  useEffect(() => {
    if (reducedMotion) {
      circuit.pointerX = 0
      circuit.pointerY = 0
      return
    }
    const onMove = (event: PointerEvent) => {
      if (rafPointer.current !== null) return
      rafPointer.current = requestAnimationFrame(() => {
        circuit.pointerX = (event.clientX / window.innerWidth) * 2 - 1
        circuit.pointerY = (event.clientY / window.innerHeight) * 2 - 1
        rafPointer.current = null
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (rafPointer.current !== null) cancelAnimationFrame(rafPointer.current)
    }
  }, [reducedMotion])

  // Pause rendering work when the tab is hidden.
  useEffect(() => {
    const onVisibility = () => {
      circuit.visible = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  if (supported === false) return null
  if (!capability.ready || supported === null) return null

  const particleCount = capability.lowPerf ? 80 : 240

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, capability.maxDpr]}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      gl={{ antialias: !capability.lowPerf, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <EvidenceCircuitScene
        lowPerf={capability.lowPerf}
        particleCount={particleCount}
        offsetX={capability.isMobile ? 0 : 1.1}
      />
    </Canvas>
  )
}
