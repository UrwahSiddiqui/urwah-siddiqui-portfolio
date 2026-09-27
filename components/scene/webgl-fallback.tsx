/**
 * Purely CSS composition shown before WebGL loads and retained if WebGL is
 * unavailable. It mirrors the scene's mood (warm coral core in dark ink space)
 * so the hero never appears empty or broken.
 */
export function WebglFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <div className="absolute inset-0 animate-fallback-drift">
        {/* Warm core glow */}
        <div
          className="absolute left-[62%] top-1/2 h-[42vmax] w-[42vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at center, rgba(237,146,111,0.28), rgba(217,134,100,0.10) 45%, transparent 70%)',
          }}
        />
        <div
          className="absolute left-[62%] top-1/2 h-[16vmax] w-[16vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(circle at center, rgba(120,85,33,0.35), transparent 70%)',
          }}
        />
      </div>
      {/* Faint ring to imply the shell */}
      <div className="absolute left-[62%] top-1/2 h-[26vmax] w-[26vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-coral/15" />
      <div className="absolute left-[62%] top-1/2 h-[34vmax] w-[34vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/25" />
      {/* Vignette to keep hero text legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(19,22,26,0.96) 0%, rgba(19,22,26,0.6) 38%, rgba(19,22,26,0.15) 70%, rgba(19,22,26,0.4) 100%)',
        }}
      />
    </div>
  )
}
