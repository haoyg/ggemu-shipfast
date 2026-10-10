import { useEffect, useRef, useState } from 'react'
import { n64TouchControls } from '#/lib/n64-touch-controls'
import { trackEvent } from '#/lib/analytics'

const copy = {
  'zh-TW': {
    loading: '正在加載遊戲播放器……',
    loaded: '播放器頁面已打開，遊戲進度請查看播放器內的提示。',
    ready: '遊戲播放器已加載。',
    guide: '出現“立即遊玩”後：1. 選擇“立即遊玩”。2. 在遊戲內選擇“開始”。',
    slow: '遊戲播放器加載時間超出預期。請重新加載播放器或瀏覽其他遊戲。',
    retry: '重新加載播放器',
    browse: '瀏覽其他遊戲',
    fullscreen: '全屏',
    exitFullscreen: '退出全屏',
    backToGame: '返回遊戲詳情',
    controlsLabel: '操作與存檔',
    controls: '按鍵和存檔設置可在遊戲播放器菜單中調整。',
    error: '遊戲播放器加載失敗，請重試。',
    unsupported: '該遊戲目前暫不支持在瀏覽器中游玩。',
  },
  ko: {
    loading: '게임 플레이어 불러오는 중…', loaded: '플레이어 페이지가 열렸습니다. 게임 진행 상태는 플레이어 안에서 확인하세요.', ready: '게임 플레이어를 불러왔습니다.',
    guide: 'Play Now가 나타나면 선택한 다음 플레이어 안의 Start를 선택하세요.', slow: '플레이어 로딩이 오래 걸립니다. 다시 불러오거나 다른 게임을 선택하세요.',
    retry: '플레이어 다시 불러오기', browse: '게임 둘러보기', fullscreen: '전체 화면', exitFullscreen: '전체 화면 종료', backToGame: '게임 상세 정보',
    controlsLabel: '조작 및 저장', controls: '조작과 저장 설정은 플레이어 메뉴에서 확인할 수 있습니다.', error: '플레이어를 불러오지 못했습니다. 다시 시도하세요.', unsupported: '현재 브라우저에서 플레이할 수 없는 게임입니다.',
  },
  en: {
    loading: 'Loading game player…',
    loaded: 'Player page opened. Game progress is shown inside the player.',
    ready: 'Game player loaded.',
    guide: 'When Play Now appears: 1. Select Play Now. 2. Select Start inside the game player.',
    slow: 'The game player is taking longer than expected to load. Reload it or browse another game.',
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
    loaded: '播放器页面已打开，游戏进度请查看播放器内的提示。',
    ready: '游戏播放器已加载。',
    guide: '出现“立即游玩”后：1. 选择“立即游玩”。2. 在游戏内选择“开始”。',
    slow: '游戏播放器加载时间超出预期。请重新加载播放器或浏览其他游戏。',
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
    loaded: 'プレーヤーを開きました。ゲームの進行状況はプレーヤー内で確認してください。',
    ready: 'ゲームプレーヤーを読み込みました。',
    guide: '「今すぐプレイ」が表示されたら、1.「今すぐプレイ」を選択。2. ゲーム内で「Start」を選択してください。',
    slow: 'ゲームプレーヤーの読み込みに時間がかかっています。再読み込みするか、別のゲームを探してください。',
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
  platform?: string
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

function PlayerAttempt({ src, platform, title, gameId, locale, className, allow = 'autoplay; gamepad', lazy = false, backHref, unavailable = false }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(!lazy)
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState<'loading' | 'loaded' | 'ready' | 'timeout' | 'error' | 'unsupported'>(unavailable ? 'unsupported' : 'loading')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const reportedLoad = useRef(false)
  const reportedReady = useRef(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const t = copy[locale as keyof typeof copy] ?? copy.en
  const lang = locale in copy ? locale : 'en'
  const playerOrigin = getPlayerOrigin(src)

  useEffect(() => {
    if (!lazy) setActive(true)
  }, [lazy])

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
    if (!active || unavailable) return

    function handlePlayerMessage(event: MessageEvent) {
      if (event.source !== iframeRef.current?.contentWindow) return
      if (playerOrigin && event.origin !== playerOrigin) return
      const message = event.data
      if (message?.type === 'ggemu:embed-ready' && platform === 'Nintendo 64'
        && Array.isArray(message.payload?.capabilities)
        && message.payload.capabilities.includes('defaultGameControl')) {
        iframeRef.current?.contentWindow?.postMessage({
          type: 'ggemu:set-overrides',
          payload: { defaultGameControl: n64TouchControls },
        }, playerOrigin)
      }
      if (message === 'game-ready' || message?.type === 'game-ready' || message?.type === 'player-ready') {
        clearTimeout(timer.current)
        setStatus('ready')
        if (!reportedReady.current) {
          reportedReady.current = true
          trackEvent('player_ready', { game_id: gameId })
        }
      }
    }

    window.addEventListener('message', handlePlayerMessage)
    return () => window.removeEventListener('message', handlePlayerMessage)
  }, [active, attempt, gameId, platform, playerOrigin, unavailable])

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
    reportedReady.current = false
    trackEvent('player_retry', { game_id: gameId })
    setStatus('loading')
    setAttempt((value) => value + 1)
  }

  return (
    <div data-theme="dark" ref={container} className={`relative flex flex-col bg-black text-white ${className}`}>
      <div className="player-toolbar flex flex-wrap items-center justify-between gap-2 bg-neutral px-3 py-2 text-sm">
        <div className="min-w-0">
          <span className="block truncate font-semibold text-white">{title}</span>
          <span
            className={`player-status ${
              status === 'error' || status === 'unsupported' ? 'font-semibold text-error' : status === 'timeout' ? 'font-semibold text-warning' : ''
            }`}
            aria-live="polite"
            role="status"
          >
            {status === 'loading' ? t.loading : status === 'loaded' ? t.loaded : status === 'ready' ? t.ready : status === 'timeout' ? t.slow : status === 'error' ? t.error : t.unsupported}
          </span>
          <details className="mt-1 text-xs text-white/60">
            <summary className="cursor-pointer underline underline-offset-2">{t.controlsLabel}</summary>
            <p className="mt-1">{t.controls}</p>
            <p className="player-guide mt-1">{t.guide}</p>
          </details>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="min-h-10 underline sm:min-h-8" disabled={!active || unavailable} onClick={retry}>{t.retry}</button>
          {backHref ? <a className="inline-flex min-h-10 items-center underline sm:min-h-8" href={backHref} target="_top">{t.backToGame}</a> : null}
          <a className="inline-flex min-h-10 items-center underline sm:min-h-8" href={`/${lang}`} target="_top">{t.browse}</a>
          <button
            aria-label={isFullscreen ? t.exitFullscreen : t.fullscreen}
            className="btn btn-sm min-h-10 border-white/20 bg-white/10 text-white hover:bg-white/20 sm:btn-xs sm:min-h-8"
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
            <svg aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={isFullscreen
                ? 'M8 3v5H3m13-5v5h5M3 16h5v5m13-5h-5v5'
                : 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5'} />
            </svg>
            <span className="hidden sm:inline">{isFullscreen ? t.exitFullscreen : t.fullscreen}</span>
          </button>
        </div>
      </div>
      {status === 'unsupported' ? (
        <div aria-live="polite" className="grid flex-1 place-items-center bg-black px-6 text-center" role="status">
          <div className="max-w-md">
            <i aria-hidden="true" className="ri-gamepad-line text-4xl text-white/35" />
            <p className="mt-3 text-sm leading-6 text-white/70">{t.unsupported}</p>
          </div>
        </div>
      ) : null}
      {status === 'error' ? (
        <div aria-live="assertive" className="grid flex-1 place-items-center bg-black px-6 text-center" role="alert">
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
        ref={iframeRef}
        allow={`${allow}; screen-wake-lock`}
        allowFullScreen
        className="min-h-0 w-full flex-1 border-0 bg-black"
        src={src}
        title={title}
        onLoad={() => {
          clearTimeout(timer.current)
          if (!reportedReady.current) {
            setStatus('loaded')
          }
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

function getPlayerOrigin(src: string) {
  try {
    return new URL(src).origin
  } catch {
    return ''
  }
}
