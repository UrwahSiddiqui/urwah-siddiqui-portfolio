'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { NODE_VECTORS, SEGMENT_CURVES } from '@/lib/circuit-geometry'
import { circuit, introProgress } from '@/lib/circuit-store'

/**
 * Curved node-to-node pathways plus fine spokes to the centre. Materials are
 * created per line so hover/focus can brighten only the connected paths.
 */
export function ConnectionPaths() {
  const segmentRefs = useRef<(THREE.Mesh | null)[]>([])
  const spokeRefs = useRef<(THREE.Mesh | null)[]>([])

  const segmentGeometries = useMemo(
    () => SEGMENT_CURVES.map((curve) => new THREE.TubeGeometry(curve, 60, 0.01, 6, false)),
    [],
  )

  const spokeGeometries = useMemo(
    () =>
      NODE_VECTORS.map((vec) => {
        const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), vec.clone())
        return new THREE.TubeGeometry(curve, 1, 0.006, 5, false)
      }),
    [],
  )

  useFrame(() => {
    const assemble = introProgress()
    const hovered = circuit.hoveredNode
    const nodeCount = NODE_VECTORS.length

    segmentGeometries.forEach((_, i) => {
      const mesh = segmentRefs.current[i]
      if (!mesh) return
      const connected = hovered === i || hovered === (i + 1) % nodeCount
      const mat = mesh.material as THREE.MeshBasicMaterial
      const target = hovered < 0 ? 0.4 : connected ? 0.95 : 0.14
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, target * assemble, 0.12)
    })

    spokeGeometries.forEach((_, i) => {
      const mesh = spokeRefs.current[i]
      if (!mesh) return
      const mat = mesh.material as THREE.MeshBasicMaterial
      const target = hovered === i ? 0.6 : 0.12
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, target * assemble, 0.12)
    })
  })

  return (
    <group>
      {segmentGeometries.map((geometry, i) => (
        <mesh
          key={`segment-${i}`}
          ref={(el) => {
            segmentRefs.current[i] = el
          }}
          geometry={geometry}
        >
          <meshBasicMaterial
            color="#ed926f"
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      ))}

      {spokeGeometries.map((geometry, i) => (
        <mesh
          key={`spoke-${i}`}
          ref={(el) => {
            spokeRefs.current[i] = el
          }}
          geometry={geometry}
        >
          <meshBasicMaterial
            color="#785521"
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
