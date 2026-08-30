import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { SiteLayout } from '#/components/site-layout'
import {
  evaluateBrowserReadiness,
  type BrowserCapabilityFlags,
} from '#/lib/browser-compatibility'
import { getSeoLinksFromCanonical, getSeoOrigin } from '#/lib/seo'

const pagePath = '/en/ps1-compatibility'
const pageTitle = 'PS1 Browser Compatibility Check | POKOPIE'
const pageDescription =
  'Test whether your browser supports the WebAssembly, WebGL 2, storage, gamepad, fullscreen, and memory features used by browser-based PS1 emulation.'

type CapabilityDefinition = {
  description: string
  icon: string
  key: keyof BrowserCapabilityFlags
  label: string
  requirement: 'Core' | 'Recommended' | 'Optional'
}

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

export const Route = createFileRoute('/en/ps1-compatibility')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData }) => {
    const canonicalUrl = loaderData ? `${loaderData}${pagePath}` : pagePath

    return {
      links: getSeoLinksFromCanonical(canonicalUrl, ['en']),
      meta: [
        { title: pageTitle },
        { name: 'description', content: pageDescription },
        {
          name: 'keywords',
          content:
            'PS1 browser compatibility, browser emulator test, WebAssembly emulator, WebGL 2 test, online PS1 emulator requirements',
        },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: canonicalUrl },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: pageDescription },
      ],
    }
  },
  component: Ps1CompatibilityPage,
})

function Ps1CompatibilityPage() {
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
      locale="en"
      localePaths={{ 'zh-CN': '/zh-CN', en: pagePath, ja: '/ja' }}
    >
      <section className="border-b border-base-300 bg-base-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              PS1 Browser Compatibility Check
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-base-content/70">
              Check the browser capabilities commonly used by PlayStation 1 emulators before loading a game or your own ROM file.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="btn btn-primary" onClick={runCheck} type="button">
                <i aria-hidden="true" className="ri-pulse-line" />
                Run compatibility check
              </button>
              <Link className="btn btn-outline" to="/en/ps1-games">
                Browse PS1 games
                <i aria-hidden="true" className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>

          <ReadinessSummary readiness={readiness} />
        </div>
      </section>

      <section className="bg-base-200/45">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">Capability results</h2>
              <p className="mt-2 max-w-2xl leading-7 text-base-content/65">
                Results are generated locally in this browser. No device details or ROM files are uploaded.
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
                  definition={definition}
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
            <h2 className="text-3xl font-semibold text-white">How the score works</h2>
            <p className="mt-5 leading-8 text-white/70">
              WebAssembly and WebGL 2 are treated as core requirements. IndexedDB, shared memory, controller input, and fullscreen support improve persistence, performance, or usability. The check confirms API availability, not the speed of a specific game.
            </p>
          </article>
          <article>
            <h2 className="text-3xl font-semibold text-white">Improve compatibility</h2>
            <ul className="mt-5 space-y-3 text-white/70">
              <GuideItem>Update to the latest stable version of your browser.</GuideItem>
              <GuideItem>Enable hardware acceleration and restart the browser.</GuideItem>
              <GuideItem>Connect a controller before opening the game player.</GuideItem>
              <GuideItem>Close memory-heavy tabs when performance is inconsistent.</GuideItem>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:px-8">
          <article className="max-w-3xl">
            <h2 className="text-3xl font-semibold">Test scope and limitations</h2>
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
            <h2 className="text-lg font-semibold">Test your own file</h2>
            <p className="mt-2 text-sm leading-6 text-base-content/65">
              Use POKOPIE’s browser player with a ROM file that you are legally permitted to use.
            </p>
            <Link
              className="btn btn-primary btn-sm mt-5"
              reloadDocument
              params={{ locale: 'en' }}
              to="/$locale/play-my-rom"
            >
              Open Play My ROM
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
}: {
  readiness: ReturnType<typeof evaluateBrowserReadiness> | null
}) {
  const label = readiness?.label ?? 'Checking'
  const tone =
    readiness?.label === 'Ready'
      ? 'text-success'
      : readiness?.label === 'Not ready'
        ? 'text-error'
        : 'text-warning'

  return (
    <aside aria-live="polite" className="border-l-4 border-primary bg-base-200 p-6">
      <p className="text-sm font-semibold text-base-content/55">Browser readiness</p>
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
        A capability check only. Game performance still depends on the device and emulator.
      </p>
    </aside>
  )
}

function CapabilityRow({
  available,
  definition,
}: {
  available: boolean | undefined
  definition: CapabilityDefinition
}) {
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
        {available === undefined ? 'Checking' : available ? 'Available' : 'Unavailable'}
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
