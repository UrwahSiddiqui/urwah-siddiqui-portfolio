type Scene = {
  id: string
  stage: string
  copy: string
  labels: string[]
  align: 'left' | 'right'
}

const SCENES: Scene[] = [
  {
    id: 'build',
    stage: 'Build',
    copy: 'I build the path from a request to a reliable result—then make it survive the network disappearing.',
    labels: ['Offline queueing', 'Idempotent APIs', 'Data integrity'],
    align: 'left',
  },
  {
    id: 'secure',
    stage: 'Secure',
    copy: 'Security is a design constraint: reduce the blast radius, verify the boundary, and leave an audit trail.',
    labels: ['Role-aware access', 'Threat defense', 'Safer defaults'],
    align: 'right',
  },
  {
    id: 'operate',
    stage: 'Operate',
    copy: 'A system is only useful when it continues working outside the development environment—and tells you when it cannot.',
    labels: ['Cloud deployment', 'Observability', 'Active operations'],
    align: 'left',
  },
]

function SceneBlock({ scene }: { scene: Scene }) {
  const alignment =
    scene.align === 'right' ? 'md:ml-auto md:text-right md:items-end' : 'md:items-start'

  return (
    <section
      id={scene.id}
      aria-labelledby={`${scene.id}-heading`}
      className="relative flex min-h-svh items-center"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div
          className={`js-reveal flex max-w-xl flex-col gap-6 ${alignment}`}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-coral" aria-hidden="true" />
            <span className="eyebrow text-coral">{scene.stage}</span>
          </div>

          <h2
            id={`${scene.id}-heading`}
            className="font-serif text-[clamp(1.75rem,4.5vw,3rem)] leading-tight tracking-tight text-ivory text-balance"
          >
            {scene.copy}
          </h2>

          <ul
            className={`flex flex-wrap gap-x-3 gap-y-2 ${
              scene.align === 'right' ? 'md:justify-end' : ''
            }`}
          >
            {scene.labels.map((label) => (
              <li
                key={label}
                className="tech-label rounded-full border border-line/60 bg-surface/50 px-3 py-1.5 text-muted backdrop-blur-sm"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function ScrollNarrative() {
  return (
    <div id="about">
      {SCENES.map((scene) => (
        <SceneBlock key={scene.id} scene={scene} />
      ))}
    </div>
  )
}
