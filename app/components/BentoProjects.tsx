'use client'

import Image from 'next/image'
import { ExternalLink, GitBranch, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const projects = [
  { title: 'Offline Payment System', outcome: 'Queued payments survive network loss • 0 dupes', image: '/og/offline-arch.svg', span: 'wide', problem: 'Payments must remain traceable when connectivity disappears.', build: 'A team-built FastAPI flow with PostgreSQL, Redis, JWT, RBAC, stable transaction IDs and retry deduplication.', impact: 'The documented simulation reconciles queued payments once and identifies duplicate retries.', github: 'https://github.com/UrwahSiddiqui/Offline-Payment-System-Android', log: 'queue: offline→synced' },
  { title: 'AWS Security Lab', outcome: 'Cloud activity becomes reviewable signals', image: '/og/aws-security.svg', span: 'small', problem: 'Cloud account events are difficult to investigate without centralized evidence.', build: 'An AWS lab connecting CloudTrail records to CloudWatch alert paths.', impact: 'Creates a repeatable monitoring trail for security review.', github: 'https://github.com/UrwahSiddiqui/cloud-security-iam-lab' },
  { title: 'Secure SDLC Assessment', outcome: 'Findings move from scan to remediation', image: '/og/secure-sdlc.svg', span: 'small', problem: 'Scanner output needs validation and clear remediation context.', build: 'A generic Secure SDLC assessment using Burp Suite and OWASP ZAP practices.', impact: 'Documents findings, validation, severity context and remediation steps.', github: 'https://github.com/UrwahSiddiqui/ssdlab_9' },
  { title: 'CTF & Labs', outcome: 'Security concepts tested under pressure', image: '/og/ctf-labs.svg', span: 'wide', problem: 'Security theory becomes useful through repeated hands-on investigation.', build: 'CTF participation and focused labs spanning web, cloud and defensive security.', impact: 'Built repeatable habits for evidence collection and technical communication.', github: 'https://github.com/UrwahSiddiqui' },
]

type Project = (typeof projects)[number]

export default function BentoProjects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!selected) return
    closeRef.current?.focus()
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null) }
    document.body.style.overflow = 'hidden'; window.addEventListener('keydown', close)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', close) }
  }, [selected])

  return (
    <section id="work" className="content-section" aria-labelledby="work-title">
      <h2 id="work-title" className="eyebrow">01 / SYSTEMS</h2>
      <div className="bento-grid">{projects.map((project) => (
        <button className={`project-card ${project.span}`} key={project.title} onClick={() => setSelected(project)} aria-label={`Open ${project.title} details`}>
          <div className="project-visual"><Image src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, 66vw" /></div>
          <div className="project-caption"><span>{project.title}</span><strong>{project.outcome}</strong>{project.log && <code>{project.log}</code>}</div>
        </button>
      ))}</div>
      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null) }}>
        <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button ref={closeRef} className="modal-close" onClick={() => setSelected(null)} aria-label="Close project details"><X aria-hidden="true" /></button>
          <span className="eyebrow">SYSTEM DETAIL</span><h3 id="modal-title">{selected.title}</h3>
          <dl><div><dt>Problem</dt><dd>{selected.problem}</dd></div><div><dt>Build</dt><dd>{selected.build}</dd></div><div><dt>Impact</dt><dd>{selected.impact}</dd></div></dl>
          <div className="modal-links"><a href={selected.github} target="_blank" rel="noreferrer"><GitBranch aria-hidden="true" />GitHub</a><a href={selected.image} target="_blank" rel="noreferrer"><ExternalLink aria-hidden="true" />Diagram</a></div>
        </section>
      </div>}
    </section>
  )
}
