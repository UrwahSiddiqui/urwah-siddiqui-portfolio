'use client'

import { useEffect, useState } from 'react'
import { SoundToggle } from '@/components/sound-toggle'

const LINKS = [
  { label: 'Evidence', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'View résumé', href: '/documents/Urwah-Siddiqui-Resume.pdf' },
  { label: 'Contact', href: '#contact' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || menuOpen ? 'border-b border-line/60 bg-surface/85 backdrop-blur-md' : 'border-b border-transparent'}`}>
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-serif text-lg tracking-tight text-ivory transition-opacity hover:opacity-80">Urwah Siddiqui</a>
        <SoundToggle />
        <ul className="hidden items-center gap-5 lg:flex">
          {LINKS.map((link) => <li key={link.href}><a href={link.href} className="tech-label text-muted transition-colors hover:text-coral">{link.label}</a></li>)}
        </ul>
        <button type="button" className="flex h-10 w-10 items-center justify-center rounded-md border border-line/60 text-text lg:hidden" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}>
          <span className="relative block h-3 w-4" aria-hidden="true"><span className={`absolute left-0 h-0.5 w-4 bg-current transition-transform ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} /><span className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} /><span className={`absolute left-0 h-0.5 w-4 bg-current transition-transform ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} /></span>
        </button>
      </nav>
      <div id="mobile-menu" hidden={!menuOpen} inert={!menuOpen} className="border-t border-line/40 bg-surface/95 backdrop-blur-md lg:hidden">
        <ul className="flex flex-col gap-1 px-5 py-4">{LINKS.map((link) => <li key={link.href}><a href={link.href} onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-3 text-base text-text transition-colors hover:bg-violet/40 hover:text-coral">{link.label}</a></li>)}</ul>
      </div>
    </header>
  )
}
