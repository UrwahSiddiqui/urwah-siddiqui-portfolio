'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { circuit, introProgress } from '@/lib/circuit-store'

/**
 * The evolving computational core: a deformed wireframe shell, a translucent
 * physical inner core, and orbiting fragments. All geometry is procedural and
 * built once via useMemo — nothing is allocated inside the render loop.
 */
export function CentralStructure({ lowPerf }: { lowPerf: boolean }) {
  const shellRef = useRef<THREE.LineSegments>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const fragmentsRef = useRef<THREE.Group>(null)

  const shellGeometry = useMemo(() => {
    const detail = lowPerf ? 1 : 2
    const base = new THREE.IcosahedronGeometry(1.65, detail)
    const position = base.attributes.position as THREE.BufferAttribute
    const vertex = new THREE.Vector3()
    // Deterministic vertex displacement -> irregular, "grown" shell.
    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i)
      const n =
        Math.sin(vertex.x * 2.3) * Math.cos(vertex.y * 1.9) +
        Math.sin(vertex.z * 2.7)
      const scale = 1 + n * 0.06
      vertex.multiplyScalar(scale)
      position.setXYZ(i, vertex.x, vertex.y, vertex.z)
    }
    base.computeVertexNormals()
    return new THREE.WireframeGeometry(base)
  }, [lowPerf])

  const coreGeometry = useMemo(
    () => new THREE.IcosahedronGeometry(0.85, lowPerf ? 0 : 1),
    [lowPerf],
  )

  const fragments = useMemo(() => {
    const detail = 0
    const geo = new THREE.TetrahedronGeometry(0.22, detail)
    return Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2
      const radius = 1.05
      return {
        geometry: geo,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.6) * 0.4,
          Math.sin(angle) * radius,
        ),
        speed: 0.2 + (i % 3) * 0.06,
      }
    })
  }, [])

  useFrame((state, delta) => {
    if (!circuit.visible) return
    const still = circuit.reducedMotion
    const assemble = introProgress()
    const t = state.clock.elapsedTime

    // Breathing scale settles as the intro completes.
    const breathe = still ? 1 : 1 + Math.sin(t * 0.8) * 0.02
    const grow = 0.6 + assemble * 0.4

    if (shellRef.current) {
      shellRef.current.scale.setScalar(breathe * grow)
      const mat = shellRef.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.18 + assemble * 0.22 + (circuit.hoveredNode >= 0 ? 0.06 : 0)
      if (!still) shellRef.current.rotation.z += delta * 0.02
    }

    if (coreRef.current) {
      const coreScale = grow * (still ? 1 : 1 + Math.sin(t * 1.1) * 0.03)
      coreRef.current.scale.setScalar(coreScale)
      if (!still) {
        coreRef.current.rotation.x += delta * 0.12
        coreRef.current.rotation.y -= delta * 0.09
      }
    }

    if (fragmentsRef.current) {
      fragmentsRef.current.scale.setScalar(assemble)
      if (!still) fragmentsRef.current.rotation.y += delta * 0.18
    }
  })

  return (
    <group>
      <lineSegments ref={shellRef} geometry={shellGeometry}>
        <lineBasicMaterial
          color="#d98664"
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </lineSegments>

      <mesh ref={coreRef} geometry={coreGeometry}>
        {lowPerf ? (
          <meshStandardMaterial
            color="#2b2836"
            emissive="#785521"
            emissiveIntensity={0.35}
            roughness={0.35}
            metalness={0.6}
            flatShading
            transparent
            opacity={0.92}
          />
        ) : (
          <meshPhysicalMaterial
            color="#2b2836"
            emissive="#785521"
            emissiveIntensity={0.3}
            roughness={0.25}
            metalness={0.4}
            clearcoat={0.6}
            clearcoatRoughness={0.3}
            reflectivity={0.5}
            flatShading
            transparent
            opacity={0.9}
          />
        )}
      </mesh>

      <group ref={fragmentsRef}>
        {fragments.map((fragment, i) => (
          <mesh
            key={i}
            geometry={fragment.geometry}
            position={fragment.position}
          >
            <meshStandardMaterial
              color="#e3ddd2"
              emissive="#d98664"
              emissiveIntensity={0.25}
              roughness={0.4}
              metalness={0.3}
              flatShading
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
