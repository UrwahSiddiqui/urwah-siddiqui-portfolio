import { CatmullRomCurve3, QuadraticBezierCurve3, Vector3 } from 'three'
import { NODES } from './nodes'

export const NODE_VECTORS = NODES.map((node) => new Vector3(...node.position))

/** Closed loop threaded through the four nodes — the signal's travel path. */
export const LOOP_CURVE = new CatmullRomCurve3(NODE_VECTORS, true, 'catmullrom', 0.45)

/** Curved node-to-node segments, each bulged outward from the centre. */
export const SEGMENT_CURVES = NODE_VECTORS.map((vec, index) => {
  const next = NODE_VECTORS[(index + 1) % NODE_VECTORS.length]
  const mid = vec.clone().add(next).multiplyScalar(0.5)
  mid.add(mid.clone().normalize().multiplyScalar(0.5))
  return new QuadraticBezierCurve3(vec.clone(), mid, next.clone())
})

/** Deterministic pseudo-random generator so positions are stable across renders. */
export function mulberry32(seed: number) {
  let state = seed
  return () => {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Builds a seeded particle field inside a spherical shell. Returns positions
 * and per-particle color mix factors (0 = muted, 1 = coral).
 */
export function buildParticles(count: number, seed = 1337) {
  const rand = mulberry32(seed)
  const positions = new Float32Array(count * 3)
  const mixes = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    // Even-ish spherical distribution, pushed into a shell (radius 2.6..5.5).
    const theta = rand() * Math.PI * 2
    const phi = Math.acos(2 * rand() - 1)
    const radius = 2.6 + rand() * 2.9
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7
    positions[i * 3 + 2] = radius * Math.cos(phi)
    mixes[i] = rand()
  }
  return { positions, mixes }
}
