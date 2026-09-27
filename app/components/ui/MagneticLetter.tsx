'use client'

import { useRef } from 'react'

export default function MagneticLetter({ char }: { char: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  function move(event: React.MouseEvent<HTMLSpanElement>) {
    const node = ref.current
    if (!node || window.matchMedia('(pointer: coarse)').matches) return
    const box = node.getBoundingClientRect()
    const mx = event.clientX - box.left
    const my = event.clientY - box.top
    const strength = 1 + (char.charCodeAt(0) % 3) * 0.18
    node.style.transform = `translate3d(${(mx - box.width / 2) * 0.15 * strength}px, ${(my - box.height / 2) * 0.1}px, 20px) scale(1.2)`
  }

  return <span ref={ref} className="magnetic-letter" onMouseMove={move} onMouseLeave={() => { if (ref.current) ref.current.style.transform = '' }} aria-hidden="true">{char}</span>
}
