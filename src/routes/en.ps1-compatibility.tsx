import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { SiteLayout } from '#/components/site-layout'
import {
  evaluateBrowserReadiness,
  type BrowserCapabilityFlags,
} from '#/lib/browser-compatibility'
import { getSeoLinksFromCanonical, getSeoOrigin } from '#/lib/seo'
import type { Locale } from '#/lib/ggemu'

const pageTitle = 'PS1 Browser Compatibility Check | POKOPIE'
const pageDescription =
  'Test whether your browser supports the WebAssembly, WebGL 2, storage, gamepad, fullscreen, and memory features used by browser-based PS1 emulation.'

const compatibilityCopy = {
  'zh-TW': { title: 'PS1 瀏覽器兼容性檢測 | POKOPIE', description: '檢測瀏覽器是否支持在線運行 PS1 遊戲所需的 WebAssembly、WebGL 2、存儲、手柄、全屏和內存功能。', hero: 'PS1 瀏覽器兼容性檢測', intro: '在加載遊戲或自己的 ROM 文件前，檢查瀏覽器是否支持 PlayStation 1 模擬器常用功能。', run: '運行兼容性檢測', browse: '瀏覽 PS1 遊戲', results: '功能檢測結果', local: '檢測結果在當前瀏覽器本地生成，不會上傳設備信息或 ROM 文件。', scoreTitle: '評分如何計算', improveTitle: '提升兼容性', scopeTitle: '檢測範圍與限制', ownTitle: '檢測自己的文件', ownDescription: '使用你依法擁有使用權的 ROM 文件，通過 POKOPIE 瀏覽器播放器進行測試。', openRom: '打開 Play My ROM', guide: ['更新到瀏覽器最新穩定版本。', '啟用硬件加速並重啟瀏覽器。', '打開遊戲播放器前連接手柄。', '性能不穩定時關閉佔用內存較多的標籤頁。'] },
  ko: { title: 'PS1 브라우저 호환성 검사 | POKOPIE', description: '브라우저에서 PS1 에뮬레이션에 필요한 WebAssembly, WebGL 2, 저장소, 게임패드, 전체 화면 및 메모리 기능을 확인합니다.', hero: 'PS1 브라우저 호환성 검사', intro: '게임이나 자신의 ROM 파일을 불러오기 전에 PlayStation 1 에뮬레이터에 필요한 브라우저 기능을 확인하세요.', run: '호환성 검사 실행', browse: 'PS1 게임 둘러보기', results: '기능 검사 결과', local: '결과는 현재 브라우저에서 생성됩니다. 기기 정보와 ROM 파일은 업로드되지 않습니다.', scoreTitle: '점수 계산 방법', improveTitle: '호환성 개선', scopeTitle: '검사 범위 및 제한', ownTitle: '내 파일 테스트', ownDescription: '사용 권한이 있는 ROM 파일을 POKOPIE 브라우저 플레이어에서 실행하세요.', openRom: '내 ROM 실행 열기', guide: ['브라우저를 최신 안정 버전으로 업데이트하세요.', '하드웨어 가속을 활성화하고 브라우저를 다시 시작하세요.', '플레이어를 열기 전에 컨트롤러를 연결하세요.', '성능이 불안정하면 메모리를 많이 사용하는 탭을 닫으세요.'] },
  en: { title: pageTitle, description: pageDescription, hero: 'PS1 Browser Compatibility Check', intro: 'Check the browser capabilities commonly used by PlayStation 1 emulators before loading a game or your own ROM file.', run: 'Run compatibility check', browse: 'Browse PS1 games', results: 'Capability results', local: 'Results are generated locally in this browser. No device details or ROM files are uploaded.', scoreTitle: 'How the score works', improveTitle: 'Improve compatibility', scopeTitle: 'Test scope and limitations', ownTitle: 'Test your own file', ownDescription: 'Use POKOPIE’s browser player with a ROM file that you are legally permitted to use.', openRom: 'Open Play My ROM', guide: ['Update to the latest stable version of your browser.', 'Enable hardware acceleration and restart the browser.', 'Connect a controller before opening the game player.', 'Close memory-heavy tabs when performance is inconsistent.'] },
  'zh-CN': { title: 'PS1 浏览器兼容性检测 | POKOPIE', description: '检测浏览器是否支持在线运行 PS1 游戏所需的 WebAssembly、WebGL 2、存储、手柄、全屏和内存功能。', hero: 'PS1 浏览器兼容性检测', intro: '在加载游戏或自己的 ROM 文件前，检查浏览器是否支持 PlayStation 1 模拟器常用功能。', run: '运行兼容性检测', browse: '浏览 PS1 游戏', results: '功能检测结果', local: '检测结果在当前浏览器本地生成，不会上传设备信息或 ROM 文件。', scoreTitle: '评分如何计算', improveTitle: '提升兼容性', scopeTitle: '检测范围与限制', ownTitle: '检测自己的文件', ownDescription: '使用你依法拥有使用权的 ROM 文件，通过 POKOPIE 浏览器播放器进行测试。', openRom: '打开 Play My ROM', guide: ['更新到浏览器最新稳定版本。', '启用硬件加速并重启浏览器。', '打开游戏播放器前连接手柄。', '性能不稳定时关闭占用内存较多的标签页。'] },
  ja: { title: 'PS1 ブラウザー互換性チェック | POKOPIE', description: 'PS1 ゲームをブラウザーで動かすための WebAssembly、WebGL 2、ストレージ、ゲームパッド、全画面、メモリ機能を確認します。', hero: 'PS1 ブラウザー互換性チェック', intro: 'ゲームや自分の ROM ファイルを読み込む前に、PlayStation 1 エミュレーターで使われるブラウザー機能を確認します。', run: '互換性をチェック', browse: 'PS1 ゲームを見る', results: '機能チェック結果', local: '結果はこのブラウザー内で生成され、端末情報や ROM ファイルはアップロードされません。', scoreTitle: 'スコアの仕組み', improveTitle: '互換性を高める', scopeTitle: 'チェック範囲と制限', ownTitle: '自分のファイルを確認', ownDescription: '使用する権利のある ROM ファイルを POKOPIE のブラウザープレイヤーで確認できます。', openRom: 'Play My ROM を開く', guide: ['ブラウザーを最新の安定版に更新する。', 'ハードウェアアクセラレーションを有効にして再起動する。', 'ゲームプレイヤーを開く前にコントローラーを接続する。', '動作が不安定なときはメモリを使うタブを閉じる。'] },
} as const

const compatibilityDetails = {
  en: {
    update: 'Last methodology update: August 2026', capability: 'Capability', priority: 'Priority', why: 'Why it matters', result: 'Result',
    score: 'WebAssembly and WebGL 2 are treated as core requirements. IndexedDB, shared memory, controller input, and fullscreen support improve persistence, performance, or usability. The check confirms API availability, not the speed of a specific game.',
    scope: 'This page performs feature detection with standard browser APIs. It does not benchmark CPU or GPU speed, verify every controller model, or guarantee that every PS1 title will run at full speed.',
    variability: 'Actual results can vary with the emulator core, game, device temperature, available memory, browser extensions, and power-saving settings. Use this report as a preflight check, then test the game you intend to play.',
  },
  'zh-TW': {
    update: '檢測方法最後更新：2026 年 8 月', capability: '功能', priority: '優先級', why: '功能用途', result: '結果',
    score: 'WebAssembly 和 WebGL 2 是核心要求。IndexedDB、共享記憶體、手把輸入和全螢幕功能可改善存檔、效能或使用體驗。這項檢測僅確認 API 是否可用，不代表特定遊戲的執行速度。',
    scope: '此頁透過標準瀏覽器 API 檢測功能，不測量 CPU 或 GPU 速度、不驗證所有手把型號，也不保證所有 PS1 遊戲都能全速執行。',
    variability: '實際結果會隨模擬器核心、遊戲、裝置溫度、可用記憶體、瀏覽器擴充功能和省電設定而異。請將此報告作為啟動前的檢查，再實測想玩的遊戲。',
  },
  ko: {
    update: '검사 방법 최종 업데이트: 2026년 8월', capability: '기능', priority: '우선순위', why: '기능 설명', result: '결과',
    score: 'WebAssembly와 WebGL 2는 필수 기능입니다. IndexedDB, 공유 메모리, 컨트롤러 입력 및 전체 화면은 저장, 성능 또는 사용성을 개선합니다. 이 검사는 API 사용 가능 여부를 확인하며 특정 게임의 실행 속도를 측정하지 않습니다.',
    scope: '이 페이지는 표준 브라우저 API로 기능을 검사합니다. CPU나 GPU 속도를 측정하거나 모든 컨트롤러 모델을 확인하지 않으며 모든 PS1 게임의 정상 속도 실행을 보장하지 않습니다.',
    variability: '실제 결과는 에뮬레이터 코어, 게임, 기기 온도, 사용 가능한 메모리, 브라우저 확장 프로그램 및 절전 설정에 따라 달라집니다. 실행 전 점검으로 활용한 뒤 원하는 게임을 직접 테스트하세요.',
  },
}

function getCompatibilityDetails(locale: Locale) {
  return locale === 'zh-TW' || locale === 'ko' ? compatibilityDetails[locale] : compatibilityDetails.en
}

type CapabilityDefinition = {
  description: string
  icon: string
  key: keyof BrowserCapabilityFlags
  label: string
  requirement: 'Core' | 'Recommended' | 'Optional'
}

type CapabilityDisplayDefinition = Omit<CapabilityDefinition, 'requirement'> & { requirement: string }

const capabilityDefinitions: Array<CapabilityDefinition> = [
  {
    key: 'wasm',
    label: 'WebAssembly',
    description: 'Runs the emulator core at near-native speed inside the browser.',
    requirement: 'Core',
    icon: 'ri-code-box-line',
  },
  {
    key: 'webgl2',
    label: 'WebGL 2',
    description: 'Provides hardware-accelerated graphics for the game display.',
    requirement: 'Core',
    icon: 'ri-cpu-line',
  },
  {
    key: 'indexedDb',
    label: 'IndexedDB',
    description: 'Allows compatible players to retain saves and local game data.',
    requirement: 'Recommended',
    icon: 'ri-database-2-line',
  },
  {
    key: 'gamepad',
    label: 'Gamepad API',
    description: 'Lets a compatible controller provide console-style input.',
    requirement: 'Optional',
    icon: 'ri-gamepad-line',
  },
  {
    key: 'fullscreen',
    label: 'Fullscreen API',
    description: 'Allows the player to expand beyond its normal page frame.',
    requirement: 'Optional',
    icon: 'ri-fullscreen-line',
  },
  {
    key: 'sharedArrayBuffer',
    label: 'Shared memory',
    description: 'Can improve performance for emulator cores that use multiple threads.',
    requirement: 'Recommended',
    icon: 'ri-stack-line',
  },
]

const localizedCapabilities: Record<Locale, Record<string, { label: string; description: string; requirement: string }>> = {
  'zh-TW': {
    wasm: { label: 'WebAssembly', description: '讓模擬器核心在瀏覽器中以接近原生的速度運行。', requirement: '核心' },
    webgl2: { label: 'WebGL 2', description: '為遊戲畫面提供硬件加速圖形。', requirement: '核心' },
    indexedDb: { label: 'IndexedDB', description: '幫助兼容的播放器保存進度和本地遊戲數據。', requirement: '推薦' },
    gamepad: { label: 'Gamepad API', description: '允許兼容手柄提供主機風格的輸入。', requirement: '可選' },
    fullscreen: { label: '全屏 API', description: '允許播放器擴展到正常頁面框架之外。', requirement: '可選' },
    sharedArrayBuffer: { label: '共享內存', description: '可為使用多線程的模擬器核心提升性能。', requirement: '推薦' },
  },
  ko: {
    wasm: { label: 'WebAssembly', description: '브라우저에서 에뮬레이터 코어를 네이티브에 가까운 속도로 실행합니다.', requirement: '필수' },
    webgl2: { label: 'WebGL 2', description: '게임 화면에 하드웨어 가속 그래픽을 제공합니다.', requirement: '필수' },
    indexedDb: { label: 'IndexedDB', description: '지원되는 플레이어에서 저장 파일과 로컬 게임 데이터를 유지합니다.', requirement: '권장' },
    gamepad: { label: '게임패드 API', description: '호환되는 컨트롤러로 게임을 조작할 수 있습니다.', requirement: '선택' },
    fullscreen: { label: '전체 화면 API', description: '플레이어를 전체 화면으로 확장할 수 있습니다.', requirement: '선택' },
    sharedArrayBuffer: { label: '공유 메모리', description: '여러 스레드를 사용하는 에뮬레이터 코어의 성능을 개선할 수 있습니다.', requirement: '권장' },
  },
  en: Object.fromEntries(capabilityDefinitions.map((item) => [item.key, item])),
  'zh-CN': {
    wasm: { label: 'WebAssembly', description: '让模拟器核心在浏览器中以接近原生的速度运行。', requirement: '核心' },
    webgl2: { label: 'WebGL 2', description: '为游戏画面提供硬件加速图形。', requirement: '核心' },
    indexedDb: { label: 'IndexedDB', description: '帮助兼容的播放器保存进度和本地游戏数据。', requirement: '推荐' },
    gamepad: { label: 'Gamepad API', description: '允许兼容手柄提供主机风格的输入。', requirement: '可选' },
    fullscreen: { label: '全屏 API', description: '允许播放器扩展到正常页面框架之外。', requirement: '可选' },
    sharedArrayBuffer: { label: '共享内存', description: '可为使用多线程的模拟器核心提升性能。', requirement: '推荐' },
  },
  ja: {
    wasm: { label: 'WebAssembly', description: 'ブラウザー内でエミュレーターコアをほぼネイティブ速度で動かします。', requirement: '必須' },
    webgl2: { label: 'WebGL 2', description: 'ゲーム画面のハードウェアアクセラレーションを提供します。', requirement: '必須' },
    indexedDb: { label: 'IndexedDB', description: '対応プレイヤーでセーブやローカルデータを保持します。', requirement: '推奨' },
    gamepad: { label: 'Gamepad API', description: '対応コントローラーでゲーム機のような入力ができます。', requirement: '任意' },
    fullscreen: { label: '全画面 API', description: 'プレイヤーを通常のページ枠より広く表示できます。', requirement: '任意' },
    sharedArrayBuffer: { label: '共有メモリ', description: 'マルチスレッド対応コアの性能を向上させる場合があります。', requirement: '推奨' },
  },
}

export const Route = createFileRoute('/en/ps1-compatibility')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData }) => {
    return buildPs1CompatibilityHead(loaderData, 'en')
  },
  component: () => <Ps1CompatibilityPage locale="en" />,
})

export function buildPs1CompatibilityHead(origin: string | undefined, locale: Locale) {
    const path = `/${locale}/ps1-compatibility`
    const canonicalUrl = origin ? `${origin}${path}` : path
    const copy = compatibilityCopy[locale]
    return {
      links: getSeoLinksFromCanonical(canonicalUrl, ['zh-CN', 'zh-TW', 'en', 'ja', 'ko']),
      meta: [
        { title: copy.title },
        { name: 'description', content: copy.description },
        {
          name: 'keywords',
          content:
            'PS1 browser compatibility, browser emulator test, WebAssembly emulator, WebGL 2 test, online PS1 emulator requirements',
        },
        { property: 'og:title', content: copy.title },
        { property: 'og:description', content: copy.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: canonicalUrl },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: copy.title },
        { name: 'twitter:description', content: copy.description },
      ],
    }
}

export function Ps1CompatibilityPage({ locale = 'en' }: { locale?: Locale }) {
  const copy = compatibilityCopy[locale]
  const details = getCompatibilityDetails(locale)
  const capabilitiesCopy = localizedCapabilities[locale]
  const [capabilities, setCapabilities] = useState<BrowserCapabilityFlags | null>(null)

  function runCheck() {
    setCapabilities(detectBrowserCapabilities())
  }

  useEffect(() => {
    runCheck()
  }, [])

  const readiness = capabilities
    ? evaluateBrowserReadiness(capabilities)
    : null

  return (
    <SiteLayout
      locale={locale}
      localePaths={{
        'zh-TW': '/zh-TW/ps1-compatibility',
        ko: '/ko/ps1-compatibility',
        'zh-CN': '/zh-CN/ps1-compatibility',
        en: '/en/ps1-compatibility',
        ja: '/ja/ps1-compatibility',
      }}
    >
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.2),transparent_28rem),radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30rem)] bg-neutral text-neutral-content">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">POKOPIE Lab</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
              {copy.hero}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              {copy.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="btn btn-primary" onClick={runCheck} type="button">
                <i aria-hidden="true" className="ri-pulse-line" />
                {copy.run}
              </button>
              <Link className="btn border-white/25 bg-white/5 text-white hover:border-white/45 hover:bg-white/10" to="/$locale/ps1-games" params={{ locale }}>
                {copy.browse}
                <i aria-hidden="true" className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>

          <ReadinessSummary locale={locale} readiness={readiness} />
        </div>
      </section>

      <section className="border-b border-white/10 bg-neutral text-neutral-content">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-black text-white">{copy.results}</h2>
              <p className="mt-2 max-w-2xl leading-7 text-white/65">
                {copy.local}
              </p>
            </div>
            <p className="text-sm text-white/45">{details.update}</p>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-xl">
            <div className="hidden grid-cols-[minmax(12rem,0.8fr)_7rem_minmax(18rem,1.4fr)_9rem] gap-4 border-b border-white/10 bg-white/[0.07] px-5 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/65 md:grid">
              <span>{details.capability}</span>
              <span>{details.priority}</span>
              <span>{details.why}</span>
              <span>{details.result}</span>
            </div>
            <div className="divide-y divide-white/10">
              {capabilityDefinitions.map((definition) => (
                <CapabilityRow
                  available={capabilities?.[definition.key]}
                  definition={{ ...definition, ...capabilitiesCopy[definition.key] }}
                  locale={locale}
                  key={definition.key}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20 text-neutral-content">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article>
            <h2 className="text-3xl font-semibold text-white">{copy.scoreTitle}</h2>
            <p className="mt-5 leading-8 text-white/70">
              {details.score}
            </p>
          </article>
          <article>
            <h2 className="text-3xl font-semibold text-white">{copy.improveTitle}</h2>
            <ul className="mt-5 space-y-3 text-white/70">
              {copy.guide.map((item) => <GuideItem key={item}>{item}</GuideItem>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-neutral text-neutral-content">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:px-8">
          <article className="max-w-3xl">
            <h2 className="text-3xl font-black text-white">{copy.scopeTitle}</h2>
            <div className="mt-5 space-y-4 leading-8 text-white/70">
              <p>
                {details.scope}
              </p>
              <p>
                {details.variability}
              </p>
            </div>
          </article>

          <aside className="rounded-xl border border-white/10 border-l-4 border-l-primary bg-white/[0.05] p-5 shadow-lg">
            <h2 className="text-lg font-bold text-white">{copy.ownTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-white/65">
              {copy.ownDescription}
            </p>
            <Link
              className="btn btn-primary btn-sm mt-5"
              reloadDocument
              params={{ locale }}
              to="/$locale/play-my-rom"
            >
              {copy.openRom}
              <i aria-hidden="true" className="ri-arrow-right-line" />
            </Link>
          </aside>
        </div>
      </section>
    </SiteLayout>
  )
}

function ReadinessSummary({
  readiness,
  locale = 'en',
}: {
  readiness: ReturnType<typeof evaluateBrowserReadiness> | null
  locale?: Locale
}) {
  const labels = locale === 'ko' ? { checking: '검사 중', limited: '일부 지원', ready: '준비 완료', notReady: '지원되지 않음', browser: '브라우저 준비 상태', score: '기능 검사 결과입니다. 실제 성능은 기기와 에뮬레이터에 따라 달라집니다.' } : locale === 'zh-TW' ? { checking: '檢測中', limited: '部分支持', ready: '可運行', notReady: '暫不支持', browser: '瀏覽器就緒度', score: '僅供參考：實際性能取決於設備與模擬器。' } : locale === 'zh-CN'
    ? { checking: '检测中', limited: '部分支持', ready: '可运行', notReady: '暂不支持', browser: '浏览器就绪度', score: '仅供参考：实际性能取决于设备与模拟器。' }
    : locale === 'ja'
      ? { checking: '確認中', limited: '一部対応', ready: '準備完了', notReady: '未対応', browser: 'ブラウザーの準備状況', score: '機能チェックのみです。実際の性能は端末とエミュレーターに左右されます。' }
      : { checking: 'Checking', limited: 'Limited', ready: 'Ready', notReady: 'Not ready', browser: 'Browser readiness', score: 'A capability check only. Game performance still depends on the device and emulator.' }
  const label = readiness?.label === 'Ready' ? labels.ready : readiness?.label === 'Not ready' ? labels.notReady : readiness?.label === 'Limited' ? labels.limited : labels.checking
  const tone =
    readiness?.label === 'Ready'
      ? 'text-success'
      : readiness?.label === 'Not ready'
        ? 'text-error'
        : 'text-warning'

  return (
    <aside aria-live="polite" className="rounded-xl border border-white/10 border-l-4 border-l-primary bg-black/20 p-6 shadow-xl backdrop-blur-sm">
      <p className="text-sm font-semibold text-white/55">{labels.browser}</p>
      <div className="mt-2 flex items-end justify-between gap-4">
        <strong className={`text-3xl ${tone}`}>{label}</strong>
        <span className="text-2xl font-bold text-white">{readiness?.score ?? '--'}/100</span>
      </div>
      <progress
        aria-label={labels.browser}
        className="progress progress-primary mt-5 w-full"
        max="100"
        value={readiness?.score ?? 0}
      />
      <p className="mt-3 text-xs leading-5 text-white/55">
        {labels.score}
      </p>
    </aside>
  )
}

function CapabilityRow({
  available,
  definition,
  locale = 'en',
}: {
  available: boolean | undefined
  definition: CapabilityDisplayDefinition
  locale?: Locale
}) {
  const priority = getCompatibilityDetails(locale).priority
  const status = locale === 'ko' ? { checking: '검사 중', available: '지원됨', unavailable: '지원되지 않음' } : locale === 'zh-TW' ? { checking: '檢測中', available: '支持', unavailable: '不支持' } : locale === 'zh-CN'
    ? { checking: '检测中', available: '支持', unavailable: '不支持' }
    : locale === 'ja'
      ? { checking: '確認中', available: '対応', unavailable: '未対応' }
      : { checking: 'Checking', available: 'Available', unavailable: 'Unavailable' }
  return (
    <div className="grid gap-3 px-5 py-5 md:grid-cols-[minmax(12rem,0.8fr)_7rem_minmax(18rem,1.4fr)_9rem] md:items-center md:gap-4">
      <div className="flex items-center gap-3 text-[0.95rem] font-bold text-white">
        <i aria-hidden="true" className={`${definition.icon} text-[1.35rem] text-primary`} />
        {definition.label}
      </div>
      <div className="flex flex-wrap items-center gap-2 md:hidden">
        <span className="rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-xs font-bold text-white/75">
          <span className="text-white/45">{priority} · </span>
          {definition.requirement}
        </span>
        <CapabilityStatus available={available} status={status} />
      </div>
      <span className="hidden w-fit rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-xs font-bold text-white/75 md:inline-flex">
        <span className="sr-only">{priority}: </span>
        {definition.requirement}
      </span>
      <p className="text-sm leading-6 text-white/75">{definition.description}</p>
      <div className="hidden md:block">
        <CapabilityStatus available={available} status={status} />
      </div>
    </div>
  )
}

function CapabilityStatus({
  available,
  status,
}: {
  available: boolean | undefined
  status: { checking: string; available: string; unavailable: string }
}) {
  return (
    <span
      className={`w-fit inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm font-bold ${
        available === undefined
          ? 'border-white/15 bg-white/[0.06] text-white/75'
          : available
            ? 'border-success/35 bg-success/15 text-success'
            : 'border-error/35 bg-error/15 text-error'
      }`}
    >
      <i
        aria-hidden="true"
        className={
          available === undefined
            ? 'ri-loader-4-line animate-spin'
            : available
              ? 'ri-checkbox-circle-fill'
              : 'ri-close-circle-fill'
        }
      />
      {available === undefined ? status.checking : available ? status.available : status.unavailable}
    </span>
  )
}

function GuideItem({ children }: { children: string }) {
  return (
    <li className="flex gap-3">
      <i aria-hidden="true" className="ri-check-line mt-1 text-primary" />
      <span>{children}</span>
    </li>
  )
}

function detectBrowserCapabilities(): BrowserCapabilityFlags {
  const canvas = document.createElement('canvas')
  const webgl2 = Boolean(canvas.getContext('webgl2'))

  return {
    wasm: typeof WebAssembly === 'object',
    webgl2,
    indexedDb: 'indexedDB' in window,
    gamepad: 'getGamepads' in navigator,
    fullscreen: Boolean(document.fullscreenEnabled),
    sharedArrayBuffer:
      window.crossOriginIsolated && typeof SharedArrayBuffer === 'function',
  }
}
