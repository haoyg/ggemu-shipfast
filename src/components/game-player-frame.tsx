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
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit fullscreen',
    backToGame: 'Game details',
    controlsLabel: 'Controls',
    controls: 'Controls and saves are available in the game player menu.',
    error: 'The game player failed to load. Please retry.',
    unsupported: 'This game is not currently available to play in the browser.',
  },
  'zh-CN': {
    loading: '正在加载游戏播放器……',
    ready: '游戏播放器已加载。',
    guide: '出现“立即游玩”后：1. 选择“立即游玩”。2. 在游戏内选择“开始”。',
    slow: '播放器加载时间较长，你可以继续等待或重试。',
    retry: '重新加载播放器',
    browse: '浏览其他游戏',
    fullscreen: '全屏',
    exitFullscreen: '退出全屏',
    backToGame: '返回游戏详情',
    controlsLabel: '操作与存档',
    controls: '按键和存档设置可在游戏播放器菜单中调整。',
    error: '游戏播放器加载失败，请重试。',
    unsupported: '该游戏目前暂不支持在浏览器中游玩。',
  },
  ja: {
    loading: 'ゲームプレーヤーを読み込み中…',
    ready: 'ゲームプレーヤーを読み込みました。',
    guide: '「今すぐプレイ」が表示されたら、1.「今すぐプレイ」を選択。2. ゲーム内で「Start」を選択してください。',
    slow: '読み込みに時間がかかっています。そのまま待つか、再試行してください。',
    retry: '再読み込み',
    browse: 'ゲームを探す',
    fullscreen: '全画面',
    exitFullscreen: '全画面を終了',
    backToGame: 'ゲーム詳細に戻る',
    controlsLabel: '操作とセーブ',
    controls: '操作とセーブ設定はゲームプレーヤーのメニューから変更できます。',
    error: 'ゲームプレーヤーの読み込みに失敗しました。再試行してください。',
    unsupported: 'このゲームは現在ブラウザーでプレイできません。',
  },
}

type Props = {
  src: string
  title: string
  gameId: string
  locale: string
  className: string
  allow?: string
  lazy?: boolean
  backHref?: string
  unavailable?: boolean
}

export function GamePlayerFrame(props: Props) {
  // Reset every attempt, timer and visible state when the game or theme changes.
  return <PlayerAttempt key={props.src} {...props} />
}

function PlayerAttempt({ src, title, gameId, locale, className, allow = 'autoplay; gamepad', lazy = false, backHref, unavailable = false }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(!lazy)
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState<'loading' | 'ready' | 'timeout' | 'error' | 'unsupported'>(unavailable ? 'unsupported' : 'loading')
  const [isFullscreen, setIsFullscreen] = useState(false)
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
    if (!active || unavailable) return
    trackEvent('player_load_start', { game_id: gameId })
    timer.current = setTimeout(() => {
      setStatus('timeout')
      trackEvent('player_load_timeout', { game_id: gameId })
    }, 20_000)
    return () => clearTimeout(timer.current)
  }, [active, attempt, gameId, unavailable])

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === container.current)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  function retry() {
    if (unavailable) return
    clearTimeout(timer.current)
    reportedLoad.current = false
    trackEvent('player_retry', { game_id: gameId })
    setStatus('loading')
    setAttempt((value) => value + 1)
  }

  return (
    <div ref={container} className={`relative flex flex-col bg-black text-white ${className}`}>
      <div className="player-toolbar flex flex-wrap items-center justify-between gap-2 bg-neutral px-3 py-2 text-sm">
        <div className="min-w-0">
          <span className="block truncate font-semibold text-white">{title}</span>
          <span
            className={`player-status ${
              status === 'error' || status === 'unsupported' ? 'font-semibold text-error' : status === 'timeout' ? 'font-semibold text-warning' : ''
            }`}
            role="status"
          >
            {status === 'loading' ? t.loading : status === 'ready' ? t.ready : status === 'timeout' ? t.slow : status === 'error' ? t.error : t.unsupported}
          </span>
          <p className="player-guide mt-1 text-xs text-white/75">{t.guide}</p>
          <details className="mt-1 text-xs text-white/60">
            <summary className="cursor-pointer underline underline-offset-2">{t.controlsLabel}</summary>
            <p className="mt-1">{t.controls}</p>
          </details>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="underline" disabled={!active || unavailable} onClick={retry}>{t.retry}</button>
          {backHref ? <a className="underline" href={backHref} target="_top">{t.backToGame}</a> : null}
          <a className="underline" href={`/${lang}`} target="_top">{t.browse}</a>
          <button
            aria-label={isFullscreen ? t.exitFullscreen : t.fullscreen}
            className="btn btn-xs border-white/20 bg-white/10 text-white hover:bg-white/20"
            disabled={!active}
            onClick={() => {
              if (document.fullscreenElement) {
                void document.exitFullscreen()
              } else {
                void container.current?.requestFullscreen()
              }
            }}
            type="button"
          >
            <i aria-hidden="true" className={isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'} />
            <span className="hidden sm:inline">{isFullscreen ? t.exitFullscreen : t.fullscreen}</span>
          </button>
        </div>
      </div>
      {status === 'unsupported' ? (
        <div className="grid flex-1 place-items-center bg-black px-6 text-center">
          <div className="max-w-md">
            <i aria-hidden="true" className="ri-gamepad-line text-4xl text-white/35" />
            <p className="mt-3 text-sm leading-6 text-white/70">{t.unsupported}</p>
          </div>
        </div>
      ) : null}
      {status === 'error' ? (
        <div className="grid flex-1 place-items-center bg-black px-6 text-center">
          <div className="max-w-md">
            <i aria-hidden="true" className="ri-error-warning-line text-4xl text-error" />
            <p className="mt-3 text-sm leading-6 text-white/70">{t.error}</p>
            <button className="btn btn-primary btn-sm mt-4" onClick={retry} type="button">
              {t.retry}
            </button>
          </div>
        </div>
      ) : null}
      {active && !unavailable && status !== 'error' ? <iframe
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
        onError={() => {
          clearTimeout(timer.current)
          setStatus('error')
        }}
      /> : null}
    </div>
  )
}
