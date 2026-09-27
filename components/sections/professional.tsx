import profile from '@/lib/professional.json'

export function Professional() {
  const { experience, education } = profile
  return (
    <>
      <section id="experience" aria-labelledby="experience-heading" className="relative bg-ink/90 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="js-reveal max-w-4xl">
            <p className="eyebrow text-coral">Professional experience</p>
            <h2 id="experience-heading" className="mt-4 font-serif text-3xl text-ivory md:text-4xl">{experience.employer}</h2>
            <p className="mt-3 text-lg text-text">{experience.role}</p>
            <p className="mt-2 text-sm text-muted">{experience.dates} · {experience.location}</p>
            <p className="mt-5 text-sm text-coral">{profile.positioning}</p>
            <ul className="mt-6 list-disc space-y-3 pl-5 leading-relaxed text-text">
              {experience.highlights.map(item => <li key={item}>{item}</li>)}
            </ul>
            <details className="mt-6 rounded-lg border border-line/70 bg-surface/60 px-5">
              <summary className="cursor-pointer py-4 font-medium text-coral">Migration, deployment and handover details</summary>
              <ul className="list-disc space-y-3 pb-5 pl-5 leading-relaxed text-text">
                {experience.details.map(item => <li key={item}>{item}</li>)}
              </ul>
            </details>
          </div>
        </div>
      </section>
      <section id="skills" aria-labelledby="skills-heading" className="relative bg-ink/90 pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="skills-heading" className="js-reveal font-serif text-3xl text-ivory md:text-4xl">Skills in practice.</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {profile.skills.map(skill => <div key={skill.group} className="js-reveal border-t border-line/70 pt-5">
              <h3 className="text-lg font-medium text-ivory">{skill.group}</h3>
              <p className="mt-3 leading-relaxed text-muted">{skill.text}</p>
              <a href={skill.href} className="mt-4 inline-block py-2 text-sm text-coral underline underline-offset-4">{skill.evidence}</a>
            </div>)}
          </div>
        </div>
      </section>
      <section id="education" aria-labelledby="education-heading" className="relative bg-ink/90 pb-20 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-2">
          <div className="js-reveal">
            <h2 id="education-heading" className="font-serif text-3xl text-ivory">Education & training</h2>
            <p className="mt-5 font-medium text-text">{education.degree} · {education.dates}</p>
            <p className="mt-2 text-muted">{education.institution}</p>
            <dl className="mt-6 space-y-4 text-sm leading-relaxed">
              <div><dt className="font-medium text-text">Completed courses and certificates</dt><dd className="mt-1 text-muted">{profile.training.completed}</dd></div>
              <div><dt className="font-medium text-text">Job simulations</dt><dd className="mt-1 text-muted">{profile.training.simulations}</dd></div>
              <div><dt className="font-medium text-text">In progress</dt><dd className="mt-1 text-muted">{profile.training.inProgress}</dd></div>
            </dl>
          </div>
          <div className="js-reveal">
            <h2 className="font-serif text-3xl text-ivory">Selected achievements</h2>
            <ul className="mt-5 list-disc space-y-4 pl-5 leading-relaxed text-muted">{profile.achievements.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>
    </>
  )
}
