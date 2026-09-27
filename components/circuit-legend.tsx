'use client'

import { useState } from 'react'
import { NODES } from '@/lib/nodes'
import { circuit } from '@/lib/circuit-store'

/**
 * Accessible DOM control for the four evidence nodes. Lives in the foreground
 * (the canvas is decorative and pointer-events-none), so hover and keyboard
 * focus both work. Writing circuit.hoveredNode drives the 3D markers + paths.
 */
export function CircuitLegend() {
  const [active, setActive] = useState(-1)

  const activate = (index: number) => {
    setActive(index)
    circuit.hoveredNode = index
  }
  const clear = () => {
    setActive(-1)
    circuit.hoveredNode = -1
  }

  return (
    <div className="w-full max-w-xs">
      <p className="tech-label mb-3 text-muted">The signal moves through four stages</p>
      <ul className="flex flex-col gap-2" onMouseLeave={clear}>
        {NODES.map((node, index) => {
          const isActive = active === index
          return (
            <li key={node.id}>
              <button
                type="button"
                onMouseEnter={() => activate(index)}
                onFocus={() => activate(index)}
                onBlur={clear}
                onClick={() => activate(index)}
                aria-expanded={isActive}
                className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  isActive
                    ? 'border-coral bg-surface/70'
                    : 'border-line/50 bg-surface/30 hover:border-coral/60'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full transition-colors ${
                    isActive ? 'bg-coral-bright' : 'bg-coral/60'
                  }`}
                />
                <span>
                  <span className="tech-label block text-text">{node.label}</span>
                  <span
                    hidden={!isActive}
                    className={`mt-1 block overflow-hidden text-xs leading-relaxed text-muted transition-all duration-300 ${
                      isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {node.description}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
