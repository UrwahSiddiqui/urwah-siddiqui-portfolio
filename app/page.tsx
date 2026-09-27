import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import Hero from './components/Hero'
import Experience from './components/Experience'
import BentoProjects from './components/BentoProjects'
import TerminalFooter from './components/TerminalFooter'

export const metadata: Metadata = {
  metadataBase: new URL('https://urwah-siddiqui-portfolio.vercel.app'),
  title: 'Urwah Siddiqui - Backend & DevSecOps Engineer | FastAPI, AWS, Security',
  description: 'Urwah Siddiqui builds resilient backend systems, delivery infrastructure, and practical application security controls.',
  openGraph: { title: 'Urwah Siddiqui - Backend & DevSecOps Engineer', description: 'Backend systems, DevSecOps, and application security.', images: ['/og.png'] },
  icons: { icon: '/icon.svg' },
}

const personSchema = {
  '@context': 'https://schema.org', '@type': 'Person', name: 'Urwah Siddiqui',
  jobTitle: 'Backend & DevSecOps Engineer', url: 'https://urwah-siddiqui-portfolio.vercel.app',
  email: 'mailto:urwahsiddiqui6@gmail.com',
  sameAs: ['https://github.com/UrwahSiddiqui', 'https://www.linkedin.com/in/urwah-siddiqui-815356195/'],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'FAST-NUCES' },
  knowsAbout: ['FastAPI', 'PostgreSQL', 'Redis', 'DevSecOps', 'Application Security'],
}

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, '\\u003c') }} />
      <main id="main"><Hero /><Experience /><BentoProjects /></main>
      <TerminalFooter />
      <Analytics />
    </>
  )
}
