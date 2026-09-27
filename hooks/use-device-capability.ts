'use client'

import { useEffect, useState } from 'react'

export type DeviceCapability = {
  /** Resolved after mount to avoid hydration mismatches. */
  ready: boolean
  isMobile: boolean
  /** True when we should trim geometry, particles, and DPR. */
  lowPerf: boolean
  /** Sensible pixel-ratio ceiling for this device. */
  maxDpr: number
}

/**
 * Detects viewport size and a rough hardware tier so the scene can scale its
 * particle count, geometry detail, and DPR. Resolved client-side only.
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    ready: false,
    isMobile: false,
    lowPerf: false,
    maxDpr: 1.5,
  })

  useEffect(() => {
    const compute = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      const cores = navigator.hardwareConcurrency ?? 4
      const lowPerf = isMobile || cores <= 4
      setCapability({
        ready: true,
        isMobile,
        lowPerf,
        maxDpr: isMobile ? 1.5 : 2,
      })
    }
    compute()
    window.addEventListener('resize', compute, { passive: true })
    return () => window.removeEventListener('resize', compute)
  }, [])

  return capability
}
