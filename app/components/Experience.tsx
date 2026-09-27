const tags = ['Docker', 'Linux', 'Nginx', 'Jenkins', 'PostgreSQL', 'Prometheus', 'Grafana', 'Alertmanager']

export default function Experience() {
  return (
    <section id="experience" className="content-section" aria-labelledby="experience-title">
      <h2 id="experience-title" className="eyebrow">02 / EXPERIENCE</h2>
      <article className="experience-card">
        <header><div><strong>DevOps &amp; Cybersecurity Engineer</strong><span>Zyne Ventures</span></div><div><span>Karachi</span><time dateTime="2026-06/2026-08">Jun–Aug 2026</time></div></header>
        <ul>
          <li><b>Hardened 4 prod/staging</b><span>Linux, Nginx, SSH, UFW, HTTPS</span></li>
          <li><b>Migrated SQLite/MySQL → Postgres</b><span>with reconciliation</span></li>
          <li><b>Built monitoring + SSL-expiry alerts</b><span>Prometheus, Grafana, Alertmanager, Node Exporter</span></li>
          <li><b>Restored service during incidents</b><span>log triage, SOP and Jira handover</span></li>
        </ul>
        <div className="tag-row" role="list" aria-label="Technologies">{tags.map((tag) => <span role="listitem" key={tag}>{tag}</span>)}</div>
      </article>
    </section>
  )
}
