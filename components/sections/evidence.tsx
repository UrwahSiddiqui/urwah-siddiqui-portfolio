import profile from '@/lib/professional.json'

type Project = { id: string; name: string; dates: string; role: string; tech: string[] }
const PROJECTS: Project[] = profile.projects

function EvidenceChapter({ project, index }: { project: Project; index: number }) {
  return (
    <article id={project.id} className="js-reveal group relative border-t border-line/50 py-14 md:py-20">
      <div className={`grid gap-6 md:grid-cols-12 md:gap-10 ${index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div className="md:col-span-4">
          <span className="eyebrow text-coral">Selected evidence</span>
          <h3 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ivory text-balance md:text-4xl">{project.name}</h3>
          <p className="mt-3 text-sm text-muted">{project.role}</p>
          <p className="mt-2 text-sm text-muted">{project.dates}</p>
        </div>
        <div className="min-w-0 md:col-span-8">
          <div data-project-surface className="project-surface rounded-xl border border-line/60 bg-surface/40 p-5 backdrop-blur-sm sm:p-7">
            <p className="tech-label text-coral">Technology stack</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2" aria-label={`${project.name} technology stack`}>
              {project.tech.map(tag => <li key={tag} className="flex items-center gap-2 text-sm text-text"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />{tag}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Evidence() {
  return (
    <section id="work" aria-labelledby="work-heading" className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="js-reveal mb-6 max-w-2xl">
          <h2 id="work-heading" className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight text-ivory text-balance">Selected evidence.</h2>
          <p className="mt-4 text-muted text-pretty">A concise view of the technologies used across project contributions and security lab work.</p>
          <a href="https://github.com/UrwahSiddiqui" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center py-2 text-sm text-coral underline underline-offset-4">View GitHub profile <span aria-hidden="true" className="ml-1">↗</span></a>
        </div>
        {PROJECTS.map((project, index) => <EvidenceChapter key={project.id} project={project} index={index} />)}
      </div>
    </section>
  )
}
