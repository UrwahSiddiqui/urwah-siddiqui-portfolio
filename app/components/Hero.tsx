'use client'

import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import MagneticLetter from './ui/MagneticLetter'
import Pipeline from './Pipeline'

const roles = ['Backend', 'DevSecOps', 'AppSec']
function MagneticWord({ word, muted = false }: { word: string; muted?: boolean }) {
  return <span className={`name-row ${muted ? 'muted-name' : ''}`} aria-hidden="true">{word.split('').map((char, index) => <MagneticLetter key={`${char}-${index}`} char={char} />)}</span>
}

export default function Hero() {
  const [role, setRole] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setRole((current) => (current + 1) % roles.length), 2000)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => window.clearInterval(timer)
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    let frame = 0
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { window.clearInterval(timer); cancelAnimationFrame(frame); lenis.destroy() }
  }, [])

  return (
    <section className="hero dot-grid" aria-labelledby="hero-title">
      <nav className="site-nav" aria-label="Primary navigation"><a className="brand" href="#main">URWAH.SYSTEMS<span className="blink">_</span></a><div><a href="#work">Work</a><a href="#experience">Experience</a><a href="#contact">Contact</a></div></nav>
      <div className="hero-grid"><div className="hero-copy">
        <h1 id="hero-title"><span className="sr-only">Urwah Siddiqui</span><MagneticWord word="URWAH" /><MagneticWord word="SIDDIQUI" muted /></h1>
        <div className="type-line" aria-live="polite"><span>{roles[role]}</span><i aria-hidden="true">_</i></div>
        <div className="pills" role="list" aria-label="System qualities"><span role="listitem">OFFLINE QUEUE</span><span role="listitem">IDEMPOTENT</span><span role="listitem">AUDIT TRAIL</span></div>
        <div className="hero-actions"><a className="button-primary" href="#work">View Systems</a><a className="button-ghost" href="/Urwah_CV.pdf" download>Download CV</a></div>
        <p className="trust">Rector&apos;s List 1st • CTF Winner 24&amp;26 • FAST-NUCES</p>
      </div><Pipeline /></div>
    </section>
  )
}
