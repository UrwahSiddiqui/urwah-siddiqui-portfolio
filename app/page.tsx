import { SiteNav } from '@/components/nav/site-nav'
import { SystemCanvas } from '@/components/system-canvas'
import { Closing } from '@/components/sections/closing'
import { Evidence } from '@/components/sections/evidence'
import { Professional } from '@/components/sections/professional'
import { Hero } from '@/components/sections/hero'
import { ScrollNarrative } from '@/components/sections/scroll-narrative'
import { ScrollOrchestrator } from '@/components/scroll/scroll-orchestrator'
import { DiagnosticRail, CompletionBanner } from '@/components/diagnostic-rail'

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-coral focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>

      <SiteNav />
      <DiagnosticRail />

      <SystemCanvas />

      <main id="main" className="relative z-10">
        <Hero />
        <ScrollNarrative />
        <Evidence />
        <Professional />
        <Closing />
        <CompletionBanner />
      </main>

      <ScrollOrchestrator />
    </>
  )
}
