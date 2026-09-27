'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { circuit, introProgress } from '@/lib/circuit-store'
import { CentralStructure } from './central-structure'
import { ConnectionPaths } from './connection-paths'
import { EvidenceNodes } from './evidence-nodes'
import { ParticleField } from './particle-field'
import { Signal } from './signal'

export function EvidenceCircuitScene({
  lowPerf,
  particleCount,
  offsetX = 0,
}: {
  lowPerf: boolean
  particleCount: number
  offsetX?: number
}) {
  const circuitRef = useRef<THREE.Group>(null)
  const spin = useRef(0)
  const camera = useThree((state) => state.camera)

  useFrame((_, delta) => {
    if (!circuit.visible) return
    const still = circuit.reducedMotion
    const assemble = introProgress()
    const group = circuitRef.current
    if (!group) return

    // Idle rotation accelerates slightly with scroll; capped so it never spins fast.
    if (!still) {
      const speed = 0.12 + circuit.scroll * 0.12
      spin.current += delta * speed
    }

    // Follow the pointer smoothly rather than literally.
    const targetY = spin.current + circuit.pointerX * 0.32
    const targetX = -circuit.pointerY * 0.2 + circuit.scroll * 0.15
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 5, delta)
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 5, delta)

    // Subtle intro assembly of the whole system.
    const s = 0.82 + assemble * 0.18
    group.scale.setScalar(s)

    // Gentle camera parallax + intro dolly, disabled for reduced motion.
    if (!still) {
      const dolly = 6.4 - assemble * 0.5
      camera.position.x = THREE.MathUtils.damp(camera.position.x, circuit.pointerX * 0.5, 3, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, circuit.pointerY * 0.35, 3, delta)
      camera.position.z = THREE.MathUtils.damp(camera.position.z, dolly, 3, delta)
      camera.lookAt(0, 0, 0)
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} color="#2b2836" />
      <directionalLight position={[4, 5, 3]} intensity={1.3} color="#f5f0e8" />
      <pointLight position={[-4, -2, -4]} intensity={0.8} color="#2b2836" />
      <pointLight position={[3, -3, 2]} intensity={0.4} color="#785521" />

      <ParticleField count={particleCount} />

      <group ref={circuitRef} position={[offsetX, 0, 0]}>
        <CentralStructure lowPerf={lowPerf} />
        <ConnectionPaths />
        <Signal />
        <EvidenceNodes />
      </group>
    </>
  )
}
