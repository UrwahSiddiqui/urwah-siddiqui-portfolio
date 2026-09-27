'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import { initializeCircuit, setReducedMotion, setVisibility, syncSystem } from '@/lib/circuit-store'

export function ScrollOrchestrator() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    initializeCircuit()
    const media = gsap.matchMedia()
    const onVisibility = () => setVisibility(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    onVisibility()
    const publish = (value: number) => {
      syncSystem(value)
      window.dispatchEvent(new CustomEvent<number>('portfolio:progress', { detail: value }))
    }
    const progress = ScrollTrigger.create({
      start: 0,
      end: () => Math.max(1, ScrollTrigger.maxScroll(window)),
      onUpdate: self => publish(self.progress),
      onRefresh: self => publish(self.progress),
    })
    media.add({ reduced: '(prefers-reduced-motion: reduce)', motion: '(prefers-reduced-motion: no-preference)' }, context => {
      const reduced = Boolean(context.conditions?.reduced)
      setReducedMotion(reduced)
      if (reduced) return
      gsap.from('.js-hero-item', { y: 20, duration: 0.85, stagger: 0.09, ease: 'power3.out' })
      gsap.utils.toArray<HTMLElement>('.js-reveal').forEach(element => {
        // Text never becomes opacity-hidden, including when scripts fail mid-load.
        gsap.from(element, { y: 30, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 92%', once: true } })
      })
      gsap.utils.toArray<HTMLElement>('[data-project-surface]').forEach(element => {
        gsap.to(element, { '--border-energy': 0.55, duration: 0.8, scrollTrigger: { trigger: element, start: 'top 80%', toggleActions: 'play reverse play reverse' } })
      })
    })
    const refresh = () => ScrollTrigger.refresh()
    const observer = new ResizeObserver(refresh)
    observer.observe(document.body)
    let mounted = true
    void document.fonts.ready.then(() => { if (mounted) refresh() })
    refresh()
    return () => {
      mounted = false
      observer.disconnect()
      media.revert()
      progress.kill()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])
  return null
}
