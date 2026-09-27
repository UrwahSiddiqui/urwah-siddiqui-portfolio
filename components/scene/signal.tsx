'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { LOOP_CURVE } from '@/lib/circuit-geometry'
import { circuit, introProgress } from '@/lib/circuit-store'

const headPos = new THREE.Vector3()
const trailPos = new THREE.Vector3()

/**
 * A warm coral signal travelling the closed loop between nodes, trailed by a
 * moving point light so the surrounding structure lights up as it passes.
 */
export function Signal() {
  const headRef = useRef<THREE.Mesh>(null)
  const trailRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const progress = useRef(0)

  useFrame((state, delta) => {
    if (!circuit.visible) return
    const assemble = introProgress()

    if (!circuit.reducedMotion) {
      // Speed rises gently while scrolling; never frantic.
      const speed = 0.06 + circuit.scroll * 0.05
      progress.current = (progress.current + delta * speed) % 1
    }

    const t = progress.current
    LOOP_CURVE.getPoint(t, headPos)
    LOOP_CURVE.getPoint((t + 0.94) % 1, trailPos)

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.15

    if (headRef.current) {
      headRef.current.position.copy(headPos)
      headRef.current.scale.setScalar(assemble * pulse)
    }
    if (trailRef.current) {
      trailRef.current.position.copy(trailPos)
      trailRef.current.scale.setScalar(assemble * 0.6)
    }
    if (lightRef.current) {
      lightRef.current.position.copy(headPos)
      lightRef.current.intensity = assemble * (2.2 + circuit.scroll * 1.5)
    }
  })

  return (
    <group>
      <mesh ref={headRef}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#ed926f" toneMapped={false} />
      </mesh>
      <mesh ref={trailRef}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#d98664" transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <pointLight ref={lightRef} color="#ed926f" distance={6} intensity={2.4} />
    </group>
  )
}
