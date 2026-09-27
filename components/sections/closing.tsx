import { ContactActions } from '@/components/contact-actions'

export function Closing() {
  return (
    <section
      id="contact"
      aria-labelledby="closing-heading"
      className="relative z-10 bg-ivory text-ink"
    >
      <div className="mx-auto w-full max-w-5xl px-5 py-28 sm:px-8 md:py-40">
        <div className="js-reveal max-w-3xl">
          <h2
            id="closing-heading"
            className="font-serif text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-balance"
            style={{ color: '#13161a' }}
          >
            Good systems earn trust quietly.
          </h2>

          <p
            className="mt-8 max-w-xl text-lg leading-relaxed text-pretty"
            style={{ color: '#3a352d' }}
          >
            I am open to backend, full-stack, cloud, DevSecOps, and security-focused opportunities, plus relevant freelance projects.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="mailto:urwahsiddiqui6@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-transform duration-300 hover:-translate-y-0.5"
            >
              Email
            </a>
            <a
              id="resume"
              href="/documents/Urwah-Siddiqui-Resume.pdf"
              download="Urwah-Siddiqui-Resume.pdf"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: '#785521' }}
            >
              Download résumé PDF
              <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          <ContactActions />
          <div className="mt-8 max-w-xl border border-ink/15 bg-[#ebe5d8] p-4 font-mono text-xs" aria-label="Terminal contact prompt">
            <div className="flex items-center justify-between border-b border-ink/10 pb-3 text-xs" style={{ color: '#785521' }}>
              <span>urwah@systems:~$</span>
              <span>CONTACT_CHANNEL: OPEN</span>
            </div>
            <p className="mt-4" style={{ color: '#3a352d' }}>./start-a-conversation --scope backend,cloud,security</p>
            <a href="mailto:urwahsiddiqui6@gmail.com?subject=Let%27s%20build%20the%20next%20system" className="mt-3 inline-flex items-center gap-2 font-medium underline underline-offset-4 transition-colors hover:text-[#785521]" style={{ color: '#13161a' }}>
              Execute →
            </a>
          </div>

          <dl className="mt-16 grid gap-8 border-t pt-10 sm:grid-cols-2" style={{ borderColor: 'rgba(19,22,26,0.15)' }}>
            <div>
              <dt className="tech-label" style={{ color: '#785521' }}>
                Email
              </dt>
              <dd className="mt-2">
                <a
                  href="mailto:urwahsiddiqui6@gmail.com"
                  className="text-base underline-offset-4 hover:underline"
                  style={{ color: '#13161a' }}
                >
                  urwahsiddiqui6@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="tech-label" style={{ color: '#785521' }}>
                LinkedIn
              </dt>
              <dd className="mt-2">
                <a
                  href="https://www.linkedin.com/in/urwah-siddiqui-815356195/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base underline-offset-4 hover:underline"
                  style={{ color: '#13161a' }}
                >
                  Urwah Siddiqui
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div
        className="border-t px-5 py-8 sm:px-8"
        style={{ borderColor: 'rgba(19,22,26,0.15)' }}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 text-sm sm:flex-row sm:items-center">
          <span className="font-serif text-base" style={{ color: '#13161a' }}>
            Urwah Siddiqui
          </span>
          <span style={{ color: '#6b655c' }}>Backend Development | DevSecOps | Application Security</span>
        </div>
      </div>
    </section>
  )
}
