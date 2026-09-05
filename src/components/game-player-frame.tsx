import { useEffect, useRef, useState } from 'react'
import { trackEvent } from '#/lib/analytics'

const copy = {
  en: {
    loading: 'Loading game player…',
    ready: 'Game player loaded.',
    guide: 'When Play Now appears: 1. Select Play Now. 2. Select Start inside the game player.',
    slow: 'The player is taking longer than expected. You can keep waiting or retry.',
    retry: 'Reload player',
    browse: 'Browse games',
  },
  'zh-CN': {
    loading: '正在加载游戏播放器……',
    ready: '游戏播放器已加载。',
    guide: '出现“立即游玩”后：1. 选择“立即游玩”。2. 在游戏内选择“开始”。',
    slow: '播放器加载时间较长，你可以继续等待或重试。',
    retry: '重新加载播放器',
    browse: '浏览其他游戏',
  },
  ja: {
    loading: 'ゲームプレーヤーを読み込み中…',
    ready: 'ゲームプレーヤーを読み込みました。',
    guide: '「今すぐプレイ」が表示されたら、1.「今すぐプレイ」を選択。2. ゲーム内で「Start」を選択してください。',
    slow: '読み込みに時間がかかっています。そのまま待つか、再試行してください。',
    retry: '再読み込み',
    browse: 'ゲームを探す',
  },
}

type Props = { src: string; title: string; gameId: string; locale: string; className: string; allow?: string; lazy?: boolean }

export function GamePlayerFrame(props: Props) {
  // Reset every attempt, timer and visible state when the game or theme changes.
  return <PlayerAttempt key={props.src} {...props} />
}

function PlayerAttempt({ src, title, gameId, locale, className, allow = 'autoplay; gamepad', lazy = false }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(!lazy)
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState<'loading' | 'ready' | 'timeout'>('loading')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const reportedLoad = useRef(false)
  const t = copy[locale as keyof typeof copy] ?? copy.en
  const lang = locale in copy ? locale : 'en'

  useEffect(() => {
    if (active) return
    if (!('IntersectionObserver' in window)) { setActive(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); observer.disconnect() }
    })
    if (container.current) observer.observe(container.current)
    return () => observer.disconnect()
  }, [active])

  useEffect(() => {
    if (!active) return
    trackEvent('player_load_start', { game_id: gameId })
    timer.current = setTimeout(() => {
      setStatus('timeout')
      trackEvent('player_load_timeout', { game_id: gameId })
    }, 20_000)
    return () => clearTimeout(timer.current)
  }, [active, attempt, gameId])

  function retry() {
    clearTimeout(timer.current)
    reportedLoad.current = false
    trackEvent('player_retry', { game_id: gameId })
    setStatus('loading')
    setAttempt((value) => value + 1)
  }

  return (
    <div ref={container} className={`relative flex flex-col bg-black text-white ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 bg-neutral px-3 py-2 text-sm">
        <div className="min-w-0">
          <span role="status">
            {status === 'loading' ? t.loading : status === 'ready' ? t.ready : t.slow}
          </span>
          <p className="mt-1 text-xs text-white/75">{t.guide}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="underline" disabled={!active} onClick={retry}>{t.retry}</button>
          <a className="underline" href={`/${lang}`} target="_top">{t.browse}</a>
        </div>
      </div>
      {active ? <iframe
        key={attempt}
        allow={`${allow}; screen-wake-lock`}
        allowFullScreen
        className="min-h-0 w-full flex-1 border-0 bg-black"
        src={src}
        title={title}
        onLoad={() => {
          clearTimeout(timer.current)
          setStatus('ready')
          if (!reportedLoad.current) {
            reportedLoad.current = true
            // A cross-origin load event does not prove that the game started.
            trackEvent('player_frame_loaded', { game_id: gameId })
          }
        }}
      /> : null}
    </div>
  )
}
