export type EvidenceNode = {
  id: string
  label: string
  description: string
  /** Fixed position around the central structure. */
  position: [number, number, number]
}

/**
 * The four stages of the Living Evidence Circuit. Positions are hand-placed
 * (not random) so the signal path between them reads as a deliberate loop.
 */
export const NODES: EvidenceNode[] = [
  {
    id: 'build',
    label: 'Build',
    description: 'APIs, databases, and application logic that turn an idea into a working system.',
    position: [-2.35, 1.15, 0.35],
  },
  {
    id: 'secure',
    label: 'Secure',
    description: 'Authentication, threat thinking, and safer defaults built in from the start.',
    position: [2.3, 1.05, -0.5],
  },
  {
    id: 'operate',
    label: 'Operate',
    description: 'Deployment, monitoring, and reliability that keep the system working in the real world.',
    position: [2.05, -1.35, 0.4],
  },
  {
    id: 'evolve',
    label: 'Evolve',
    description: 'Iteration and refinement as requirements, scale, and threats change over time.',
    position: [-2.15, -1.25, -0.35],
  },
]
