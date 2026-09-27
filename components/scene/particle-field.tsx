'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { buildParticles } from '@/lib/circuit-geometry'
import { circuit } from '@/lib/circuit-store'

const CORAL = new THREE.Color('#ed926f')
const MUTED = new THREE.Color('#554e46')

export function ParticleField({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  // Positions + colors are seeded once, never recomputed per frame.
  const { geometry } = useMemo(() => {
    const { positions, mixes } = buildParticles(count)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color()
    for (let i = 0; i < count; i++) {
      color.copy(MUTED).lerp(CORAL, Math.pow(mixes[i], 2.2))
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return { geometry: geo }
  }, [count])

  useFrame((_, delta) => {
    const points = pointsRef.current
    if (!points) return
    if (circuit.reducedMotion || !circuit.visible) return
    // Very slow, calm drift — never a busy starfield.
    points.rotation.y += delta * 0.015
    points.rotation.x += delta * 0.005
  })

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        vertexColors
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.72}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
