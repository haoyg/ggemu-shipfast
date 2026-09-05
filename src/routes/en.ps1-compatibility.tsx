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
  en: { title: pageTitle, description: pageDescription, hero: 'PS1 Browser Compatibility Check', intro: 'Check the browser capabilities commonly used by PlayStation 1 emulators before loading a game or your own ROM file.', run: 'Run compatibility check', browse: 'Browse PS1 games', results: 'Capability results', local: 'Results are generated locally in this browser. No device details or ROM files are uploaded.', scoreTitle: 'How the score works', improveTitle: 'Improve compatibility', scopeTitle: 'Test scope and limitations', ownTitle: 'Test your own file', ownDescription: 'Use POKOPIE’s browser player with a ROM file that you are legally permitted to use.', openRom: 'Open Play My ROM', guide: ['Update to the latest stable version of your browser.', 'Enable hardware acceleration and restart the browser.', 'Connect a controller before opening the game player.', 'Close memory-heavy tabs when performance is inconsistent.'] },
  'zh-CN': { title: 'PS1 浏览器兼容性检测 | POKOPIE', description: '检测浏览器是否支持在线运行 PS1 游戏所需的 WebAssembly、WebGL 2、存储、手柄、全屏和内存功能。', hero: 'PS1 浏览器兼容性检测', intro: '在加载游戏或自己的 ROM 文件前，检查浏览器是否支持 PlayStation 1 模拟器常用功能。', run: '运行兼容性检测', browse: '浏览 PS1 游戏', results: '功能检测结果', local: '检测结果在当前浏览器本地生成，不会上传设备信息或 ROM 文件。', scoreTitle: '评分如何计算', improveTitle: '提升兼容性', scopeTitle: '检测范围与限制', ownTitle: '检测自己的文件', ownDescription: '使用你依法拥有使用权的 ROM 文件，通过 POKOPIE 浏览器播放器进行测试。', openRom: '打开 Play My ROM', guide: ['更新到浏览器最新稳定版本。', '启用硬件加速并重启浏览器。', '打开游戏播放器前连接手柄。', '性能不稳定时关闭占用内存较多的标签页。'] },
  ja: { title: 'PS1 ブラウザー互換性チェック | POKOPIE', description: 'PS1 ゲームをブラウザーで動かすための WebAssembly、WebGL 2、ストレージ、ゲームパッド、全画面、メモリ機能を確認します。', hero: 'PS1 ブラウザー互換性チェック', intro: 'ゲームや自分の ROM ファイルを読み込む前に、PlayStation 1 エミュレーターで使われるブラウザー機能を確認します。', run: '互換性をチェック', browse: 'PS1 ゲームを見る', results: '機能チェック結果', local: '結果はこのブラウザー内で生成され、端末情報や ROM ファイルはアップロードされません。', scoreTitle: 'スコアの仕組み', improveTitle: '互換性を高める', scopeTitle: 'チェック範囲と制限', ownTitle: '自分のファイルを確認', ownDescription: '使用する権利のある ROM ファイルを POKOPIE のブラウザープレイヤーで確認できます。', openRom: 'Play My ROM を開く', guide: ['ブラウザーを最新の安定版に更新する。', 'ハードウェアアクセラレーションを有効にして再起動する。', 'ゲームプレイヤーを開く前にコントローラーを接続する。', '動作が不安定なときはメモリを使うタブを閉じる。'] },
} as const

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
      links: getSeoLinksFromCanonical(canonicalUrl, ['zh-CN', 'en', 'ja']),
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
      localePaths={{ 'zh-CN': `/${locale === 'zh-CN' ? 'zh-CN' : 'zh-CN'}/ps1-compatibility`, en: '/en/ps1-compatibility', ja: '/ja/ps1-compatibility' }}
    >
      <section className="border-b border-base-300 bg-base-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {copy.hero}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-base-content/70">
              {copy.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="btn btn-primary" onClick={runCheck} type="button">
                <i aria-hidden="true" className="ri-pulse-line" />
                {copy.run}
              </button>
              <Link className="btn btn-outline" to="/en/ps1-games">
                {copy.browse}
                <i aria-hidden="true" className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>

          <ReadinessSummary locale={locale} readiness={readiness} />
        </div>
      </section>

      <section className="bg-base-200/45">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">{copy.results}</h2>
              <p className="mt-2 max-w-2xl leading-7 text-base-content/65">
                {copy.local}
              </p>
            </div>
            <p className="text-sm text-base-content/50">Last methodology update: August 2026</p>
          </div>

          <div className="mt-8 overflow-hidden rounded-lg border border-base-300 bg-base-100">
            <div className="hidden grid-cols-[minmax(12rem,0.8fr)_7rem_minmax(18rem,1.4fr)_8rem] gap-4 border-b border-base-300 bg-base-200 px-5 py-3 text-xs font-semibold uppercase text-base-content/55 md:grid">
              <span>Capability</span>
              <span>Priority</span>
              <span>Why it matters</span>
              <span>Result</span>
            </div>
            <div className="divide-y divide-base-300">
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

      <section className="border-y border-base-300 bg-neutral text-neutral-content">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article>
            <h2 className="text-3xl font-semibold text-white">{copy.scoreTitle}</h2>
            <p className="mt-5 leading-8 text-white/70">
              WebAssembly and WebGL 2 are treated as core requirements. IndexedDB, shared memory, controller input, and fullscreen support improve persistence, performance, or usability. The check confirms API availability, not the speed of a specific game.
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

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:px-8">
          <article className="max-w-3xl">
            <h2 className="text-3xl font-semibold">{copy.scopeTitle}</h2>
            <div className="mt-5 space-y-4 leading-8 text-base-content/70">
              <p>
                This page performs feature detection with standard browser APIs. It does not benchmark CPU or GPU speed, verify every controller model, or guarantee that every PS1 title will run at full speed.
              </p>
              <p>
                Actual results can vary with the emulator core, game, device temperature, available memory, browser extensions, and power-saving settings. Use this report as a preflight check, then test the game you intend to play.
              </p>
            </div>
          </article>

          <aside className="border-l-4 border-primary bg-base-200 p-5">
            <h2 className="text-lg font-semibold">{copy.ownTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-base-content/65">
              {copy.ownDescription}
            </p>
            <Link
              className="btn btn-primary btn-sm mt-5"
              reloadDocument
              params={{ locale: 'en' }}
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
  const labels = locale === 'zh-CN'
    ? { checking: '检测中', ready: '可运行', notReady: '暂不支持', browser: '浏览器就绪度', score: '仅供参考：实际性能取决于设备与模拟器。' }
    : locale === 'ja'
      ? { checking: '確認中', ready: '準備完了', notReady: '未対応', browser: 'ブラウザーの準備状況', score: '機能チェックのみです。実際の性能は端末とエミュレーターに左右されます。' }
      : { checking: 'Checking', ready: 'Ready', notReady: 'Not ready', browser: 'Browser readiness', score: 'A capability check only. Game performance still depends on the device and emulator.' }
  const label = readiness?.label === 'Ready' ? labels.ready : readiness?.label === 'Not ready' ? labels.notReady : labels.checking
  const tone =
    readiness?.label === 'Ready'
      ? 'text-success'
      : readiness?.label === 'Not ready'
        ? 'text-error'
        : 'text-warning'

  return (
    <aside aria-live="polite" className="border-l-4 border-primary bg-base-200 p-6">
      <p className="text-sm font-semibold text-base-content/55">{labels.browser}</p>
      <div className="mt-2 flex items-end justify-between gap-4">
        <strong className={`text-3xl ${tone}`}>{label}</strong>
        <span className="text-2xl font-semibold">{readiness?.score ?? '--'}/100</span>
      </div>
      <progress
        aria-label="Browser compatibility score"
        className="progress progress-primary mt-5 w-full"
        max="100"
        value={readiness?.score ?? 0}
      />
      <p className="mt-3 text-xs leading-5 text-base-content/55">
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
  const status = locale === 'zh-CN'
    ? { checking: '检测中', available: '支持', unavailable: '不支持' }
    : locale === 'ja'
      ? { checking: '確認中', available: '対応', unavailable: '未対応' }
      : { checking: 'Checking', available: 'Available', unavailable: 'Unavailable' }
  return (
    <div className="grid gap-3 px-5 py-5 md:grid-cols-[minmax(12rem,0.8fr)_7rem_minmax(18rem,1.4fr)_8rem] md:items-center md:gap-4">
      <div className="flex items-center gap-3 font-semibold">
        <i aria-hidden="true" className={`${definition.icon} text-xl text-primary`} />
        {definition.label}
      </div>
      <span className="text-sm font-medium text-base-content/60">{definition.requirement}</span>
      <p className="text-sm leading-6 text-base-content/65">{definition.description}</p>
      <span
        className={`inline-flex items-center gap-2 text-sm font-semibold ${
          available === undefined
            ? 'text-base-content/45'
            : available
              ? 'text-success'
              : 'text-error'
        }`}
      >
        <i
          aria-hidden="true"
          className={
            available === undefined
              ? 'ri-loader-4-line'
              : available
                ? 'ri-checkbox-circle-fill'
                : 'ri-close-circle-fill'
          }
        />
        {available === undefined ? status.checking : available ? status.available : status.unavailable}
      </span>
    </div>
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
