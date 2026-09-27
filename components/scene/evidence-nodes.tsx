'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { NODES } from '@/lib/nodes'
import { circuit, introProgress } from '@/lib/circuit-store'

/**
 * Visual-only reactive markers. Interaction/labels live in the accessible DOM
 * legend (see components/circuit-legend.tsx), which writes circuit.hoveredNode;
 * these markers simply respond to it so the canvas stays fully decorative.
 */
function NodeMarker({ index }: { index: number }) {
  const node = NODES[index]
  const meshRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => new THREE.OctahedronGeometry(0.16, 0), [])
  const haloGeometry = useMemo(() => new THREE.TorusGeometry(0.28, 0.012, 8, 32), [])

  useFrame(() => {
    const assemble = introProgress()
    const hovered = circuit.hoveredNode
    const isActive = hovered === index
    const receded = hovered >= 0 && !isActive

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      const targetEmissive = isActive ? 1.6 : receded ? 0.15 : 0.5
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, 0.12)
      const targetScale = (isActive ? 1.4 : receded ? 0.85 : 1) * assemble
      const s = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.12)
      meshRef.current.scale.setScalar(s)
      if (!circuit.reducedMotion) meshRef.current.rotation.y += 0.01
      mat.opacity = assemble
    }
    if (haloRef.current) {
      const mat = haloRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, (isActive ? 0.9 : 0.25) * assemble, 0.12)
      haloRef.current.scale.setScalar(isActive ? 1.2 : 1)
    }
  })

  return (
    <group position={node.position}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#f5f0e8"
          emissive="#ed926f"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.2}
          transparent
        />
      </mesh>
      <mesh ref={haloRef} geometry={haloGeometry}>
        <meshBasicMaterial color="#ed926f" transparent opacity={0.25} depthWrite={false} />
      </mesh>
    </group>
  )
}

export function EvidenceNodes() {
  return (
    <group>
      {NODES.map((node, i) => (
        <NodeMarker key={node.id} index={i} />
      ))}
    </group>
  )
}
