'use client'

import { useState } from 'react'

const email = 'urwahsiddiqui6@gmail.com'
export function ContactActions() {
  const [feedback, setFeedback] = useState('')
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setFeedback('Email copied.')
    } catch {
      setFeedback('Could not copy automatically. Select the email address below and copy it manually.')
    }
  }
  return (
    <div className="mt-6 text-sm" aria-label="Contact links">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <button type="button" onClick={copyEmail} className="min-h-11 py-2 underline underline-offset-4" style={{ color: '#13161a' }}>Copy email</button>
        <a href="https://www.linkedin.com/in/urwah-siddiqui-815356195/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center py-2 underline underline-offset-4" style={{ color: '#13161a' }}>LinkedIn ↗</a>
        <a href="https://github.com/UrwahSiddiqui" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center py-2 underline underline-offset-4" style={{ color: '#13161a' }}>GitHub ↗</a>
      </div>
      <p role="status" aria-atomic="true" className="mt-2" style={{ color: '#3a352d' }}>{feedback}</p>
      <p className="mt-2 select-text break-all" style={{ color: '#13161a' }}>{email}</p>
    </div>
  )
}
