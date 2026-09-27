'use client'

import { FormEvent, useState } from 'react'
import { BriefcaseBusiness, GitBranch, Mail } from 'lucide-react'

export default function TerminalFooter() {
  const [command, setCommand] = useState('')
  const [result, setResult] = useState<'whoami' | 'contact' | 'unknown' | null>(null)
  function submit(event: FormEvent) {
    event.preventDefault()
    const value = command.trim().toLowerCase()
    if (value === 'ls projects') { document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); setResult(null) }
    else if (value === 'whoami') setResult('whoami')
    else if (value === 'cat contact.txt') setResult('contact')
    else setResult('unknown')
    setCommand('')
  }
  return (
    <footer id="contact" className="terminal-footer">
      <div className="terminal-shell"><form onSubmit={submit}><label htmlFor="terminal-command">urwah@systems:~$</label><input id="terminal-command" value={command} onChange={(event) => setCommand(event.target.value)} autoComplete="off" spellCheck={false} aria-describedby="terminal-help" /><span className="blink" aria-hidden="true">_</span></form>
        <span id="terminal-help" className="terminal-help">whoami · ls projects · cat contact.txt</span>
        <div className="terminal-result" aria-live="polite">{result === 'whoami' && 'Backend DevSecOps Engineer'}{result === 'unknown' && 'command not found'}{result === 'contact' && <div className="contact-icons"><a href="mailto:urwahsiddiqui6@gmail.com" aria-label="Email Urwah"><Mail aria-hidden="true" /></a><a href="https://github.com/UrwahSiddiqui" target="_blank" rel="noreferrer" aria-label="Urwah on GitHub"><GitBranch aria-hidden="true" /></a><a href="https://www.linkedin.com/in/urwah-siddiqui-815356195/" target="_blank" rel="noreferrer" aria-label="Urwah on LinkedIn"><BriefcaseBusiness aria-hidden="true" /></a></div>}</div>
      </div>
      <div className="footer-identity"><strong>urwah.systems<span className="blink">_</span></strong><a href="mailto:urwahsiddiqui6@gmail.com">urwahsiddiqui6@gmail.com</a><a href="https://www.linkedin.com/in/urwah-siddiqui-815356195/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
    </footer>
  )
}
