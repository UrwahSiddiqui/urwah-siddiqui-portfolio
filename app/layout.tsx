import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/geist'
import '@fontsource-variable/fraunces'
import './globals.css'
import profile from '@/lib/professional.json'

const description = 'Portfolio of Urwah Siddiqui, focused on backend development, FastAPI, DevSecOps, Linux and Nginx hardening, PostgreSQL migrations, Docker, monitoring, and application security.'
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Urwah Siddiqui',
  jobTitle: 'Backend Development, DevSecOps & Application Security',
  email: 'mailto:urwahsiddiqui6@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/urwah-siddiqui-815356195/',
    'https://github.com/UrwahSiddiqui',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'FAST – National University of Computer & Emerging Sciences',
  },
  knowsAbout: [
    'FastAPI',
    'DevSecOps',
    'Docker',
    'PostgreSQL',
    'Redis',
    'Linux server hardening',
    'Application security',
    'Prometheus and Grafana monitoring',
  ],
  description: profile.summary,
}

export const metadata: Metadata = {
  title: 'Urwah Siddiqui — Backend Development & DevSecOps Engineer',
  description,
  keywords: [
    'Urwah Siddiqui',
    'Backend Developer',
    'Application Security',
    'DevSecOps',
    'Cloud',
    'API Development',
    'Full-stack',
    'FastAPI',
    'PostgreSQL',
    'Linux Hardening',
    'Docker',
  ],
  authors: [{ name: 'Urwah Siddiqui' }],
  creator: 'Urwah Siddiqui',
  category: 'technology',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Urwah Siddiqui — Backend Development & DevSecOps Engineer',
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urwah Siddiqui — Backend Development & DevSecOps Engineer',
    description,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#13161A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-ink">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, '\\u003c') }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
