'use client'
import { useEffect, useRef, useState } from 'react'

/** Explicit opt-in only; audio never resumes automatically after leaving the tab. */
export function SoundToggle() {
  const audio = useRef<AudioContext | null>(null)
  const enabledRef = useRef(false)
  const lastTone = useRef(-1)
  const [enabled, setEnabled] = useState(false)
  const [unavailable, setUnavailable] = useState(false)

  function tone(frequency: number) {
    const ctx = audio.current
    if (!enabledRef.current || !ctx || ctx.state !== 'running' || document.hidden) return
    if (ctx.currentTime - lastTone.current < 0.09) return
    lastTone.current = ctx.currentTime
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.7, ctx.currentTime + 0.09)
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12)
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    oscillator.start()
    oscillator.stop(ctx.currentTime + 0.13)
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
  }

  async function toggle() {
    if (enabledRef.current) {
      enabledRef.current = false
      setEnabled(false)
      await audio.current?.suspend().catch(() => {})
      return
    }
    try {
      audio.current ??= new AudioContext()
      await audio.current.resume()
      if (audio.current.state !== 'running') throw new Error('Audio unavailable')
      enabledRef.current = true
      setEnabled(true)
      tone(660)
    } catch {
      enabledRef.current = false
      setEnabled(false)
      setUnavailable(true)
    }
  }

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a, button') && !event.target.closest('[data-sound-toggle]')) tone(480)
    }
    const onVisibility = () => {
      if (!document.hidden) return
      enabledRef.current = false
      setEnabled(false)
      void audio.current?.suspend().catch(() => {})
    }
    document.addEventListener('click', onClick)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('visibilitychange', onVisibility)
      enabledRef.current = false
      void audio.current?.close().catch(() => {})
      audio.current = null
    }
  }, [])

  return <button data-sound-toggle type="button" onClick={() => void toggle()} disabled={unavailable} aria-pressed={enabled} aria-label={unavailable ? 'Sound unavailable in this browser' : enabled ? 'Mute interface sounds' : 'Enable interface sounds'} className="sound-toggle ml-auto mr-3 min-h-11 rounded-full border border-line px-3 text-xs text-text lg:mx-4">{unavailable ? 'Sound unavailable' : enabled ? '♪ Sound on' : '♪ Sound off'}</button>
}
