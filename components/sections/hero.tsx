import { CircuitLegend } from '@/components/circuit-legend'
import profile from '@/lib/professional.json'

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh items-center" aria-labelledby="hero-heading">
      <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden="true" style={{ background: 'linear-gradient(90deg, rgba(19,22,26,0.94) 0%, rgba(19,22,26,0.72) 34%, rgba(19,22,26,0.18) 66%, transparent 100%)' }} />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-32 pt-32 sm:px-8">
        <div className="max-w-2xl">
          <p className="js-hero-item eyebrow text-coral">Urwah Siddiqui · Engineering portfolio</p>
          <h1 id="hero-heading" className="js-hero-item mt-6 max-w-3xl font-serif text-[clamp(2.7rem,7vw,5.6rem)] leading-[0.98] tracking-tight text-ivory text-balance">Backend Development, DevSecOps & Application Security.</h1>
          <p className="js-hero-item mt-5 max-w-xl text-lg font-medium leading-relaxed text-text">I design what happens after you click.</p>
          <p className="js-hero-item mt-3 max-w-xl text-base leading-relaxed text-muted text-pretty">{profile.summary}</p>
          <p className="js-hero-item mt-4 max-w-xl text-sm leading-relaxed text-coral">{profile.achievements[0]} · 1st Position – TechnoFest CTF (2024 & 2026)</p>
          <div className="js-hero-item mt-9 flex flex-wrap items-center gap-3">
            <a href="mailto:urwahsiddiqui6@gmail.com?subject=Let%27s%20build" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-coral-bright">Contact me directly <span aria-hidden="true">→</span></a>
            <a href="#work" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line/80 px-6 py-3 text-sm font-medium text-text transition-colors hover:border-coral hover:text-coral">View selected evidence</a>
            <a href="/documents/Urwah-Siddiqui-Resume.pdf" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-3 py-3 text-sm font-medium text-muted transition-colors hover:text-coral">View résumé <span aria-hidden="true">↗</span></a>
            <a href="/documents/Urwah-Siddiqui-Resume.pdf" download="Urwah-Siddiqui-Resume.pdf" className="inline-flex items-center px-3 py-3 text-sm text-muted underline underline-offset-4 hover:text-coral">Download résumé PDF</a>
          </div>
          <p className="js-hero-item tech-label mt-12 text-muted">Backend & full-stack roles · DevOps & security · Freelance projects</p>
          <div className="js-hero-item mt-12 md:hidden"><CircuitLegend /></div>
        </div>
        <div className="js-hero-item absolute bottom-16 right-8 hidden lg:block"><CircuitLegend /></div>
      </div>
      <a href="#build" aria-label="Scroll to work" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-coral sm:flex"><span className="tech-label">Scroll to work</span><span className="relative flex h-10 w-6 justify-center rounded-full border border-line/70"><span className="animate-signal-pulse mt-1.5 h-2 w-1 rounded-full bg-coral" /></span></a>
    </section>
  )
}
