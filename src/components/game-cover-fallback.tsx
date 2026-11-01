import type { Locale } from '#/lib/ggemu'
import { getRetroCoverFallbackLabel } from '#/lib/locale-labels'

export function GameCoverFallback({
  className = 'absolute inset-0',
  compact = false,
  lang,
  name,
  platform,
}: {
  className?: string
  compact?: boolean
  lang: Locale
  name?: string
  platform?: string
}) {
  const title = name?.trim() || getRetroCoverFallbackLabel(lang)

  return (
    <div
      aria-label={`${title} cover placeholder`}
      className={`relative flex h-full w-full flex-col overflow-hidden bg-slate-950 text-white ${compact ? 'p-2' : 'p-5 sm:p-7'} ${className}`}
      role="img"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.34),transparent_30%),radial-gradient(circle_at_85%_86%,rgba(168,85,247,0.30),transparent_32%),linear-gradient(145deg,#0f172a,#111827_48%,#020617)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative flex items-center justify-between gap-2">
        <span className={`${compact ? 'text-[8px]' : 'text-[10px] sm:text-xs'} font-black uppercase tracking-[0.18em] text-cyan-300`}>POKOPIE</span>
        {platform ? <span className={`${compact ? 'max-w-[70%] text-[8px]' : 'max-w-[65%] text-[10px] sm:text-xs'} truncate rounded-full border border-white/20 bg-white/10 px-2 py-1 font-semibold text-white/70`}>{platform}</span> : null}
      </div>
      <div className="relative my-auto min-w-0 py-2">
        <i aria-hidden="true" className={`ri-gamepad-line ${compact ? 'text-lg' : 'text-3xl sm:text-5xl'} text-fuchsia-300`} />
        {!compact ? <p className="mt-3 line-clamp-3 text-xl font-black leading-tight text-white sm:text-3xl">{title}</p> : null}
      </div>
      {!compact ? <p className="relative text-[10px] font-bold uppercase tracking-[0.18em] text-white/45 sm:text-xs">Game guide</p> : null}
    </div>
  )
}
